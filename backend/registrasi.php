<?php
// Aktifkan error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Koneksi ke database
$host = "localhost";
$username = "root";
$password = "";
$dbname = "daftar_beasiswa";

$conn = new mysqli($host, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Tangkap data dari form
$nama = $_POST['nama'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$semester = $_POST['semester'] ?? '';
$ipk = $_POST['ipk'] ?? '';
$pilihan_beasiswa = $_POST['pilihan_beasiswa'] ?? '';

// Validasi data
if (empty($nama) || empty($email) || empty($phone) || empty($semester) || empty($ipk) || empty($pilihan_beasiswa)) {
    die("Semua data wajib diisi.");
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Format email tidak valid.");
}

// Validasi file upload
if (!isset($_FILES["upload"]) || $_FILES["upload"]["error"] != UPLOAD_ERR_OK) {
    die("File tidak diunggah atau terjadi kesalahan dalam upload.");
}

$upload_dir = "C:/laragon/www/web_bnsp/uploads/";
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Gunakan uniqid() untuk nama file agar unik
$uploaded_file = $upload_dir . uniqid() . "_" . basename($_FILES["upload"]["name"]);

// Validasi tipe file
$allowed_types = ['image/jpeg', 'image/png', 'application/pdf'];
$file_type = mime_content_type($_FILES["upload"]["tmp_name"]);

if (!in_array($file_type, $allowed_types)) {
    die("File yang diunggah tidak diizinkan. Hanya JPG, PNG, dan PDF.");
}

// Proses upload file
if (!move_uploaded_file($_FILES["upload"]["tmp_name"], $uploaded_file)) {
    die("Gagal mengunggah file.");
}

// Simpan path relatif
$uploaded_file = "uploads/" . basename($uploaded_file);


// Simpan data ke database menggunakan prepared statement
$stmt = $conn->prepare("INSERT INTO registrasi (nama, email, phone, semester, ipk, pilihan_beasiswa, upload) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $nama, $email, $phone, $semester, $ipk, $pilihan_beasiswa, $uploaded_file);

if ($stmt->execute()) {
    // Pengalihan setelah berhasil
    header("Location: ../frontend/hasil.html");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
