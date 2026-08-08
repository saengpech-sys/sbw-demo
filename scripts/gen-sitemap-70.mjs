import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'content-registry.json'), 'utf8'));

const roleByPath = {
  'index.html': 'หน้าแรก: แบนเนอร์ สโลแกน ข่าวเด่น เมนูลัด Portals สถิติ — หน้าไฮไลต์หลักของทั้งไซต์',
  'about/index.html': 'ดัชนีหมวดเกี่ยวกับโรงเรียน — การ์ดลิงก์ไปหน้าลูกทั้งหมด',
  'about/history.html': 'ประวัติและเกียรติภูมิโรงเรียนแบบเอกสารยาว มี sidebar นำทางในหมวด',
  'about/vision.html': 'วิสัยทัศน์และพันธกิจ — เอกสารยาวพร้อม sidebar',
  'about/philosophy.html': 'ปรัชญา คติพจน์ และแนวคิดบริหาร',
  'about/symbols.html': 'ตรา สี และความหมายสัญลักษณ์โรงเรียน',
  'about/administrators.html': 'ทำเนียบผู้บริหาร (รายชื่อในแม่พิมพ์ T1 ตามมาตรฐานหมวด)',
  'about/director-message.html': 'สารจากผู้อำนวยการ',
  'about/org-structure.html': 'โครงสร้างการบริหารและฝ่ายงาน',
  'about/general.html': 'ข้อมูลทั่วไป ที่อยู่ โทร สถิติพื้นฐาน',
  'curriculum/index.html': 'ดัชนีหมวดหลักสูตร',
  'curriculum/lower-secondary.html': 'หลักสูตร ม.ต้น — Accordion รายห้องเรียน/โปรแกรม',
  'curriculum/upper-secondary.html': 'หลักสูตร ม.ปลาย — Accordion แผนวิทย์-ศิลป์ และพิเศษ',
  'curriculum/special-programs.html': 'ห้องเรียนพิเศษ SMTE / EP / MEP / IIS',
  'curriculum/study-plans.html': 'แผนการเรียนรายชั้น',
  'curriculum/departments.html': 'กลุ่มสาระการเรียนรู้ (อยู่ที่หลักสูตร ไม่ซ้ำหมวดบุคลากร)',
  'curriculum/handbook.html': 'คู่มือหลักสูตรแบบ Accordion',
  'news/index.html': 'ดัชนีข่าว — กริดการ์ดหมวดข่าว',
  'news/general.html': 'รายการข่าวทั่วไปแบบ Blog Grid',
  'news/academic.html': 'ข่าววิชาการ / ห้องเรียนพิเศษ',
  'news/activities.html': 'ข่าวกิจกรรม (รวมแข่งขัน/ทัศนศึกษาในเนื้อหา)',
  'news/announcements.html': 'ประกาศโรงเรียนอย่างเป็นทางการ',
  'admission/index.html': 'หน้าไฮไลต์รับสมัคร — CTA สมัครออนไลน์อยู่ในหน้านี้',
  'admission/regulations.html': 'ระเบียบการรับสมัคร ม.1/ม.4',
  'admission/calendar.html': 'ปฏิทินเฉพาะช่วงรับสมัคร (คนละหน้ากับปฏิทินกลาง)',
  'admission/status.html': 'ตรวจสอบสถานะการสมัคร',
  'admission/results.html': 'ประกาศผลการรับสมัคร',
  'admission/faq.html': 'FAQ รับสมัคร (ศูนย์ FAQ เดียว)',
  'student-life/index.html': 'ดัชนีชีวิตในโรงเรียน',
  'student-life/highlights.html': 'ไฮไลต์กิจกรรม — Gallery full-width ไม่มี sidebar',
  'student-life/clubs.html': 'ชุมนุม — Gallery T5 (มาตรฐานเดียวทั้งหมวด)',
  'student-life/sports.html': 'กีฬา / กีฬาสี',
  'student-life/esports.html': 'eSports',
  'student-life/gallery.html': 'คลังภาพกิจกรรมและผลงาน',
  'staff/index.html': 'ดัชนีบุคลากร',
  'staff/executives.html': 'Person grid ผู้บริหาร',
  'staff/teachers.html': 'Person grid ครูผู้สอน',
  'staff/officers.html': 'Person grid เจ้าหน้าที่',
  'staff/contact.html': 'แบบฟอร์มติดต่อบุคลากรในเลย์เอาต์ T3',
  'students/index.html': 'ดัชนีสำหรับนักเรียน',
  'students/timetable.html': 'ตารางเรียน (จุดเดียว — หลักสูตรไม่ซ้ำ)',
  'students/exam-schedule.html': 'ตารางสอบ',
  'students/activities.html': 'ระบบงานกิจกรรม / ชุมนุม',
  'students/handbook.html': 'คู่มือนักเรียน + ลิงก์ Portals / ฐานความรู้ / ปฏิทินกลาง',
  'parents/index.html': 'ดัชนีผู้ปกครอง',
  'parents/news.html': 'ข่าวผู้ปกครอง (T1 ตามมาตรฐานหมวด)',
  'parents/handbook.html': 'คู่มือผู้ปกครอง + ลิงก์ปฏิทินกลาง',
  'parents/advisor.html': 'แบบฟอร์มติดต่อครูที่ปรึกษา',
  'parents/report.html': 'ช่องทางแจ้งเรื่อง',
  'knowledge-base/index.html': 'ศูนย์ฐานความรู้ — โหลดไฟล์ (ไม่ใช่ยืมหนังสือ)',
  'knowledge-base/forms.html': 'ดาวน์โหลดแบบฟอร์มราชการ',
  'knowledge-base/documents.html': 'คู่มือและเอกสารวิชาการ',
  'knowledge-base/media.html': 'โลโก้และสื่อเผยแพร่',
  'contact/index.html': 'ดัชนีติดต่อ',
  'contact/info.html': 'ที่อยู่ โทร อีเมล Facebook (รวม Social)',
  'contact/map.html': 'แผนที่ Google Maps',
  'contact/message.html': 'แบบฟอร์มส่งข้อความถึงโรงเรียน',
  'portals/index.html': 'หน้าไฮไลต์ทางลัดระบบออนไลน์ / Dschool AI',
  'portals/student.html': 'ประตู Student Portal (+ LMS ในคำอธิบายหน้า)',
  'portals/teacher.html': 'ประตู Teacher Portal',
  'portals/grades.html': 'เช็คผลการเรียน (จุดเดียว)',
  'ita.html': 'ความโปร่งใส ITA/OIT — หน้าไฮไลต์',
  'alumni.html': 'สมาคมศิษย์เก่า — หน้าไฮไลต์',
  'ai-center.html': 'SBW-AI Center — หน้าไฮไลต์',
  'ai-forge.html': 'The AI Forge — หน้าไฮไลต์โครงการ',
  'e-library.html': 'แนะนำหนังสือ + CTA เข้าระบบยืม–คืนภายนอก (ไม่ใช่ KB)',
  'privacy.html': 'นโยบายความเป็นส่วนตัว',
  'calendar.html': 'ปฏิทินกิจกรรมกลางทั้งโรงเรียน',
  '404.html': 'หน้าไม่พบ — Theme Builder 404',
  'sitemap.html': 'แผนผังเว็บทั้งระบบสำหรับนำทางและตรวจรับ',
};

