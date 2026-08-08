# คู่มือส่งงานละเอียด — Meweb × โรงเรียนสระบุรีวิทยาคม

เอกสารนี้อธิบายวิธีแปลง HTML Demo เป็น WordPress + Divi ให้ตรงสัญญา  
อ่านคู่กับ Demo ออนไลน์และ [`sitemap-70.md`](sitemap-70.md)

- **Demo:** https://sbw-demo-ten.vercel.app/  
- **GitHub:** https://github.com/saengpech-sys/sbw-demo

---

## 1. HTML Demo คืออะไร (และไม่ใช่อะไร)

| คือ | ไม่ใช่ |
|-----|--------|
| แบบอ้างอิง **ภาพ โครง สัดส่วน สี** | ไฟล์ `.json` export จาก Divi |
| ตัวอย่างเนื้อหาโรงเรียน | CMS production พร้อมใช้งาน |
| แผนที่ 70 เพจที่ต้องสร้าง | 70 templates คนละแบบ |

ทีม Meweb สร้างเลย์เอาต์ใหม่ใน Divi โดย **ดู Demo เป็นต้นแบบ** แล้วบันทึกเป็น Library / Theme Builder

โฟลเดอร์ `demo/` = ต้นฉบับแม่พิมพ์ตอนออกแบบ  
หน้าที่ผู้ใช้เปิดจริง = ไฟล์นอก `demo/` ที่ generate แล้ว (เช่น `index.html`, `about/history.html`)

---

## 2. สถาปัตยกรรม Divi ที่ต้องสร้าง

```
Theme Builder (ชุดเดียวทั้งไซต์)
├── Global Header  (โลโก้ + เมนู + ปุ่ม Portals)
├── Global Footer  (4 คอลัมน์ + แถบลิงก์ด่วน)
└── 404 Template

Divi Library (แม่พิมพ์หน้า ~6–10)
├── T1 Sidebar
├── T2 Accordion
├── T3 Personnel
├── T4 Blog / Hub Grid
├── T5 Gallery
├── T6 Contact / Download catalog
└── Custom landings (Home, Admission, Portals, AI, Alumni, ITA, E-Library, …)

Pages (~70)
└── แต่ละหน้า = เลือกแม่พิมพ์ + ใส่เนื้อหา
```

**กฎทอง:** หนึ่งหมวดหลักในเมนู = หนึ่งแม่พิมพ์  
ตัวอย่าง: ทั้งหมวดชีวิตในโรงเรียนใช้ T5 — ห้ามบางหน้าเป็น T1 sidebar

---

## 3. Global Settings

| รายการ | ค่า |
|--------|-----|
| สีหลัก | `#123880` |
| สีรอง | `#FFC20E` |
| พื้นหลัง | `#F5F7FA` |
| ฟอนต์ | Prompt (Google Fonts) |
| โลโก้ | `assets/logo-sbw-new.png` |
| โดเมนเป้าหมาย | www.sbw.ac.th |

---

## 4. แม่พิมพ์ T1–T6 (ละเอียด)

### T1 — Sidebar (`demo/t1-sidebar.html`)

- **ใช้เมื่อ:** เอกสารยาว คู่มือ ประวัติ นโยบาย หน้าลูกหมวดเกี่ยวกับโรงเรียน / นักเรียน / ผู้ปกครอง / รับสมัคร  
- **โครง:** Hero ร่วม + Row คอลัมน์ประมาณ 1/4 (sidebar เมนูหมวด) + 3/4 (เนื้อหา)  
- **Divi:** Section Hero · Row 2 columns · Menu หรือ Text ใน sidebar · Text/Image ใน main  
- **ตัวอย่าง URL:** `/about/history.html`, `/students/handbook.html`, `/admission/regulations.html`

### T2 — Accordion (`demo/t2-curriculum-accordion.html`)

- **ใช้เมื่อ:** ทั้งหมวดหลักสูตร  
- **โครง:** Hero + Accordion/Toggle เต็มความกว้าง **ไม่มี sidebar**  
- **Divi:** Toggle หรือ Accordion module  
- **ตัวอย่าง:** `/curriculum/lower-secondary.html`, `/curriculum/special-programs.html`

