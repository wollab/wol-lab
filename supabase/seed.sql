-- Generated from src/resources.js and src/adminSites.js.
-- Re-run npm run generate:seed after changing canonical seed data.

insert into public.resources
  (id, title, summary, category, category_label, status, visibility, canonical_url, cover_url, social_links, tags, featured, milestone, next_step, needs, update_status, reviewed_at, last_verified_at)
values
(
  'meta-learning', 'Meta Learning', 'สำรวจทฤษฎีการเรียนรู้ ความสัมพันธ์ และข้อจำกัดของแต่ละแนวคิดจากแหล่งอ้างอิง', 'knowledge', 'คลังความรู้และประวัติศาสตร์',
  'live', 'public', 'https://wollab.github.io/meta-learning/', '/covers/meta-learning.png', '[{"label":"Facebook","url":"https://www.facebook.com/share/19RGsPMmhy/"}]'::jsonb,
  array['learning theory','ครู','นักออกแบบการเรียนรู้']::text[], true, 'เผยแพร่ content batch แรกหลังผ่าน Chief review', 'จัดวันใหม่ให้ ML-01–03 และตรวจ CTA/ภาพก่อนเผยแพร่', 'Chief เลือกว่า ML-01 จะพาไปหน้า Compare โดยตรงหรือหน้าแรก',
  'confirmed', '2026-09-20'::date, '2026-09-20'::date
),
(
  'thai-people-history', 'ประวัติศาสตร์ประชาชนไทย 2460–2560', 'อ่านประวัติศาสตร์ไทยผ่านชีวิต การทำงาน การย้ายถิ่น และความทรงจำของผู้คน', 'knowledge', 'คลังความรู้และประวัติศาสตร์',
  'live', 'public', 'https://wollab.github.io/thai-people-history/', '/covers/thai-people-history.png', '[{"label":"Facebook","url":"https://www.facebook.com/share/1DWxGJxJU9/"}]'::jsonb,
  array['ประวัติศาสตร์','ความทรงจำ']::text[], true, 'เผยแพร่โพสต์เนื้อหาใหม่ต่อจากโพสต์เปิดตัวและ how-to', 'ตรวจ PH-01–03 แล้วจัดลำดับวันเผยแพร่ใหม่', 'Chief ยืนยันชื่อเพจบนภาพและตรวจข้อความ/สิทธิภาพประกอบ',
  'confirmed', '2026-09-20'::date, '2026-09-20'::date
),
(
  'thai-learning-history', 'ประวัติศาสตร์การเรียนรู้ไทย', 'เส้นเวลาแนวคิด เหตุการณ์ และสถาบันที่ร่วมสร้างประวัติศาสตร์การเรียนรู้ของไทย', 'knowledge', 'คลังความรู้และประวัติศาสตร์',
  'live', 'public', 'https://wollab.github.io/thai-learning-history/', '/covers/thai-learning-history.png', '[]'::jsonb,
  array['การศึกษา','timeline']::text[], false, 'ยังไม่มี milestone ล่าสุดที่ยืนยันใน WoL Lab', 'ตรวจ checkpoint และเลือกหัวข้อหรือช่วงเวลาที่จะพัฒนาต่อ', 'Chief ระบุเป้าหมายรอบถัดไป 1 ประโยค หรือชี้ไฟล์แผนล่าสุด',
  'needs-input', '2026-09-21'::date, '2026-09-20'::date
),
(
  'thai-justice-memory', 'ความทรงจำเรื่องความยุติธรรม', 'คลังเหตุการณ์และกรณีศึกษาที่ชวนมองความยุติธรรมผ่านหลักฐานและความทรงจำ', 'knowledge', 'คลังความรู้และประวัติศาสตร์',
  'live', 'public', 'https://wollab.github.io/thai-justice-memory/', '/covers/thai-justice-memory.png', '[{"label":"Facebook","url":"https://www.facebook.com/share/1JtS86jKY3/"}]'::jsonb,
  array['justice','memory']::text[], false, 'เริ่ม content series แรกของ “ต่อจากพาดหัว” หลังโพสต์เปิดตัว', 'เลือก 2–3 คดีที่หลักฐานครบและออกแบบโพสต์แบบ case follow-up', 'Chief เลือกคดีเริ่มต้นและกลุ่มผู้อ่านหลัก',
  'proposed', '2026-09-20'::date, '2026-09-20'::date
),
(
  'nine-learning-angles', '9 Learning Angles', 'เครื่องมือสะท้อนบทบาทและมุมมองที่เราใช้เมื่อเรียนรู้ร่วมกับผู้อื่น', 'games', 'เกมและเครื่องมือเรียนรู้',
  'live', 'public', 'https://wollab.github.io/WoL_GameLab/9-learning-angles/', '/covers/nine-learning-angles.png', '[]'::jsonb,
  array['reflection','assessment']::text[], true, 'ได้หลักฐานการใช้งานจริงหนึ่งรอบเพื่อประเมินความชัดเจน', 'เก็บ feedback จากผู้ใช้และบันทึกจุดที่ตีความมุมทั้ง 9 ไม่ตรงกัน', 'วัน/กลุ่มที่จะทดลองใช้ครั้งถัดไป หรือ feedback ที่มีอยู่แล้ว',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
),
(
  'wizard-hat-v2', 'Wizard Hat — คิดเกมเพื่อการเรียนรู้', 'เครื่องมือช่วยเปลี่ยนโจทย์การเรียนรู้ให้เป็นแนวคิดเกมและคำถามสำหรับทดลองต่อ', 'games', 'เกมและเครื่องมือเรียนรู้',
  'live', 'public', 'https://wollab.github.io/WoL_GameLab/wizardhat-v2/', '/covers/wizard-hat-v2.png', '[]'::jsonb,
  array['game design','learning design']::text[], false, 'ตรวจ flow สร้างไอเดียและ lead capture จากการใช้งานจริง', 'ทดสอบหนึ่ง use case ตั้งแต่เริ่มโจทย์จนถึง CTA แล้วบันทึก friction', 'ตัวอย่างโจทย์จริงหนึ่งเรื่องและผู้ใช้ทดสอบหนึ่งกลุ่ม',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
),
(
  'wizard-outcome', 'Wizard Hat Learning Outcome', 'ช่วยตั้งคำถามและตรวจความเชื่อมโยงระหว่างสิ่งที่ผู้เล่นทำกับผลการเรียนรู้ที่ตั้งใจ', 'games', 'เกมและเครื่องมือเรียนรู้',
  'live', 'public', 'https://wollab.github.io/WizardHat_LearningOutcome/', '/covers/wizard-outcome.png', '[]'::jsonb,
  array['learning outcome','game design']::text[], false, 'ยืนยันว่าเครื่องมือช่วยตรวจ action → demand → learning interpretation ได้ในงานจริง', 'ทดลองกับเกม WoL หนึ่งเกมและเก็บจุดที่คำถามยังคลุมเครือ', 'Chief เลือกเกมที่จะใช้เป็นกรณีทดสอบ',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
),
(
  'wishlist', 'Wishlist Web Game', 'เกมจำลองการจัดลำดับความอยากและทรัพยากรสำหรับผู้เล่นคนเดียว', 'games', 'เกมและเครื่องมือเรียนรู้',
  'live', 'public', 'https://wollab.github.io/WoL_GameLab/wishlist/', '/covers/wishlist.png', '[]'::jsonb,
  array['financial learning','game']::text[], false, 'ได้ feedback จากการเล่นเดี่ยวและตัดสินใจขอบเขตการพัฒนารอบถัดไป', 'รวบรวมปัญหาจากผู้เล่นและแยก gameplay issue ออกจากคำอธิบายไม่ชัด', 'บันทึก playtest หรือความเห็นผู้เล่นล่าสุด',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
),
(
  'solo-business-profile', 'Solo Business Profile', 'แบบประเมินเพื่อสะท้อนสุขภาพธุรกิจของคนทำงานหรือเจ้าของกิจการคนเดียว', 'games', 'เกมและเครื่องมือเรียนรู้',
  'live', 'public', 'https://wollab.github.io/WoL_GameLab/solo-business-profile/', '/covers/solo-business-profile.png', '[]'::jsonb,
  array['business','diagnostic']::text[], false, 'ติดตาม lead และเชื่อมผลประเมินกับ CRM อย่างตรวจสอบได้', 'ตรวจรายการตอบล่าสุดและดูว่าข้อมูลเข้า Sheet/CRM ครบหรือไม่', 'สถานะ lead ล่าสุดหรือปัญหาที่พบจากการใช้งานจริง',
  'confirmed', '2026-09-10'::date, '2026-09-20'::date
),
(
  'sdj-playground', 'SDJ Wizard Hat Playground', 'พื้นที่ทดลองแนวคิดเกมด้วย Wizard Hat สำหรับการสำรวจและพัฒนาต้นแบบ', 'games', 'เกมและเครื่องมือเรียนรู้',
  'maintenance', 'public', 'https://wollab.github.io/sdj-wizard-hat-playground/', '/covers/sdj-playground.png', '[]'::jsonb,
  array['experiment','game design']::text[], false, 'Hold / Maintenance จนกว่าจะมี use case ใหม่', 'แก้เฉพาะ defect ที่กระทบการใช้งานปัจจุบัน', 'ไม่ต้องส่งข้อมูลเพิ่ม เว้นแต่พบ bug หรือมีโจทย์ใช้งานใหม่',
  'confirmed', '2026-09-10'::date, '2026-09-20'::date
),
(
  'tarot-learning', 'Tarot of Learning', 'เครื่องมือชวนสะท้อนประสบการณ์และตั้งคำถามกับการเรียนรู้ของตนเอง', 'games', 'เกมและเครื่องมือเรียนรู้',
  'live', 'public', 'https://wollab.github.io/WoL_Tarot_of_Learning/', '/covers/tarot-learning.png', '[]'::jsonb,
  array['reflection','cards']::text[], false, 'ยังไม่มี milestone ล่าสุดที่ยืนยันใน WoL Lab', 'ตรวจสถานะเวอร์ชัน public และตัดสินใจว่าจะพัฒนาคู่มือหรือ content ต่อ', 'Chief ระบุเป้าหมายรอบถัดไปหรือ feedback ผู้ใช้ล่าสุด',
  'needs-input', '2026-09-21'::date, '2026-09-20'::date
),
(
  'product-catalog', 'WoL Product Catalog', 'รวมเกมและเครื่องมือของ WoL พร้อมรายละเอียดการใช้งานและช่องทางติดต่อ', 'products', 'ผลิตภัณฑ์และคู่มือ',
  'live', 'public', 'https://wollab.github.io/wol-product-landing-pages/catalog/', '/covers/product-catalog.png', '[]'::jsonb,
  array['catalog','products']::text[], true, 'ขยาย catalog ด้วยข้อมูลผลงานที่ public-safe และเครดิตครบ', 'ปิด contributor roles และสิทธิภาพของผลิตภัณฑ์ปัจจุบันก่อนเพิ่มรายการ', 'ชื่อ/บทบาทผู้ร่วมงานและการยืนยันสิทธิภาพใช้งานที่ยังขาด',
  'confirmed', '2026-09-16'::date, '2026-09-20'::date
),
(
  'fish-farmer', 'เกมปลาหมอคางดำ', 'หน้าข้อมูลเกมและคู่มือชวนคุยต่อหลังเล่นเรื่องระบบนิเวศและชนิดพันธุ์ต่างถิ่น', 'products', 'ผลิตภัณฑ์และคู่มือ',
  'live', 'public', 'https://wollab.github.io/wol-product-landing-pages/fish-farmer.html', '/covers/fish-farmer.png', '[]'::jsonb,
  array['ecology','debrief']::text[], false, 'หน้า product และ debrief guide ใช้ข้อมูลสินค้า/CTA ชุดเดียวกัน', 'ตรวจสเปก ราคา ช่องทางซื้อ และลิงก์คู่มือล่าสุดร่วมกัน', 'ข้อมูลสินค้าและ CTA ล่าสุดจาก Chief หรือทีมขาย',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
),
(
  'sustainable-farm', 'ไร่ยั่งยืน', 'เกมวางแผนทรัพยากรและพื้นที่เพื่อชวนเรียนรู้ระบบเกษตรและการตัดสินใจร่วมกัน', 'products', 'ผลิตภัณฑ์และคู่มือ',
  'live', 'public', 'https://wollab.github.io/wol-product-landing-pages/sustainable-farm.html', '/covers/sustainable-farm.png', '[]'::jsonb,
  array['sustainable farm','product']::text[], false, 'อัปเดตหน้าให้ตรงสเปก 2–5 คน / 30 นาที / อายุ 8+ / 4 รอบ', 'แก้ข้อมูลหน้า product แล้วตรวจข้อความผลการเรียนรู้ก่อนเผยแพร่', 'Chief ยืนยันราคา CTA และภาพสินค้าชุดล่าสุด',
  'confirmed', '2026-09-01'::date, '2026-09-20'::date
),
(
  'wol-case', 'WoL Case Library', 'คลังกรณีศึกษาการออกแบบเกมและกระบวนการเรียนรู้จากงานจริงของ WoL', 'cases', 'ผลงานและกรณีศึกษา',
  'live', 'public', 'https://wollab.github.io/WoLCase/', '/covers/wol-case.png', '[]'::jsonb,
  array['case study','portfolio']::text[], true, 'เตรียม 14 case ที่ public-safe สำหรับรอบเผยแพร่ถัดไป', 'ตรวจเครดิต หลักฐาน claim และสิทธิภาพของแต่ละ case', 'ชื่อ contributor และการอนุญาตใช้ภาพที่ยังไม่ครบ',
  'confirmed', '2026-09-16'::date, '2026-09-20'::date
),
(
  'design-commons', 'Board Game Design Commons', 'พื้นที่เปิดสำหรับค้นหา ส่ง และต่อยอดผลงานออกแบบบอร์ดเกมพร้อมเครดิตผู้สร้าง', 'cases', 'ผลงานและกรณีศึกษา',
  'pilot', 'public', 'https://wollab.github.io/board-game-design-commons/', '/covers/design-commons.png', '[]'::jsonb,
  array['commons','open design']::text[], false, 'ทดสอบ pilot submission และระบบเครดิตกับผลงานจริง', 'นำเข้าตัวอย่างหนึ่งรายการและตรวจขั้นตอนส่ง–review–เผยแพร่', 'ผลงานนำร่องหนึ่งชิ้นและผู้ถือสิทธิ/เครดิตที่ยืนยันแล้ว',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
),
(
  'wol-main', 'Wizards of Learning', 'เว็บไซต์หลักของสตูดิโอ Game for Social Impact และบทความจากงานของ WoL', 'systems', 'ชุมชน แบบฟอร์ม และระบบ',
  'live', 'public', 'https://wizardsoflearning.com/', '/covers/wol-main.png', '[{"label":"Facebook","url":"https://www.facebook.com/share/1EnjGCsmAy/"}]'::jsonb,
  array['company','blog']::text[], false, 'เผยแพร่บทความ WordPress หนึ่งชิ้นพร้อมภาพและ Facebook caption', 'เลือกหนึ่งในสาม WoL Hub ideas แล้วผลิตบทความฉบับเต็ม', 'Chief เลือกหัวข้อแรกและ CTA ที่ต้องการ',
  'proposed', '2026-09-15'::date, '2026-09-20'::date
),
(
  'follower-intake', 'รับไอเดียเกมเพื่อการเรียนรู้จาก WoL', 'แบบฟอร์มกลางสำหรับผู้ที่ต้องการส่งไอเดียหรือรับข้อมูลกิจกรรมที่เกี่ยวข้อง', 'systems', 'ชุมชน แบบฟอร์ม และระบบ',
  'live', 'public', 'https://forms.gle/WRbLVdydAXNhKpvo9', '/covers/follower-intake.png', '[]'::jsonb,
  array['google form','intake']::text[], false, 'ใช้เป็น intake กลางและส่งข้อมูลเข้า Audience CRM ได้ต่อเนื่อง', 'ตรวจ response ใหม่เป็นรอบและยืนยันว่า consent/ช่องทางติดต่อครบ', 'ไม่ต้องส่งข้อมูลเพิ่ม เว้นแต่พบ response ไม่เข้า CRM หรืออยากแก้คำถาม',
  'confirmed', '2026-07-10'::date, '2026-09-20'::date
),
(
  'magic-casters', 'Magic Casters', 'ชุมชนสำหรับคนออกแบบเกมเพื่อการเรียนรู้ แลกวิธีคิด feedback และบทเรียนจากการ playtest', 'systems', 'ชุมชน แบบฟอร์ม และระบบ',
  'live', 'public', 'https://www.facebook.com/share/g/1EUNiWCvVV/', '/covers/magic-casters.png', '[{"label":"Facebook Group","url":"https://www.facebook.com/share/g/1EUNiWCvVV/"}]'::jsonb,
  array['community','game design']::text[], false, 'ใช้ภาพปก Magic Casters ที่ Chief ยืนยันแล้ว และเดิน content ต่อจาก relaunch', 'ตรวจร่าง MC-01–03 แล้วจัดลำดับโพสต์และวันเผยแพร่', 'Chief ตรวจร่าง MC-01–03 และตอบคำถามเรื่องตัวเลข/สิทธิภาพก่อนจัดวันเผยแพร่',
  'confirmed', '2026-09-21'::date, '2026-09-21'::date
),
(
  'facilitator-observation', 'แบบสังเกตสำหรับกระบวนกร', 'แบบฟอร์มบันทึกหลักฐานหลังการใช้กิจกรรม สำหรับทีม WoL และผู้ได้รับมอบหมาย', 'systems', 'ชุมชน แบบฟอร์ม และระบบ',
  'internal', 'private', 'https://docs.google.com/forms/d/e/1FAIpQLSeMoQllCuI2xkMPyVI8fLHBNVAuA38GCG6rtnQz3RUjlh2PpA/viewform', '/covers/facilitator-observation.png', '[]'::jsonb,
  array['google form','impact evidence']::text[], false, 'ทดลองแบบฟอร์มในกิจกรรมจริงหนึ่งรอบและตรวจว่าหลักฐานนำไปใช้ต่อได้', 'กำหนดผู้เก็บข้อมูลและทดสอบ flow หลังจบกิจกรรม', 'กิจกรรมทดลองครั้งถัดไปและชื่อผู้รับผิดชอบเก็บข้อมูล',
  'proposed', '2026-09-21'::date, '2026-09-20'::date
)
on conflict (id) do update set
  title = excluded.title, summary = excluded.summary, category = excluded.category, category_label = excluded.category_label,
  status = excluded.status, visibility = excluded.visibility, canonical_url = excluded.canonical_url, cover_url = excluded.cover_url,
  social_links = excluded.social_links, tags = excluded.tags, featured = excluded.featured, milestone = excluded.milestone,
  next_step = excluded.next_step, needs = excluded.needs, update_status = excluded.update_status,
  reviewed_at = excluded.reviewed_at, last_verified_at = excluded.last_verified_at, updated_at = now();