const noteByTpl = {
  custom: 'สร้างเลย์เอาต์พิเศษตาม demo',
  hub: 'Hub = Blog/Grid แบบ T4',
  t1: 'Library T1 Sidebar 1/4+3/4',
  t2: 'Library T2 Accordion',
  t3: 'Library T3 Person grid',
  t4: 'Library T4 Blog Grid',
  t5: 'Library T5 Gallery',
  t6: 'Library T6 Contact/Download',
};

const lines = [];
lines.push('# ไซต์แมป 70 หน้า — โรงเรียนสระบุรีวิทยาคม');
lines.push('');
lines.push('สัญญา Meweb = **70 เพจ** (ไม่ใช่ 70 templates)');
lines.push('แม่พิมพ์ Divi Library จริง ≈ **6–10 แบบ** (T1–T6 + custom)');
lines.push('กฎ: **หนึ่งหมวดหลัก = หนึ่งแม่พิมพ์** · HTML เป็นแบบอ้างอิง ไม่ใช่ไฟล์ import Divi');
lines.push('');
lines.push('## สรุปแม่พิมพ์ต่อหมวด');
lines.push('');
lines.push('| หมวด | แม่พิมพ์ | Sidebar |');
lines.push('|------|----------|---------|');
lines.push('| เกี่ยวกับโรงเรียน | T1 | มี |');
lines.push('| หลักสูตร | T2 | ไม่มี |');
lines.push('| ข่าว | T4 | ไม่มี |');
lines.push('| รับสมัคร (ลูก) | T1 · hub = custom | มี (ลูก) |');
lines.push('| ชีวิตในโรงเรียน | T5 | ไม่มี |');
lines.push('| บุคลากร | T3 | ไม่มี |');
lines.push('| นักเรียน / ผู้ปกครอง | T1 | มี |');
lines.push('| ฐานความรู้ | T6 catalog | ไม่มี |');
lines.push('| ติดต่อ | T6 | ไม่มี |');
lines.push('| Portals (ลูก) | T6 · hub = custom | ไม่มี |');
lines.push('| หน้าพิเศษ | custom ตาม demo | ตามต้นฉบับ |');
lines.push('');
lines.push('## Knowledge Base ≠ E-Library');
lines.push('');
lines.push('| | ฐานความรู้ | E-Library |');
lines.push('|--|------------|-----------|');
lines.push('| จุดประสงค์ | โหลดไฟล์ | แนะนำหนังสือ + ประตูยืม–คืนภายนอก |');
lines.push('| Path | `knowledge-base/` | `e-library.html` |');
lines.push('');
lines.push(`## ตารางทุกหน้า (${r.pages.length})`);
lines.push('');
lines.push('| # | Path | ชื่อหน้า | บทบาท | แม่พิมพ์ | ต้นแบบ demo/ | หมายเหตุ Meweb |');
lines.push('|---|------|----------|--------|----------|--------------|----------------|');

