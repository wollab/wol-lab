import { resources } from '../src/resources.js';
import { isSafePublicUrl } from '../src/lib.js';

const errors = [];
const ids = new Set();
for (const resource of resources) {
  if (ids.has(resource.id)) errors.push(`duplicate id: ${resource.id}`);
  ids.add(resource.id);
  for (const field of ['id', 'title', 'summary', 'category', 'status', 'visibility', 'url', 'cover']) {
    if (!resource[field]) errors.push(`${resource.id}: missing ${field}`);
  }
  if (resource.visibility === 'public' && !isSafePublicUrl(resource.url)) errors.push(`${resource.id}: unsafe public URL ${resource.url}`);
  for (const social of resource.socialLinks || []) {
    if (!isSafePublicUrl(social.url)) errors.push(`${resource.id}: unsafe social URL ${social.url}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${resources.length} resources (${resources.filter((item) => item.visibility === 'public').length} public, ${resources.filter((item) => item.visibility === 'private').length} private).`);
