# ไซต์แมป 70 หน้า — โรงเรียนสระบุรีวิทยาคม

สัญญา Meweb = **70 เพจ** (ไม่ใช่ 70 templates)
แม่พิมพ์ Divi Library จริง ≈ **6–10 แบบ** (T1–T6 + custom)
กฎ: **หนึ่งหมวดหลัก = หนึ่งแม่พิมพ์** · HTML เป็นแบบอ้างอิง ไม่ใช่ไฟล์ import Divi

## สรุปแม่พิมพ์ต่อหมวด

| หมวด | แม่พิมพ์ | Sidebar |
|------|----------|---------|
| เกี่ยวกับโรงเรียน | T1 | มี |
| หลักสูตร | T2 | ไม่มี |
| ข่าว | T4 | ไม่มี |
| รับสมัคร (ลูก) | T1 · hub = custom | มี (ลูก) |
| ชีวิตในโรงเรียน | T5 | ไม่มี |
| บุคลากร | T3 | ไม่มี |
| นักเรียน / ผู้ปกครอง | T1 | มี |
| ฐานความรู้ | T6 catalog | ไม่มี |
| ติดต่อ | T6 | ไม่มี |
| Portals (ลูก) | T6 · hub = custom | ไม่มี |
| หน้าพิเศษ | custom ตาม demo | ตามต้นฉบับ |

## Knowledge Base ≠ E-Library

| | ฐานความรู้ | E-Library |
|--|------------|-----------|
| จุดประสงค์ | โหลดไฟล์ | แนะนำหนังสือ + ประตูยืม–คืนภายนอก |
| Path | `knowledge-base/` | `e-library.html` |

## ตารางทุกหน้า (70)

