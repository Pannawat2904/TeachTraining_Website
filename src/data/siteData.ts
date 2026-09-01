export const siteData = {
  student: {
    name: "นายปาณวัฐ รักรอดจิต",
    studentId: "6602041620106",
    profileImageUrl: "/images/others/profile_author2.jpg",
    major: "สาขาเทคโนโลยีคอมพิวเตอร์",
    department: "ภาควิชาคอมพิวเตอร์ศึกษา",
    faculty: "คณะครุศาสตร์อุตสาหกรรม",
    university: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    profileImage: "/images/placeholder-profile.jpg", // TODO: Add real image
  },
  practicum: {
    courses: [
      { courseCode: "21901-2017", courseName: "เทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์", hours: "ตามตาราง" },
      { courseCode: "21910-2015", courseName: "โปรแกรมมัลติมีเดีย", hours: "ตามตาราง" },
      { courseCode: "21910-2012", courseName: "โปรแกรมฐานข้อมูล", hours: "ตามตาราง" }
    ],
    schoolName: "วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี",
    department: "แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ",
    duration: "ภาคเรียนที่ 1 ปีการศึกษา 2567",
    teachingDays: "วันจันทร์ - วันศุกร์ เวลา 08.00 - 16.00 น.",
    schoolImage: "/images/placeholder-school.jpg", // TODO: Add real image
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.072221648937!2d99.32422781427503!3d9.14151703673397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30540673d32bb581%3A0x6e25c0cc099cd3f0!2sSurat%20Thani%20Vocational%20College!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth" // placeholder for Surat Thani Vocational College
  },
  mentor: {
    name: "ครูวินิต สืบสอน, ครูเมธาสิทธิ์ พลวัชรินทร์, ครูสุพัตรา เมืองฤกษ์",
    position: "ครูพี่เลี้ยง",
    department: "แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ",
    image: "/images/placeholder-mentor.jpg",
  },
  supervisor: {
    name: "ดร. พุทธิดา สกุลวิริยกิจกุล",
    position: "อาจารย์นิเทศก์",
    department: "ภาควิชาคอมพิวเตอร์ศึกษา มจพ.",
    image: "/images/placeholder-supervisor.jpg",
  }
};

