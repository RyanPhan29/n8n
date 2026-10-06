/**
 * Đếm số phút LÀM VIỆC giữa hai thời điểm.
 *
 * Vì sao cần hàm này: lời hứa "gọi khách trong 2 giờ" chỉ có nghĩa trong giờ
 * làm việc. Lead vào lúc 11 giờ đêm mà 1 giờ sáng đã báo trễ hạn là báo sai,
 * tư vấn viên bị oan và cảnh báo mất giá trị. Đếm phút thường thì sai, phải
 * đếm phút làm việc.
 *
 * Cách làm: cắt khoảng thời gian theo từng ngày, mỗi ngày lấy phần giao với
 * khung giờ mở cửa, rồi cộng lại. Ngày nghỉ bị bỏ qua hoàn toàn.
 *
 * Mọi tính toán quy về phút tính từ mốc 1970 theo giờ Việt Nam, nên không
 * phụ thuộc múi giờ của máy chạy n8n.
 */

/**
 * Giờ làm việc mặc định của học viện.
 *
 * ĐÂY LÀ CHỖ CẦN SỬA. Em đặt tạm 8 giờ sáng tới 8 giờ tối, làm cả bảy ngày,
 * vì spa và học viện thẩm mỹ thường đông nhất cuối tuần. Anh sửa lại cho đúng
 * thực tế rồi dán vào node Code trong workflow.
 */
const GIO_LAM_VIEC = {
	mo: '08:00',
	dong: '20:00',
	// 0 là Chủ nhật, 1 là thứ Hai, ... 6 là thứ Bảy.
	// Để rỗng là làm cả tuần. Muốn nghỉ Chủ nhật thì ghi [0].
	ngayNghi: [],
	// Lệch múi giờ so với UTC. Việt Nam là 7.
	lechMuiGio: 7,
};

/** '08:30' thành 510 phút tính từ nửa đêm. Sai định dạng thì trả về null. */
function phutTrongNgay(hhmm) {
	const khop = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm).trim());
	if (!khop) return null;
	const gio = Number(khop[1]);
	const phut = Number(khop[2]);
	if (gio > 24 || phut > 59) return null;
	return gio * 60 + phut;
}

/**
 * Đổi thời điểm thành số phút tính từ mốc 1970, theo giờ địa phương.
 *
 * Phải tự chặn null và chuỗi rỗng trước khi gọi new Date, vì new Date(null)
 * không ra ngày sai mà ra đúng mốc 1970. Để nó lọt thì một lead thiếu cột
 * thoi_gian_vao sẽ bị tính là đã chờ mấy chục năm và lập tức báo trễ hạn.
 */
function phutDiaPhuong(thoiDiem, lechMuiGio) {
	if (thoiDiem === null || thoiDiem === undefined) return null;
	if (typeof thoiDiem === 'string' && thoiDiem.trim() === '') return null;

	const d = thoiDiem instanceof Date ? thoiDiem : new Date(thoiDiem);
	const mili = d.getTime();
	if (!Number.isFinite(mili)) return null;
	return Math.floor(mili / 60000) + lechMuiGio * 60;
}

/** 0 là Chủ nhật. Ngày 0 của mốc 1970 là thứ Năm nên cộng 4. */
function thuTrongTuan(chiSoNgay) {
	return (((chiSoNgay + 4) % 7) + 7) % 7;
}

/**
 * Số phút làm việc giữa hai thời điểm.
 *
 * @param {string|Date} tu    thời điểm bắt đầu, ví dụ lúc lead vào
 * @param {string|Date} den   thời điểm kết thúc, thường là bây giờ
 * @param {object} cauHinh    ghi đè GIO_LAM_VIEC, không bắt buộc
 * @returns {{phut: number, hopLe: boolean, lyDo?: string}}
 */
function phutLamViecGiua(tu, den, cauHinh) {
	const c = Object.assign({}, GIO_LAM_VIEC, cauHinh || {});

	const mo = phutTrongNgay(c.mo);
	const dong = phutTrongNgay(c.dong);
	if (mo === null || dong === null) {
		return { phut: 0, hopLe: false, lyDo: 'gio_mo_dong_sai_dinh_dang' };
	}
	if (dong <= mo) {
		return { phut: 0, hopLe: false, lyDo: 'gio_dong_khong_sau_gio_mo' };
	}

	const batDau = phutDiaPhuong(tu, c.lechMuiGio);
	const ketThuc = phutDiaPhuong(den, c.lechMuiGio);
	if (batDau === null || ketThuc === null) {
		return { phut: 0, hopLe: false, lyDo: 'thoi_diem_sai_dinh_dang' };
	}
	// Mốc kết thúc trước mốc bắt đầu thì coi như chưa trôi phút nào, không
	// phải lỗi. Đồng hồ lệch vài giây là chuyện thường.
	if (ketThuc <= batDau) return { phut: 0, hopLe: true };

	const ngayNghi = new Set((c.ngayNghi || []).map(Number));
	if (ngayNghi.size >= 7) {
		return { phut: 0, hopLe: false, lyDo: 'nghi_ca_bay_ngay' };
	}

	const ngayDau = Math.floor(batDau / 1440);
	const ngayCuoi = Math.floor(ketThuc / 1440);

	let tong = 0;
	for (let ngay = ngayDau; ngay <= ngayCuoi; ngay++) {
		if (ngayNghi.has(thuTrongTuan(ngay))) continue;
		const khungMo = ngay * 1440 + mo;
		const khungDong = ngay * 1440 + dong;
		const giao = Math.min(ketThuc, khungDong) - Math.max(batDau, khungMo);
		if (giao > 0) tong += giao;
	}

	return { phut: tong, hopLe: true };
}

/** Đang trong giờ làm việc hay không. Dùng để không gửi cảnh báo lúc nửa đêm. */
function dangTrongGioLamViec(thoiDiem, cauHinh) {
	const c = Object.assign({}, GIO_LAM_VIEC, cauHinh || {});
	const mo = phutTrongNgay(c.mo);
	const dong = phutTrongNgay(c.dong);
	const moc = phutDiaPhuong(thoiDiem, c.lechMuiGio);
	if (mo === null || dong === null || moc === null) return false;

	const ngay = Math.floor(moc / 1440);
	if (new Set((c.ngayNghi || []).map(Number)).has(thuTrongTuan(ngay))) return false;

	const trongNgay = moc - ngay * 1440;
	return trongNgay >= mo && trongNgay < dong;
}

module.exports = { GIO_LAM_VIEC, phutLamViecGiua, dangTrongGioLamViec, phutTrongNgay };