| # | Path | ชื่อหน้า | บทบาท | แม่พิมพ์ | ต้นแบบ demo/ | หมายเหตุ Meweb |
|---|------|----------|--------|----------|--------------|----------------|
| 1 | `index.html` | หน้าแรก | หน้าแรก: แบนเนอร์ สโลแกน ข่าวเด่น เมนูลัด Portals สถิติ — หน้าไฮไลต์หลักของทั้งไซต์ | custom | `home.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 2 | `about/index.html` | เกี่ยวกับโรงเรียน | ดัชนีหมวดเกี่ยวกับโรงเรียน — การ์ดลิงก์ไปหน้าลูกทั้งหมด | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 3 | `about/history.html` | ประวัติโรงเรียน | ประวัติและเกียรติภูมิโรงเรียนแบบเอกสารยาว มี sidebar นำทางในหมวด | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 4 | `about/vision.html` | วิสัยทัศน์ / พันธกิจ | วิสัยทัศน์และพันธกิจ — เอกสารยาวพร้อม sidebar | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 5 | `about/philosophy.html` | ปรัชญา / คติพจน์ | ปรัชญา คติพจน์ และแนวคิดบริหาร | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 6 | `about/symbols.html` | สัญลักษณ์โรงเรียน | ตรา สี และความหมายสัญลักษณ์โรงเรียน | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 7 | `about/administrators.html` | ทำเนียบผู้บริหาร | ทำเนียบผู้บริหาร (รายชื่อในแม่พิมพ์ T1 ตามมาตรฐานหมวด) | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 8 | `about/director-message.html` | สารจากผู้อำนวยการ | สารจากผู้อำนวยการ | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 9 | `about/org-structure.html` | โครงสร้างการบริหาร | โครงสร้างการบริหารและฝ่ายงาน | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 10 | `about/general.html` | ข้อมูลทั่วไป | ข้อมูลทั่วไป ที่อยู่ โทร สถิติพื้นฐาน | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 11 | `curriculum/index.html` | หลักสูตรและการเรียนการสอน | ดัชนีหมวดหลักสูตร | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 12 | `curriculum/lower-secondary.html` | หลักสูตรมัธยมศึกษาตอนต้น | หลักสูตร ม.ต้น — Accordion รายห้องเรียน/โปรแกรม | t2 | `t2-curriculum-accordion.html` | Library T2 Accordion |
| 13 | `curriculum/upper-secondary.html` | หลักสูตรมัธยมศึกษาตอนปลาย | หลักสูตร ม.ปลาย — Accordion แผนวิทย์-ศิลป์ และพิเศษ | t2 | `t2-curriculum-accordion.html` | Library T2 Accordion |
| 14 | `curriculum/special-programs.html` | ห้องเรียนพิเศษ | ห้องเรียนพิเศษ SMTE / EP / MEP / IIS | t2 | `t2-curriculum-accordion.html` | Library T2 Accordion |
| 15 | `curriculum/study-plans.html` | แผนการเรียน | แผนการเรียนรายชั้น | t2 | `t2-curriculum-accordion.html` | Library T2 Accordion |
| 16 | `curriculum/departments.html` | กลุ่มสาระการเรียนรู้ | กลุ่มสาระการเรียนรู้ (อยู่ที่หลักสูตร ไม่ซ้ำหมวดบุคลากร) | t2 | `t2-curriculum-accordion.html` | Library T2 Accordion |
| 17 | `curriculum/handbook.html` | คู่มือหลักสูตร | คู่มือหลักสูตรแบบ Accordion | t2 | `t2-curriculum-accordion.html` | Library T2 Accordion |
| 18 | `news/index.html` | ข่าวประชาสัมพันธ์ | ดัชนีข่าว — กริดการ์ดหมวดข่าว | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 19 | `news/general.html` | ข่าวทั่วไป | รายการข่าวทั่วไปแบบ Blog Grid | t4 | `t4-news-blog.html` | Library T4 Blog Grid |
| 20 | `news/academic.html` | ข่าววิชาการ | ข่าววิชาการ / ห้องเรียนพิเศษ | t4 | `t4-news-blog.html` | Library T4 Blog Grid |
| 21 | `news/activities.html` | ข่าวกิจกรรม | ข่าวกิจกรรม (รวมแข่งขัน/ทัศนศึกษาในเนื้อหา) | t4 | `t4-news-blog.html` | Library T4 Blog Grid |
| 22 | `news/announcements.html` | ประกาศโรงเรียน | ประกาศโรงเรียนอย่างเป็นทางการ | t4 | `t4-news-blog.html` | Library T4 Blog Grid |
| 23 | `admission/index.html` | รับสมัครนักเรียน | หน้าไฮไลต์รับสมัคร — CTA สมัครออนไลน์อยู่ในหน้านี้ | custom | `admission.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 24 | `admission/regulations.html` | ระเบียบการรับสมัคร | ระเบียบการรับสมัคร ม.1/ม.4 | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 25 | `admission/calendar.html` | ปฏิทินการรับสมัคร | ปฏิทินเฉพาะช่วงรับสมัคร (คนละหน้ากับปฏิทินกลาง) | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 26 | `admission/status.html` | ตรวจสอบสถานะ | ตรวจสอบสถานะการสมัคร | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 27 | `admission/results.html` | ประกาศผล | ประกาศผลการรับสมัคร | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 28 | `admission/faq.html` | FAQ | FAQ รับสมัคร (ศูนย์ FAQ เดียว) | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 29 | `student-life/index.html` | ชีวิตในโรงเรียน | ดัชนีชีวิตในโรงเรียน | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 30 | `student-life/highlights.html` | กิจกรรมเด่น | ไฮไลต์กิจกรรม — Gallery full-width ไม่มี sidebar | t5 | `t5-gallery.html` | Library T5 Gallery |
| 31 | `student-life/clubs.html` | ชุมนุม | ชุมนุม — Gallery T5 (มาตรฐานเดียวทั้งหมวด) | t5 | `t5-gallery.html` | Library T5 Gallery |
| 32 | `student-life/sports.html` | กีฬา | กีฬา / กีฬาสี | t5 | `t5-gallery.html` | Library T5 Gallery |
| 33 | `student-life/esports.html` | eSports | eSports | t5 | `t5-gallery.html` | Library T5 Gallery |
| 34 | `student-life/gallery.html` | Gallery | คลังภาพกิจกรรมและผลงาน | t5 | `t5-gallery.html` | Library T5 Gallery |
| 35 | `staff/index.html` | บุคลากร | ดัชนีบุคลากร | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 36 | `staff/executives.html` | ผู้บริหาร | Person grid ผู้บริหาร | t3 | `t3-personnel.html` | Library T3 Person grid |
| 37 | `staff/teachers.html` | ครูผู้สอน | Person grid ครูผู้สอน | t3 | `t3-personnel.html` | Library T3 Person grid |
| 38 | `staff/officers.html` | เจ้าหน้าที่ | Person grid เจ้าหน้าที่ | t3 | `t3-personnel.html` | Library T3 Person grid |
| 39 | `staff/contact.html` | ติดต่อบุคลากร | แบบฟอร์มติดต่อบุคลากรในเลย์เอาต์ T3 | t3 | `t3-personnel.html` | Library T3 Person grid |
| 40 | `students/index.html` | สำหรับนักเรียน | ดัชนีสำหรับนักเรียน | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 41 | `students/timetable.html` | ตารางเรียน | ตารางเรียน (จุดเดียว — หลักสูตรไม่ซ้ำ) | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 42 | `students/exam-schedule.html` | ตารางสอบ | ตารางสอบ | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 43 | `students/activities.html` | ระบบงานกิจกรรม | ระบบงานกิจกรรม / ชุมนุม | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 44 | `students/handbook.html` | คู่มือนักเรียน | คู่มือนักเรียน + ลิงก์ Portals / ฐานความรู้ / ปฏิทินกลาง | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 45 | `parents/index.html` | สำหรับผู้ปกครอง | ดัชนีผู้ปกครอง | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 46 | `parents/news.html` | ข่าวผู้ปกครอง | ข่าวผู้ปกครอง (T1 ตามมาตรฐานหมวด) | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 47 | `parents/handbook.html` | คู่มือผู้ปกครอง | คู่มือผู้ปกครอง + ลิงก์ปฏิทินกลาง | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 48 | `parents/advisor.html` | ติดต่อครูที่ปรึกษา | แบบฟอร์มติดต่อครูที่ปรึกษา | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 49 | `parents/report.html` | ช่องทางแจ้งเรื่อง | ช่องทางแจ้งเรื่อง | t1 | `t1-sidebar.html` | Library T1 Sidebar 1/4+3/4 |
| 50 | `knowledge-base/index.html` | ฐานความรู้ | ศูนย์ฐานความรู้ — โหลดไฟล์ (ไม่ใช่ยืมหนังสือ) | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 51 | `knowledge-base/forms.html` | แบบฟอร์มราชการ | ดาวน์โหลดแบบฟอร์มราชการ | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 52 | `knowledge-base/documents.html` | คู่มือ / เอกสาร | คู่มือและเอกสารวิชาการ | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 53 | `knowledge-base/media.html` | โลโก้ / สื่อ | โลโก้และสื่อเผยแพร่ | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 54 | `contact/index.html` | ติดต่อเรา | ดัชนีติดต่อ | hub | `t4-news-blog.html` | Hub = Blog/Grid แบบ T4 |
| 55 | `contact/info.html` | ข้อมูลติดต่อ | ที่อยู่ โทร อีเมล Facebook (รวม Social) | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 56 | `contact/map.html` | แผนที่ | แผนที่ Google Maps | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 57 | `contact/message.html` | ส่งข้อความถึงโรงเรียน | แบบฟอร์มส่งข้อความถึงโรงเรียน | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 58 | `portals/index.html` | ระบบออนไลน์ | หน้าไฮไลต์ทางลัดระบบออนไลน์ / Dschool AI | custom | `portals.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 59 | `portals/student.html` | Student Portal | ประตู Student Portal (+ LMS ในคำอธิบายหน้า) | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 60 | `portals/teacher.html` | Teacher Portal | ประตู Teacher Portal | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 61 | `portals/grades.html` | เช็คผลการเรียน | เช็คผลการเรียน (จุดเดียว) | t6 | `t6-contact.html` | Library T6 Contact/Download |
| 62 | `ita.html` | ความโปร่งใส (ITA) | ความโปร่งใส ITA/OIT — หน้าไฮไลต์ | custom | `ita.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 63 | `alumni.html` | สมาคมศิษย์เก่า | สมาคมศิษย์เก่า — หน้าไฮไลต์ | custom | `alumni.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 64 | `ai-center.html` | SBW-AI Center | SBW-AI Center — หน้าไฮไลต์ | custom | `ai-center.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 65 | `ai-forge.html` | The AI Forge | The AI Forge — หน้าไฮไลต์โครงการ | custom | `ai-forge.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 66 | `e-library.html` | E-Library · แนะนำหนังสือ | แนะนำหนังสือ + CTA เข้าระบบยืม–คืนภายนอก (ไม่ใช่ KB) | custom | `e-library.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 67 | `privacy.html` | นโยบายความเป็นส่วนตัว | นโยบายความเป็นส่วนตัว | custom | `privacy.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 68 | `calendar.html` | ปฏิทินกิจกรรมโรงเรียน | ปฏิทินกิจกรรมกลางทั้งโรงเรียน | custom | `calendar.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 69 | `404.html` | ไม่พบหน้าเว็บ | หน้าไม่พบ — Theme Builder 404 | custom | `404.html` | สร้างเลย์เอาต์พิเศษตาม demo |
| 70 | `sitemap.html` | แผนผังเว็บไซต์ | แผนผังเว็บทั้งระบบสำหรับนำทางและตรวจรับ | custom | `sitemap.html` | สร้างเลย์เอาต์พิเศษตาม demo |

## หน้าที่ตัดออก (อย่าสร้างซ้ำ)

- `downloads/*` → ใช้ `knowledge-base/*`
- `curriculum/timetable.html` → ใช้ `students/timetable.html`
- `students/grades.html` → ใช้ `portals/grades.html`
- `parents/calendar.html` → ใช้ `calendar.html`
- `admission/apply.html` → CTA ใน `admission/index.html`
- `faq.html` ราก → ใช้ `admission/faq.html`
- ข่าวแข่งขัน / จดหมายข่าว / field-trips / achievements / LMS แยกหน้า → รวมในหน้าใกล้เคียง
