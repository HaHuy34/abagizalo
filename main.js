AOS.init();
let slides = [];
let current = 0;

function openLightbox(images, title = "") {
  slides = images.map((src) => ({ src }));
  current = 0;

  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox").classList.add("show");
  document.getElementById("slideTitle").innerText = title;
  showSlide(current);
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.getElementById("lightbox").classList.remove("show");
}

function changeSlide(direction) {
  current = (current + direction + slides.length) % slides.length;
  showSlide(current);
}

function showSlide(index) {
  const slide = slides[index];
  const imageEl = document.getElementById("lightboxImage");

  imageEl.src = ""; // để hiển thị "loading..." nếu cần
  imageEl.alt = "Đang tải ảnh...";
  document.getElementById("slideCount").innerText = `${index + 1}/${
    slides.length
  }`;

  setTimeout(() => {
    imageEl.src = slide.src;
    imageEl.alt = `Slide ${index + 1}`;
  }, 50); // delay nhỏ để ảnh nhảy rõ
}

// Gửi thông tin khách hàng lên docs
function openForm() {
  document.getElementById("orderForm").classList.remove("hidden");
}

function closeForm() {
  document.getElementById("orderForm").classList.add("hidden");
}

function submitOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const note = document.getElementById("note").value.trim();

  if (!name || !phone) {
    Toastify({
      text: "📌 Vui lòng nhập thông tin !",
      duration: 2000,
      gravity: "top", // top or bottom
      position: "right", // left, center or right
      backgroundColor: "#fa1201ff", // red
      stopOnFocus: true,
    }).showToast();
    return;
  }

  // Lấy danh sách sản phẩm đã chọn
  const products = Array.from(
    document.querySelectorAll('input[name="product"]:checked')
  )
    .map((p) => p.value)
    .join(", ");

  // Lấy thời gian hiện tại (optional)
  const timestamp = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  // Gửi lên Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbz3uu5ELGVkgMRKz46MCo7SI4DfQ6jEt37oJU8-3CZQXvHbMFtmnW5SWwFQbsOEU2Qe/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp,
        name,
        phone,
        product: products,
        address,
        note,
      }),
    }
  );

  Toastify({
    text: " Đã gửi đơn hàng!",
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "#4CAF50", // green
    stopOnFocus: true,
  }).showToast();
  closeForm();
}

// Text animation
const text = "Ship Mọi Nơi - Nhận Trong Ngày";
const element = document.getElementById("typewriter-text");
let index = 0;
let typing = true;

function typeLoop() {
  if (typing) {
    if (index <= text.length) {
      element.textContent = text.substring(0, index);
      index++;
      setTimeout(typeLoop, 100);
    } else {
      typing = false;
      setTimeout(typeLoop, 1000); // chờ trước khi xóa
    }
  } else {
    if (index >= 0) {
      element.textContent = text.substring(0, index);
      index--;
      setTimeout(typeLoop, 50);
    } else {
      typing = true;
      setTimeout(typeLoop, 500); // chờ trước khi gõ lại
    }
  }
}

typeLoop();

// Zalo phone
window.addEventListener("scroll", function () {
  const zalo = document.querySelector(".zalo-phone");
  if (window.scrollY > 100) {
    zalo.classList.add("show");
    zalo.classList.remove("hidden");
  } else {
    zalo.classList.remove("show");
    zalo.classList.add("hidden");
  }
});
