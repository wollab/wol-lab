import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, BookOpen, ChevronDown, ChevronUp, CircleAlert, ExternalLink, Eye, EyeOff, Facebook, FileText, Flag, Gamepad2, History, LayoutGrid, Library, List, LockKeyhole, LogIn, Menu, Package, QrCode, Search, ShieldCheck, Sparkles, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { categories, resources } from './resources.js';
import { adminSites, getAdminSiteFromPath } from './adminSites.js';
import { filterResources } from './lib.js';
import { getCurrentSession, isSupabaseConfigured, loadContentItems, loadDirectoryLayout, loadResources, publishContentItem, saveContentItem, saveDirectoryLayout, saveResource, signInWithGoogle, signOut, watchSession } from './supabase.js';

const categoryIcons = { knowledge: BookOpen, games: Gamepad2, products: Package, cases: Library, systems: FileText };
const statusLabels = { live: 'Live', pilot: 'Pilot', maintenance: 'Maintenance', internal: 'Internal' };
const updateStatusLabels = { confirmed: 'ยืนยันแล้ว', proposed: 'ข้อเสนอ', 'needs-input': 'รอข้อมูล' };
const defaultDirectoryLayout = { categoryOrder: ['knowledge', 'games', 'products', 'cases', 'systems'], categoryLabels: {}, hiddenCategories: [], showWorkTypes: true, showAbout: true };
const layoutStorageKey = 'wol-lab-directory-layout-v1';
const adminResourceStorageKey = 'wol-lab-admin-demo-wol-lab-v2';
const publicAsset = (path) => path?.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;

function readDirectoryLayout() {
  try { return { ...defaultDirectoryLayout, ...JSON.parse(localStorage.getItem(layoutStorageKey)) }; }
  catch { return defaultDirectoryLayout; }
}

function readDirectoryResources() {
  try {
    const edits = JSON.parse(localStorage.getItem(adminResourceStorageKey));
    if (!Array.isArray(edits)) return resources;
    return resources.map((resource) => {
      const edit = edits.find((item) => item.id === resource.id);
      if (!edit) return resource;
      const socialLinks = typeof edit.socialLinks === 'string'
        ? edit.socialLinks.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
          const [label, ...url] = line.split(': ');
          return { label: url.length ? label : 'Social', url: url.length ? url.join(': ') : line };
        })
        : resource.socialLinks;
      return { ...resource, ...edit, status: resource.status, socialLinks };
    });
  } catch { return resources; }
}

function App() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/admin') || path.includes('/admin/')) return <AdminApp />;
  return <DirectoryApp />;
}

