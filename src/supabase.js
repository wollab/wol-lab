import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

export async function signInWithGoogle(redirectPath = '/admin') {
  if (!supabase) throw new Error('ยังไม่ได้เชื่อม Supabase สำหรับ Preview นี้');
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}${redirectPath}` },
  });
}

export async function getCurrentSession() {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function watchSession(callback) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

const fromResourceRow = (row) => ({
  id: row.id,
  title: row.title,
  summary: row.summary,
  category: row.category,
  categoryLabel: row.category_label || row.category,
  status: row.status,
  visibility: row.visibility,
  url: row.canonical_url,
  cover: row.cover_url,
  socialLinks: row.social_links || [],
  tags: row.tags || [],
  featured: row.featured,
  milestone: row.milestone || '',
  nextStep: row.next_step || '',
  needs: row.needs || '',
  updateStatus: row.update_status || 'needs-input',
  updatedAt: row.reviewed_at || row.updated_at?.slice(0, 10),
  lastVerifiedAt: row.last_verified_at,
});

export async function loadResources(includePrivate = false) {
  if (!supabase) return [];
  let query = supabase.from('resources').select('*').order('title');
  if (!includePrivate) query = query.eq('visibility', 'public');
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(fromResourceRow);
}

export async function saveResource(item) {
  if (!supabase) throw new Error('ยังไม่ได้เชื่อม Supabase');
  const socialLinks = typeof item.socialLinks === 'string'
    ? item.socialLinks.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
      const [label, ...urlParts] = line.split(': ');
      return { label: urlParts.length ? label : 'Social', url: urlParts.length ? urlParts.join(': ') : line };
    })
    : (item.socialLinks || []);
  const row = {
    id: item.id,
    title: item.title,
    summary: item.summary || '',
    category: item.category,
    category_label: item.categoryLabel || item.category,
    status: item.status === 'published' ? 'live' : (item.status || 'pilot'),
    visibility: item.visibility || 'public',
    canonical_url: item.url,
    cover_url: item.cover || null,
    social_links: socialLinks,
    tags: item.tags || [],
    featured: Boolean(item.featured),
    milestone: item.milestone || '',
    next_step: item.nextStep || '',
    needs: item.needs || '',
    update_status: item.updateStatus || 'needs-input',
    reviewed_at: item.updatedAt || new Date().toISOString().slice(0, 10),
    last_verified_at: item.lastVerifiedAt || null,
  };
  const { data, error } = await supabase.from('resources').upsert(row).select().single();
  if (error) throw error;
  return fromResourceRow(data);
}

export async function loadContentItems(siteId) {
  if (!supabase) return [];
  const { data, error } = await supabase.from('content_items').select('*').eq('site_id', siteId).order('updated_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => ({ id: row.slug, remoteId: row.id, title: row.title, ...row.fields, status: row.status, updatedAt: row.updated_at }));
}

export async function saveContentItem(siteId, item) {
  if (!supabase) throw new Error('ยังไม่ได้เชื่อม Supabase');
  const { id, remoteId, title, status, updatedAt, ...fields } = item;
  const row = { site_id: siteId, content_type: 'entry', slug: id, title, fields, status: status === 'published' ? 'published' : 'draft' };
  const { data, error } = await supabase.from('content_items').upsert(row, { onConflict: 'site_id,content_type,slug' }).select().single();
  if (error) throw error;
  return { id: data.slug, remoteId: data.id, title: data.title, ...data.fields, status: data.status, updatedAt: data.updated_at };
}

export async function publishContentItem(siteId, item) {
  const saved = await saveContentItem(siteId, { ...item, status: 'draft' });
  const { data, error } = await supabase.rpc('publish_content_item', { item_id: saved.remoteId });
  if (error) throw error;
  return { id: data.slug, remoteId: data.id, title: data.title, ...data.fields, status: data.status, updatedAt: data.updated_at };
}

export async function loadDirectoryLayout() {
  if (!supabase) return null;
  const { data, error } = await supabase.from('site_settings').select('value').eq('id', 'directory-layout').maybeSingle();
  if (error) throw error;
  return data?.value || null;
}

export async function saveDirectoryLayout(value) {
  if (!supabase) throw new Error('ยังไม่ได้เชื่อม Supabase');
  const { error } = await supabase.from('site_settings').upsert({ id: 'directory-layout', value });
  if (error) throw error;
}
