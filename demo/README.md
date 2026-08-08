# Demo HTML sources (Divi proportions)

ต้นแบบ UI ตามสัดส่วน Divi/WordPress  
สคริปต์ `fill-site-content.mjs` อ่านไฟล์เหล่านี้

## กฎมาตรฐานเดียว

| ประเภท | ต้นแบบ | ความหมายใน Divi |
|--------|--------|------------------|
| หน้าลูกทั่วไป | `t1` … `t6` | Divi Library Page Templates |
| Hub หมวด | `t4-news-blog.html` | Blog / Grid (เหมือน T4) |
| ไฮไลต์ | `home`, `admission`, `portals`, … | Custom layout |
| Chrome | `css/original-common.css` | Theme Builder Header/Footer |

ความต่างของ T1 vs T5 เป็นโมดูลคนละแบบ — ไม่ใช่ “router” คนละระบบ  
ดูคำอธิบายเต็มใน [`docs/divi-structure-guide.md`](../docs/divi-structure-guide.md)

## ไฟล์ต้นแบบ

| ไฟล์ | ความหมาย |
|------|----------|
| `home.html` | หน้าแรก |
| `t1-sidebar.html` | T1 — Sidebar + เนื้อหา |
| `t2-curriculum-accordion.html` | T2 — Accordion |
| `t3-personnel.html` | T3 — กริดบุคลากร |
| `t4-news-blog.html` | T4 — กริดข่าว + **hub ทุกหมวด** |
| `t5-gallery.html` | T5 — Gallery |
| `t6-contact.html` | T6 — ติดต่อ / ดาวน์โหลด / ฟอร์ม |
| `admission.html` | รับสมัคร (ไฮไลต์) |
| `portals.html` | ระบบออนไลน์ (ไฮไลต์) |
| `ai-center.html` / `ai-forge.html` / `news-ai-forge.html` | AI |
| `course-iis.html` | รายวิชา IIS |
| `alumni.html` / `ita.html` / `e-library.html` | พิเศษ |
| `faq.html` / `calendar.html` / `sitemap.html` / `privacy.html` / `404.html` | ระบบ |
| `student-life.html` | reference เท่านั้น (hub ใช้ T4) |
