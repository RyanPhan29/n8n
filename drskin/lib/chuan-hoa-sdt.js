/**
 * Chuẩn hóa số điện thoại Việt Nam về một dạng duy nhất để chống trùng lead.
 *
 * Khách nhắn Facebook, Zalo rồi điền form web vẫn là một người, nhưng mỗi nơi
 * họ gõ số một kiểu. Hàm này đưa tất cả về dạng 0xxxxxxxxx để so khớp.
 *
 * Quy tắc:
 *   1. Bỏ mọi ký tự không phải chữ số
 *   2. Bỏ tiền tố gọi quốc tế 00
 *   3. Bỏ mã quốc gia 84
 *   4. Thêm số 0 ở đầu nếu thiếu
 *   5. Hợp lệ khi còn lại 10 số (di động) hoặc 11 số (cố định), bắt đầu bằng 0
 *
 * Số không hợp lệ vẫn trả về, chỉ đánh dấu hopLe = false. Tuyệt đối không
 * được loại bỏ lead chỉ vì số sai định dạng.
 */
function chuanHoaSdt(raw) {
	if (raw === null || raw === undefined) return { sdt: '', hopLe: false };

	const goc = String(raw).trim();
	const coDauCong = goc.startsWith('+');

	let s = goc.replace(/\D/g, '');

	// 00 là tiền tố gọi quốc tế, ví dụ 0084905123456
	if (s.startsWith('00')) s = s.slice(2);

	// 84 là mã quốc gia. Chỉ bỏ khi có dấu cộng ở đầu, hoặc khi chuỗi dài hơn
	// số nội địa bình thường. Nhờ vậy số 084xxxxxxx vẫn giữ nguyên.
	if (s.startsWith('84') && (coDauCong || s.length >= 11)) s = s.slice(2);

	if (!s.startsWith('0')) s = '0' + s;

	// gộp nhiều số 0 ở đầu thành một
	s = s.replace(/^0{2,}/, '0');

	const hopLe = /^0\d{9,10}$/.test(s);
	const laDiDong = /^0[35789]\d{8}$/.test(s);

	return { sdt: s, hopLe, laDiDong };
}

module.exports = { chuanHoaSdt };
