# 🚀 THPT Cẩm Phả SMP - Trang thông tin Server

Chào mừng đến với kho lưu trữ mã nguồn (Source Code) giao diện Website chính thức của máy chủ Minecraft **THPT Cẩm Phả SMP**. Tài liệu này được biên soạn nhằm giúp đội ngũ Staff hiểu rõ cấu trúc dự án và cung cấp các liên kết quản trị hệ thống dữ liệu của Server.

---

## 📁 Cấu trúc Thư mục & File

* **`index.html`**: Giao diện chính của trang web (Tiếng Việt).
* **`en.html`**: Giao diện Tiếng Anh dành cho người chơi quốc tế.
* **`style.css`**: Chịu trách nhiệm về giao diện trực quan (UI), hỗ trợ tự động chuyển đổi Dark/Light Mode.
* **`script.js`**: Trái tim logic của trang web (UX). Xử lý chuyển Tab, hiệu ứng cuộn, và gọi API để lấy Thông báo & gửi Form hỗ trợ.
* **`/Images`**: Thư mục chứa các hình ảnh (banner, khu vực Top, Gacha, các vật phẩm Custom...). Đề xuất Staff luôn sử dụng định dạng `.webp` trước khi up ảnh mới để tối ưu tốc độ tải trang.

---

## 🔗 Hệ thống Quản lý Dữ liệu (Dành riêng cho Staff)

Dưới đây là các liên kết quan trọng để ban quản trị tiếp nhận phản hồi từ người chơi và cập nhật thông báo hiển thị trên web. **Lưu ý: Không chia sẻ các liên kết này ra ngoài nội bộ Staff.**

### 1. Quản lý Yêu cầu từ Người chơi
Hệ thống tiếp nhận phản hồi (Form) trên website được phân loại thành các file/sheet riêng biệt để Staff dễ theo dõi và xử lý đúng chuyên môn:

* **💡 Quản lý Góp ý (Suggestions)**
  * **📌 Liên kết:** `https://docs.google.com/spreadsheets/d/1FG_SbqVB6pTqQJT02T0BxvEpDhiD_T1r1b0PiBo-VKc/edit?usp=drivesdk`
  * **Nhiệm vụ:** Nơi ghi nhận các ý tưởng, đề xuất tính năng hoặc sự kiện mới cho Server. Staff có thể thảo luận xem ý tưởng nào khả thi để áp dụng.

* **🐞 Quản lý Báo lỗi & Hỗ trợ (Bug Reports)**
  * **📌 Liên kết:** `https://docs.google.com/spreadsheets/d/1GAfvD7mRiBGeZU0BkA7ne_gjO_N6lHv_JpI4q7zeIco/edit?usp=drivesdk`
  * **Nhiệm vụ:** Nơi ghi nhận các lỗi game (Bug, Dupe), kẹt map, hoặc báo cáo mất đồ. Staff cần **ưu tiên kiểm tra mục này thường xuyên** để hỗ trợ người chơi kịp thời và vá lỗi Server.

* **🚨 Quản lý Tố cáo (Player Reports)**
  * **📌 Liên kết:** `https://docs.google.com/spreadsheets/d/1y1FOKmCEAfkQBGiVpTJe-tTGnri0F8AfZ53HRR4IN0E/edit?usp=drivesdk`
  * **Nhiệm vụ:** Nơi tiếp nhận các báo cáo vi phạm Luật Server (Hack, Cheat, Scam, Phá hoại...). 
  * ⚠️ **Lưu ý quan trọng:** Nếu người chơi đánh dấu tích vào ô "Ẩn danh" hoặc "Ẩn bằng chứng", Staff **tuyệt đối bảo mật danh tính** của họ khi mang vụ việc lên giải quyết công khai tại kênh Discord để tránh mâu thuẫn cá nhân.

### 2. Quản lý Thông báo (Thanh chạy chữ)
Đây là nơi cấu hình nội dung cho thanh thông báo màu vàng (Marquee) hiển thị ở ngay đầu trang web (Tab Trang chủ).

* **📌 Liên kết:** `https://docs.google.com/document/d/1IE_v7_BDP2r0rGh0p8jf6cZxXhKFjYTVcWoISFG-mZ4/edit?usp=drivesdk`
* **Hướng dẫn vận hành:**
  * Để thay đổi thông báo (ví dụ: Bảo trì, Event sự kiện mới, Khuyến mãi nạp...), Staff chỉ cần gõ nội dung mới vào file này, website sẽ tự động cập nhật.
  * Nếu Server đang hoạt động bình thường và không có gì đặc biệt cần thông báo, Staff chỉ cần **xóa trắng nội dung** trong file. Website sẽ nhận diện và tự động ẩn thanh thông báo đi.

---

**⚠️ MỌI THÔNG TIN TRONG ĐÂY CẦN PHẢI TUYỆT ĐỐI BẢO MẬT, KHÔNG ĐỂ CHO BẤT KÌ MEMBER NÀO CÓ QUYỀN TRUY CẬP VÀO BẤT KÌ FILE TRÊN!**