export const scheduleData = {
  semester1: {
    academicYear: "1/2569",
    schoolName: "วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี",
    teacher: "นายปาณวัฐ รักรอดจิต",
    role: "นักศึกษาฝึกประสบการณ์วิชาชีพครู",
    department: "แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ",
    coursesSummary: [
      { code: "21901-2017", name: "เทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์", t: 1, p: 2, n: 2, c: 3 },
      { code: "21910-2012", name: "โปรแกรมฐานข้อมูล", t: 2, p: 2, n: 3, c: 4 },
      { code: "21910-2015", name: "โปรแกรมมัลติมีเดีย", t: 2, p: 2, n: 3, c: 4 },
    ],
    totals: { t: 5, p: 6, n: 8, c: 11 },
    timeSlots: [
      "07:40 - 08:00",
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:20 - 16:20",
      "16:20 - 17:20",
      "17:20 - 18:20",
      "18:20 - 19:20"
    ],
    periods: ["กิจกรรม", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    days: ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์"],
    classes: [
      {
        day: "วันจันทร์",
        periodStart: 1, // 08:00 - 10:00 (period 1-2)
        periodEnd: 2,
        code: "21910-2015",
        name: "โปรแกรมมัลติมีเดีย",
        room: "442(คอม9)",
        group: "672191002 ชดท. กลุ่ม 2",
        color: "violet"
      },
      {
        day: "วันจันทร์",
        periodStart: 7, // 14:00 - 17:20 (period 7-9)
        periodEnd: 9,
        code: "21901-2017",
        name: "เทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์",
        room: "443(คอม 2)",
        group: "672190101 เว็บ (IT) 1",
        color: "blue"
      },
      {
        day: "วันพฤหัสบดี",
        periodStart: 3, // 10:00 - 12:00 (period 3-4)
        periodEnd: 4,
        code: "21910-2015",
        name: "โปรแกรมมัลติมีเดีย",
        room: "442(คอม9)",
        group: "672191002 ชดท. กลุ่ม 2",
        color: "violet"
      },
      {
        day: "วันศุกร์",
        periodStart: 1, // 08:00 - 12:00 (period 1-4)
        periodEnd: 4,
        code: "21910-2012",
        name: "โปรแกรมฐานข้อมูล",
        room: "431(คอม4)",
        group: "682191001 ชดท.2/2",
        color: "cyan"
      }
    ]
  },
  semester2: {
    academicYear: "2/2569",
    schoolName: "",
    teacher: "",
    role: "",
    department: "",
    coursesSummary: [],
    totals: { t: 0, p: 0, n: 0, c: 0 },
    timeSlots: [],
    periods: [],
    days: ["วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์"],
    classes: []
  }
};

// URL ของ Google Sheets สำหรับแสดงบันทึกการสอน
export const teachingLogConfig = {
  semester1Url: "https://docs.google.com/spreadsheets/d/1kk0FykJUEcOWeKw_joJQgc7iWfHojZpWoIJy-zToaqk/preview?widget=true&headers=false",
  semester2Url: "",
};

// URL ของ Google Drive สำหรับแสดงตารางสอนรูปแบบ PDF (ถ้ามี)
export const schedulePdfConfig = {
  semester1Url: "https://drive.google.com/file/d/1PbPUOosbImOFLvlIO6gfrICwgSAuECcg/view?usp=sharing",
  semester2Url: "",
};

export const teachingLogs = {
  semester1: {
    // กำหนดรหัส Google Sheets และชื่อแท็บ (Sheet Names)
    googleSheetConfig: {
      spreadsheetId: "1kk0FykJUEcOWeKw_joJQgc7iWfHojZpWoIJy-zToaqk",
      sheetNames: [
        "สัปดาห์ที่ 1", 
        "สัปดาห์ที่ 2", 
        "สัปดาห์ที่ 3", 
        "สัปดาห์ที่ 4", 
        "สัปดาห์ที่ 5", 
        "สัปดาห์ที่ 6", 
        "สัปดาห์ที่ 7", 
        "สัปดาห์ที่ 8", 
        "สัปดาห์ที่ 9",
        "สัปดาห์ที่ 10",
        "สัปดาห์ที่ 11",
        "สัปดาห์ที่ 12",
        "สัปดาห์ที่ 13",
        "สัปดาห์ที่ 14",
        "สัปดาห์ที่ 15",
        "สัปดาห์ที่ 16",
        "สัปดาห์ที่ 17",
        "สัปดาห์ที่ 18",
        "สัปดาห์ที่ 19",
        "สัปดาห์ที่ 20"
      ]
    },
    stats: {
      recordedWeeks: 3,
      workDays: 12,
      leaveDays: 3,
      semesterPct: "44%",
    },
    workHours: {
      assembly: "07:40 – 08:00 น.",
      workTime: "08:00 – 16:30 น.",
      workDaysText: "วันจันทร์ – ศุกร์",
    },
    weeks: [
      {
        weekNum: "01",
        title: "สัปดาห์ที่ 1",
        dateRange: "28 ก.ค. – 1 ส.ค. 2569",
        presentDays: 4,
        leaveDays: 1,
        filename: "teaching_log_week_01.log",
        images: ["/images/activities/wai-kru-1.jpg", "/images/activities/wai-kru-2.jpg"],
        days: [
          {
            dayName: "จันทร์",
            dayNum: "28",
            title: "วันแรกของการฝึกปฏิบัติการสอน",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติร่วมกับนักเรียนและคณะครู",
              "แนะนำตัวต่อครูพี่เลี้ยงและนักเรียนที่จะรับผิดชอบการสอน",
              "สำรวจห้องเรียน อุปกรณ์ และสื่อการสอนที่มีอยู่ในแผนกวิชา",
              "ศึกษาโครงสร้างหลักสูตรและคำอธิบายรายวิชาที่ต้องรับผิดชอบ"
            ]
          },
          {
            dayName: "อังคาร",
            dayNum: "29",
            title: "ศึกษาแผนการสอนและเตรียมสื่อการสอน",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "ศึกษาแผนการสอนของครูพี่เลี้ยงวิชา 21901-2017",
              "จัดเตรียมสื่อประกอบการสอนสำหรับหน่วยที่ 1",
              "ทำความคุ้นเคยกับระบบทะเบียนคะแนนของวิทยาลัย"
            ]
          },
          {
            dayName: "พุธ",
            dayNum: "30",
            title: "สังเกตการสอนและทดสอบก่อนเรียน",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "สังเกตการสอนของครูพี่เลี้ยงในรายวิชา 21901-2017",
              "ดำเนินการทดสอบก่อนเรียน (Pre-test) กับนักเรียน",
              "บันทึกผลการทดสอบเพื่อใช้วางแผนจัดกลุ่มนักเรียน"
            ]
          },
          {
            dayName: "พฤหัสบดี",
            dayNum: "31",
            title: "ลากิจ",
            status: "personal",
            statusText: "ลากิจ",
            leaveNote: "ลากิจเพื่อดำเนินการเอกสารที่มหาวิทยาลัย ได้แจ้งและได้รับอนุญาตจากครูพี่เลี้ยงล่วงหน้าแล้ว"
          },
          {
            dayName: "ศุกร์",
            dayNum: "1",
            title: "ปฐมนิเทศรายวิชาโปรแกรมฐานข้อมูล",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "ปฐมนิเทศรายวิชา 21910-2012 ชี้แจงเกณฑ์การประเมินและแผนการสอนตลอดภาคเรียน",
              "ตอบข้อซักถามของนักเรียนเกี่ยวกับโครงงานปลายภาค"
            ]
          }
        ]
      },
      {
        weekNum: "02",
        title: "สัปดาห์ที่ 2",
        dateRange: "4 – 8 ส.ค. 2569",
        presentDays: 4,
        leaveDays: 1,
        filename: "teaching_log_week_02.log",
        images: ["/images/activities/wai-kru-2.jpg", "/images/activities/wai-kru-1.jpg"],
        days: [
          {
            dayName: "จันทร์",
            dayNum: "4",
            title: "สอบย่อยและเริ่มหน่วยใหม่",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "ดำเนินการสอบย่อยหน่วยที่ 1 วิชา 21901-2017",
              "เริ่มสอนหน่วยการเรียนรู้ที่ 2 วิชาโปรแกรมมัลติมีเดีย 21910-2015"
            ]
          },
          {
            dayName: "อังคาร",
            dayNum: "5",
            title: "ตรวจข้อสอบและเตรียมสื่อ",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "ตรวจและบันทึกคะแนนสอบย่อยหน่วยที่ 1",
              "เตรียมสื่อการสอนวิชาโปรแกรมมัลติมีเดียสำหรับคาบถัดไป"
            ]
          },
          {
            dayName: "พุธ",
            dayNum: "6",
            title: "ลาป่วย",
            status: "sick",
            statusText: "ลาป่วย",
            leaveNote: "ลาป่วยด้วยอาการไข้หวัด พักรักษาตัวที่บ้าน 1 วัน และได้แจ้งครูพี่เลี้ยงทราบแล้ว"
          },
          {
            dayName: "พฤหัสบดี",
            dayNum: "7",
            title: "นิเทศการสอนโดยอาจารย์นิเทศก์",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "รับการนิเทศการสอนวิชา 21901-2017 จากอาจารย์นิเทศก์",
              "รับคำแนะนำให้เพิ่มกิจกรรมกลุ่มเพื่อกระตุ้นการมีส่วนร่วมของนักเรียน"
            ]
          },
          {
            dayName: "ศุกร์",
            dayNum: "8",
            title: "สอนเสริมและบันทึกผล",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "สอนเสริมนักเรียนที่ขาดเรียนช่วงลาป่วย",
              "สรุปและบันทึกผลการสอนประจำสัปดาห์"
            ]
          }
        ]
      },
      {
        weekNum: "03",
        title: "สัปดาห์ที่ 3",
        dateRange: "11 – 15 ส.ค. 2569",
        presentDays: 4,
        leaveDays: 1,
        filename: "teaching_log_week_03.log",
        images: ["/images/activities/wai-kru-1.jpg"],
        days: [
          {
            dayName: "จันทร์",
            dayNum: "11",
            title: "ทบทวนงานและปฏิบัติการ SQL",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "ทบทวนงานมอบหมายหน่วยที่ 1 วิชา 21910-2015",
              "สอนปฏิบัติการเขียนคำสั่ง SQL เบื้องต้น วิชา 21910-2012"
            ]
          },
          {
            dayName: "อังคาร",
            dayNum: "12",
            title: "สอนตัดต่อวิดีโอเบื้องต้น",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "สอนหัวข้อการตัดต่อวิดีโอเบื้องต้น วิชา 21910-2015",
              "ติดตามนักเรียนที่ยังไม่เข้าใจขั้นตอนการ export ไฟล์"
            ]
          },
          {
            dayName: "พุธ",
            dayNum: "13",
            title: "กิจกรรมเสริมทักษะและตรวจใบงาน",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "จัดกิจกรรมเสริมทักษะปฏิบัติการคอมพิวเตอร์",
              "ตรวจใบงานและให้คะแนนย้อนหลัง"
            ]
          },
          {
            dayName: "พฤหัสบดี",
            dayNum: "14",
            title: "ประชุมแผนกวิชาและเตรียมแผนถัดไป",
            status: "present",
            statusText: "มาปฏิบัติงาน",
            times: "เข้าแถว 07:40–08:00 · ปฏิบัติงาน 08:00–16:30",
            activities: [
              "เข้าแถวเคารพธงชาติ",
              "เข้าร่วมประชุมแผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ",
              "จัดเตรียมแผนการสอนหน่วยถัดไปตามข้อเสนอแนะจากที่ประชุม"
            ]
          },
          {
            dayName: "ศุกร์",
            dayNum: "15",
            title: "ลากิจ",
            status: "personal",
            statusText: "ลากิจ",
            leaveNote: "ลากิจเนื่องจากมีธุระครอบครัว ได้แจ้งและได้รับอนุญาตจากครูพี่เลี้ยงล่วงหน้าแล้ว"
          }
        ]
      }
    ]
  },
  semester2: {
    googleSheetConfig: {
      spreadsheetId: "",
      sheetNames: []
    },
    stats: { recordedWeeks: 0, workDays: 0, leaveDays: 0, semesterPct: "0%" },
    workHours: { assembly: "", workTime: "", workDaysText: "" },
    weeks: []
  }
};

