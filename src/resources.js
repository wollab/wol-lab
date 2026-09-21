export const categories = [
  { id: 'all', label: 'ทั้งหมด', description: 'ดูงานทุกประเภทในที่เดียว' },
  { id: 'knowledge', label: 'คลังความรู้และประวัติศาสตร์', shortLabel: 'ความรู้', description: 'บทความ เส้นเวลา ทฤษฎี และฐานข้อมูลสำหรับค้นคว้า' },
  { id: 'games', label: 'เกมและเครื่องมือเรียนรู้', shortLabel: 'เครื่องมือ', description: 'เว็บเกม แบบประเมิน และเครื่องมือช่วยออกแบบการเรียนรู้' },
  { id: 'products', label: 'ผลิตภัณฑ์และคู่มือ', shortLabel: 'ผลิตภัณฑ์', description: 'หน้าสินค้า คู่มือใช้เกม และทรัพยากรสำหรับผู้ใช้งาน' },
  { id: 'cases', label: 'ผลงานและกรณีศึกษา', shortLabel: 'ผลงาน', description: 'ตัวอย่างงานจริง คลังโครงการ และผลงานออกแบบที่เผยแพร่ได้' },
  { id: 'systems', label: 'ชุมชน แบบฟอร์ม และระบบ', shortLabel: 'ระบบ', description: 'ช่องทางชุมชน แบบฟอร์มรับข้อมูล และระบบสนับสนุนงาน WoL' },
];

const facebookMain = 'https://www.facebook.com/share/1EnjGCsmAy/';
const facebookMetaLearning = 'https://www.facebook.com/share/19RGsPMmhy/';
const facebookThaiPeople = 'https://www.facebook.com/share/1DWxGJxJU9/';
const facebookHeadlineNext = 'https://www.facebook.com/share/1JtS86jKY3/';
const facebookMagicCasters = 'https://www.facebook.com/share/g/1EUNiWCvVV/';

