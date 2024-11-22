// Validasi Format Email

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

emailInput.addEventListener("input", () => {
  // Regex untuk memvalidasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Periksa apakah email valid
  if (!emailRegex.test(emailInput.value) && emailInput.value !== "") {
    emailError.classList.remove("hidden"); // Tampilkan pesan error
  } else {
    emailError.classList.add("hidden"); // Sembunyikan pesan error
  }
});

// Validasi Angka Pada Nomor Telepon

const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");

phoneInput.addEventListener("input", () => {
  // Hanya izinkan angka
  const phoneValue = phoneInput.value;

  // Cek apakah ada karakter selain angka
  if (/[^0-9]/.test(phoneValue) && phoneValue !== "") {
    phoneError.classList.remove("hidden"); // Tampilkan pesan error
  } else {
    phoneError.classList.add("hidden"); // Sembunyikan pesan error
  }
});

// Random IPK Generator
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk menghasilkan nilai IPK random antara 2.5 dan 4
  function generateRandomIPK() {
    return (Math.random() * (4 - 2.5) + 2.5).toFixed(2);
  }
  // Inisialisasi variabel dan elemen
  const ipkElement = document.getElementById("ipk");
  const pilihanBeasiswa = document.getElementById("pilihan_beasiswa");
  const uploadBerkas = document.getElementById("upload");
  // Atur nilai IPK secara otomatis
  const ipk = parseFloat(generateRandomIPK());
  ipkElement.value = ipk;
  // Logika aktif/nonaktif elemen berdasarkan IPK
  if (ipk < 3) {
    pilihanBeasiswa.disabled = true;
    uploadBerkas.disabled = true;
    pilihanBeasiswa.classList.add("cursor-not-allowed", "opacity-50");
    uploadBerkas.classList.add("cursor-not-allowed", "opacity-50");
  } else {
    pilihanBeasiswa.disabled = false;
    uploadBerkas.disabled = false;
    pilihanBeasiswa.focus(); // Memindahkan kursor ke elemen pilihan beasiswa
  }
});
