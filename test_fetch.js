
const Papa = require('papaparse');

async function test() {
  const url = `https://docs.google.com/spreadsheets/d/1kk0FykJUEcOWeKw_joJQgc7iWfHojZpWoIJy-zToaqk/gviz/tq?tqx=out:csv&sheet=สัปดาห์ที่ 1`;
  const res = await fetch(url);
  const text = await res.text();
  const parsed = Papa.parse(text);
  console.log("CSV Rows:");
  for (let i = 0; i < 5; i++) {
    console.log(`Row ${i}:`, parsed.data[i]);
  }
}
test();