function DirectoryApp() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [teamMode, setTeamMode] = useState(false);
  const [qrResource, setQrResource] = useState(null);
  const [view, setView] = useState('grid');
  const [layout, setLayout] = useState(readDirectoryLayout);
  const [directoryResources, setDirectoryResources] = useState(readDirectoryResources);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    Promise.all([loadResources(false), loadDirectoryLayout()]).then(([remoteResources, remoteLayout]) => {
      if (remoteResources.length) setDirectoryResources(remoteResources);
      if (remoteLayout) setLayout((current) => ({ ...current, ...remoteLayout }));
    }).catch(() => {});
  }, []);
  const visibleResources = useMemo(() => filterResources(directoryResources, query, category, teamMode), [directoryResources, query, category, teamMode]);
  const workCategories = layout.categoryOrder
    .filter((id) => !layout.hiddenCategories.includes(id))
    .map((id) => {
      const item = categories.find((categoryItem) => categoryItem.id === id);
      const customLabel = layout.categoryLabels?.[id]?.trim();
      return item && customLabel ? { ...item, label: customLabel, shortLabel: customLabel } : item;
    })
    .filter(Boolean);
  const navCategories = [categories[0], ...workCategories];
  const categoryGroups = workCategories
    .map((item) => ({ ...item, resources: visibleResources.filter((resource) => resource.category === item.id).map((resource) => ({ ...resource, categoryLabel: item.label })) }))
    .filter((item) => item.resources.length > 0);
  const chooseCategory = (id, scroll = false) => {
    setCategory(id);
    if (scroll) window.requestAnimationFrame(() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' }));
  };
  const downloadProjectReport = () => {
    const lines = ['# WoL Lab — Project Update Report', '', `Generated: ${new Date().toISOString()}`, '', '| Project | Status | Milestone ถัดไป | Next step | ต้องการจาก Chief | ตรวจล่าสุด |', '| --- | --- | --- | --- | --- | --- |'];
    for (const resource of directoryResources) {
      const clean = (value) => String(value || '').replaceAll('|', '\\|').replaceAll('\n', ' ');
      lines.push(`| ${clean(resource.title)} | ${clean(updateStatusLabels[resource.updateStatus])} | ${clean(resource.milestone)} | ${clean(resource.nextStep)} | ${clean(resource.needs)} | ${clean(resource.updatedAt)} |`);
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `wol-lab-project-update-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
          <a className="brand" href={import.meta.env.BASE_URL} aria-label="WoL Lab หน้าหลัก"><img className="brand-logo" src={publicAsset('/wol-logo.png')} alt="Wizards of Learning" /><span><strong>WoL Lab</strong><small>Wizards of Learning</small></span></a>
        <nav aria-label="เมนูหลัก"><a href="#directory">เว็บไซต์และเครื่องมือ</a><a href="#about">เกี่ยวกับ WoL Lab</a></nav>
        <button className="team-button" onClick={() => setTeamMode((value) => !value)}>{teamMode ? <ShieldCheck /> : <LogIn />} {teamMode ? 'โหมดทีม' : 'เข้าสู่ระบบทีม'}</button>
        <button className="mobile-menu" aria-label="เปิดเมนู"><Menu /></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>รวมเครื่องมือ ความรู้ และงานทดลองของ <span>Wizards of Learning</span></h1>
            <p>พื้นที่เดียวสำหรับค้นหาเว็บ เกม คู่มือ แบบฟอร์ม และระบบที่ WoL สร้างขึ้นจากการทำงานจริง</p>
            <label className="search-box"><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาเว็บไซต์ เครื่องมือ หรือแบบฟอร์ม" /></label>
          </div>
          <div className="hero-art" aria-hidden="true"><img src={publicAsset('/wol-lab-hero.png')} alt="" /><div className="hero-note">เรียนรู้<br />ทดลอง<br />แบ่งปัน</div></div>
        </section>

        <div className="category-rail" aria-label="กรองตามประเภท">
          {navCategories.map((item) => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => chooseCategory(item.id)}>{item.shortLabel || item.label}</button>)}
        </div>

        {!query && layout.showWorkTypes && (
          <section className="work-type-section" aria-labelledby="work-type-heading">
            <div className="work-type-intro"><span>เลือกตามประเภทงาน</span><h2 id="work-type-heading">กำลังมองหางานแบบไหน?</h2><p>แต่ละหมวดแยกตามหน้าที่ของทรัพยากร เพื่อให้เลือกใช้ได้เร็วขึ้น</p></div>
            <div className="work-type-grid">
              {workCategories.map((item) => {
                const Icon = categoryIcons[item.id] || FileText;
                const count = filterResources(resources, '', item.id, teamMode).length;
                return <button key={item.id} className={`work-type-card type-${item.id} ${category === item.id ? 'active' : ''}`} onClick={() => chooseCategory(item.id, true)}><span className="work-type-icon"><Icon /></span><span><strong>{item.label}</strong><small>{item.description}</small><em>{count} รายการ</em></span></button>;
              })}
            </div>
          </section>
        )}

        <section className={`directory-section ${view}`} id="directory" aria-labelledby="directory-heading">
          <div className="section-heading"><div><span className="eyebrow">คลังทรัพยากร WoL</span><h2 id="directory-heading">{category === 'all' ? 'เว็บไซต์และเครื่องมือ แยกตามประเภทงาน' : workCategories.find((item) => item.id === category)?.label}</h2><p>{visibleResources.length} รายการที่ตรวจ URL แล้ว {teamMode ? 'รวมเครื่องมือภายใน' : 'สำหรับผู้ใช้ทั่วไป'}</p></div><div className="directory-tools"><button className="report-download" onClick={downloadProjectReport}><FileText /> ดาวน์โหลดรายงานงานต่อ</button><div className="view-controls"><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="มุมมองตาราง"><LayoutGrid /></button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="มุมมองรายการ"><List /></button></div></div></div>
          {visibleResources.length ? <div className="resource-groups">{categoryGroups.map((group) => { const Icon = categoryIcons[group.id] || FileText; return <section className={`resource-group group-${group.id}`} key={group.id} aria-labelledby={`group-${group.id}`}><div className="group-heading"><span><Icon /></span><div><h3 id={`group-${group.id}`}>{group.label}</h3><p>{group.description}</p></div><strong>{group.resources.length}</strong></div><div className="resource-grid">{group.resources.map((resource) => <ResourceCard key={resource.id} resource={resource} onQr={setQrResource} />)}</div></section>; })}</div> : <div className="empty-state"><Search /><h3>ยังไม่พบรายการที่ตรงกัน</h3><p>ลองเปลี่ยนคำค้นหรือเลือกหมวดหมู่อื่น</p></div>}
        </section>

        {layout.showAbout && <section className="about-section" id="about"><div><Sparkles /><h2>พื้นที่เล็ก ๆ ที่ทำให้การเรียนรู้เป็นไปได้เสมอ</h2></div><p>WoL Lab รวบรวมสิ่งที่เคยกระจายอยู่หลายลิงก์ เพื่อให้ครู นักออกแบบเกม กระบวนกร และทีม WoL เรียกใช้สิ่งที่ต้องการได้โดยไม่ต้องจำว่าเก็บไว้ที่ไหน</p></section>}
      </main>
      <footer><strong>Wizards of Learning</strong><span>Game for Social Impact Studio</span><div><a href="https://www.facebook.com/share/1EnjGCsmAy/">Facebook</a><a href="https://wizardsoflearning.com/">เว็บไซต์หลัก</a></div></footer>
      {qrResource && <QrDialog resource={qrResource} onClose={() => setQrResource(null)} />}
    </div>
  );
}

function ResourceCard({ resource, onQr, large = false, compact = false }) {
  const Icon = categoryIcons[resource.category] || FileText;
  const [showUpdate, setShowUpdate] = useState(false);
  return (
    <article className={`resource-card category-${resource.category} ${large ? 'large' : ''} ${compact ? 'compact' : ''}`}>
      <div className="cover-wrap"><img src={publicAsset(resource.cover)} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><span className={`status status-${resource.status}`}>{statusLabels[resource.status]}</span></div>
      <div className="resource-body">
        <div className="resource-copy"><span className="category-label"><Icon />{resource.categoryLabel}</span><h3>{resource.title}</h3><p>{resource.summary}</p></div>
        <div className="resource-actions"><a className="primary-link" href={resource.url} target="_blank" rel="noreferrer">ดูเว็บไซต์ <ExternalLink /></a><button onClick={() => onQr(resource)}><QrCode /> QR Code</button><button className={`plan-button ${showUpdate ? 'active' : ''}`} onClick={() => setShowUpdate((value) => !value)} aria-expanded={showUpdate}><Flag /> แผนงาน {showUpdate ? <ChevronUp /> : <ChevronDown />}</button>{resource.socialLinks?.map((social) => <a key={social.url} className="icon-link" href={social.url} target="_blank" rel="noreferrer" aria-label={`${social.label} ของ ${resource.title}`}><Facebook /></a>)}</div>
        {showUpdate && <div className={`project-update update-${resource.updateStatus}`}><div className="update-heading"><span>{updateStatusLabels[resource.updateStatus] || 'รอตรวจ'}</span><small>ข้อมูล ณ {resource.updatedAt}</small></div><dl><div><dt>Milestone ถัดไป</dt><dd>{resource.milestone}</dd></div><div><dt>Next step</dt><dd>{resource.nextStep}</dd></div><div className="needs-row"><dt><CircleAlert /> ต้องการจาก Chief</dt><dd>{resource.needs}</dd></div></dl></div>}
      </div>
    </article>
  );
}

function QrDialog({ resource, onClose }) {
  const qrRef = useRef(null);
  const downloadQr = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${resource.id}-qr.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}><section className="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-title" onMouseDown={(event) => event.stopPropagation()}><button className="dialog-close" onClick={onClose} aria-label="ปิด"><X /></button><div className="qr-code" ref={qrRef}><QRCodeSVG value={resource.url} size={220} level="H" marginSize={2} fgColor="#174c4b" /></div><h2 id="qr-title">{resource.title}</h2><p>{resource.url}</p><button className="download-button" onClick={downloadQr}>ดาวน์โหลด QR เป็น SVG</button></section></div>;
}

function AdminApp() {
  const config = getAdminSiteFromPath(window.location.pathname);
  const storageKey = config.id === 'wol-lab' ? adminResourceStorageKey : `wol-lab-admin-demo-${config.id}-v1`;
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem(storageKey)) || config.seed; } catch { return config.seed; } });
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState('');
  const [session, setSession] = useState(null);
  const [directoryLayout, setDirectoryLayout] = useState(readDirectoryLayout);
  const selected = items.find((item) => item.id === selectedId) || items[0];
  const filtered = items.filter((item) => filter === 'all' || item.status === filter);
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);
  useEffect(() => { if (config.id === 'wol-lab') localStorage.setItem(layoutStorageKey, JSON.stringify(directoryLayout)); }, [config.id, directoryLayout]);
  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    getCurrentSession().then(setSession).catch((error) => setNotice(error.message));
    return watchSession(setSession);
  }, []);
  useEffect(() => {
    if (!session || !isSupabaseConfigured) return;
    const loader = config.id === 'wol-lab' ? loadResources(true) : loadContentItems(config.id);
    Promise.resolve(loader).then((remoteItems) => {
      if (!remoteItems.length) return;
      const mapped = config.id === 'wol-lab' ? remoteItems.map((item) => ({ ...item, socialLinks: item.socialLinks.map((link) => `${link.label}: ${link.url}`).join('\n'), status: item.status === 'live' ? 'published' : 'draft' })) : remoteItems;
      setItems(mapped);
      setSelectedId(mapped[0]?.id);
    }).catch((error) => setNotice(`โหลดข้อมูลกลางไม่สำเร็จ: ${error.message}`));
    if (config.id === 'wol-lab') loadDirectoryLayout().then((remoteLayout) => { if (remoteLayout) setDirectoryLayout((current) => ({ ...current, ...remoteLayout })); }).catch((error) => setNotice(error.message));
  }, [config.id, session]);
  const update = (field, value) => setItems((current) => current.map((item) => item.id === selected.id ? { ...item, [field]: value, updatedAt: new Date().toISOString() } : item));
  const persist = async (targetStatus) => {
    if (!selected) return;
    const next = { ...selected, status: targetStatus, updatedAt: new Date().toISOString() };
    setItems((current) => current.map((item) => item.id === selected.id ? next : item));
    if (!isSupabaseConfigured) { setNotice(targetStatus === 'published' ? 'อัปเดตสถานะใน Preview แล้ว — ยังไม่ได้เชื่อมระบบเผยแพร่จริง' : 'บันทึกฉบับร่างในเครื่องแล้ว'); return; }
    if (!session) { setNotice('กรุณาเข้าสู่ระบบด้วยบัญชี Google ที่ได้รับสิทธิ์ก่อนบันทึกข้อมูลกลาง'); return; }
    try {
      const saved = config.id === 'wol-lab'
        ? await saveResource(next)
        : targetStatus === 'published' ? await publishContentItem(config.id, next) : await saveContentItem(config.id, next);
      const normalized = config.id === 'wol-lab' ? { ...next, ...saved, socialLinks: saved.socialLinks.map((link) => `${link.label}: ${link.url}`).join('\n'), status: targetStatus } : saved;
      setItems((current) => current.map((item) => item.id === selected.id ? normalized : item));
      setNotice(targetStatus === 'published' ? 'เผยแพร่และบันทึกเวอร์ชันใน Supabase แล้ว' : 'บันทึกฉบับร่างใน Supabase แล้ว');
    } catch (error) { setNotice(`บันทึกไม่สำเร็จ: ${error.message}`); }
  };
  const saveDraft = () => persist('draft');
  const publish = () => persist('published');
  const addItem = () => { const id = `draft-${Date.now()}`; const blank = Object.fromEntries(config.fields.map((field) => [field.key, ''])); setItems((current) => [{ id, ...blank, title: `${config.itemLabel}ใหม่`, status: 'draft' }, ...current]); setSelectedId(id); };
  const updateDirectoryLayout = (next) => {
    setDirectoryLayout(next);
    if (session) saveDirectoryLayout(next).then(() => setNotice('บันทึกโครงสร้าง Directory ใน Supabase แล้ว')).catch((error) => setNotice(`บันทึกโครงสร้างไม่สำเร็จ: ${error.message}`));
  };
  const accountLabel = session?.user?.email || (isSupabaseConfigured ? 'ยังไม่ได้เข้าสู่ระบบ' : 'Local preview');

  return <div className="admin-shell">
    <header className="admin-header"><a className="admin-brand" href="/"><span>WoL</span><strong>{config.name}</strong></a><select className="site-switcher" value={config.id} onChange={(event) => { window.location.href = `/admin/${event.target.value}`; }}>{Object.values(adminSites).map((site) => <option key={site.id} value={site.id}>{site.name}</option>)}</select><div className="admin-account"><span>{accountLabel}</span><button onClick={() => (session ? signOut() : signInWithGoogle(window.location.pathname)).catch((error) => setNotice(error.message))}>{session ? 'ออกจากระบบ' : isSupabaseConfigured ? 'เข้าสู่ระบบ Google' : 'ยังไม่เชื่อมระบบจริง'}</button></div></header>
    <aside className="content-sidebar"><div className="sidebar-title"><h1>{config.heading}</h1><p>{config.description}</p></div><button className="create-button" onClick={addItem}>＋ สร้าง{config.itemLabel}ใหม่</button><label className="admin-search"><Search /><input placeholder={`ค้นหา${config.itemLabel}`} /></label><div className="filter-row"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>ทั้งหมด</button><button className={filter === 'draft' ? 'active' : ''} onClick={() => setFilter('draft')}>ฉบับร่าง</button><button className={filter === 'published' ? 'active' : ''} onClick={() => setFilter('published')}>เผยแพร่แล้ว</button></div><div className="content-list">{filtered.map((item) => <button key={item.id} className={selectedId === item.id ? 'selected' : ''} onClick={() => setSelectedId(item.id)}><span className="content-thumb"><BookOpen /></span><span><strong>{item.title}</strong><small>{item.summary || 'ยังไม่มีคำอธิบาย'}</small></span><em className={item.status}>{item.status === 'published' ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}</em></button>)}</div></aside>
    {selected && <main className="editor"><div className="editor-heading"><div><span>แก้ไข{config.itemLabel}</span><h2>{selected.title}</h2></div><div className="workflow-thread"><span className={selected.status === 'draft' ? 'active' : ''}>ฉบับร่าง</span><span>ดูตัวอย่าง</span><span className={selected.status === 'published' ? 'active' : ''}>เผยแพร่</span></div></div>{config.id === 'wol-lab' && <DirectoryLayoutManager layout={directoryLayout} onChange={updateDirectoryLayout} />}{config.fields.map((field) => <EditorField key={field.key} label={field.label} required={field.required} value={selected[field.key] || ''} onChange={(value) => update(field.key, value)} multiline={field.multiline} large={field.large} />)}<div className="cover-field"><label>ภาพปก</label><div><div className="cover-placeholder"><BookOpen /></div><button>เลือกภาพ</button><span>JPG หรือ PNG ขนาดแนะนำ 1200 × 630 px</span></div></div></main>}
    <aside className="revision-panel"><h2>สถานะปัจจุบัน</h2><div className={`big-status ${selected?.status}`}>{selected?.status === 'published' ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}</div><dl><div><dt>แก้ไขล่าสุด</dt><dd>{selected?.updatedAt ? new Date(selected.updatedAt).toLocaleString('th-TH') : 'ข้อมูลตัวอย่าง'}</dd></div><div><dt>ระบบ</dt><dd>{isSupabaseConfigured ? 'เชื่อม Supabase' : 'Local preview'}</dd></div></dl><h2><History /> ประวัติการแก้ไข</h2><div className="revision-item"><span></span><strong>เวอร์ชันปัจจุบัน</strong><small>บันทึกใน Browser นี้</small></div><p className="revision-note">เมื่อเชื่อม Supabase ระบบจะแสดงผู้แก้ เวลา และปุ่ม Rollback ของทุกเวอร์ชัน</p></aside>
    <div className="admin-actionbar"><span>{notice || (session ? 'การเปลี่ยนแปลงจะบันทึกใน Supabase เมื่อกดบันทึกหรือเผยแพร่' : 'การเปลี่ยนแปลงใน Preview บันทึกไว้เฉพาะ Browser นี้')}</span><div><button onClick={saveDraft}>บันทึกฉบับร่าง</button><button onClick={() => setPreview(true)}>ดูตัวอย่าง</button><button className="publish-button" onClick={publish}>เผยแพร่</button></div></div>
    {preview && <div className="dialog-backdrop" onMouseDown={() => setPreview(false)}><article className="content-preview" onMouseDown={(event) => event.stopPropagation()}><button className="dialog-close" onClick={() => setPreview(false)} aria-label="ปิด"><X /></button><span>ตัวอย่างก่อนเผยแพร่</span><h1>{selected.title}</h1>{config.fields.filter((field) => field.key !== 'title').map((field, index) => index === 0 ? <p key={field.key} className="lead">{selected[field.key]}</p> : <section key={field.key}><h2>{field.label}</h2><p>{selected[field.key]}</p></section>)}</article></div>}
  </div>;
}

function EditorField({ label, value, onChange, multiline = false, large = false, required = false }) {
  return <label className="editor-field"><span>{label} {required && <b>*</b>}</span>{multiline ? <textarea className={large ? 'large' : ''} value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function DirectoryLayoutManager({ layout, onChange }) {
  const move = (id, direction) => {
    const order = [...layout.categoryOrder];
    const from = order.indexOf(id);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= order.length) return;
    [order[from], order[to]] = [order[to], order[from]];
    onChange({ ...layout, categoryOrder: order });
  };
  const toggleCategory = (id) => onChange({ ...layout, hiddenCategories: layout.hiddenCategories.includes(id) ? layout.hiddenCategories.filter((item) => item !== id) : [...layout.hiddenCategories, id] });
  const renameCategory = (id, value) => onChange({ ...layout, categoryLabels: { ...(layout.categoryLabels || {}), [id]: value } });
  return <section className="layout-manager"><div className="layout-manager-heading"><div><span>โครงสร้างหน้า Directory</span><h3>ตั้งชื่อ จัดลำดับ และซ่อน/แสดง section</h3></div><small>บันทึกอัตโนมัติใน Browser นี้</small></div><div className="layout-switches"><label><input type="checkbox" checked={layout.showWorkTypes} onChange={(event) => onChange({ ...layout, showWorkTypes: event.target.checked })} /> แสดงตัวเลือกประเภทงาน</label><label><input type="checkbox" checked={layout.showAbout} onChange={(event) => onChange({ ...layout, showAbout: event.target.checked })} /> แสดงส่วนเกี่ยวกับ WoL Lab</label></div><div className="layout-list">{layout.categoryOrder.map((id, index) => { const item = categories.find((categoryItem) => categoryItem.id === id); const label = layout.categoryLabels?.[id] ?? item?.label ?? id; const hidden = layout.hiddenCategories.includes(id); const Icon = categoryIcons[id] || FileText; return <div key={id} className={hidden ? 'hidden' : ''}><span><Icon /></span><input value={label} onChange={(event) => renameCategory(id, event.target.value)} aria-label={`ชื่อหมวด ${item?.label || id}`} /><button onClick={() => move(id, -1)} disabled={index === 0} aria-label={`เลื่อน ${label} ขึ้น`}><ArrowUp /></button><button onClick={() => move(id, 1)} disabled={index === layout.categoryOrder.length - 1} aria-label={`เลื่อน ${label} ลง`}><ArrowDown /></button><button onClick={() => toggleCategory(id)} aria-label={`${hidden ? 'แสดง' : 'ซ่อน'} ${label}`}>{hidden ? <EyeOff /> : <Eye />}</button></div>; })}</div><p>ชื่อหมวด ลำดับ และการซ่อน/แสดงจะใช้กับหน้า Directory หลังรีเฟรช</p></section>;
}

export default App;