export const lessonPlans = {
  semester1: [
    {
      id: "21910-2015",
      courseCode: "21910-2015",
      courseName: "โปรแกรมมัลติมีเดีย",
      title: "แผนการจัดการเรียนรู้ วิชาโปรแกรมมัลติมีเดีย",
      details: "ท. 2 | ป. 2 | น. 3 | รวม 4 ชั่วโมง/สัปดาห์",
      group: "672191002 ชดท. กลุ่ม 2",
      filename: "multimedia_lesson_plan_21910_2015.pdf",
      driveUrl: "https://drive.google.com/file/d/1FXlEozV4e-65Kmj6uYXEfYRpAXvKxYSo/view?usp=sharing",
      pdfUrl: "https://drive.google.com/file/d/1FXlEozV4e-65Kmj6uYXEfYRpAXvKxYSo/preview",
      statusText: "ฉบับสมบูรณ์",
    },
    {
      id: "21901-2017",
      courseCode: "21901-2017",
      courseName: "เทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์",
      title: "แผนการจัดการเรียนรู้ วิชาเทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์",
      details: "ท. 1 | ป. 2 | น. 2 | รวม 3 ชั่วโมง/สัปดาห์",
      group: "672190101 เว็บ (IT) 1",
      filename: "data_input_technology_21901_2017.pdf",
      driveUrl: "https://drive.google.com/file/d/1JbZxTMLPn5rATzTigYd6OybPhdYxyV37/view?usp=drive_link",
      pdfUrl: "https://drive.google.com/file/d/1JbZxTMLPn5rATzTigYd6OybPhdYxyV37/preview",
      statusText: "ฉบับสมบูรณ์",
    },
    {
      id: "21910-2012",
      courseCode: "21910-2012",
      courseName: "โปรแกรมฐานข้อมูล",
      title: "แผนการจัดการเรียนรู้ วิชาโปรแกรมฐานข้อมูล",
      details: "ท. 2 | ป. 2 | น. 3 | รวม 4 ชั่วโมง/สัปดาห์",
      group: "682191001 ชดท.2/2",
      filename: "database_program_21910_2012.pdf",
      driveUrl: "https://drive.google.com/file/d/1x7rtr7SY61nLSVpg_07hgfCwiQxGKGpe/view?usp=drive_link",
      pdfUrl: "https://drive.google.com/file/d/1x7rtr7SY61nLSVpg_07hgfCwiQxGKGpe/preview",
      statusText: "ฉบับสมบูรณ์",
    }
  ],
  semester2: []
};

