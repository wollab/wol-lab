import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyDuplicate, filterResources, isSafePublicUrl, normalizeText } from './lib.js';
import { resources as directoryResources } from './resources.js';

test('normalizes Thai copy and removes URLs', () => {
  assert.equal(normalizeText('เรียนรู้!  https://example.com  ไปด้วยกัน'), 'เรียนรู้ ไปด้วยกัน');
});

test('private resources stay hidden until team mode is enabled', () => {
  const resources = [
    { title: 'Public', summary: '', categoryLabel: '', tags: [], category: 'tools', visibility: 'public' },
    { title: 'Private', summary: '', categoryLabel: '', tags: [], category: 'tools', visibility: 'private' },
  ];
  assert.equal(filterResources(resources, '', 'all', false).length, 1);
  assert.equal(filterResources(resources, '', 'all', true).length, 2);
});

test('detects exact and likely duplicate posts', () => {
  const posts = [{ id: 'p1', caption: 'ถามเพื่อเปิดเหตุผล ไม่ใช่กดให้จนมุม' }];
  assert.equal(classifyDuplicate({ caption: posts[0].caption }, posts).status, 'exact-duplicate');
  assert.equal(classifyDuplicate({ caption: 'ถามเพื่อเปิดเหตุผลในการเรียนรู้' }, posts).status, 'likely-overlap');
});

test('rejects Google Form edit URLs from public resources', () => {
  assert.equal(isSafePublicUrl('https://docs.google.com/forms/d/abc/edit'), false);
  assert.equal(isSafePublicUrl('https://docs.google.com/forms/d/e/abc/viewform'), true);
});

test('Facebook links appear only on resources with a confirmed own channel', () => {
  const linkedIds = directoryResources.filter((resource) => resource.socialLinks.some((link) => link.url.includes('facebook.com'))).map((resource) => resource.id).sort();
  assert.deepEqual(linkedIds, ['magic-casters', 'meta-learning', 'thai-justice-memory', 'thai-people-history', 'wol-main']);
});

test('every directory resource exposes an accountable next-step update', () => {
  for (const resource of directoryResources) {
    assert.ok(resource.milestone, `${resource.id} milestone`);
    assert.ok(resource.nextStep, `${resource.id} nextStep`);
    assert.ok(resource.needs, `${resource.id} needs`);
    assert.ok(['confirmed', 'proposed', 'needs-input'].includes(resource.updateStatus), `${resource.id} updateStatus`);
  }
});
