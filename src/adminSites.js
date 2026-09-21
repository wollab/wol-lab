import { resources } from './resources.js';

export const adminSites = {
  'meta-learning': {
    id: 'meta-learning', name: 'Meta Learning Admin', heading: 'เนื้อหาทฤษฎีการเรียนรู้', description: 'จัดการเนื้อหาสำหรับเว็บไซต์ Meta Learning', itemLabel: 'เนื้อหา',
    fields: [
      { key: 'title', label: 'ชื่อเรื่อง', required: true },
      { key: 'summary', label: 'สรุป', multiline: true, required: true },
      { key: 'content', label: 'เนื้อหา', multiline: true, large: true, required: true },
      { key: 'sources', label: 'แหล่งอ้างอิง', multiline: true, required: true },
      { key: 'claimBoundary', label: 'ขอบเขตการกล่าวอ้าง', multiline: true, required: true },
    ],
    seed: [
      { id: 'lt-experiential', title: 'การเรียนรู้แบบลงมือทำ', summary: 'เรียนรู้จากประสบการณ์จริง ผ่านการลงมือปฏิบัติ สะท้อนคิด และนำไปประยุกต์ใช้', status: 'draft', content: 'การเรียนรู้แบบลงมือทำ เริ่มจากประสบการณ์จริงและการสะท้อนคิดอย่างมีโครงสร้าง', sources: 'Kolb, D. A. (1984). Experiential Learning.', claimBoundary: 'ใช้เพื่ออธิบายกรอบแนวคิด ไม่อ้างว่ารูปแบบเดียวเหมาะกับผู้เรียนทุกคน' },
      { id: 'lt-active', title: 'การเรียนรู้แบบมีส่วนร่วม', summary: 'ผู้เรียนมีส่วนร่วมกับโจทย์ การตัดสินใจ และเพื่อนร่วมวง', status: 'published', content: 'Active Learning ครอบคลุมวิธีการหลายแบบและต้องออกแบบให้เหมาะกับเป้าหมาย', sources: 'Freeman et al. (2014).', claimBoundary: 'ไม่สรุปว่าทุกกิจกรรมที่ผู้เรียนขยับตัวคือ Active Learning' },
      { id: 'lt-socratic', title: 'การสืบค้นแบบโสเครตีส', summary: 'ใช้คำถามเพื่อเปิดเหตุผล สมมติฐาน และข้อโต้แย้ง', status: 'published', content: 'คุณภาพของวงสนทนาขึ้นกับคำถาม ความปลอดภัย และพื้นความรู้', sources: 'Stanford Encyclopedia of Philosophy.', claimBoundary: 'ไม่ใช้เป็นสูตรถามต่อเนื่องเพื่อจับผิดผู้เรียน' },
      { id: 'lt-growth', title: 'แนวคิดการเติบโต', summary: 'ความเชื่อเกี่ยวกับการพัฒนาความสามารถและบทบาทของการตอบกลับ', status: 'draft', content: 'Growth mindset ต้องอ่านร่วมกับบริบท การสอน และโอกาสที่ผู้เรียนได้รับ', sources: 'Dweck, C. S.', claimBoundary: 'ไม่กล่าวโทษผู้เรียนหรือสรุปว่าความเชื่ออย่างเดียวเปลี่ยนผลลัพธ์ได้' },
    ],
  },
  'thai-people-history': {
    id: 'thai-people-history', name: 'ประวัติศาสตร์ประชาชน Admin', heading: 'เหตุการณ์และความทรงจำ', description: 'จัดการ Timeline เรื่องเล่า และหลักฐานของประวัติศาสตร์ประชาชน', itemLabel: 'เหตุการณ์',
    fields: [
      { key: 'title', label: 'ชื่อเหตุการณ์', required: true },
      { key: 'period', label: 'ช่วงเวลา / พ.ศ.', required: true },
      { key: 'summary', label: 'สรุปสำหรับหน้า Archive', multiline: true, required: true },
      { key: 'content', label: 'เรื่องเล่าและบริบท', multiline: true, large: true, required: true },
      { key: 'sources', label: 'แหล่งหลักฐาน', multiline: true, required: true },
      { key: 'claimBoundary', label: 'ข้อจำกัดและสิ่งที่ยังยืนยันไม่ได้', multiline: true, required: true },
    ],
    seed: [
      { id: 'roads-migration', title: 'ถนนอีสานกับการย้ายถิ่น', period: 'ทศวรรษ 2500', summary: 'ถนนเชื่อมตลาดและบริการ พร้อมเปลี่ยนเส้นทางการทำงานของหลายครอบครัว', content: 'อ่านการเปลี่ยนแปลงของถนนร่วมกับตลาด บริการรัฐ และการย้ายถิ่น โดยแยกประสบการณ์ของแต่ละพื้นที่', sources: 'World Bank roads case และเอกสารใน canonical source list', claimBoundary: 'ไม่สรุปว่าถนนเป็นสาเหตุเดียว และไม่เหมารวมประสบการณ์ทุกพื้นที่', status: 'published' },
      { id: 'universal-health', title: 'สิทธิรักษาพยาบาลกับชีวิตประจำวัน', period: 'พ.ศ. 2545 เป็นต้นมา', summary: 'นโยบายระดับประเทศเดินทางผ่านโรงพยาบาล บุคลากร และระบบส่งต่อ', content: 'เชื่อมการเปลี่ยนแปลงเชิงนโยบายกับประสบการณ์ใช้บริการใกล้บ้าน', sources: 'WHO, NHSO และงานศึกษาระบบสุขภาพ', claimBoundary: 'ไม่ใช้ประสบการณ์หนึ่งแทนภาพรวมประเทศ และไม่ขอข้อมูลสุขภาพส่วนบุคคล', status: 'draft' },
    ],
  },
  'product-landing-pages': {
    id: 'product-landing-pages', name: 'WoL Products Admin', heading: 'สินค้าและคู่มือ', description: 'จัดการข้อมูลสินค้า สเปก CTA และคู่มือที่เชื่อมจาก Product Landing Pages', itemLabel: 'สินค้า',
    fields: [
      { key: 'title', label: 'ชื่อสินค้า', required: true },
      { key: 'summary', label: 'คำอธิบายสั้น', multiline: true, required: true },
      { key: 'specs', label: 'จำนวนผู้เล่น / เวลา / อายุ', multiline: true, required: true },
      { key: 'content', label: 'รายละเอียดและวิธีใช้', multiline: true, large: true, required: true },
      { key: 'cta', label: 'CTA และลิงก์สั่งซื้อ/ติดต่อ', multiline: true, required: true },
      { key: 'claimBoundary', label: 'ขอบเขตผลการเรียนรู้ที่กล่าวได้', multiline: true, required: true },
    ],
    seed: [
      { id: 'fish-farmer', title: 'เกมปลาหมอคางดำ', summary: 'เกมชวนมองระบบนิเวศและการตัดสินใจเมื่อชนิดพันธุ์ต่างถิ่นเปลี่ยนพื้นที่', specs: 'ตรวจจาก Product Resource ก่อนเผยแพร่', content: 'ใช้ร่วมกับคำถาม Debrief เพื่อเชื่อมการตัดสินใจในเกมกับระบบที่ซับซ้อน', cta: 'ดูรายละเอียดสินค้าและคู่มือ Debrief', claimBoundary: 'อธิบายสิ่งที่เกมชวนให้พิจารณา ไม่อ้างผลลัพธ์การเรียนรู้ที่ยังไม่ได้วัด', status: 'published' },
      { id: 'sustainable-farm', title: 'ไร่ยั่งยืน', summary: 'เกมวางแผนทรัพยากรและพื้นที่เพื่อชวนคิดเรื่องระบบเกษตร', specs: '2–5 คน / 30 นาที / อายุ 8+ / เล่น 4 รอบ — ต้องตรวจสเปกล่าสุดก่อนเผยแพร่', content: 'ผู้เล่นตัดสินใจจัดสรรพื้นที่และทรัพยากรภายใต้ข้อจำกัดของระบบ', cta: 'ดูรายละเอียดและสอบถาม WoL', claimBoundary: 'ไม่สรุปผลกระทบจาก Intended Learning Outcomes', status: 'draft' },
    ],
  },
  'wol-lab': {
    id: 'wol-lab', name: 'WoL Lab Admin', heading: 'เว็บไซต์ แบบฟอร์ม และระบบ', description: 'จัดการ Directory, สิทธิ์การมองเห็น, Social links และ QR', itemLabel: 'รายการ',
    fields: [
      { key: 'title', label: 'ชื่อรายการ', required: true },
      { key: 'summary', label: 'คำอธิบายสำหรับผู้ใช้', multiline: true, required: true },
      { key: 'url', label: 'Canonical URL', required: true },
      { key: 'category', label: 'หมวดหมู่', required: true },
      { key: 'visibility', label: 'การมองเห็น: public หรือ private', required: true },
      { key: 'socialLinks', label: 'Social links', multiline: true },
      { key: 'milestone', label: 'Milestone ถัดไป', multiline: true, required: true },
      { key: 'nextStep', label: 'Next step', multiline: true, required: true },
      { key: 'needs', label: 'ข้อมูลหรือสิ่งที่ยังขาดจาก Chief', multiline: true },
      { key: 'updateStatus', label: 'สถานะข้อมูล: confirmed / proposed / needs-input', required: true },
      { key: 'updatedAt', label: 'ตรวจล่าสุด (YYYY-MM-DD)', required: true },
    ],
    seed: resources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      summary: resource.summary,
      url: resource.url,
      category: resource.category,
      visibility: resource.visibility,
      socialLinks: resource.socialLinks.map((link) => `${link.label}: ${link.url}`).join('\n'),
      milestone: resource.milestone,
      nextStep: resource.nextStep,
      needs: resource.needs,
      updateStatus: resource.updateStatus,
      updatedAt: resource.updatedAt,
      status: resource.status === 'live' ? 'published' : 'draft',
    })),
  },
};

export function getAdminSiteFromPath(pathname) {
  const segment = pathname.split('/').filter(Boolean)[1];
  return adminSites[segment] || adminSites['meta-learning'];
}
