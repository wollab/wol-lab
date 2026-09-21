export function normalizeText(value = '') {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('th')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function filterResources(resources, query, category, canSeePrivate = false) {
  const needle = normalizeText(query);
  return resources.filter((resource) => {
    if (resource.visibility === 'private' && !canSeePrivate) return false;
    if (category !== 'all' && resource.category !== category) return false;
    if (!needle) return true;
    const haystack = normalizeText([
      resource.title,
      resource.summary,
      resource.categoryLabel,
      ...(resource.tags || []),
    ].join(' '));
    return haystack.includes(needle);
  });
}

export function classifyDuplicate(candidate, publishedPosts) {
  const normalized = normalizeText(candidate.caption || candidate.title);
  if (!normalized) return { status: 'needs-review', matches: [] };
  const candidateTokens = new Set(normalized.split(' ').filter((token) => token.length > 2));
  const toNgrams = (text, size = 3) => {
    const compact = text.replace(/\s+/g, '');
    return new Set(Array.from({ length: Math.max(0, compact.length - size + 1) }, (_, index) => compact.slice(index, index + size)));
  };
  const candidateNgrams = toNgrams(normalized);
  const matches = publishedPosts
    .map((post) => {
      const postNormalized = normalizeText(post.caption || post.title);
      const postTokens = new Set(postNormalized.split(' ').filter((token) => token.length > 2));
      const intersection = [...candidateTokens].filter((token) => postTokens.has(token)).length;
      const union = new Set([...candidateTokens, ...postTokens]).size || 1;
      const postNgrams = toNgrams(postNormalized);
      const sharedNgrams = [...candidateNgrams].filter((ngram) => postNgrams.has(ngram)).length;
      const ngramDice = (2 * sharedNgrams) / (candidateNgrams.size + postNgrams.size || 1);
      return { ...post, similarity: Math.max(intersection / union, ngramDice), exact: postNormalized === normalized };
    })
    .filter((post) => post.exact || post.similarity >= 0.42)
    .sort((a, b) => Number(b.exact) - Number(a.exact) || b.similarity - a.similarity);

  if (matches.some((match) => match.exact)) return { status: 'exact-duplicate', matches };
  if (matches.length) return { status: 'likely-overlap', matches };
  return { status: 'new', matches: [] };
}

export function isSafePublicUrl(url) {
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return false;
    if (parsed.hostname === 'docs.google.com' && /\/forms\/d\/[^/]+\/edit/.test(parsed.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}
