/**
 * Fill entire site from demo/*.html — ONE standard pipeline.
 * Usage: node scripts/fill-site-content.mjs
 *
 * Three build paths only:
 *   1) portCustom  — highlight pages (home, admission, portals, ai, …)
 *   2) buildFromTemplate — leaf pages from T1–T6 demos
 *   3) buildHub — every section index uses T4 news-grid cards
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DEMO = path.join(ROOT, 'demo');
const rel = (d) => (d === 0 ? '' : '../'.repeat(d));
const depthOf = (f) => f.split('/').length - 1;

const FACTS = {
  name: 'โรงเรียนสระบุรีวิทยาคม',
  slogan: 'ส.บ.ว.รวมใจ ไปได้ไกลกว่าเดิม',
  motto: 'ลูกเหลืองฟ้า สง่างาม สมนาม สระบุรีวิทยาคม',
  students: '3,974',
  staff: '253',
  years: '124',
  quality: 'ยอดเยี่ยม',
  director: 'ดร.ธนาพล จีรเดชภัทร์',
  address: '532 ถนนพหลโยธิน ตำบลปากเพรียว อำเภอเมืองสระบุรี จังหวัดสระบุรี 18000',
  phone: '036-211206, 036-231572',
  email: 'sbw_saraburi@hotmail.com',
};

/** T1–T6 → demo prototypes */
const TEMPLATES = {
  t1: 't1-sidebar.html',
  t2: 't2-curriculum-accordion.html',
  t3: 't3-personnel.html',
  t4: 't4-news-blog.html',
  t5: 't5-gallery.html',
  t6: 't6-contact.html',
};

/**
 * Highlight / custom pages only (NOT section hubs).
 * Section hubs always use T4 via buildHub.
 */
/**
 * Highlight / custom pages only.
 * Cut duplicates: apply leaf, root faq, news/ai-forge, course-iis (เนื้อหาอยู่ในห้องเรียนพิเศษ)
 */
const CUSTOM_DEMO = {
  'index.html': 'home.html',
  'admission/index.html': 'admission.html',
  'portals/index.html': 'portals.html',
  'ai-center.html': 'ai-center.html',
  'alumni.html': 'alumni.html',
  'ita.html': 'ita.html',
  'e-library.html': 'e-library.html',
  'ai-forge.html': 'ai-forge.html',
  'calendar.html': 'calendar.html',
  'privacy.html': 'privacy.html',
  '404.html': '404.html',
  'sitemap.html': 'sitemap.html',
};

/** ~70 pages: one section = one template family */
const SECTIONS = [
  {
    id: 'about', label: 'เกี่ยวกับโรงเรียน', hub: 'about/index.html',
    children: [
      ['history.html', 'ประวัติโรงเรียน', 't1'],
      ['vision.html', 'วิสัยทัศน์ / พันธกิจ', 't1'],
      ['philosophy.html', 'ปรัชญา / คติพจน์', 't1'],
      ['symbols.html', 'สัญลักษณ์โรงเรียน', 't1'],
      ['administrators.html', 'ทำเนียบผู้บริหาร', 't1'],
      ['director-message.html', 'สารจากผู้อำนวยการ', 't1'],
      ['org-structure.html', 'โครงสร้างการบริหาร', 't1'],
      ['general.html', 'ข้อมูลทั่วไป', 't1'],
    ],
  },
  {
    id: 'curriculum', label: 'หลักสูตรและการเรียนการสอน', hub: 'curriculum/index.html',
    children: [
      ['lower-secondary.html', 'หลักสูตรมัธยมศึกษาตอนต้น', 't2'],
      ['upper-secondary.html', 'หลักสูตรมัธยมศึกษาตอนปลาย', 't2'],
      ['special-programs.html', 'ห้องเรียนพิเศษ', 't2'],
      ['study-plans.html', 'แผนการเรียน', 't2'],
      ['departments.html', 'กลุ่มสาระการเรียนรู้', 't2'],
      ['handbook.html', 'คู่มือหลักสูตร', 't2'],
    ],
  },
  {
    id: 'news', label: 'ข่าวประชาสัมพันธ์', hub: 'news/index.html',
    children: [
      ['general.html', 'ข่าวทั่วไป', 't4'],
      ['academic.html', 'ข่าววิชาการ', 't4'],
      ['activities.html', 'ข่าวกิจกรรม', 't4'],
      ['announcements.html', 'ประกาศโรงเรียน', 't4'],
    ],
  },
  {
    id: 'admission', label: 'รับสมัครนักเรียน', hub: 'admission/index.html',
    children: [
      ['regulations.html', 'ระเบียบการรับสมัคร', 't1'],
      ['calendar.html', 'ปฏิทินการรับสมัคร', 't1'],
      ['status.html', 'ตรวจสอบสถานะ', 't1'],
      ['results.html', 'ประกาศผล', 't1'],
      ['faq.html', 'FAQ', 't1'],
    ],
  },
  {
    id: 'student-life', label: 'ชีวิตในโรงเรียน', hub: 'student-life/index.html',
    children: [
      ['highlights.html', 'กิจกรรมเด่น', 't5'],
      ['clubs.html', 'ชุมนุม', 't5'],
      ['sports.html', 'กีฬา', 't5'],
      ['esports.html', 'eSports', 't5'],
      ['gallery.html', 'Gallery', 't5'],
    ],
  },
  {
    id: 'staff', label: 'บุคลากร', hub: 'staff/index.html',
    children: [
      ['executives.html', 'ผู้บริหาร', 't3'],
      ['teachers.html', 'ครูผู้สอน', 't3'],
      ['officers.html', 'เจ้าหน้าที่', 't3'],
      ['contact.html', 'ติดต่อบุคลากร', 't3'],
    ],
  },
  {
    id: 'students', label: 'สำหรับนักเรียน', hub: 'students/index.html',
    children: [
      ['timetable.html', 'ตารางเรียน', 't1'],
      ['exam-schedule.html', 'ตารางสอบ', 't1'],
      ['activities.html', 'ระบบงานกิจกรรม', 't1'],
      ['handbook.html', 'คู่มือนักเรียน', 't1'],
    ],
  },
  {
    id: 'parents', label: 'สำหรับผู้ปกครอง', hub: 'parents/index.html',
    children: [
      ['news.html', 'ข่าวผู้ปกครอง', 't1'],
      ['handbook.html', 'คู่มือผู้ปกครอง', 't1'],
      ['advisor.html', 'ติดต่อครูที่ปรึกษา', 't1'],
      ['report.html', 'ช่องทางแจ้งเรื่อง', 't1'],
    ],
  },
  {
    id: 'knowledge-base', label: 'ฐานความรู้', hub: 'knowledge-base/index.html',
    children: [
      ['forms.html', 'แบบฟอร์มราชการ', 't6'],
      ['documents.html', 'คู่มือ / เอกสาร', 't6'],
      ['media.html', 'โลโก้ / สื่อ', 't6'],
    ],
  },
  {
    id: 'contact', label: 'ติดต่อเรา', hub: 'contact/index.html',
    children: [
      ['info.html', 'ข้อมูลติดต่อ', 't6'],
      ['map.html', 'แผนที่', 't6'],
      ['message.html', 'ส่งข้อความถึงโรงเรียน', 't6'],
    ],
  },
  {
    id: 'portals', label: 'ระบบออนไลน์', hub: 'portals/index.html',
    children: [
      ['student.html', 'Student Portal', 't6'],
      ['teacher.html', 'Teacher Portal', 't6'],
      ['grades.html', 'เช็คผลการเรียน', 't6'],
    ],
  },
];

