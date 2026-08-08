# SBW Demo + บรีฟ Meweb — โรงเรียนสระบุรีวิทยาคม

ชุดส่งงานสำหรับบริษัท Meweb (WordPress + Divi) · **~70 เพจ** · Library T1–T6 + custom

## เปิดดู Demo

1. **ออนไลน์ (Vercel):** https://sbw-demo-ten.vercel.app/  
2. **ซอร์ส (GitHub):** https://github.com/saengpech-sys/sbw-demo  

3. ในเครื่อง: เปิด [`index.html`](index.html)

## Meweb อ่านเอกสารตามลำดับนี้

| ลำดับ | ไฟล์ |
|--------|------|
| 1 | [`docs/meweb-read-this.md`](docs/meweb-read-this.md) |
| 2 | [`docs/meweb-brief.md`](docs/meweb-brief.md) |
| 3 | [`docs/meweb-handoff-guide.md`](docs/meweb-handoff-guide.md) |
| 4 | [`docs/sitemap-70.md`](docs/sitemap-70.md) |
| 5 | [`docs/divi-structure-guide.md`](docs/divi-structure-guide.md) |
| 6 | [`docs/school-facts.md`](docs/school-facts.md) |
| 7 | [`docs/email-to-meweb.md`](docs/email-to-meweb.md) |

## สิ่งสำคัญ

- Theme Builder **ชุดเดียว** · Divi Library **6–10 แม่พิมพ์** · สร้าง **~70 เพจ**
- หนึ่งหมวด = หนึ่งแม่พิมพ์ (เช่น ชีวิตในโรงเรียน = T5 ทั้งหมวด)
- **ฐานความรู้** = โหลดไฟล์ · **E-Library** = แนะนำหนังสือ + ระบบยืม–คืนภายนอก
- โฟลเดอร์ [`demo/`](demo/) = คลังแม่พิมพ์ (ไม่ใช่ไซต์หลักที่ผู้ใช้เปิด)

## หน้าต้นฉบับสำคัญ (`demo/`)

- Homepage ← `demo/home.html`
- T1–T6 ← `t1-sidebar` … `t6-contact`
- Hub ส่วนใหญ่ ← `t4-news-blog.html`
- ไฮไลต์ ← `admission`, `portals`, `ai-center`, `e-library`, …

## สคริปต์ (ทีมโรงเรียน)

```bash
node scripts/fill-site-content.mjs
```

สร้าง/อัปเดตทุกหน้าจาก `demo/` — pipeline: custom | T1–T6 | hub T4

## ก่อนส่ง Meweb

1. อ่าน [`docs/meweb-read-this.md`](docs/meweb-read-this.md)
2. ตรวจ [`docs/meweb-brief.md`](docs/meweb-brief.md)
3. คัดลอกร่างจาก [`docs/email-to-meweb.md`](docs/email-to-meweb.md) (ใส่ Demo URL)
4. ส่งลิงก์ Vercel + GitHub หรือ zip ตามโครงสร้างใน brief
