const matchCell = 'วันที่ 05 พ.ค. - 08 พ.ค. 2026 หมายเหตุ';
const match = matchCell.match(/วันที่\s*(.*?)(?=\s*หมายเหตุ|$)/);
console.log(match[0]);