const SPECIAL = [
  { path: 'ita.html', title: 'ความโปร่งใส (ITA)' },
  { path: 'alumni.html', title: 'สมาคมศิษย์เก่า' },
  { path: 'ai-center.html', title: 'SBW-AI Center' },
  { path: 'ai-forge.html', title: 'The AI Forge' },
  { path: 'e-library.html', title: 'E-Library · แนะนำหนังสือ' },
  { path: 'privacy.html', title: 'นโยบายความเป็นส่วนตัว' },
  { path: 'calendar.html', title: 'ปฏิทินกิจกรรมโรงเรียน' },
  { path: '404.html', title: 'ไม่พบหน้าเว็บ' },
];

const HERO_BG = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80';
const HUB_IMGS = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  HERO_BG,
  'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
];

/** Rich copy keyed by page title — school facts, not placeholder */
const CONTENT = {
  ชุมนุม: {
    lead: `${FACTS.name} ส่งเสริมการพัฒนานักเรียนนอกห้องเรียนผ่านชุมนุมกว่า 40 ชุมนุม ภายใต้แนวคิด “${FACTS.slogan}” ให้ผู้เรียนได้ค้นหาความถนัด Soft Skills และความเป็นผู้นำ`,
    labels: ['วิทยาการคำนวณ', 'หุ่นยนต์', 'ดนตรีไทย', 'ภาษาต่างประเทศ', 'จิตอาสา', 'สภานักเรียน'],
    blocks: `
      <h2>ชุมนุมเด่น</h2>
      <ul class="bullets">
        <li><strong>วิทยาการคำนวณและหุ่นยนต์</strong> — เตรียมแข่ง TPA Robot / โครงงานนวัตกรรม</li>
        <li><strong>เศรษฐศาสตร์และการลงทุน</strong> — พื้นฐานการเงินและการวิเคราะห์ข้อมูล</li>
        <li><strong>ดนตรีไทย / นาฏศิลป์</strong> — สืบสานศิลปวัฒนธรรมและอัตลักษณ์เหลือง–ฟ้า</li>
        <li><strong>ภาษาต่างประเทศ</strong> — เสริม EP / MEP และการสื่อสารสองภาษา</li>
        <li><strong>จิตอาสาและสภานักเรียน</strong> — ฝึกภาวะผู้นำและการมีส่วนร่วม</li>
      </ul>
      <h2>การสมัคร</h2>
      <p>นักเรียนเลือกชุมนุมตามปฏิทินกิจกรรมต้นภาคเรียน รายละเอียดตารางและครูที่ปรึกษาประกาศผ่านระบบงานกิจกรรมและข่าวประชาสัมพันธ์</p>`,
  },
  กีฬา: {
    lead: `ส่งเสริมสุขภาพกายและใจของนักเรียนราว ${FACTS.students} คน ด้วยกิจกรรมกีฬาสี (ชมพู–เขียว) และการแข่งขันภายใน/ภายนอก`,
    labels: ['กีฬาสี', 'ฟุตบอล', 'บาสเกตบอล', 'วอลเลย์บอล', 'กรีฑา', 'ว่ายน้ำ'],
  },
  eSports: {
    lead: `eSports เป็นพื้นที่พัฒนาทักษะดิจิทัล การทำงานเป็นทีม และการสื่อสาร — สอดคล้องจุดเน้น ICT / Digital O-NET ของโรงเรียน`,
    labels: ['ฝึกซ้อมทีม', 'ทัวร์นาเมนต์ภายใน', 'ห้องปฏิบัติการ', 'โค้ชชิ่ง', 'สตรีมมิ่ง', 'ทีมโรงเรียน'],
  },
  กิจกรรมเด่น: {
    lead: `ไฮไลต์กิจกรรมประจำปีของ${FACTS.name} ที่สะท้อนอัตลักษณ์ “${FACTS.motto}”`,
    labels: ['เปิดภาคเรียน', 'วันสำคัญชาติ', 'วิชาการ', 'กีฬาสี', 'AI Forge', 'จิตอาสา'],
  },
  ทัศนศึกษา: {
    lead: `ทัศนศึกษาและการศึกษาดูงานเชื่อมโยงหลักสูตร Active Learning กับบริบทชุมชนเมืองสระบุรี`,
    labels: ['พิพิธภัณฑ์', 'มหาวิทยาลัย', 'สถานประกอบการ', 'แหล่งเรียนรู้ท้องถิ่น', 'ค่ายวิชาการ', 'ศึกษาดูงาน'],
  },
  ผลงานนักเรียน: {
    lead: `รวบรวมผลงานแข่งขันและโครงงานนักเรียน ทั้งวิชาการ หุ่นยนต์ ศิลปะ และกีฬา`,
    labels: ['รางวัลวิชาการ', 'หุ่นยนต์', 'ศิลปะ', 'ดนตรี', 'กีฬา', 'นวัตกรรม'],
  },
  Gallery: {
    lead: `คลังภาพบรรยากาศ${FACTS.name} — ใช้เป็นต้นแบบ Divi Gallery module`,
    labels: ['อาคารเรียน', 'ห้องเรียน', 'ห้องปฏิบัติการ', 'กิจกรรม', 'พิธีการ', 'กีฬา'],
  },
};

function readDemo(name) {
  return fs.readFileSync(path.join(DEMO, name), 'utf8');
}

function extractStyle(html) {
  const m = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return m ? m[1] : '';
}