r.pages.forEach((p, i) => {
  const role = roleByPath[p.path] || p.title;
  const note = noteByTpl[p.template] || '';
  lines.push(`| ${i + 1} | \`${p.path}\` | ${p.title} | ${role} | ${p.template} | \`${p.demo}\` | ${note} |`);
});

lines.push('');
lines.push('## หน้าที่ตัดออก (อย่าสร้างซ้ำ)');
lines.push('');
lines.push('- `downloads/*` → ใช้ `knowledge-base/*`');
lines.push('- `curriculum/timetable.html` → ใช้ `students/timetable.html`');
lines.push('- `students/grades.html` → ใช้ `portals/grades.html`');
lines.push('- `parents/calendar.html` → ใช้ `calendar.html`');
lines.push('- `admission/apply.html` → CTA ใน `admission/index.html`');
lines.push('- `faq.html` ราก → ใช้ `admission/faq.html`');
lines.push('- ข่าวแข่งขัน / จดหมายข่าว / field-trips / achievements / LMS แยกหน้า → รวมในหน้าใกล้เคียง');
lines.push('');

fs.writeFileSync(path.join(ROOT, 'docs', 'sitemap-70.md'), lines.join('\n'), 'utf8');
console.log('wrote docs/sitemap-70.md', r.pages.length);
