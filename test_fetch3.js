const Papa = require('papaparse');
async function test() {
  const url = `https://docs.google.com/spreadsheets/d/1kk0FykJUEcOWeKw_joJQgc7iWfHojZpWoIJy-zToaqk/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent('week3')}`;
  console.log("Fetching url:", url);
  const res = await fetch(url);
  const text = await res.text();
  const parsed = Papa.parse(text);
  console.log("Week 3 CSV Rows:");
  for (let i = 0; i < 3; i++) {
    console.log(`Row ${i}:`, parsed.data[i]);
  }
}
test();