### T3 — Personnel (`demo/t3-personnel.html`)

- **ใช้เมื่อ:** ทั้งหมวดบุคลากร  
- **โครง:** Hero + กริดการ์ดบุคคล เต็มความกว้าง  
- **Divi:** Person module / Blurb grid  
- **ตัวอย่าง:** `/staff/teachers.html`, `/staff/executives.html`

### T4 — Blog / Hub Grid (`demo/t4-news-blog.html`)

- **ใช้เมื่อ:** หน้าข่าว และ **หน้า hub ส่วนใหญ่** (ดัชนีหมวด)  
- **โครง:** Hero + กริดการ์ดข่าว/ลิงก์  
- **Divi:** Blog module หรือ Blurb grid  
- **ตัวอย่าง:** `/news/general.html`, `/about/index.html`, `/knowledge-base/index.html`  
- **ข้อยกเว้น hub:** `admission/index.html` และ `portals/index.html` เป็น **custom** จาก demo โดยตรง

### T5 — Gallery (`demo/t5-gallery.html`)

- **ใช้เมื่อ:** ทั้งหมวดชีวิตในโรงเรียน (รวมชุมนุม)  
- **โครง:** Hero + Gallery เต็มความกว้าง **ไม่มี sidebar**  
- **Divi:** Gallery / Image grid  
- **ตัวอย่าง:** `/student-life/clubs.html`, `/student-life/esports.html`

### T6 — Contact / Download (`demo/t6-contact.html`)

- **ใช้เมื่อ:** ติดต่อ, ฐานความรู้ (โหลดไฟล์), หน้าลูก Portals  
- **โครง:** Hero + ฟอร์ม / การ์ดดาวน์โหลด / ปุ่มเข้าสู่ระบบ  
- **Divi:** Contact Form, Blurb/Button cards, Map  
- **ตัวอย่าง:** `/contact/message.html`, `/knowledge-base/forms.html`, `/portals/grades.html`

---

## 5. หน้า Custom ที่ต้องทำพิเศษ

สร้างเลย์เอาต์ตามไฟล์ใน `demo/` ทีละหน้า อย่าบังคับเป็น T1–T6

| หน้า | Path | ต้นแบบ demo | หมายเหตุ |
|------|------|-------------|----------|
| หน้าแรก | `index.html` | `home.html` | Hero + quick links + ข่าว + CTA |
| รับสมัคร | `admission/index.html` | `admission.html` | รวม CTA สมัครออนไลน์ในหน้านี้ |
| Portals | `portals/index.html` | `portals.html` | ทางลัดระบบ / SSO Dschool AI |
| SBW-AI | `ai-center.html` | `ai-center.html` | ศูนย์ AI |
| AI Forge | `ai-forge.html` | `ai-forge.html` | โครงการไฮไลต์ |
| Alumni | `alumni.html` | `alumni.html` | ศิษย์เก่า |
| ITA | `ita.html` | `ita.html` | ความโปร่งใส |
| E-Library | `e-library.html` | `e-library.html` | **แนะนำหนังสือ + CTA ยืม–คืนภายนอก** |
| ปฏิทินกลาง | `calendar.html` | `calendar.html` | ปฏิทินทั้งโรงเรียน |
| Privacy | `privacy.html` | `privacy.html` | นโยบาย |
| 404 | `404.html` | `404.html` | Theme Builder 404 |
| Sitemap | `sitemap.html` | `sitemap.html` | แผนผังนำทาง |

---

## 6. ฐานความรู้ ≠ E-Library

| | **ฐานความรู้ (Knowledge Base)** | **E-Library** |
|--|----------------------------------|---------------|
| จุดประสงค์ | ให้**ดาวน์โหลดไฟล์** (แบบฟอร์ม คู่มือ สื่อ) | **แนะนำหนังสือ** และพาไประบบยืม–คืน |
| ระบบจริง | Media Library / ไฟล์บนเว็บ | ระบบยืม–คืน**ภายนอกที่มีอยู่แล้ว** |
| Path | `knowledge-base/` (4 หน้า) | `e-library.html` (1 หน้า) |
| ห้าม | ใส่ฟังก์ชันยืม–คืน | ใส่รายการแบบฟอร์มราชการปนหน้านี้ |