/** Remove chrome rules — original-common.css owns header/menu/footer */
function stripChromeStyles(css) {
  const chromeRe =
    /\.(?:global-header|mega-menu|main-menu|nav-toggle|logo(?:-icon)?|btn-portal|global-footer|extra-bar|footer-grid|footer-col|footer-bottom)[^{]*\{[^}]*\}/gi;
  let out = css.replace(chromeRe, '');
  out = out.replace(/\/\*[^*]*Global Header[^*]*\*\//gi, '');
  out = out.replace(/\/\*[^*]*Global Footer[^*]*\*\//gi, '');
  // Replace placeholder hero backgrounds inside demo CSS
  out = out.replace(/url\(['"]?https?:\/\/via\.placeholder\.com\/[^'")\s]+['"]?\)/g, `url('${HERO_BG}')`);
  return out;
}

function extractBodyInner(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!body) return '';
  let inner = body[1];
  inner = inner.replace(/<header[\s\S]*?<\/header>/i, '');
  inner = inner.replace(/<footer[\s\S]*?<\/footer>/i, '');
  return inner.trim();
}

function rewriteAssets(content) {
  return content
    .replace(/via\.placeholder\.com\/600x400\?text=News\+1/g, HUB_IMGS[0])
    .replace(/via\.placeholder\.com\/600x400\?text=News\+2/g, HUB_IMGS[1])
    .replace(/via\.placeholder\.com\/600x400\?text=News\+3/g, HUB_IMGS[2])
    .replace(/via\.placeholder\.com\/1920x\d+/g, HERO_BG)
    .replace(/via\.placeholder\.com\/300x300\?text=Director/g, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80')
    .replace(/via\.placeholder\.com\/300x300\?text=Deputy/g, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80')
    .replace(/via\.placeholder\.com\/300x300\?text=Teacher/g, 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80')
    .replace(/via\.placeholder\.com\/600x450\?text=([^"']+)/g, (_, t) => `${HUB_IMGS[0]}&sig=${encodeURIComponent(t)}`)
    .replace(/via\.placeholder\.com\/1200x900\?text=([^"']+)/g, (_, t) => `${HUB_IMGS[2]}&sig=${encodeURIComponent(t)}`)
    .replace(/via\.placeholder\.com\/600x400\?text=([^"']+)/g, (_, t) => `${HUB_IMGS[1]}&sig=${encodeURIComponent(t)}`)
    .replace(/036-xxx-xxx/g, FACTS.phone)
    .replace(/<span class="logo-icon">ส\.บ\.<\/span>\s*/g, '')
    .replace(/<span style="background: var\(--primary-color\);[^"]*">ส\.บ\.<\/span>\s*/g, '');
}

/** Template id for Meweb — HTML comment only (not shown on page) */
function demoNote(demoName, tpl) {
  const tag = tpl ? ` ${tpl.toUpperCase()}` : '';
  return `<!-- Divi Library template: demo/${demoName}${tag} -->`;
}

function heroSub(secLabel) {
  return `${secLabel} · ${FACTS.name}`;
}

function megaMenu(d) {
  const p = rel(d);
  const items = SECTIONS.map((sec) => {
    const links = sec.children.map(([file, title]) => {
      const href = sec.hub.replace(/index\.html$/, file);
      return `<li><a href="${p}${href}">${title}</a></li>`;
    }).join('');
    return `<li>
      <button type="button">${sec.label} ▾</button>
      <ul class="sub-menu">
        <li><a href="${p}${sec.hub}"><strong>ภาพรวม${sec.label}</strong></a></li>
        ${links}
      </ul>
    </li>`;
  }).join('\n');
  return `<ul class="main-menu et_pb_module et_pb_menu">
    <li><a href="${p}index.html">หน้าแรก</a></li>
    ${items}
    <li><a href="${p}sitemap.html">แผนผังเว็บ</a></li>
  </ul>`;
}

function header(d) {
  const p = rel(d);
  return `<!-- Divi Theme Builder: Header (chrome from original-common.css) -->
<header class="et-l et-l--header global-header">
  <a class="logo et_pb_module et_pb_image" href="${p}index.html">
    <img src="${p}assets/logo-sbw-new.png" alt="${FACTS.name}">
    <span>สระบุรีวิทยาคม<span class="en">SARABURIWITTHAYAKHOM SCHOOL</span></span>
  </a>
  <button class="nav-toggle" type="button" aria-label="เมนู">เมนู</button>
  ${megaMenu(d)}
  <a class="btn-portal et_pb_button" href="${p}portals/index.html">Portals</a>
</header>`;
}

function footer(d) {
  const p = rel(d);
  return `<div class="extra-bar">
  <a href="${p}admission/index.html">รับสมัคร</a>
  <a href="${p}news/index.html">ข่าวสาร</a>
  <a href="${p}ai-center.html">SBW-AI</a>
  <a href="${p}alumni.html">ศิษย์เก่า</a>
  <a href="${p}ita.html">ITA</a>
  <a href="${p}e-library.html">E-Library</a>
  <a href="${p}sitemap.html">แผนผังเว็บไซต์</a>
</div>
<footer class="et-l et-l--footer global-footer">
  <div class="footer-grid et_pb_row">
    <div class="footer-col"><h4>${FACTS.name}</h4><p>${FACTS.slogan}</p><p>${FACTS.motto}</p></div>
    <div class="footer-col"><h4>เมนูลัด</h4><ul>
      <li><a href="${p}admission/index.html">สมัครเรียน</a></li>
      <li><a href="${p}portals/index.html">ระบบออนไลน์</a></li>
      <li><a href="${p}knowledge-base/index.html">ฐานความรู้</a></li>
      <li><a href="${p}sitemap.html">แผนผังเว็บไซต์</a></li>
    </ul></div>
    <div class="footer-col"><h4>ติดต่อเรา</h4><ul>
      <li>${FACTS.address}</li><li>โทร ${FACTS.phone}</li><li>${FACTS.email}</li>
    </ul></div>
    <div class="footer-col"><h4>สำหรับผู้ใช้</h4><ul>
      <li><a href="${p}students/index.html">สำหรับนักเรียน</a></li>
      <li><a href="${p}parents/index.html">สำหรับผู้ปกครอง</a></li>
      <li><a href="${p}staff/index.html">บุคลากร</a></li>
      <li><a href="${p}privacy.html">ความเป็นส่วนตัว</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom">© 2026 ${FACTS.name} · มาตรฐานเดียวจาก demo/ (T1–T6 + custom)</div>
</footer>
<script src="${rel(d)}js/main.js"></script>`;
}

function wrapPage(title, dest, style, mainHtml, demoSource) {
  const d = depthOf(dest);
  const p = rel(d);
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${FACTS.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${p}css/original-common.css">
  <style>
/* ===== Body layout from demo/${demoSource} (chrome stripped) ===== */
${stripChromeStyles(style)}
  </style>
</head>
<body class="et_pb_pagebuilder_layout">
<div id="et-boc" class="et-boc">
${header(d)}
<!-- demo source: demo/${demoSource} | pipeline: unified -->
<div id="et-main-area">
  <div id="main-content">
    <article class="et_pb_post">
      <div class="et_builder_inner_content">
${mainHtml}
      </div>
    </article>
  </div>
</div>
${footer(d)}
</div>
</body>
</html>
`;
}

function write(file, html) {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
}

function homepageLinkFix(content, d) {
  const p = rel(d);
  return content
    .replace(/<a href="[^"]*" class="hero-btn">สมัครเรียน<\/a>/, `<a href="${p}admission/index.html" class="hero-btn">สมัครเรียน</a>`)
    .replace(
      /<a href="[^"]*" class="hero-btn" style="background: transparent[^"]*">หลักสูตรของเรา<\/a>/,
      `<a href="${p}curriculum/index.html" class="hero-btn" style="background: transparent; border: 2px solid white; color: white;">หลักสูตรของเรา</a>`
    )
    .replace(
      /<a href="[^"]*" class="ql-card">\s*<span class="ql-icon">📢<\/span>\s*<div class="ql-title">ประกาศผลสอบ<\/div>\s*<\/a>/,
      `<a href="${p}news/announcements.html" class="ql-card"><span class="ql-icon">📢</span><div class="ql-title">ประกาศผลสอบ</div></a>`
    )
    .replace(
      /<a href="[^"]*" class="ql-card">\s*<span class="ql-icon">📅<\/span>\s*<div class="ql-title">ปฏิทินวิชาการ<\/div>\s*<\/a>/,
      `<a href="${p}calendar.html" class="ql-card"><span class="ql-icon">📅</span><div class="ql-title">ปฏิทินวิชาการ</div></a>`
    )
    .replace(
      /<a href="[^"]*" class="ql-card">\s*<span class="ql-icon">🏆<\/span>\s*<div class="ql-title">ผลงานนักเรียน<\/div>\s*<\/a>/,
      `<a href="${p}student-life/gallery.html" class="ql-card"><span class="ql-icon">🏆</span><div class="ql-title">ผลงานนักเรียน</div></a>`
    )
    .replace(
      /<a href="[^"]*" class="ql-card">\s*<span class="ql-icon">🏫<\/span>\s*<div class="ql-title">The AI Forge<\/div>\s*<\/a>/,
      `<a href="${p}ai-forge.html" class="ql-card"><span class="ql-icon">🏫</span><div class="ql-title">The AI Forge</div></a>`
    )
    .replace(/<a href="[^"]*" class="news-more">อ่านต่อ →<\/a>/g, `<a href="${p}ai-forge.html" class="news-more">อ่านต่อ →</a>`)
    .replace(/<a href="[^"]*" class="btn-outline">ดูข่าวสารทั้งหมด<\/a>/, `<a href="${p}news/index.html" class="btn-outline">ดูข่าวสารทั้งหมด</a>`)
    .replace(/<h1>Saraburiwittayakhom<\/h1>/, `<h1>ลูกเหลืองฟ้า สง่างาม</h1>`)
    .replace(
      /มุ่งมั่นพัฒนาผู้เรียนสู่มาตรฐานสากล เปี่ยมด้วยคุณธรรมและความรู้คู่เทคโนโลยี พร้อมสภาพแวดล้อมที่ส่งเสริมความเป็นเลิศทางวิชาการ \(World Class Standard\)/,
      `ลูกเหลืองฟ้า สง่างาม สมนาม สระบุรีวิทยาคม · ส.บ.ว.รวมใจ ไปได้ไกลกว่าเดิม · คุณภาพภายในระดับยอดเยี่ยม`
    );
}

/** Path 1: custom / highlight — port demo body as-is */
function portCustom(dest, demoName, title) {
  const src = readDemo(demoName);
  const style = extractStyle(src);
  let main = rewriteAssets(extractBodyInner(src));
  main = main.replace(/href="#"/g, `href="${rel(depthOf(dest))}index.html"`);
  if (dest === 'index.html') main = homepageLinkFix(main, 0);
  if (dest === 'e-library.html') {
    main += `
    <section class="section-white" style="padding:40px 20px;max-width:900px;margin:0 auto">
      <h2>ระบบยืม–คืนหนังสือ</h2>
      <p>หน้านี้เป็น<strong>แนะนำหนังสือและประตูเข้าสู่ E-Library</strong> — ระบบยืม–คืนหนังสือเป็นระบบแยกต่างหากที่มีอยู่แล้ว ไม่ใช่ฐานความรู้สำหรับดาวน์โหลดแบบฟอร์ม</p>
      <p>ดาวน์โหลดเอกสารราชการ / คู่มือ → ใช้หมวด <a href="knowledge-base/index.html">ฐานความรู้</a></p>
      <p style="margin-top:16px"><a class="btn-portal" href="#" rel="noopener">เข้าสู่ระบบห้องสมุด (ยืม–คืน)</a></p>
    </section>`;
  }
  const pageTitle = title || (src.match(/<title>([^<]+)<\/title>/i)?.[1]?.replace(/\s*\|.*/, '') || FACTS.name);
  write(dest, wrapPage(pageTitle, dest, style, main, demoName));
}

function pageBodyHtml(title, template, demoName) {
  const note = demoNote(demoName, template);
  const bodies = {
    ประวัติโรงเรียน: `${note}<h2>เกียรติภูมิ ${FACTS.years} ปี</h2>
      <img src="${HERO_BG}" alt="${FACTS.name}">
      <p>${FACTS.name} ก่อตั้ง 28 เมษายน พ.ศ. 2445 ในชื่อโรงเรียนศาลาแดง และควบรวมเป็นสหศึกษาเมื่อ 24 มีนาคม พ.ศ. 2515</p>
      <p>อัตลักษณ์ “${FACTS.motto}” ภายใต้แนวคิด “${FACTS.slogan}”</p>
      <p>ปัจจุบันมีนักเรียนประมาณ ${FACTS.students} คน บุคลากร ${FACTS.staff} คน คุณภาพภายใน 2568 ระดับ <strong>${FACTS.quality}</strong></p>`,
    'วิสัยทัศน์ / พันธกิจ': `${note}<h2>วิสัยทัศน์</h2><p>ผู้เรียนมีศักยภาพเป็นพลโลก มีคุณธรรม จริยธรรม ปฏิบัติตามแนวคิดเศรษฐกิจพอเพียง ได้มาตรฐานสากล</p>
      <h2>พันธกิจ</h2><ul class="bullets"><li>พัฒนาระบบบริหาร</li><li>พัฒนาหลักสูตรสู่สากล</li><li>พัฒนาครู</li><li>พัฒนาผู้เรียนสื่อสารได้ 2 ภาษา</li><li>ส่งเสริมคุณธรรมและการมีส่วนร่วม</li></ul>`,
    'ปรัชญา / คติพจน์': `${note}<h2>คติพจน์</h2><p><strong>${FACTS.motto}</strong></p><h2>แนวคิดบริหาร</h2><p><strong>${FACTS.slogan}</strong></p>`,
    สัญลักษณ์โรงเรียน: `${note}<h2>ตราโรงเรียน</h2><p>มณฑปวัดพระพุทธบาทราชวรมหาวิหารยอดเปล่งรัศมี — บันได = ความมานะ · มณฑป = เป้าหมาย · รัศมี = ปัญญา</p>
      <p>สีประจำโรงเรียน เหลือง–ฟ้า สอดคล้องอัตลักษณ์ “${FACTS.motto}”</p>
      <p><img src="../assets/logo-sbw-new.png" alt="โลโก้" style="width:140px;background:#000;border-radius:12px"></p>`,
    สารจากผู้อำนวยการ: `${note}<p>${FACTS.name} มุ่งมั่นพัฒนาคุณภาพการศึกษา ผลการประเมินตนเองปี 2568 ระดับ <strong>${FACTS.quality}</strong> ครบทั้ง 3 มาตรฐาน</p>
      <p style="margin-top:24px"><strong>${FACTS.director}</strong><br>ผู้อำนวยการ${FACTS.name}</p>`,
    โครงสร้างการบริหาร: `${note}<ul class="bullets"><li>ผู้อำนวยการ: ${FACTS.director}</li><li>รองผู้อำนวยการ: นางขวัญเกียรติ ท้วมศิริ, นายธนพจน์ ธงศิลา, นายชานนท์ วรรณา, นายเฉิดชาย ฉิมบุรุษ</li><li>ฝ่ายวิชาการ งบประมาณ บุคคล บริหารทั่วไป</li><li>แกนนำสหวิทยาเขตพระพุทธบาท เมืองสระบุรี</li></ul>`,
    ข้อมูลทั่วไป: `${note}<ul class="bullets"><li>${FACTS.address}</li><li>โทร ${FACTS.phone}</li><li>${FACTS.email}</li><li>www.sbw.ac.th</li><li>นักเรียนประมาณ ${FACTS.students} คน · บุคลากร ${FACTS.staff} คน · 106 ห้องเรียน</li></ul>`,
    ทำเนียบผู้บริหาร: `${note}<h2>ทำเนียบผู้บริหาร</h2>
      <ul class="bullets">
        <li><strong>${FACTS.director}</strong> — ผู้อำนวยการ</li>
        <li>นางขวัญเกียรติ ท้วมศิริ — รองผู้อำนวยการ</li>
        <li>นายธนพจน์ ธงศิลา — รองผู้อำนวยการ</li>
        <li>นายชานนท์ วรรณา — รองผู้อำนวยการ</li>
        <li>นายเฉิดชาย ฉิมบุรุษ — รองผู้อำนวยการ</li>
      </ul>
      <p>รายชื่อเต็มและรูปบุคคลอัปโหลดใน Divi Person Module ตอนขึ้นจริง — หมวดนี้ใช้แม่พิมพ์ T1 ตามมาตรฐานหมวดเกี่ยวกับโรงเรียน</p>`,
    คู่มือนักเรียน: `${note}<h2>คู่มือนักเรียน</h2><p>รวบรวมระเบียบการแต่งกาย ตารางเรียน การใช้ระบบ Portals และการเข้าร่วมกิจกรรมของ${FACTS.name}</p>
      <ul class="bullets"><li>ระเบียบนักเรียนและการแต่งกาย (เหลือง–ฟ้า)</li><li>เช็คผลการเรียน → <a href="../portals/grades.html">Portals</a></li><li>ดาวน์โหลดเอกสาร → <a href="../knowledge-base/index.html">ฐานความรู้</a></li><li>ปฏิทินกิจกรรม → <a href="../calendar.html">ปฏิทินกลาง</a></li></ul>`,
    คู่มือผู้ปกครอง: `${note}<h2>คู่มือผู้ปกครอง</h2><p>ข้อมูลสำหรับผู้ปกครองในการติดตามการเรียนและร่วมกิจกรรมกับโรงเรียน</p>
      <ul class="bullets"><li>ปฏิทินโรงเรียน → <a href="../calendar.html">ปฏิทินกลาง</a></li><li>ช่องทางแจ้งเรื่องและติดต่อครูที่ปรึกษา</li><li>ข่าวสารผู้ปกครอง</li></ul>`,
    คู่มือหลักสูตร: `${note}<h2>คู่มือหลักสูตร</h2><p>ภาพรวมหลักสูตร ม.ต้น–ม.ปลาย รวมห้องเรียนพิเศษ SMTE / EP / MEP / IIS และจุดเน้น Active Learning</p>`,
    ตารางเรียน: `${note}<h2>ตารางเรียน</h2><p>ตารางเรียนรายชั้นเผยแพร่ผ่านระบบนักเรียนและประกาศต้นภาคเรียน — ตรวจสอบกับครูที่ปรึกษาหากมีการปรับคาบ</p>`,
    ตารางสอบ: `${note}<h2>ตารางสอบ</h2><p>กำหนดการสอบกลางภาค / ปลายภาค ประกาศล่วงหน้าผ่านข่าวประกาศและระบบ Portals</p>`,
    ข่าวผู้ปกครอง: `${note}<h2>ข่าวผู้ปกครอง</h2><p>ประกาศและข่าวสารสำหรับผู้ปกครอง${FACTS.name} — ติดตามปฏิทินได้ที่ <a href="../calendar.html">ปฏิทินกลาง</a></p>`,
    ติดต่อครูที่ปรึกษา: `${note}<h2>ติดต่อครูที่ปรึกษา</h2>
      <p>กรอกแบบฟอร์มเพื่อติดต่อครูที่ปรึกษา (ส่งไปที่ s.khumpo@sbw.ac.th ในเวอร์ชัน Divi)</p>
      <form action="#" method="POST" onsubmit="return false">
        <p><input type="text" placeholder="ชื่อ-นามสกุลผู้ปกครอง" style="width:100%;padding:10px;margin:6px 0"></p>
        <p><input type="text" placeholder="ชื่อนักเรียน / ห้อง" style="width:100%;padding:10px;margin:6px 0"></p>
        <p><textarea rows="4" placeholder="รายละเอียด" style="width:100%;padding:10px"></textarea></p>
        <p><button type="button" class="btn-portal">ส่งข้อความ</button></p>
      </form>`,
    ช่องทางแจ้งเรื่อง: `${note}<h2>ช่องทางแจ้งเรื่อง</h2>
      <p>แจ้งเรื่องทั่วไปหรือข้อเสนอแนะถึงโรงเรียน</p>
      <form action="#" method="POST" onsubmit="return false">
        <p><input type="text" placeholder="ชื่อ-นามสกุล" style="width:100%;padding:10px;margin:6px 0"></p>
        <p><input type="tel" placeholder="เบอร์โทร" style="width:100%;padding:10px;margin:6px 0"></p>
        <p><textarea rows="4" placeholder="รายละเอียด" style="width:100%;padding:10px"></textarea></p>
        <p><button type="button" class="btn-portal">ส่งเรื่อง</button></p>
      </form>`,
    FAQ: `${note}<h2>คำถามที่พบบ่อย — รับสมัคร</h2>
      <ul class="bullets">
        <li><strong>สมัคร ม.1 / ม.4 อย่างไร?</strong> — ดูระเบียบและสมัครผ่านหน้า <a href="index.html">รับสมัคร</a></li>
        <li><strong>ตรวจสถานะได้ที่ไหน?</strong> — หน้าตรวจสอบสถานะในหมวดนี้</li>
        <li><strong>ประกาศผลเมื่อไหร่?</strong> — ตามปฏิทินการรับสมัคร</li>
      </ul>`,
    ข้อมูลติดต่อ: `${note}<h2>ติดต่อ${FACTS.name}</h2>
      <ul class="bullets"><li>${FACTS.address}</li><li>โทร ${FACTS.phone}</li><li>${FACTS.email}</li>
      <li>ผู้ประสานงานเว็บไซต์: นายฉัฐสรณ์ คำโพธิ์ · s.khumpo@sbw.ac.th</li>
      <li>Facebook: <a href="https://www.facebook.com/SaraburiwitthayakhomSchool" target="_blank" rel="noopener">SaraburiwitthayakhomSchool</a></li></ul>`,
    'แบบฟอร์มราชการ': `${note}<h2>แบบฟอร์มราชการ</h2><p>ศูนย์ดาวน์โหลดแบบฟอร์มสำหรับ${FACTS.name} (ตัวอย่าง — แนบไฟล์จริงใน Media Library)</p>
      <div class="download-grid">
        <a href="#" class="download-card">ใบลา (PDF)</a>
        <a href="#" class="download-card">คำร้องทั่วไป (PDF)</a>
        <a href="#" class="download-card">แบบฟอร์มกิจกรรม (DOCX)</a>
      </div>`,
    'คู่มือ / เอกสาร': `${note}<h2>คู่มือและเอกสาร</h2><p>คู่มือนักเรียน ผู้ปกครอง เอกสารวิชาการ และคู่มือหลักสูตร</p>
      <div class="download-grid">
        <a href="#" class="download-card">คู่มือนักเรียน (PDF)</a>
        <a href="#" class="download-card">คู่มือผู้ปกครอง (PDF)</a>
        <a href="#" class="download-card">เอกสารวิชาการตัวอย่าง (PDF)</a>
      </div>`,
    'โลโก้ / สื่อ': `${note}<h2>โลโก้และสื่อ</h2>
      <img src="../assets/logo-sbw-new.png" alt="โลโก้" style="width:180px;background:#000;border-radius:12px">
      <p style="margin-top:16px"><a class="btn-portal" href="../assets/logo-sbw-new.png" download>ดาวน์โหลดโลโก้</a></p>
      <div class="download-grid" style="margin-top:20px">
        <a href="#" class="download-card">แบนเนอร์ตัวอย่าง (PNG)</a>
        <a href="#" class="download-card">คู่มือการใช้ตราสัญลักษณ์ (PDF)</a>
      </div>`,
    ติดต่อบุคลากร: `${note}<h2>ติดต่อบุคลากร</h2>
      <p>สอบถามข้อมูลบุคลากรหรือส่งข้อความถึงกลุ่มสาระ (ตัวอย่างฟอร์ม)</p>
      <form action="#" method="POST" onsubmit="return false">
        <p><input type="text" placeholder="ชื่อ-นามสกุล" style="width:100%;padding:10px;margin:6px 0"></p>
        <p><input type="email" placeholder="อีเมล" style="width:100%;padding:10px;margin:6px 0"></p>
        <p><textarea rows="4" placeholder="รายละเอียด" style="width:100%;padding:10px"></textarea></p>
        <p><button type="button" class="btn-portal">ส่งข้อความ</button></p>
      </form>`,
  };
  if (bodies[title]) return bodies[title];

  if (template === 't4') {
    const topics = [
      `${title}: กิจกรรมและประกาศล่าสุดของโรงเรียน`,
      `${title}: อัปเดตวิชาการและห้องเรียนพิเศษ`,
      `${title}: ข่าวสารสำหรับผู้ปกครองและชุมชน`,
    ];
    return `${note}<div class="news-grid">${topics.map((t, i) => `
      <article class="news-card">
        <div class="news-image-wrapper">
          <span class="news-category">${title}</span>
          <img src="${HUB_IMGS[i]}" alt="${title}" class="news-image">
        </div>
        <div class="news-content">
          <div class="news-date">📅 ${12 + i} พ.ค. 2569</div>
          <h2 class="news-title"><a href="#">${t}</a></h2>
          <a href="#" class="news-readmore">อ่านเพิ่มเติม →</a>
        </div>
      </article>`).join('')}</div>`;
  }
  if (template === 't5') {
    const pack = CONTENT[title];
    const labels = pack?.labels || ['พิธีเปิดภาคเรียน', 'กิจกรรมวิชาการ', 'กีฬาสี', 'Smart Classroom', 'ชุมนุม', 'ทัศนศึกษา'];
    const lead = pack?.lead || `คลังภาพและกิจกรรมหมวด ${title} ของ${FACTS.name}`;
    return `${note}<div class="gallery-header"><h2>${title}</h2><p>${lead}</p></div>
      <div class="gallery-grid">${labels.map((t, i) => `
        <div class="gallery-item">
          <img src="${HUB_IMGS[i % HUB_IMGS.length]}" alt="${t}" class="gallery-img">
          <div class="gallery-overlay"><span>${t}</span></div>
        </div>`).join('')}</div>`;
  }
  if (template === 't3') {
    const people = title.includes('ผู้บริหาร') || title.includes('ทำเนียบ')
      ? [
          [FACTS.director, 'ผู้อำนวยการ'],
          ['นางขวัญเกียรติ ท้วมศิริ', 'รองผู้อำนวยการ'],
          ['นายธนพจน์ ธงศิลา', 'รองผู้อำนวยการ'],
          ['นายชานนท์ วรรณา', 'รองผู้อำนวยการ'],
          ['นายเฉิดชาย ฉิมบุรุษ', 'รองผู้อำนวยการ'],
        ]
      : ['วิทยาศาสตร์', 'คณิตศาสตร์', 'ภาษาไทย', 'ภาษาต่างประเทศ', 'สังคมศึกษา', 'สุขศึกษา', 'ศิลปะ', 'การงาน'].map((d) => [`ครูตัวอย่าง · ${d}`, `กลุ่มสาระ${d}`]);
    return `${note}<p>ทำเนียบ${title} ของ${FACTS.name} — แสดงตัวอย่างโครงสร้าง Person Module (ข้อมูลจริงอัปโหลดตอนขึ้น Divi)</p>
      <div class="personnel-grid">${people.map(([n, r]) => `
      <div class="person-card">
        <img src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80" alt="${n}" class="person-image">
        <h3 class="person-name">${n}</h3>
        <p class="person-position">${r}</p>
      </div>`).join('')}</div>`;
  }
  if (template === 't2') {
    const curriculumItems = {
      หลักสูตรมัธยมศึกษาตอนต้น: [
        ['ห้องเรียนปกติ', 'หลักสูตรแกนกลาง พหุปัญญาองค์รวม'],
        ['SMTE / SMP', 'วิทยาศาสตร์ คณิตศาสตร์ เทคโนโลยี และสิ่งแวดล้อม'],
        ['EP / SMBP', 'English Program และ Education Hub สองภาษา'],
      ],
      หลักสูตรมัธยมศึกษาตอนปลาย: [
        ['วิทย์–คณิต / SMTE', 'เตรียมแพทย์ วิศวกรรม วิทยาศาสตร์ประยุกต์'],
        ['ศิลป์–คำนวณ / ศิลป์–ภาษา', 'รวมภาษาจีน ญี่ปุ่น เกาหลี ฝรั่งเศส'],
        ['MEP', 'Mini English Program บูรณาการวิทย์–คณิต'],
      ],
      ห้องเรียนพิเศษ: [
        ['SMTE / SMP', 'ความเป็นเลิศวิทยาศาสตร์–คณิตศาสตร์'],
        ['EP / SMBP', 'หลักสูตรสองภาษา'],
        ['MEP', 'Mini English Program'],
      ],
    };
    const items = curriculumItems[title] || [
      ['ภาพรวม', `โครงสร้าง${title} ของ${FACTS.name}`],
      ['รายละเอียด', 'ขยายหัวข้อได้ใน Divi Accordion / Toggle'],
      ['เอกสารแนบ', 'แนบ PDF จาก Media Library ตอนขึ้นจริง'],
    ];
    return `${note}${items.map(([h, p], i) => `
      <div class="accordion-item">
        <div class="accordion-header${i === 0 ? ' active' : ''}" onclick="toggleAccordion(this)">
          <span>${h}</span><span class="icon-toggle">${i === 0 ? '−' : '+'}</span>
        </div>
        <div class="accordion-content" style="${i === 0 ? 'max-height:400px' : ''}"><br><p>${p}</p></div>
      </div>`).join('')}
      <script>
      function toggleAccordion(el){
        const content = el.nextElementSibling;
        const icon = el.querySelector('.icon-toggle');
        const open = el.classList.contains('active');
        document.querySelectorAll('.accordion-header').forEach(h=>{h.classList.remove('active');h.querySelector('.icon-toggle').textContent='+';h.nextElementSibling.style.maxHeight=null;});
        if(!open){el.classList.add('active');icon.textContent='−';content.style.maxHeight=content.scrollHeight+'px';}
      }
      </script>`;
  }
  if (template === 't6') {
    if (title.includes('ข้อความ') || title.includes('แจ้งเรื่อง') || title.includes('ที่ปรึกษา') || title.includes('ติดต่อบุคลากร')) {
      return `${note}<div class="contact-form"><h3>${title}</h3>
        <form action="#" method="POST" onsubmit="return false">
          <div class="form-group"><input type="text" placeholder="ชื่อ-นามสกุล"></div>
          <div class="form-group"><input type="tel" placeholder="เบอร์โทรศัพท์"></div>
          <div class="form-group"><input type="email" placeholder="อีเมล"></div>
          <div class="form-group"><textarea rows="4" placeholder="รายละเอียด"></textarea></div>
          <button type="button" class="btn-submit">ส่งข้อความ</button>
        </form>
        <p style="margin-top:12px;color:#888;font-size:.9rem">ส่งไปที่ s.khumpo@sbw.ac.th</p></div>`;
    }
    if (title.includes('แผนที่')) {
      return `${note}<h2>แผนที่</h2><p>${FACTS.address}</p>
        <p style="margin:16px 0"><a class="btn-portal" href="https://www.google.com/maps/place/โรงเรียนสระบุรีวิทยาคม/@14.5429108,100.910143,17z" target="_blank" rel="noopener">เปิด Google Maps</a></p>
        <iframe title="map" src="https://maps.google.com/maps?q=14.5429108,100.910143&z=17&output=embed" style="width:100%;height:360px;border:0;border-radius:12px" loading="lazy"></iframe>`;
    }
    if (title.includes('โลโก้')) {
      return `${note}<h2>โลโก้โรงเรียน</h2><img src="../assets/logo-sbw-new.png" alt="โลโก้" style="width:180px;background:#000;border-radius:12px">
        <p style="margin-top:16px"><a class="btn-portal" href="../assets/logo-sbw-new.png" download>ดาวน์โหลดโลโก้</a></p>`;
    }
    if (title.includes('Portal') || title.includes('LMS') || title.includes('เช็ค') || title.includes('ลงทะเบียน') || title.includes('สมัคร') || title.includes('ผลการเรียน')) {
      return `${note}<h2>${title}</h2><p>ทางลัดเข้าสู่ระบบ ${title} / Dschool AI (SSO) ของ${FACTS.name}</p>
        <p style="margin-top:16px"><a class="btn-portal" href="#">เข้าสู่ระบบ ${title}</a></p>`;
    }
    return `${note}<h2>${title}</h2><p>เอกสารดาวน์โหลดสำหรับ${FACTS.name}</p><div class="download-grid">
      <a href="#" class="download-card">แบบฟอร์มตัวอย่าง 1 (PDF)</a>
      <a href="#" class="download-card">แบบฟอร์มตัวอย่าง 2 (PDF)</a>
      <a href="#" class="download-card">คู่มือตัวอย่าง (DOCX)</a>
    </div>`;
  }

  return `${note}<h2>${title}</h2>
    <p>${FACTS.name} — หมวด <strong>${title}</strong> ภายใต้แนวคิด “${FACTS.slogan}” คุณภาพภายในระดับ <strong>${FACTS.quality}</strong></p>
    <ul class="bullets">
      <li>วัตถุประสงค์: ให้เข้าถึงข้อมูล${title} ได้รวดเร็ว</li>
      <li>อัตลักษณ์: ${FACTS.motto}</li>
      <li>ติดต่อ: ${FACTS.phone} · ${FACTS.email}</li>
    </ul>`;
}

function sidebarHtml(sec, activeFile) {
  const items = sec.children.map(([file, title]) =>
    `<li><a href="${file}"${file === activeFile ? ' class="active"' : ''}>${title}</a></li>`).join('\n                    ');
  return `<aside class="sidebar">
            <div class="sidebar-menu">
                <h3>${sec.label}</h3>
                <ul>
                    <li><a href="index.html">ภาพรวมหมวด</a></li>
                    ${items}
                </ul>
            </div>
        </aside>`;
}

/** Path 2: leaf from T1–T6 */
function buildFromTemplate(dest, title, template, sec, file) {
  const demoName = TEMPLATES[template];
  const style = extractStyle(readDemo(demoName));
  const body = pageBodyHtml(title, template, demoName);
  let main;

  if (template === 't1') {
    main = `
    <section class="hero-section">
        <h1>${title}</h1>
        <p>${heroSub(sec.label)}</p>
    </section>
    <div class="container">
        ${sidebarHtml(sec, file)}
        <main class="main-content">${body}</main>
    </div>`;
  } else if (template === 't2') {
    main = `
    <section class="hero-section">
        <h1>${title}</h1>
        <p>${heroSub(sec.label)}</p>
    </section>
    <section class="section-white">
        <div class="container-full">
            <h2 class="section-title">${title}</h2>
            ${body}
        </div>
    </section>`;
  } else if (template === 't3') {
    main = `
    <section class="hero-section">
        <h1>${title}</h1>
        <p>${heroSub(sec.label)}</p>
    </section>
    <div class="container container--stack">${body}</div>`;
  } else if (template === 't4') {
    main = `
    <section class="hero-section">
        <h1>${title}</h1>
        <p>${heroSub(sec.label)}</p>
    </section>
    <main class="container container--stack">${body}</main>`;
  } else if (template === 't5') {
    main = `
    <section class="hero-section">
        <h1>${title}</h1>
        <p>${heroSub(sec.label)}</p>
    </section>
    <div class="container container--stack">${body}</div>`;
  } else {
    // t6
    main = `
    <section class="hero-section">
        <h1>${title}</h1>
        <p>${heroSub(sec.label)}</p>
    </section>
    <div class="container container--stack narrow">${body}</div>`;
  }

  write(dest, wrapPage(title, dest, style, main, demoName));
}

/**
 * Path 3: every section hub = T4 news-grid cards (same pattern)
 * Custom admission/portals still port as custom pages — but plan says
 * ALL section hubs use T4. admission/index and portals/index are in CUSTOM_DEMO
 * as highlight pages — plan: "portCustom ไม่แปะ strip" for highlights.
 *
 * Conflict: plan table says hubs use T4, AND "เก็บไฮไลต์ admission, portals"
 * with portCustom only. So admission/index and portals/index stay as custom
 * highlight demos WITHOUT hub card strip. Other hubs (including student-life)
 * use buildHub T4.
 *
 * Re-read plan carefully:
 * - Hub ทุกหมวด = T4
 * - DIRECT_DEMO: remove curriculum/staff/news/contact as hubs
 * - Keep highlights: home, admission, portals
 * - student-life = hub T4 (not custom pillar)
 *
 * So admission/index and portals/index are CUSTOM highlight (full demo layout)
 * WITHOUT being treated as "hub with children cards". Children still reachable
 * via mega menu. Optionally we could still use T4 for them for max uniformity —
 * plan says keep admission/portals as custom.
 *
 * For sections whose hub is NOT in CUSTOM_DEMO → buildHub.
 * For admission/portals → portCustom only (no strip).
 */
function buildHub(sec) {
  const demoName = TEMPLATES.t4;
  const style = extractStyle(readDemo(demoName));
  const cards = sec.children.map(([file, title, tpl], i) => `
            <article class="news-card">
                <a href="${file}" style="color:inherit;display:block">
                <div class="news-image-wrapper">
                    <span class="news-category">${tpl.toUpperCase()}</span>
                    <img src="${HUB_IMGS[i % HUB_IMGS.length]}" alt="${title}" class="news-image">
                </div>
                <div class="news-content">
                    <div class="news-date">หน้าในหมวด</div>
                    <h2 class="news-title">${title}</h2>
                    <span class="news-readmore">เปิดหน้า →</span>
                </div>
                </a>
            </article>`).join('');

  const main = `
    <section class="hero-section">
        <h1>${sec.label}</h1>
        <p>${heroSub('ศูนย์รวมหน้าในหมวด')}</p>
    </section>
    <main class="container container--stack">
        ${demoNote(demoName, 'hub')}
        <div class="news-grid">${cards}</div>
    </main>`;
  write(sec.hub, wrapPage(sec.label, sec.hub, style, main, demoName));
}

/** Sitemap uses demo/sitemap.html directory-grid structure */
function buildSitemap() {
  const demoName = 'sitemap.html';
  const style = extractStyle(readDemo(demoName));
  const cards = SECTIONS.map((sec) => {
    const lis = sec.children.map(([file, title, tpl]) => {
      const href = sec.hub.replace(/index\.html$/, file);
      return `<li><a href="${href}">${title} <span class="tpl-badge">${tpl.toUpperCase()}</span></a></li>`;
    }).join('');
    return `<div class="directory-card">
            <h2 class="category-title"><a href="${sec.hub}">${sec.label}</a></h2>
            <ul class="page-list">${lis}</ul>
        </div>`;
  }).join('\n');
  const specialLis = SPECIAL.map((s) => {
    const demo = CUSTOM_DEMO[s.path] || 'custom';
    return `<li><a href="${s.path}">${s.title} <span class="tpl-badge">CUSTOM</span></a></li>`;
  }).join('');

  const main = `
    <section class="sitemap-hero">
        <h1>แผนผังเว็บไซต์ทั้งระบบ</h1>
        <p>${FACTS.name} · Theme Builder ชุดเดียว · แม่พิมพ์ Divi Library ตามประเภทเนื้อหา</p>
    </section>
    <div class="container">
        ${demoNote(demoName)}
        <div class="directory-grid">
            ${cards}
            <div class="directory-card">
                <h2 class="category-title">หน้าพิเศษ</h2>
                <ul class="page-list">${specialLis}</ul>
            </div>
        </div>
    </div>`;
  write('sitemap.html', wrapPage('แผนผังเว็บไซต์', 'sitemap.html', style, main, demoName));
}

function writeRegistry() {
  const pages = [];
  pages.push({ path: 'index.html', title: 'หน้าแรก', template: 'custom', demo: CUSTOM_DEMO['index.html'] });
  for (const sec of SECTIONS) {
    const isCustomHub = Boolean(CUSTOM_DEMO[sec.hub]);
    pages.push({
      path: sec.hub,
      title: sec.label,
      template: isCustomHub ? 'custom' : 'hub',
      demo: isCustomHub ? CUSTOM_DEMO[sec.hub] : TEMPLATES.t4,
      section: sec.label,
    });
    for (const [file, title, template] of sec.children) {
      const pathFile = sec.hub.replace(/index\.html$/, file);
      pages.push({
        path: pathFile,
        title,
        template: CUSTOM_DEMO[pathFile] ? 'custom' : template,
        demo: CUSTOM_DEMO[pathFile] || TEMPLATES[template],
        section: sec.label,
      });
    }
  }
  for (const s of SPECIAL) {
    pages.push({ path: s.path, title: s.title, template: 'custom', demo: CUSTOM_DEMO[s.path] });
  }
  pages.push({ path: 'sitemap.html', title: 'แผนผังเว็บไซต์', template: 'custom', demo: 'sitemap.html' });

  const registry = {
    generatedAt: new Date().toISOString(),
    standard: {
      leaf: 'T1–T6 from demo/',
      hub: 'T4 news-grid (except custom highlight hubs: admission, portals)',
      custom: 'CUSTOM_DEMO map',
      chrome: 'css/original-common.css only',
    },
    facts: FACTS,
    templates: TEMPLATES,
    customDemo: CUSTOM_DEMO,
    sections: SECTIONS.map((s) => ({
      id: s.id,
      label: s.label,
      hub: s.hub,
      children: s.children.map(([file, title, template]) => ({
        file, title, template, demo: TEMPLATES[template],
      })),
    })),
    pages,
  };
  fs.writeFileSync(path.join(ROOT, 'scripts', 'content-registry.json'), JSON.stringify(registry, null, 2), 'utf8');
}

function writeMainJs() {
  fs.writeFileSync(path.join(ROOT, 'js', 'main.js'), `document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.main-menu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));
  document.querySelectorAll('.main-menu > li > button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 992px)').matches) {
        e.preventDefault();
        btn.parentElement.classList.toggle('open');
      }
    });
  });
});
`, 'utf8');
}

// ---- run ----
writeRegistry();
writeMainJs();

const customDone = new Set();

// 1) Custom / highlight pages
for (const [dest, demoName] of Object.entries(CUSTOM_DEMO)) {
  if (dest === 'sitemap.html') continue;
  const title = SPECIAL.find((s) => s.path === dest)?.title;
  portCustom(dest, demoName, title);
  customDone.add(dest);
}

// 2) Section hubs + leaves
for (const sec of SECTIONS) {
  if (CUSTOM_DEMO[sec.hub]) {
    // already ported as highlight — do not append strips / do not rebuild as T4
  } else {
    buildHub(sec);
  }
  for (const [file, title, template] of sec.children) {
    const dest = sec.hub.replace(/index\.html$/, file);
    if (customDone.has(dest)) continue; // e.g. course-iis, news/ai-forge, admission/faq
    buildFromTemplate(dest, title, template, sec, file);
  }
}

buildSitemap();

function countPages() {
  let n = 1; // index
  for (const sec of SECTIONS) {
    n += 1; // hub
    n += sec.children.length;
  }
  n += SPECIAL.length;
  n += 1; // sitemap
  return n;
}

console.log('Unified pipeline done.');
console.log('Page count (~70 target):', countPages());
console.log('Templates:', TEMPLATES);
console.log('Custom pages:', Object.keys(CUSTOM_DEMO).length);
console.log('Hubs (T4):', SECTIONS.filter((s) => !CUSTOM_DEMO[s.hub]).map((s) => s.hub).join(', '));
console.log('Custom hubs (no strip):', SECTIONS.filter((s) => CUSTOM_DEMO[s.hub]).map((s) => s.hub).join(', '));
console.log('Sections:', SECTIONS.map((s) => s.id).join(', '));