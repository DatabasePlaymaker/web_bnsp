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
  const ipk = parseFloat(generateRandomIPK()); // Parsing kembali untuk perbandingan
  ipkElement.value = ipk.toString();

  // Logika aktif/nonaktif elemen berdasarkan IPK
  if (ipk < 3) {
    pilihanBeasiswa.disabled = true;
    uploadBerkas.disabled = true;

    // Tambahkan style cursor not-allowed dan opacity untuk visual feedback
    pilihanBeasiswa.style.cursor = "not-allowed";
    uploadBerkas.style.cursor = "not-allowed";
    pilihanBeasiswa.style.opacity = "0.5";
    uploadBerkas.style.opacity = "0.5";

    // Tambahkan class untuk styling (jika menggunakan Tailwind)
    pilihanBeasiswa.classList.add("cursor-not-allowed", "opacity-50");
    uploadBerkas.classList.add("cursor-not-allowed", "opacity-50");
  } else {
    pilihanBeasiswa.disabled = false;
    uploadBerkas.disabled = false;

    // Hapus style cursor not-allowed dan opacity jika ada
    pilihanBeasiswa.style.cursor = "pointer";
    uploadBerkas.style.cursor = "pointer";
    pilihanBeasiswa.style.opacity = "1";
    uploadBerkas.style.opacity = "1";

    // Hapus class jika ada
    pilihanBeasiswa.classList.remove("cursor-not-allowed", "opacity-50");
    uploadBerkas.classList.remove("cursor-not-allowed", "opacity-50");

    pilihanBeasiswa.focus(); // Memindahkan kursor ke elemen pilihan beasiswa
  }
});

// Alert Daftar Beasiswa
// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Ambil form element
  const form = document.querySelector("form");

  // Tambahkan event listener untuk submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil semua input yang diperlukan
    const nama = document.querySelector('input[name="nama"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const semester = document.querySelector('select[name="semester"]').value;
    const ipk = document.querySelector('input[name="ipk"]').value;
    const beasiswa = document.querySelector(
      'select[name="pilihan_beasiswa"]'
    ).value;
    const berkas = document.querySelector('input[name="upload"]').value;

    // Validasi form
    if (
      !nama ||
      !email ||
      !phone ||
      !semester ||
      !ipk ||
      !beasiswa ||
      !berkas
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua kolom harus diisi!",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Format Email Salah",
        text: "Mohon masukkan format email yang valid",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validasi nomor telepon (hanya angka)
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Format Nomor HP Salah",
        text: "Nomor HP hanya boleh berisi angka",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validasi file upload
    const allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.zip)$/i;
    if (!allowedExtensions.exec(berkas)) {
      Swal.fire({
        icon: "error",
        title: "Format File Tidak Sesuai",
        text: "File harus berformat PDF, JPG, JPEG, atau ZIP",
        confirmButtonText: "OK",
      });
      return;
    }

    // Jika semua validasi berhasil, tampilkan alert sukses
    Swal.fire({
      icon: "success",
      title: "Pendaftaran Berhasil!",
      text: "Data Anda telah berhasil disimpan",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // Submit form
        form.submit();
      }
    });
  });

  // Tambahkan validasi real-time untuk email
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector("#email-error");

  emailInput.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value) && this.value !== "") {
      emailError.classList.remove("hidden");
    } else {
      emailError.classList.add("hidden");
    }
  });

  // Tambahkan validasi real-time untuk nomor HP
  const phoneInput = document.querySelector("#phone");
  const phoneError = document.querySelector("#phone-error");

  phoneInput.addEventListener("input", function () {
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(this.value) && this.value !== "") {
      phoneError.classList.remove("hidden");
    } else {
      phoneError.classList.add("hidden");
    }
  });
});
