<?php
// Koneksi ke database
$host = "localhost";
$username = "root";
$password = ""; // Password default Laragon atau sesuai pengaturan Anda
$dbname = "daftar_beasiswa";

$conn = new mysqli($host, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Dapatkan ID dari parameter URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Query untuk menghapus data berdasarkan ID
if ($id > 0) {
    $sql = "DELETE FROM registrasi WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menghapus data."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID tidak valid."]);
}

$conn->close();
?>
