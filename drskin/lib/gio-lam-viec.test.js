/**
 * Test cho hàm đếm phút làm việc.
 * Chạy: node drskin/lib/gio-lam-viec.test.js
 */
const { phutLamViecGiua, dangTrongGioLamViec, phutTrongNgay } = require('./gio-lam-viec');

// Giờ làm việc dùng chung cho test: 8 giờ sáng tới 8 giờ tối, làm cả tuần.
const CA = { mo: '08:00', dong: '20:00', ngayNghi: [], lechMuiGio: 7 };
// Có nghỉ Chủ nhật, để thử nhánh ngày nghỉ.
const CA_NGHI_CN = Object.assign({}, CA, { ngayNghi: [0] });

let pass = 0;
let fail = 0;

function kiemTra(moTa, nhan, mongDoi) {
	const ok = nhan === mongDoi;
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(nhan).padStart(5)} phút  ${moTa}`);
	if (!ok) {
		console.log(`      mong đợi ${mongDoi}, nhận ${nhan}`);
		fail++;
	} else pass++;
}

// Giờ Việt Nam viết dưới dạng ISO có hậu tố +07:00 cho khỏi nhầm.
const vn = (s) => `${s}+07:00`;

console.log('--- Trong cùng một ngày làm việc ---');

kiemTra(
	'9h00 tới 10h30, trọn trong giờ làm',
	phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T10:30:00'), CA).phut,
	90,
);

kiemTra(
	'7h00 tới 9h00, một tiếng đầu trước giờ mở cửa nên không tính',
	phutLamViecGiua(vn('2026-10-05T07:00:00'), vn('2026-10-05T09:00:00'), CA).phut,
	60,
);

kiemTra(
	'19h00 tới 21h00, một tiếng sau giờ đóng cửa nên không tính',
	phutLamViecGiua(vn('2026-10-05T19:00:00'), vn('2026-10-05T21:00:00'), CA).phut,
	60,
);

kiemTra(
	'6h00 tới 7h00, cả khoảng nằm trước giờ mở cửa',
	phutLamViecGiua(vn('2026-10-05T06:00:00'), vn('2026-10-05T07:00:00'), CA).phut,
	0,
);

kiemTra(
	'21h00 tới 23h00, cả khoảng nằm sau giờ đóng cửa',
	phutLamViecGiua(vn('2026-10-05T21:00:00'), vn('2026-10-05T23:00:00'), CA).phut,
	0,
);

kiemTra(
	'8h00 tới 20h00, đúng trọn một ca',
	phutLamViecGiua(vn('2026-10-05T08:00:00'), vn('2026-10-05T20:00:00'), CA).phut,
	720,
);

console.log('\n--- Vắt qua đêm, đây là chỗ hay tính sai nhất ---');

kiemTra(
	'lead vào 23h00, tới 1h00 sáng hôm sau: chưa trôi một phút làm việc nào',
	phutLamViecGiua(vn('2026-10-05T23:00:00'), vn('2026-10-06T01:00:00'), CA).phut,
	0,
);

kiemTra(
	'lead vào 23h00, tới 9h00 sáng hôm sau: chỉ tính một tiếng từ lúc mở cửa',
	phutLamViecGiua(vn('2026-10-05T23:00:00'), vn('2026-10-06T09:00:00'), CA).phut,
	60,
);

kiemTra(
	'lead vào 19h30, tới 8h30 sáng hôm sau: 30 phút cuối ca cộng 30 phút đầu ca',
	phutLamViecGiua(vn('2026-10-05T19:30:00'), vn('2026-10-06T08:30:00'), CA).phut,
	60,
);

kiemTra(
	'19h00 hôm trước tới 10h00 hôm sau: 1 tiếng cuối ca cộng 2 tiếng đầu ca',
	phutLamViecGiua(vn('2026-10-05T19:00:00'), vn('2026-10-06T10:00:00'), CA).phut,
	180,
);

console.log('\n--- Nhiều ngày ---');

kiemTra(
	'9h00 thứ Hai tới 9h00 thứ Tư: 11 tiếng còn lại thứ Hai, trọn thứ Ba, 1 tiếng thứ Tư',
	phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-07T09:00:00'), CA).phut,
	660 + 720 + 60,
);

kiemTra(
	'cách nhau trọn một tuần, làm cả bảy ngày',
	phutLamViecGiua(vn('2026-10-05T08:00:00'), vn('2026-10-12T08:00:00'), CA).phut,
	720 * 7,
);

console.log('\n--- Ngày nghỉ ---');

// 2026-10-11 là Chủ nhật. Kiểm lại cho chắc.
const cn = new Date(vn('2026-10-11T12:00:00')).getUTCDay();
kiemTra('mốc kiểm: 11/10/2026 là Chủ nhật (số 0)', cn, 0);

kiemTra(
	'cả khoảng nằm trong Chủ nhật, mà Chủ nhật nghỉ',
	phutLamViecGiua(vn('2026-10-11T09:00:00'), vn('2026-10-11T18:00:00'), CA_NGHI_CN).phut,
	0,
);

kiemTra(
	'lead vào trưa Chủ nhật, tới 10h sáng thứ Hai: chỉ tính 2 tiếng thứ Hai',
	phutLamViecGiua(vn('2026-10-11T12:00:00'), vn('2026-10-12T10:00:00'), CA_NGHI_CN).phut,
	120,
);

kiemTra(
	'thứ Bảy 18h tới thứ Hai 9h, nghỉ Chủ nhật: 2 tiếng thứ Bảy cộng 1 tiếng thứ Hai',
	phutLamViecGiua(vn('2026-10-10T18:00:00'), vn('2026-10-12T09:00:00'), CA_NGHI_CN).phut,
	180,
);

console.log('\n--- Mốc hai giờ, đúng ngưỡng cần canh ---');

kiemTra(
	'lead vào 9h00, bây giờ 10h59: chưa trễ hạn',
	phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T10:59:00'), CA).phut,
	119,
);

kiemTra(
	'lead vào 9h00, bây giờ 11h01: đã trễ hạn',
	phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T11:01:00'), CA).phut,
	121,
);

kiemTra(
	'lead vào 19h00, bây giờ 9h00 hôm sau: mới 120 phút, vừa chạm hạn chứ chưa quá',
	phutLamViecGiua(vn('2026-10-05T19:00:00'), vn('2026-10-06T09:00:00'), CA).phut,
	120,
);

console.log('\n--- Đầu vào xấu, phải gắn cờ chứ không được vỡ ---');

const xau = [
	[phutLamViecGiua('khong phai ngay thang', vn('2026-10-05T10:00:00'), CA), 'chuỗi không phải ngày'],
	[phutLamViecGiua(null, vn('2026-10-05T10:00:00'), CA), 'null'],
	[phutLamViecGiua(undefined, vn('2026-10-05T10:00:00'), CA), 'undefined'],
	[phutLamViecGiua('', vn('2026-10-05T10:00:00'), CA), 'chuỗi rỗng'],
	[
		phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T10:00:00'), { mo: '20:00', dong: '08:00' }),
		'giờ đóng trước giờ mở',
	],
	[
		phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T10:00:00'), { mo: 'tam gio', dong: '20:00' }),
		'giờ mở sai định dạng',
	],
	[
		phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T10:00:00'), {
			ngayNghi: [0, 1, 2, 3, 4, 5, 6],
		}),
		'khai nghỉ cả bảy ngày',
	],
];
for (const [kq, moTa] of xau) {
	const ok = kq.hopLe === false && kq.phut === 0 && typeof kq.lyDo === 'string';
	console.log(`${ok ? 'PASS' : 'FAIL'}  hopLe=${kq.hopLe} lyDo=${kq.lyDo}  ${moTa}`);
	ok ? pass++ : fail++;
}

console.log('\n--- Mốc kết thúc trước mốc bắt đầu, coi là 0 chứ không phải lỗi ---');
{
	const kq = phutLamViecGiua(vn('2026-10-05T10:00:00'), vn('2026-10-05T09:00:00'), CA);
	const ok = kq.phut === 0 && kq.hopLe === true;
	console.log(`${ok ? 'PASS' : 'FAIL'}  phut=${kq.phut} hopLe=${kq.hopLe}`);
	ok ? pass++ : fail++;
}

console.log('\n--- Đang trong giờ làm việc hay không ---');
const trongGio = [
	[vn('2026-10-05T09:00:00'), true, '9h sáng thứ Hai'],
	[vn('2026-10-05T07:59:00'), false, 'một phút trước giờ mở'],
	[vn('2026-10-05T08:00:00'), true, 'đúng giờ mở'],
	[vn('2026-10-05T19:59:00'), true, 'một phút trước giờ đóng'],
	[vn('2026-10-05T20:00:00'), false, 'đúng giờ đóng, coi là đã nghỉ'],
	[vn('2026-10-05T23:00:00'), false, '11h đêm'],
];
for (const [moc, mongDoi, moTa] of trongGio) {
	const nhan = dangTrongGioLamViec(moc, CA);
	const ok = nhan === mongDoi;
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(nhan).padEnd(5)} ${moTa}`);
	ok ? pass++ : fail++;
}
{
	const nhan = dangTrongGioLamViec(vn('2026-10-11T12:00:00'), CA_NGHI_CN);
	const ok = nhan === false;
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(nhan).padEnd(5)} trưa Chủ nhật mà Chủ nhật nghỉ`);
	ok ? pass++ : fail++;
}

console.log('\n--- Đọc giờ dạng hh:mm ---');
const docGio = [
	['08:00', 480],
	['8:00', 480],
	['20:30', 1230],
	['00:00', 0],
	['25:00', null],
	['08:70', null],
	['tam gio', null],
];
for (const [vao, mongDoi] of docGio) {
	const nhan = phutTrongNgay(vao);
	const ok = nhan === mongDoi;
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(vao).padEnd(10)} -> ${nhan}`);
	ok ? pass++ : fail++;
}

console.log('\n--- Không phụ thuộc múi giờ của máy chạy ---');
{
	// Cùng một thời điểm viết theo hai múi giờ khác nhau phải cho cùng kết quả.
	const a = phutLamViecGiua('2026-10-05T02:00:00Z', '2026-10-05T04:00:00Z', CA).phut;
	const b = phutLamViecGiua(vn('2026-10-05T09:00:00'), vn('2026-10-05T11:00:00'), CA).phut;
	const ok = a === b && a === 120;
	console.log(`${ok ? 'PASS' : 'FAIL'}  viết kiểu UTC ${a} phút, viết kiểu +07:00 ${b} phút`);
	ok ? pass++ : fail++;
}

console.log(`\nTổng: ${pass} pass, ${fail} fail`);
process.exit(fail === 0 ? 0 : 1);
