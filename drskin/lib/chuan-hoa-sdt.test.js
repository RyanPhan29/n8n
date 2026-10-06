/**
 * Test cho hàm chuẩn hóa số điện thoại.
 * Chạy: node drskin/lib/chuan-hoa-sdt.test.js
 */
const { chuanHoaSdt } = require('./chuan-hoa-sdt');

const casesHopLe = [
	['+84 905 123 456', '0905123456', 'có dấu cộng, có khoảng trắng'],
	['84.905.123.456', '0905123456', 'mã quốc gia, ngăn bằng dấu chấm'],
	['0905 123 456', '0905123456', 'số nội địa, có khoảng trắng'],
	['0905-123-456', '0905123456', 'số nội địa, ngăn bằng gạch'],
	['+840905123456', '0905123456', 'mã quốc gia kèm luôn số 0'],
	['905123456', '0905123456', 'khách quên số 0 đầu'],
	['0084905123456', '0905123456', 'tiền tố gọi quốc tế 00'],
	['  0905123456  ', '0905123456', 'thừa khoảng trắng hai đầu'],
	['(090) 512 34 56', '0905123456', 'có ngoặc đơn'],
	['02839123456', '02839123456', 'số cố định 11 chữ số'],
	['0849123456', '0849123456', 'đầu số 084 không bị nhầm là mã quốc gia'],
	['84912345678', '0912345678', 'mã quốc gia, đầu số 09'],
];

const casesKhongHopLe = [
	['', 'chuỗi rỗng'],
	['abc', 'toàn chữ'],
	['12345', 'quá ngắn'],
	[null, 'null'],
	[undefined, 'undefined'],
	['+1 415 555 0123', 'số nước ngoài'],
];

let pass = 0;
let fail = 0;

console.log('--- Số hợp lệ ---');
for (const [input, expect, mo_ta] of casesHopLe) {
	const r = chuanHoaSdt(input);
	const ok = r.sdt === expect && r.hopLe === true;
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${JSON.stringify(input).padEnd(20)} -> ${r.sdt.padEnd(12)} ${mo_ta}`);
	if (!ok) {
		console.log(`      mong đợi ${expect} hopLe=true, nhận ${r.sdt} hopLe=${r.hopLe}`);
		fail++;
	} else pass++;
}

console.log('\n--- Số không hợp lệ, phải gắn cờ chứ không được bỏ lead ---');
for (const [input, mo_ta] of casesKhongHopLe) {
	const r = chuanHoaSdt(input);
	const ok = r.hopLe === false;
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(JSON.stringify(input)).padEnd(20)} -> hopLe=${r.hopLe}  ${mo_ta}`);
	if (ok) pass++; else fail++;
}

console.log('\n--- Hai số khác dạng phải ra cùng một khóa ---');
const nhom = ['+84905123456', '0905123456', '905123456', '84905123456', '0084905123456'];
const ketQua = nhom.map((x) => chuanHoaSdt(x).sdt);
const giongNhau = new Set(ketQua).size === 1;
console.log(`${giongNhau ? 'PASS' : 'FAIL'}  ${nhom.length} cách viết -> ${[...new Set(ketQua)].join(', ')}`);
giongNhau ? pass++ : fail++;

console.log(`\nTổng: ${pass} pass, ${fail} fail`);
process.exit(fail === 0 ? 0 : 1);
