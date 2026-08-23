# เว็บไซต์รายงานการฝึกปฏิบัติการสอน (Static Site)

เว็บไซต์นี้สร้างขึ้นเพื่อใช้เป็นแฟ้มสะสมผลงานและรายงานการฝึกปฏิบัติการสอน โดยใช้ Next.js (App Router) และ Tailwind CSS ในรูปแบบ **Static Site (ไม่มีระบบหลังบ้าน)** เพื่อความรวดเร็วและดูแลรักษาง่าย

## ความต้องการของระบบ (Prerequisites)
- Node.js (v18 หรือสูงกว่า)
- npm หรือ yarn หรือ pnpm
- บัญชี Vercel สำหรับ Deploy (ตัวเลือก)
- บัญชี Google Drive สำหรับอัปโหลดไฟล์ PDF
- บัญชี Google Sheets สำหรับพิมพ์บันทึกการสอน

## วิธีการรันโปรเจกต์ในเครื่อง (Local Development)

1. ติดตั้ง Dependencies
```bash
npm install
```

2. รันเซิร์ฟเวอร์
```bash
npm run dev
```
เปิดเบราว์เซอร์และเข้าไปที่ [http://localhost:3000](http://localhost:3000)

## วิธีการจัดการเนื้อหาในเว็บ

เนื้อหาทั้งหมดของเว็บไซต์นี้จะถูกดึงมาจากไฟล์ `src/data/siteData.ts` คุณสามารถแก้ไขข้อมูลในไฟล์นี้เพื่ออัปเดตหน้าเว็บได้ทันที:

1. **ข้อมูลส่วนตัวและสถานศึกษา (`siteData.student`, `siteData.practicum`)**
   - แก้ไขชื่อ, สาขา, ชื่อโรงเรียน ฯลฯ ได้ที่ต้นไฟล์ `siteData.ts`

2. **ตารางสอน (`schedulePdfConfig`)**
   - นำไฟล์ตารางสอนที่เป็น PDF ไปอัปโหลดขึ้น Google Drive 
   - ตั้งค่าแชร์เป็น "ทุกคนที่มีลิงก์ (Anyone with the link)"
   - นำลิงก์มาวางใน `schedulePdfConfig.semester1Url` โดยระบบจะแปลงให้เป็นตัวพรีวิวอัตโนมัติ

3. **บันทึกการสอน (`teachingLogConfig`)**
   - สร้าง Google Sheets เพื่อใช้เป็นตารางบันทึกรายวันของคุณ
   - ไปที่เมนู `File > Share > Publish to web` (ไฟล์ > แชร์ > เผยแพร่ทางเว็บ)
   - เลือกรูปแบบเป็น `Embed` (ฝัง) และกด Publish
   - นำโค้ด URL ที่ได้ (เฉพาะส่วนที่เป็นลิงก์ https://...) มาวางใน `teachingLogConfig.semester1Url`

4. **แผนการสอน, วิจัย, และแบบประเมิน**
   - ใช้งานรูปแบบเดียวกับข้อ 2 คือฝากไฟล์ไว้ที่ Google Drive และนำลิงก์มาเพิ่มใน Array อย่างเช่น `lessonPlans.semester1`

5. **ภาพกิจกรรม (`activities`)**
   - นำไฟล์รูปภาพที่ต้องการมาวางไว้ในโฟลเดอร์ย่อยของ `public/images/` ตามหมวดหมู่:
     - `public/images/activities/` (สำหรับภาพกิจกรรมทั่วไป)
     - `public/images/teaching/` (สำหรับภาพระหว่างปฏิบัติการสอน)
     - `public/images/others/` (สำหรับภาพอื่นๆ)
   - นำเส้นทางของไฟล์ (เช่น `/images/activities/รูปภาพ.jpg` หรือ `/images/teaching/สอนห้อง1.jpg`) มาใส่ใน Array `images` ของแต่ละกิจกรรม

## การ Deploy บน Vercel

1. สร้าง Repository บน GitHub และ Push โค้ดทั้งหมดขึ้นไป
2. สมัครและล็อกอินเข้าสู่ [Vercel](https://vercel.com)
3. กดปุ่ม **Add New... > Project** และเลือก Repository ที่เพิ่งสร้าง
4. Deploy โปรเจกต์ได้เลย ไม่ต้องมีการเชื่อมต่อฐานข้อมูลใดๆ
