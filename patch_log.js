const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/teaching-log/[term]/page.tsx');
let content = fs.readFileSync(pagePath, 'utf-8');

// Add the import for fetchGoogleSheet
content = content.replace('import { notFound } from "next/navigation"', 'import { notFound } from "next/navigation"\nimport { fetchGoogleSheet } from "@/actions/googleSheets"');
content = content.replace('import { use, useState } from "react"', 'import { use, useState, useEffect } from "react"');

// We need to inject state for loaded sheets and fetching logic
const injection = `
  const [googleWeeks, setGoogleWeeks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (viewMode === 'interactive' && logData.googleSheetConfig) {
      setIsLoading(true);
      const fetchAll = async () => {
        try {
          const sheetNames = logData.googleSheetConfig.sheetNames;
          const spreadsheetId = logData.googleSheetConfig.spreadsheetId;
          
          const promises = sheetNames.map(async (name: string, index: number) => {
            const res = await fetchGoogleSheet(spreadsheetId, name);
            if (res.success && res.data && res.data.length > 0) {
              const data = res.data;
              
              // Find the row with week info
              let weekNumStr = name;
              let dateRangeStr = "";
              let headerRowIdx = -1;
              
              for(let i=0; i<Math.min(5, data.length); i++) {
                const row = data[i];
                const joined = row.join(' ');
                if (joined.includes('สัปดาห์ที่')) {
                  // try to extract date range
                  const maybeDateRow = row.find((cell: string) => cell.includes('วันที่ '));
                  if (maybeDateRow) dateRangeStr = maybeDateRow;
                }
                if (joined.includes('การทำงาน') || joined.includes('วันที่')) {
                  headerRowIdx = i;
                  break;
                }
              }

              const days = [];
              if (headerRowIdx !== -1) {
                for(let i = headerRowIdx + 1; i < data.length; i++) {
                  const row = data[i];
                  if (!row || !row[0]) continue;
                  
                  const dateStr = row[0] || '';
                  const workStr = row[1] || '';
                  const remarkStr = row[2] || '';
                  
                  // skip empty days
                  if (!dateStr && !workStr) continue;

                  // Extract day number from "5/5/26" -> "5"
                  const dateParts = dateStr.split('/');
                  const dayNum = dateParts[0] || dateStr;
                  
                  days.push({
                    dayName: 'Day', // Placeholder since it's hard to compute from just "5/5/26" without year context reliably
                    dayNum: dayNum,
                    title: workStr.substring(0, 30) + (workStr.length > 30 ? '...' : ''),
                    status: 'present',
                    content: [
                      { time: '', activity: workStr },
                      ...(remarkStr ? [{ time: 'หมายเหตุ', activity: remarkStr }] : [])
                    ]
                  });
                }
              }

              return {
                weekNum: String(index + 1).padStart(2, '0'),
                title: weekNumStr,
                dateRange: dateRangeStr || "ไม่ระบุวันที่",
                presentDays: days.length,
                leaveDays: 0,
                filename: name + '.csv',
                days: days
              };
            }
            return null;
          });

          const results = await Promise.all(promises);
          setGoogleWeeks(results.filter(Boolean));
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAll();
    } else {
      setIsLoading(false);
    }
  }, [viewMode, logData]);

  // Use googleWeeks if available, else fallback to static data
  const displayWeeks = logData.googleSheetConfig && googleWeeks.length > 0 ? googleWeeks : logData.weeks;
`;

content = content.replace(/const \[openWeeks, setOpenWeeks\] = useState<string\[\]>\(\["01"\]\);/, "const [openWeeks, setOpenWeeks] = useState<string[]>([\"01\"]);\n" + injection);

// Now replace logData.weeks with displayWeeks
content = content.replace(/logData\.weeks && logData\.weeks\.length > 0/g, "displayWeeks && displayWeeks.length > 0");
content = content.replace(/logData\.weeks\.map\(\(week\)/g, "displayWeeks.map((week: any)");

// Add loading state UI
const replacementStr = "<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>\n            {isLoading && viewMode === 'interactive' && (\n              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--blue-c)', fontWeight: 600 }}>\n                กำลังดึงข้อมูลจาก Google Sheets... ⏳\n              </div>\n            )}";
content = content.replace(/<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>/, replacementStr);

fs.writeFileSync(pagePath, content);
console.log('Done modifying page.tsx');