export const activities = {
  semester1: [
    {
      id: "1",
      title: "กิจกรรมไหว้ครู",
      description: "เข้าร่วมกิจกรรมไหว้ครูประจำปีการศึกษา 2567",
      date: "2026-08-16",
      // รูปภาพสามารถนำไปวางใน public/images/activities, public/images/teaching, หรือ public/images/others
      images: [
        "/images/activities/wai-kru-1.jpg",
        "/images/activities/wai-kru-2.jpg"
      ]
    }
  ],
  semester2: []
};

export const researchDocuments = [
  {
    id: "1",
    title: "การพัฒนาบทเรียนออนไลน์ด้วยปัญญาประดิษฐ์ร่วมกับแชทบอทอัจฉริยะเพื่อส่งเสริมการเรียนรู้รายวิชาโปรแกรมฐานข้อมูล สำหรับนักเรียนระดับประกาศนียบัตรวิชาชีพ",
    pdfUrl: "https://drive.google.com/file/d/1yIP5P58DShvwehTkdkPJLI8vI1tFcurw/preview",
    projectUrl: "https://dbase-learning.vercel.app",
    projectName: "DBase Learning - บทเรียนออนไลน์ AI & Chatbot",
    projectDescription: "สื่อการเรียนรู้นวัตกรรมบทเรียนออนไลน์ รายวิชาโปรแกรมฐานข้อมูล (21910-2012) พัฒนาร่วมกับระบบแชทบอทอัจฉริยะ",
  }
];

