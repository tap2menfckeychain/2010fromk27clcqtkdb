/* =====================================================================
   THIỆP 20/10 GỬI CÔ CỐ VẤN HỌC TẬP — chỉ cần sửa file này.
   Quy tắc nhỏ:
     • Chữ đặt trong dấu ngoặc kép "..."
     • Mỗi mục trong danh sách [ ... ] cách nhau bằng dấu phẩy ,
     • Dòng bắt đầu bằng // là ghi chú, trang web sẽ bỏ qua.
   ===================================================================== */

window.THIEP = {
  /* Tên Cô, ví dụ "Hà" → trang sẽ gọi "Cô Hà". Để trống "" thì chỉ gọi là "Cô". */
  tenCo: "",

  lop: "K27CLCQTKDB",
  nguoiGui: "Tập thể lớp K27CLCQTKDB",

  nhac: { file: "nhac/khuc-cam-on.wav", ten: "Khúc cảm ơn" },

  /* ---------- Ảnh ---------- */
  anhBia: "anh/co-bia.jpg",

  /* ---------- Câu trích dẫn mở đầu ---------- */
  trichDan: "Có những người dạy chúng ta bằng kiến thức, và có những người dạy chúng ta bằng cả trái tim. Với lớp mình, Cô là cả hai.",

  /* ---------- "Những điều chúng em luôn biết về Cô" ---------- */
  phamChat: [
    { tieuDe: "Tận tâm", noiDung: "Cô luôn hết mình vì sinh viên — chưa bao giờ ngại một câu hỏi của chúng em, dù là nhỏ nhất." },
    { tieuDe: "Tận tình & tỉ mỉ", noiDung: "Từng bài giảng của Cô đều chi tiết, cẩn thận, để chúng em hiểu thật sự chứ không chỉ học thuộc." },
    { tieuDe: "Dịu dàng", noiDung: "Giọng nói nhẹ nhàng, nụ cười hiền — ở bên Cô, mọi áp lực deadline như nhẹ đi một nửa." },
    { tieuDe: "Mạnh mẽ", noiDung: "Đằng sau sự dịu dàng ấy là một người phụ nữ bản lĩnh, vững vàng — chỗ dựa của cả lớp." },
    { tieuDe: "Luôn có mặt", noiDung: "Sự kiện nào của khoa cũng thấy Cô, lúc nào cũng rạng rỡ và tràn đầy năng lượng." },
    { tieuDe: "Người đồng hành", noiDung: "Và ở lớp mình, Cô là người lắng nghe, nhắc nhở, động viên từng bạn trên mỗi chặng đường." }
  ],

  /* ---------- Ba trang ảnh của Cô ---------- */
  khoanhKhac: [
    { anh: "anh/co-su-kien.jpg", nhan: "Ở mọi sự kiện của khoa",
      tieuDe: "Luôn có Cô ở đó",
      noiDung: "Từ những chương trình lớn của khoa đến những hoạt động nhỏ nhất, chúng em luôn thấy Cô — rạng rỡ và đầy năng lượng. Như dòng chữ phía sau Cô hôm ấy, “Rise to the sky”: Cô chính là người chắp cánh để chúng em bay xa hơn." },
    { anh: "anh/co-hoa.jpg", nhan: "Nhẹ nhàng mà mạnh mẽ",
      tieuDe: "Dịu dàng như hoa, vững vàng như cây",
      noiDung: "Cô dịu dàng trong từng lời nói, từng ánh mắt, nhưng cũng là một cô gái mạnh mẽ, kiên định — người mà chúng em luôn ngưỡng mộ và muốn học theo." },
    { anh: "anh/co-va-lop.jpg", nhan: "Ở lớp mình",
      tieuDe: "Người đồng hành của K27CLCQTKDB",
      noiDung: "Cô lắng nghe, nhắc nhở và nâng đỡ từng bạn, kiên nhẫn giải đáp mọi thắc mắc. Mỗi buổi học, mỗi lần gặp Cô, chúng em lại thấy mình được quan tâm thật nhiều." }
  ],

  /* ---------- Album ảnh lớp (xấp ảnh vuốt từng tấm) ---------- */
  anhLop: [
    { anh: "anh/lop/01.jpg", chuThich: "Những giờ học có nhau" },
    { anh: "anh/lop/02.jpg", chuThich: "Một chiều dưới sân D5" },
    { anh: "anh/lop/03.jpg", chuThich: "Đêm diễn mang về Giải Nhì" },
    { anh: "anh/lop/04.jpg", chuThich: "Cả lớp cùng nhau" },
    { anh: "anh/lop/05.jpg", chuThich: "Và còn thật nhiều kỷ niệm phía trước" }
  ],

  /* ---------- Bó hoa: mỗi bông hoa là một lời chúc (đẹp nhất với 6 lời chúc) ---------- */
  loiChuc: [
    "Chúc Cô luôn mạnh khỏe, bình an",
    "Chúc Cô luôn rạng rỡ và hạnh phúc",
    "Chúc mọi dự định của Cô đều suôn sẻ",
    "Chúc Cô luôn giữ mãi nụ cười dịu dàng ấy",
    "Chúc Cô có thêm thật nhiều niềm vui bên gia đình",
    "Và chúc Cô luôn được yêu thương như cách Cô thương chúng em"
  ],

  /* ---------- Thư của lớp ---------- */
  loiThu: [
    "Nhân ngày Phụ nữ Việt Nam 20/10, cả lớp K27CLCQTKDB muốn gửi đến Cô những lời cảm ơn và lời chúc chân thành nhất.",
    "Chúng em thật may mắn khi có Cô là cố vấn học tập. Cô luôn hết mình vì sinh viên — từ những bài giảng tận tình, chi tiết, cẩn thận, đến từng câu trả lời kiên nhẫn cho những thắc mắc tưởng chừng rất nhỏ. Ở mỗi sự kiện của khoa, chúng em đều thấy Cô; và ở lớp, Cô luôn ở đó — lắng nghe, nhắc nhở và nâng đỡ từng bạn.",
    "Cô nhẹ nhàng như chính nụ cười của Cô, nhưng cũng là một người phụ nữ mạnh mẽ, bản lĩnh mà chúng em luôn ngưỡng mộ. Điều Cô trao cho chúng em không chỉ là kiến thức, mà còn là sự tận tâm và cách sống tử tế — những điều chúng em sẽ mang theo thật lâu sau này.",
    "Chúng em kính chúc Cô luôn mạnh khỏe, hạnh phúc và rạng rỡ; mọi dự định đều thuận lợi; và luôn được yêu thương, trân trọng như cách Cô vẫn dành cho chúng em. Mong Cô luôn nhớ rằng phía sau Cô có cả một tập thể luôn biết ơn và yêu quý Cô rất nhiều.",
    "Chúc mừng ngày Phụ nữ Việt Nam!"
  ]
};
