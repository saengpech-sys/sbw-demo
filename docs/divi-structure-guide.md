# คู่มือโครงสร้าง Divi ใน HTML Demo

เลย์เอาต์ภาพตรงกับไฟล์ต้นฉบับใน `demo/`  
Markup เพิ่มโครง Divi Theme Builder ให้ทีม Meweb map ไปสร้างได้

อ่านคู่กับ: [`meweb-read-this.md`](meweb-read-this.md) · [`meweb-handoff-guide.md`](meweb-handoff-guide.md) · [`sitemap-70.md`](sitemap-70.md)

## สิ่งที่ต้องเข้าใจก่อน

บนเว็บเดียวกันมี **3 กลุ่มหน้า** แต่ใช้ **Theme Builder ชุดเดียว** (Header / Footer / เมนู):

| กลุ่ม | ความหมายใน Divi | ไม่ใช่ |
|--------|------------------|--------|
| **Custom** | หน้าไฮไลต์ layout พิเศษ (Home, Admission, Portals, AI…) | ไม่ใช่ธีมคนละตัว |
| **T1–T6** | **Divi Library Page Templates** ตามประเภทเนื้อหา | ไม่ใช่ระบบนำทางคนละเส้น |
| **Hub T4** | หน้าดัชนีหมวด ใช้ Blog/Grid แบบเดียวกับ T4 | ไม่ใช่ CMS คนละตัว |

คำที่ควรใช้กับ Meweb: **Page Template / Divi Library Layout / Theme Builder**  
คำที่ไม่ควรใช้: router

### ประโยคส่งงานสั้นๆ

> เว็บใช้ Theme Builder ชุดเดียว  
> เนื้อหาแต่ละหน้าเลือกแม่พิมพ์จาก Divi Library ตามประเภทข้อมูล  
> หนึ่งหมวด = หนึ่งแม่พิมพ์  
> ห้ามออกแบบสัดส่วนใหม่ — ยึดไฟล์ใน `demo/`

## โครงระดับหน้า

```
#et-boc.et-boc
├── header.et-l.et-l--header.global-header   ← Theme Builder Header
├── #et-main-area                             ← Body (ตามแม่พิมพ์)
└── footer.et-l.et-l--footer.global-footer   ← Theme Builder Footer
```

Chrome (เมนู/โลโก้/ฟุตเตอร์) จาก `css/original-common.css` แหล่งเดียว  
Hero ทุกหน้าใช้สไตล์ร่วม

## หน่วย Divi ที่ใช้ใน demo

| Class / โครง | Divi Module |
|---|---|
| `.global-header` + `.logo` img | Image + Menu + Button |
| `.hero-home` / `.hero-section` | Fullwidth Header / Section background |
| `.ql-card` | Blurb |
| `.news-card` / Hub cards | Blog Grid (T4) |
| `.container` > `.sidebar` + `.main-content` | Row 1/4 + 3/4 (T1) |
| Accordion ในหน้าหลักสูตร | Toggle / Accordion (T2) |
| Person grid บุคลากร | Person Module (T3) |
| Gallery grid | Gallery (T5) |
| Contact form / download cards / map | Contact Form / Blurb / Map (T6) |
| `.global-footer` 4 คอลัมน์ | Footer Section 4 columns |

## ตาราง map: ประเภทเนื้อหา → แม่พิมพ์ → ไฟล์ demo

| ประเภทเนื้อหา | แม่พิมพ์ | ไฟล์ต้นแบบใน `demo/` | ตัวอย่างหน้า |
|---|---|---|---|
| เอกสาร / คู่มือ / ประวัติ / รับสมัครลูก | T1 Sidebar | `t1-sidebar.html` | `about/history.html`, `admission/faq.html` |
| ทั้งหมวดหลักสูตร | T2 Accordion | `t2-curriculum-accordion.html` | `curriculum/lower-secondary.html` |
| ทั้งหมวดบุคลากร | T3 Personnel | `t3-personnel.html` | `staff/teachers.html` |
| ข่าว / Hub หมวด | T4 Blog Grid | `t4-news-blog.html` | `news/general.html`, `about/index.html` |
| ทั้งหมวดชีวิตในโรงเรียน | T5 Gallery | `t5-gallery.html` | `student-life/clubs.html`, `student-life/esports.html` |
| ติดต่อ / ฐานความรู้ / Portals ลูก | T6 Contact | `t6-contact.html` | `knowledge-base/forms.html`, `contact/message.html` |
| หน้าไฮไลต์ | Custom | `home.html`, `admission.html`, `portals.html`, … | `index.html`, `e-library.html` |

## Custom Landing (ต้นฉบับ)

| หน้า | ไฟล์ demo | หน้าส่งมอบ |
|---|---|---|
| Homepage | `home.html` | `index.html` |
| Admissions | `admission.html` | `admission/index.html` |
| Portals | `portals.html` | `portals/index.html` |
| SBW-AI | `ai-center.html` | `ai-center.html` |
| AI Forge | `ai-forge.html` | `ai-forge.html` |
| Alumni | `alumni.html` | `alumni.html` |
| ITA | `ita.html` | `ita.html` |
| E-Library | `e-library.html` | `e-library.html` |
| Calendar | `calendar.html` | `calendar.html` |
| Privacy / 404 / Sitemap | ตามชื่อไฟล์ | ตามชื่อไฟล์ |

## Knowledge Base vs E-Library

| | ฐานความรู้ | E-Library |
|--|------------|-----------|
| Path | `knowledge-base/` | `e-library.html` |
| บทบาท | โหลดไฟล์ | แนะนำหนังสือ + CTA ยืม–คืนภายนอก |

## หมายเหตุส่งมอบ

- เป็น visual + structural reference ไม่ใช่ไฟล์ `.json` export จาก Divi
- รหัสแม่พิมพ์ (T1–T6) อยู่ใน HTML comment สำหรับทีมงาน — ไม่โชว์เป็นป้ายบนหน้าเว็บ
- รายการครบทุกหน้า: [`sitemap-70.md`](sitemap-70.md)
- รันอัปเดตทั้งไซต์ (ทีมโรงเรียน): `node scripts/fill-site-content.mjs`