insert into public.content_items (site_id, content_type, slug, title, fields, status)
values
('meta-learning', 'entry', 'lt-experiential', 'การเรียนรู้แบบลงมือทำ', '{"summary":"เรียนรู้จากประสบการณ์จริง ผ่านการลงมือปฏิบัติ สะท้อนคิด และนำไปประยุกต์ใช้","content":"การเรียนรู้แบบลงมือทำ เริ่มจากประสบการณ์จริงและการสะท้อนคิดอย่างมีโครงสร้าง","sources":"Kolb, D. A. (1984). Experiential Learning.","claimBoundary":"ใช้เพื่ออธิบายกรอบแนวคิด ไม่อ้างว่ารูปแบบเดียวเหมาะกับผู้เรียนทุกคน"}'::jsonb, 'draft'),
('meta-learning', 'entry', 'lt-active', 'การเรียนรู้แบบมีส่วนร่วม', '{"summary":"ผู้เรียนมีส่วนร่วมกับโจทย์ การตัดสินใจ และเพื่อนร่วมวง","content":"Active Learning ครอบคลุมวิธีการหลายแบบและต้องออกแบบให้เหมาะกับเป้าหมาย","sources":"Freeman et al. (2014).","claimBoundary":"ไม่สรุปว่าทุกกิจกรรมที่ผู้เรียนขยับตัวคือ Active Learning"}'::jsonb, 'published'),
('meta-learning', 'entry', 'lt-socratic', 'การสืบค้นแบบโสเครตีส', '{"summary":"ใช้คำถามเพื่อเปิดเหตุผล สมมติฐาน และข้อโต้แย้ง","content":"คุณภาพของวงสนทนาขึ้นกับคำถาม ความปลอดภัย และพื้นความรู้","sources":"Stanford Encyclopedia of Philosophy.","claimBoundary":"ไม่ใช้เป็นสูตรถามต่อเนื่องเพื่อจับผิดผู้เรียน"}'::jsonb, 'published'),
('meta-learning', 'entry', 'lt-growth', 'แนวคิดการเติบโต', '{"summary":"ความเชื่อเกี่ยวกับการพัฒนาความสามารถและบทบาทของการตอบกลับ","content":"Growth mindset ต้องอ่านร่วมกับบริบท การสอน และโอกาสที่ผู้เรียนได้รับ","sources":"Dweck, C. S.","claimBoundary":"ไม่กล่าวโทษผู้เรียนหรือสรุปว่าความเชื่ออย่างเดียวเปลี่ยนผลลัพธ์ได้"}'::jsonb, 'draft'),
('thai-people-history', 'entry', 'roads-migration', 'ถนนอีสานกับการย้ายถิ่น', '{"period":"ทศวรรษ 2500","summary":"ถนนเชื่อมตลาดและบริการ พร้อมเปลี่ยนเส้นทางการทำงานของหลายครอบครัว","content":"อ่านการเปลี่ยนแปลงของถนนร่วมกับตลาด บริการรัฐ และการย้ายถิ่น โดยแยกประสบการณ์ของแต่ละพื้นที่","sources":"World Bank roads case และเอกสารใน canonical source list","claimBoundary":"ไม่สรุปว่าถนนเป็นสาเหตุเดียว และไม่เหมารวมประสบการณ์ทุกพื้นที่"}'::jsonb, 'published'),
('thai-people-history', 'entry', 'universal-health', 'สิทธิรักษาพยาบาลกับชีวิตประจำวัน', '{"period":"พ.ศ. 2545 เป็นต้นมา","summary":"นโยบายระดับประเทศเดินทางผ่านโรงพยาบาล บุคลากร และระบบส่งต่อ","content":"เชื่อมการเปลี่ยนแปลงเชิงนโยบายกับประสบการณ์ใช้บริการใกล้บ้าน","sources":"WHO, NHSO และงานศึกษาระบบสุขภาพ","claimBoundary":"ไม่ใช้ประสบการณ์หนึ่งแทนภาพรวมประเทศ และไม่ขอข้อมูลสุขภาพส่วนบุคคล"}'::jsonb, 'draft'),
('product-landing-pages', 'entry', 'fish-farmer', 'เกมปลาหมอคางดำ', '{"summary":"เกมชวนมองระบบนิเวศและการตัดสินใจเมื่อชนิดพันธุ์ต่างถิ่นเปลี่ยนพื้นที่","specs":"ตรวจจาก Product Resource ก่อนเผยแพร่","content":"ใช้ร่วมกับคำถาม Debrief เพื่อเชื่อมการตัดสินใจในเกมกับระบบที่ซับซ้อน","cta":"ดูรายละเอียดสินค้าและคู่มือ Debrief","claimBoundary":"อธิบายสิ่งที่เกมชวนให้พิจารณา ไม่อ้างผลลัพธ์การเรียนรู้ที่ยังไม่ได้วัด"}'::jsonb, 'published'),
('product-landing-pages', 'entry', 'sustainable-farm', 'ไร่ยั่งยืน', '{"summary":"เกมวางแผนทรัพยากรและพื้นที่เพื่อชวนคิดเรื่องระบบเกษตร","specs":"2–5 คน / 30 นาที / อายุ 8+ / เล่น 4 รอบ — ต้องตรวจสเปกล่าสุดก่อนเผยแพร่","content":"ผู้เล่นตัดสินใจจัดสรรพื้นที่และทรัพยากรภายใต้ข้อจำกัดของระบบ","cta":"ดูรายละเอียดและสอบถาม WoL","claimBoundary":"ไม่สรุปผลกระทบจาก Intended Learning Outcomes"}'::jsonb, 'draft')
on conflict (site_id, content_type, slug) do update set
  title = excluded.title, fields = excluded.fields, status = excluded.status, updated_at = now();