export const evaluationDocuments = [
  {
    id: "1",
    title: "แบบประเมินผลการฝึกสอน (ครั้งที่ 1)",
    pdfUrl: "https://drive.google.com/file/d/1Zexample/preview",
  }
];

export const supervisions = {
  semester1: [
    {
      id: 1,
      title: "การนิเทศ On-site",
      date: "5 มิ.ย. 2569",
      subject: "เทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์",
      supervisor: "ดร. พุทธิดา สกุลวิริยกิจกุล",
      image: "/images/activities/wai-kru-1.jpg" // Using an existing activity image as placeholder if no specific one exists
    },
    {
      id: 2,
      title: "การนิเทศ Online (ครั้งที่ 1)",
      date: "6 ส.ค. 2569",
      subject: "เทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์",
      supervisor: "ดร. พุทธิดา สกุลวิริยกิจกุล",
      image: "/images/activities/wai-kru-2.jpg" // Using an existing activity image as placeholder
    },
    {
      id: 3,
      title: "การนิเทศ Online (ครั้งที่ 2)",
      date: "7 ก.ย. 2569",
      subject: "โปรแกรมฐานข้อมูล",
      supervisor: "ดร. พุทธิดา สกุลวิริยกิจกุล",
      image: ""
    }
  ],
  semester2: []
};