export const resources = [
  {
    id: 'meta-learning',
    title: 'Meta Learning',
    summary: 'สำรวจทฤษฎีการเรียนรู้ ความสัมพันธ์ และข้อจำกัดของแต่ละแนวคิดจากแหล่งอ้างอิง',
    category: 'knowledge', categoryLabel: 'คลังความรู้และประวัติศาสตร์', status: 'live', visibility: 'public', featured: true,
    url: 'https://wollab.github.io/meta-learning/', cover: '/covers/meta-learning.png',
    socialLinks: [{ label: 'Facebook', url: facebookMetaLearning }], tags: ['learning theory', 'ครู', 'นักออกแบบการเรียนรู้'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'thai-people-history', title: 'ประวัติศาสตร์ประชาชนไทย 2460–2560',
    summary: 'อ่านประวัติศาสตร์ไทยผ่านชีวิต การทำงาน การย้ายถิ่น และความทรงจำของผู้คน',
    category: 'knowledge', categoryLabel: 'คลังความรู้และประวัติศาสตร์', status: 'live', visibility: 'public', featured: true,
    url: 'https://wollab.github.io/thai-people-history/', cover: '/covers/thai-people-history.png', socialLinks: [{ label: 'Facebook', url: facebookThaiPeople }], tags: ['ประวัติศาสตร์', 'ความทรงจำ'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'thai-learning-history', title: 'ประวัติศาสตร์การเรียนรู้ไทย',
    summary: 'เส้นเวลาแนวคิด เหตุการณ์ และสถาบันที่ร่วมสร้างประวัติศาสตร์การเรียนรู้ของไทย',
    category: 'knowledge', categoryLabel: 'คลังความรู้และประวัติศาสตร์', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/thai-learning-history/', cover: '/covers/thai-learning-history.png', socialLinks: [], tags: ['การศึกษา', 'timeline'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'thai-justice-memory', title: 'ความทรงจำเรื่องความยุติธรรม',
    summary: 'คลังเหตุการณ์และกรณีศึกษาที่ชวนมองความยุติธรรมผ่านหลักฐานและความทรงจำ',
    category: 'knowledge', categoryLabel: 'คลังความรู้และประวัติศาสตร์', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/thai-justice-memory/', cover: '/covers/thai-justice-memory.png', socialLinks: [{ label: 'Facebook', url: facebookHeadlineNext }], tags: ['justice', 'memory'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'nine-learning-angles', title: '9 Learning Angles',
    summary: 'เครื่องมือสะท้อนบทบาทและมุมมองที่เราใช้เมื่อเรียนรู้ร่วมกับผู้อื่น',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'live', visibility: 'public', featured: true,
    url: 'https://wollab.github.io/WoL_GameLab/9-learning-angles/', cover: '/covers/nine-learning-angles.png', socialLinks: [], tags: ['reflection', 'assessment'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'wizard-hat-v2', title: 'Wizard Hat — คิดเกมเพื่อการเรียนรู้',
    summary: 'เครื่องมือช่วยเปลี่ยนโจทย์การเรียนรู้ให้เป็นแนวคิดเกมและคำถามสำหรับทดลองต่อ',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/WoL_GameLab/wizardhat-v2/', cover: '/covers/wizard-hat-v2.png', socialLinks: [], tags: ['game design', 'learning design'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'wizard-outcome', title: 'Wizard Hat Learning Outcome',
    summary: 'ช่วยตั้งคำถามและตรวจความเชื่อมโยงระหว่างสิ่งที่ผู้เล่นทำกับผลการเรียนรู้ที่ตั้งใจ',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/WizardHat_LearningOutcome/', cover: '/covers/wizard-outcome.png', socialLinks: [], tags: ['learning outcome', 'game design'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'wishlist', title: 'Wishlist Web Game', summary: 'เกมจำลองการจัดลำดับความอยากและทรัพยากรสำหรับผู้เล่นคนเดียว',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/WoL_GameLab/wishlist/', cover: '/covers/wishlist.png', socialLinks: [], tags: ['financial learning', 'game'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'solo-business-profile', title: 'Solo Business Profile', summary: 'แบบประเมินเพื่อสะท้อนสุขภาพธุรกิจของคนทำงานหรือเจ้าของกิจการคนเดียว',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/WoL_GameLab/solo-business-profile/', cover: '/covers/solo-business-profile.png', socialLinks: [], tags: ['business', 'diagnostic'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'sdj-playground', title: 'SDJ Wizard Hat Playground', summary: 'พื้นที่ทดลองแนวคิดเกมด้วย Wizard Hat สำหรับการสำรวจและพัฒนาต้นแบบ',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'maintenance', visibility: 'public',
    url: 'https://wollab.github.io/sdj-wizard-hat-playground/', cover: '/covers/sdj-playground.png', socialLinks: [], tags: ['experiment', 'game design'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'tarot-learning', title: 'Tarot of Learning', summary: 'เครื่องมือชวนสะท้อนประสบการณ์และตั้งคำถามกับการเรียนรู้ของตนเอง',
    category: 'games', categoryLabel: 'เกมและเครื่องมือเรียนรู้', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/WoL_Tarot_of_Learning/', cover: '/covers/tarot-learning.png', socialLinks: [], tags: ['reflection', 'cards'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'product-catalog', title: 'WoL Product Catalog', summary: 'รวมเกมและเครื่องมือของ WoL พร้อมรายละเอียดการใช้งานและช่องทางติดต่อ',
    category: 'products', categoryLabel: 'ผลิตภัณฑ์และคู่มือ', status: 'live', visibility: 'public', featured: true,
    url: 'https://wollab.github.io/wol-product-landing-pages/catalog/', cover: '/covers/product-catalog.png', socialLinks: [], tags: ['catalog', 'products'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'fish-farmer', title: 'เกมปลาหมอคางดำ', summary: 'หน้าข้อมูลเกมและคู่มือชวนคุยต่อหลังเล่นเรื่องระบบนิเวศและชนิดพันธุ์ต่างถิ่น',
    category: 'products', categoryLabel: 'ผลิตภัณฑ์และคู่มือ', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/wol-product-landing-pages/fish-farmer.html', cover: '/covers/fish-farmer.png', socialLinks: [], tags: ['ecology', 'debrief'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'sustainable-farm', title: 'ไร่ยั่งยืน', summary: 'เกมวางแผนทรัพยากรและพื้นที่เพื่อชวนเรียนรู้ระบบเกษตรและการตัดสินใจร่วมกัน',
    category: 'products', categoryLabel: 'ผลิตภัณฑ์และคู่มือ', status: 'live', visibility: 'public',
    url: 'https://wollab.github.io/wol-product-landing-pages/sustainable-farm.html', cover: '/covers/sustainable-farm.png', socialLinks: [], tags: ['sustainable farm', 'product'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'wol-case', title: 'WoL Case Library', summary: 'คลังกรณีศึกษาการออกแบบเกมและกระบวนการเรียนรู้จากงานจริงของ WoL',
    category: 'cases', categoryLabel: 'ผลงานและกรณีศึกษา', status: 'live', visibility: 'public', featured: true,
    url: 'https://wollab.github.io/WoLCase/', cover: '/covers/wol-case.png', socialLinks: [], tags: ['case study', 'portfolio'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'design-commons', title: 'Board Game Design Commons', summary: 'พื้นที่เปิดสำหรับค้นหา ส่ง และต่อยอดผลงานออกแบบบอร์ดเกมพร้อมเครดิตผู้สร้าง',
    category: 'cases', categoryLabel: 'ผลงานและกรณีศึกษา', status: 'pilot', visibility: 'public',
    url: 'https://wollab.github.io/board-game-design-commons/', cover: '/covers/design-commons.png', socialLinks: [], tags: ['commons', 'open design'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'wol-main', title: 'Wizards of Learning', summary: 'เว็บไซต์หลักของสตูดิโอ Game for Social Impact และบทความจากงานของ WoL',
    category: 'systems', categoryLabel: 'ชุมชน แบบฟอร์ม และระบบ', status: 'live', visibility: 'public',
    url: 'https://wizardsoflearning.com/', cover: '/covers/wol-main.png', socialLinks: [{ label: 'Facebook', url: facebookMain }], tags: ['company', 'blog'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'follower-intake', title: 'รับไอเดียเกมเพื่อการเรียนรู้จาก WoL', summary: 'แบบฟอร์มกลางสำหรับผู้ที่ต้องการส่งไอเดียหรือรับข้อมูลกิจกรรมที่เกี่ยวข้อง',
    category: 'systems', categoryLabel: 'ชุมชน แบบฟอร์ม และระบบ', status: 'live', visibility: 'public',
    url: 'https://forms.gle/WRbLVdydAXNhKpvo9', cover: '/covers/follower-intake.png', socialLinks: [], tags: ['google form', 'intake'], lastVerifiedAt: '2026-09-20',
  },
  {
    id: 'magic-casters', title: 'Magic Casters', summary: 'ชุมชนสำหรับคนออกแบบเกมเพื่อการเรียนรู้ แลกวิธีคิด feedback และบทเรียนจากการ playtest',
    category: 'systems', categoryLabel: 'ชุมชน แบบฟอร์ม และระบบ', status: 'live', visibility: 'public',
    url: facebookMagicCasters, cover: '/covers/magic-casters.png', socialLinks: [{ label: 'Facebook Group', url: facebookMagicCasters }], tags: ['community', 'game design'], lastVerifiedAt: '2026-09-21',
  },
  {
    id: 'facilitator-observation', title: 'แบบสังเกตสำหรับกระบวนกร', summary: 'แบบฟอร์มบันทึกหลักฐานหลังการใช้กิจกรรม สำหรับทีม WoL และผู้ได้รับมอบหมาย',
    category: 'systems', categoryLabel: 'ชุมชน แบบฟอร์ม และระบบ', status: 'internal', visibility: 'private',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeMoQllCuI2xkMPyVI8fLHBNVAuA38GCG6rtnQz3RUjlh2PpA/viewform', cover: '/covers/facilitator-observation.png', socialLinks: [], tags: ['google form', 'impact evidence'], lastVerifiedAt: '2026-09-20',
  },
];

const projectUpdates = {
  'meta-learning': {
    updateStatus: 'confirmed', updatedAt: '2026-09-20',
    milestone: 'เผยแพร่ content batch แรกหลังผ่าน Chief review',
    nextStep: 'จัดวันใหม่ให้ ML-01–03 และตรวจ CTA/ภาพก่อนเผยแพร่',
    needs: 'Chief เลือกว่า ML-01 จะพาไปหน้า Compare โดยตรงหรือหน้าแรก',
  },
  'thai-people-history': {
    updateStatus: 'confirmed', updatedAt: '2026-09-20',
    milestone: 'เผยแพร่โพสต์เนื้อหาใหม่ต่อจากโพสต์เปิดตัวและ how-to',
    nextStep: 'ตรวจ PH-01–03 แล้วจัดลำดับวันเผยแพร่ใหม่',
    needs: 'Chief ยืนยันชื่อเพจบนภาพและตรวจข้อความ/สิทธิภาพประกอบ',
  },
  'thai-learning-history': {
    updateStatus: 'needs-input', updatedAt: '2026-09-21',
    milestone: 'ยังไม่มี milestone ล่าสุดที่ยืนยันใน WoL Lab',
    nextStep: 'ตรวจ checkpoint และเลือกหัวข้อหรือช่วงเวลาที่จะพัฒนาต่อ',
    needs: 'Chief ระบุเป้าหมายรอบถัดไป 1 ประโยค หรือชี้ไฟล์แผนล่าสุด',
  },
  'thai-justice-memory': {
    updateStatus: 'proposed', updatedAt: '2026-09-20',
    milestone: 'เริ่ม content series แรกของ “ต่อจากพาดหัว” หลังโพสต์เปิดตัว',
    nextStep: 'เลือก 2–3 คดีที่หลักฐานครบและออกแบบโพสต์แบบ case follow-up',
    needs: 'Chief เลือกคดีเริ่มต้นและกลุ่มผู้อ่านหลัก',
  },
  'nine-learning-angles': {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'ได้หลักฐานการใช้งานจริงหนึ่งรอบเพื่อประเมินความชัดเจน',
    nextStep: 'เก็บ feedback จากผู้ใช้และบันทึกจุดที่ตีความมุมทั้ง 9 ไม่ตรงกัน',
    needs: 'วัน/กลุ่มที่จะทดลองใช้ครั้งถัดไป หรือ feedback ที่มีอยู่แล้ว',
  },
  'wizard-hat-v2': {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'ตรวจ flow สร้างไอเดียและ lead capture จากการใช้งานจริง',
    nextStep: 'ทดสอบหนึ่ง use case ตั้งแต่เริ่มโจทย์จนถึง CTA แล้วบันทึก friction',
    needs: 'ตัวอย่างโจทย์จริงหนึ่งเรื่องและผู้ใช้ทดสอบหนึ่งกลุ่ม',
  },
  'wizard-outcome': {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'ยืนยันว่าเครื่องมือช่วยตรวจ action → demand → learning interpretation ได้ในงานจริง',
    nextStep: 'ทดลองกับเกม WoL หนึ่งเกมและเก็บจุดที่คำถามยังคลุมเครือ',
    needs: 'Chief เลือกเกมที่จะใช้เป็นกรณีทดสอบ',
  },
  wishlist: {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'ได้ feedback จากการเล่นเดี่ยวและตัดสินใจขอบเขตการพัฒนารอบถัดไป',
    nextStep: 'รวบรวมปัญหาจากผู้เล่นและแยก gameplay issue ออกจากคำอธิบายไม่ชัด',
    needs: 'บันทึก playtest หรือความเห็นผู้เล่นล่าสุด',
  },
  'solo-business-profile': {
    updateStatus: 'confirmed', updatedAt: '2026-09-10',
    milestone: 'ติดตาม lead และเชื่อมผลประเมินกับ CRM อย่างตรวจสอบได้',
    nextStep: 'ตรวจรายการตอบล่าสุดและดูว่าข้อมูลเข้า Sheet/CRM ครบหรือไม่',
    needs: 'สถานะ lead ล่าสุดหรือปัญหาที่พบจากการใช้งานจริง',
  },
  'sdj-playground': {
    updateStatus: 'confirmed', updatedAt: '2026-09-10',
    milestone: 'Hold / Maintenance จนกว่าจะมี use case ใหม่',
    nextStep: 'แก้เฉพาะ defect ที่กระทบการใช้งานปัจจุบัน',
    needs: 'ไม่ต้องส่งข้อมูลเพิ่ม เว้นแต่พบ bug หรือมีโจทย์ใช้งานใหม่',
  },
  'tarot-learning': {
    updateStatus: 'needs-input', updatedAt: '2026-09-21',
    milestone: 'ยังไม่มี milestone ล่าสุดที่ยืนยันใน WoL Lab',
    nextStep: 'ตรวจสถานะเวอร์ชัน public และตัดสินใจว่าจะพัฒนาคู่มือหรือ content ต่อ',
    needs: 'Chief ระบุเป้าหมายรอบถัดไปหรือ feedback ผู้ใช้ล่าสุด',
  },
  'product-catalog': {
    updateStatus: 'confirmed', updatedAt: '2026-09-16',
    milestone: 'ขยาย catalog ด้วยข้อมูลผลงานที่ public-safe และเครดิตครบ',
    nextStep: 'ปิด contributor roles และสิทธิภาพของผลิตภัณฑ์ปัจจุบันก่อนเพิ่มรายการ',
    needs: 'ชื่อ/บทบาทผู้ร่วมงานและการยืนยันสิทธิภาพใช้งานที่ยังขาด',
  },
  'fish-farmer': {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'หน้า product และ debrief guide ใช้ข้อมูลสินค้า/CTA ชุดเดียวกัน',
    nextStep: 'ตรวจสเปก ราคา ช่องทางซื้อ และลิงก์คู่มือล่าสุดร่วมกัน',
    needs: 'ข้อมูลสินค้าและ CTA ล่าสุดจาก Chief หรือทีมขาย',
  },
  'sustainable-farm': {
    updateStatus: 'confirmed', updatedAt: '2026-09-01',
    milestone: 'อัปเดตหน้าให้ตรงสเปก 2–5 คน / 30 นาที / อายุ 8+ / 4 รอบ',
    nextStep: 'แก้ข้อมูลหน้า product แล้วตรวจข้อความผลการเรียนรู้ก่อนเผยแพร่',
    needs: 'Chief ยืนยันราคา CTA และภาพสินค้าชุดล่าสุด',
  },
  'wol-case': {
    updateStatus: 'confirmed', updatedAt: '2026-09-16',
    milestone: 'เตรียม 14 case ที่ public-safe สำหรับรอบเผยแพร่ถัดไป',
    nextStep: 'ตรวจเครดิต หลักฐาน claim และสิทธิภาพของแต่ละ case',
    needs: 'ชื่อ contributor และการอนุญาตใช้ภาพที่ยังไม่ครบ',
  },
  'design-commons': {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'ทดสอบ pilot submission และระบบเครดิตกับผลงานจริง',
    nextStep: 'นำเข้าตัวอย่างหนึ่งรายการและตรวจขั้นตอนส่ง–review–เผยแพร่',
    needs: 'ผลงานนำร่องหนึ่งชิ้นและผู้ถือสิทธิ/เครดิตที่ยืนยันแล้ว',
  },
  'wol-main': {
    updateStatus: 'proposed', updatedAt: '2026-09-15',
    milestone: 'เผยแพร่บทความ WordPress หนึ่งชิ้นพร้อมภาพและ Facebook caption',
    nextStep: 'เลือกหนึ่งในสาม WoL Hub ideas แล้วผลิตบทความฉบับเต็ม',
    needs: 'Chief เลือกหัวข้อแรกและ CTA ที่ต้องการ',
  },
  'follower-intake': {
    updateStatus: 'confirmed', updatedAt: '2026-07-10',
    milestone: 'ใช้เป็น intake กลางและส่งข้อมูลเข้า Audience CRM ได้ต่อเนื่อง',
    nextStep: 'ตรวจ response ใหม่เป็นรอบและยืนยันว่า consent/ช่องทางติดต่อครบ',
    needs: 'ไม่ต้องส่งข้อมูลเพิ่ม เว้นแต่พบ response ไม่เข้า CRM หรืออยากแก้คำถาม',
  },
  'magic-casters': {
    updateStatus: 'confirmed', updatedAt: '2026-09-21',
    milestone: 'ใช้ภาพปก Magic Casters ที่ Chief ยืนยันแล้ว และเดิน content ต่อจาก relaunch',
    nextStep: 'ตรวจร่าง MC-01–03 แล้วจัดลำดับโพสต์และวันเผยแพร่',
    needs: 'Chief ตรวจร่าง MC-01–03 และตอบคำถามเรื่องตัวเลข/สิทธิภาพก่อนจัดวันเผยแพร่',
  },
  'facilitator-observation': {
    updateStatus: 'proposed', updatedAt: '2026-09-21',
    milestone: 'ทดลองแบบฟอร์มในกิจกรรมจริงหนึ่งรอบและตรวจว่าหลักฐานนำไปใช้ต่อได้',
    nextStep: 'กำหนดผู้เก็บข้อมูลและทดสอบ flow หลังจบกิจกรรม',
    needs: 'กิจกรรมทดลองครั้งถัดไปและชื่อผู้รับผิดชอบเก็บข้อมูล',
  },
};

for (const resource of resources) {
  Object.assign(resource, projectUpdates[resource.id] || {
    updateStatus: 'needs-input', updatedAt: '2026-09-21',
    milestone: 'ยังไม่มี milestone ล่าสุดที่ยืนยันใน WoL Lab',
    nextStep: 'ตรวจ project checkpoint ก่อนกำหนดงานต่อ',
    needs: 'Chief ระบุเป้าหมายรอบถัดไปหรือชี้ไฟล์แผนล่าสุด',
  });
}

export const adminSeed = [
  { id: 'lt-experiential', title: 'การเรียนรู้แบบลงมือทำ', summary: 'เรียนรู้จากประสบการณ์จริง ผ่านการลงมือปฏิบัติ สะท้อนคิด และนำไปประยุกต์ใช้', status: 'draft', content: 'การเรียนรู้แบบลงมือทำ เริ่มจากประสบการณ์จริงและการสะท้อนคิดอย่างมีโครงสร้าง', sources: 'Kolb, D. A. (1984). Experiential Learning.', claimBoundary: 'ใช้เพื่ออธิบายกรอบแนวคิด ไม่อ้างว่ารูปแบบเดียวเหมาะกับผู้เรียนทุกคน' },
  { id: 'lt-active', title: 'การเรียนรู้แบบมีส่วนร่วม', summary: 'ผู้เรียนมีส่วนร่วมกับโจทย์ การตัดสินใจ และเพื่อนร่วมวง', status: 'published', content: 'Active Learning ครอบคลุมวิธีการหลายแบบและต้องออกแบบให้เหมาะกับเป้าหมาย', sources: 'Freeman et al. (2014).', claimBoundary: 'ไม่สรุปว่าทุกกิจกรรมที่ผู้เรียนขยับตัวคือ Active Learning' },
  { id: 'lt-socratic', title: 'การสืบค้นแบบโสเครตีส', summary: 'ใช้คำถามเพื่อเปิดเหตุผล สมมติฐาน และข้อโต้แย้ง', status: 'published', content: 'คุณภาพของวงสนทนาขึ้นกับคำถาม ความปลอดภัย และพื้นความรู้', sources: 'Stanford Encyclopedia of Philosophy.', claimBoundary: 'ไม่ใช้เป็นสูตรถามต่อเนื่องเพื่อจับผิดผู้เรียน' },
  { id: 'lt-growth', title: 'แนวคิดการเติบโต', summary: 'ความเชื่อเกี่ยวกับการพัฒนาความสามารถและบทบาทของการตอบกลับ', status: 'draft', content: 'Growth mindset ต้องอ่านร่วมกับบริบท การสอน และโอกาสที่ผู้เรียนได้รับ', sources: 'Dweck, C. S.', claimBoundary: 'ไม่กล่าวโทษผู้เรียนหรือสรุปว่าความเชื่ออย่างเดียวเปลี่ยนผลลัพธ์ได้' },
];