เมนู/ฟุตเตอร์ “ฐานความรู้” → โหลดไฟล์  
ลิงก์ “E-Library” → หน้าแนะนำ + ปุ่มเข้าสู่ระบบห้องสมุด

---

## 7. เมนูและการนำทาง

- เมนูใหญ่ครอบคลุมหมวดตาม Demo (ไม่จำกัดแค่ 7 กลุ่มใน brief — brief คือสรุปธุรกิจ ส่วนไซต์แมป 70 คือรายการสร้างจริง)  
- ปุ่ม **Portals** ใน Header → `portals/index.html`  
- ฟุตเตอร์ลิงก์ด่วน: รับสมัคร, ข่าว, AI, ศิษย์เก่า, ITA, E-Library, แผนผัง  
- ลิงก์ซ้ำที่ถูกตัด: อย่าสร้างหน้าซ้ำ — ใช้จุดเดียวใน `sitemap-70.md` ส่วน “หน้าที่ตัดออก”

---

## 8. เนื้อหา vs โครง

- Demo มีข้อความตัวอย่างจากข้อเท็จจริงโรงเรียน (`school-facts.md`)  
- ตอนขึ้นจริง: โรงเรียน/Meweb ใส่เนื้อหาและไฟล์จริงใน CMS  
- โครงและสัดส่วนต้องใกล้เคียง Demo — เปลี่ยนได้เฉพาะเนื้อหาและสื่อ

---

## 9. Checklist ตรวจรับก่อนส่งมอบโรงเรียน

- [ ] Theme Builder Header/Footer/404 ใช้ได้ทุกหน้า  
- [ ] Divi Library มี T1–T6 + custom landings ตามตาราง  
- [ ] นับเพจ ≈ 70 ตาม `sitemap-70.md`  
- [ ] หนึ่งหมวดหนึ่งแม่พิมพ์ (ตรวจชีวิตในโรงเรียน = T5 ทั้งหมด)  
- [ ] สี/ฟอนต์/โลโก้ตรง Global Settings  
- [ ] ฐานความรู้โหลดไฟล์ได้ (หรือโครงพร้อมแนบไฟล์)  
- [ ] E-Library มี CTA ไประบบยืม–คืนภายนอก — ไม่ปนแบบฟอร์มราชการ  
- [ ] Portals มีทางลัด Student / Teacher / ผลการเรียน  
- [ ] ฟอร์มติดต่อส่งถึงอีเมลที่ระบุใน brief  
- [ ] มือถือใช้งานได้ (เมนู + หน้าหลัก + ฟอร์ม)  
- [ ] อบรมแอดมินโรงเรียน + คู่มือสั้น

---

## 10. สิ่งที่อยู่นอกขอบเขตชุด Demo นี้

- ไม่ได้รวมระบบยืม–คืนหนังสือในเว็บ  
- ไม่ได้รวม SSO จริงกับ Dschool AI (มีปุ่ม/ทางลัดเป็นต้นแบบ)  
- ไม่ได้ export Divi JSON จาก HTML  
- สคริปต์ใน `scripts/` เป็นเครื่องมือภายในทีมโรงเรียน — Meweb ไม่ต้องรัน

---

## 11. จุดเริ่มทำงานแนะนำ

1. เปิด Demo URL ไล่เมนู 10 นาที  
2. สร้าง Global Header/Footer ให้ใกล้เคียง Demo  
3. สร้าง Library T1 แล้วทำ `about/history` เป็นหน้าตัวอย่าง  
4. สร้าง T5 แล้วทำ `student-life/clubs` เป็นตัวอย่างหมวดไม่มี sidebar  
5. สร้าง custom Home + Admission + Portals  
6. ไล่สร้างที่เหลือตามตาราง `sitemap-70.md`
