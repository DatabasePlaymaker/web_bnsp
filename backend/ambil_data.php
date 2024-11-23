<?php
// Aktifkan error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Koneksi ke database
$host = "localhost";
$username = "root";
$password = ""; // Password default Laragon
$dbname = "daftar_beasiswa";

$conn = new mysqli($host, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Query untuk mengambil data
$sql = "SELECT id, nama, email, phone, semester, ipk, pilihan_beasiswa, upload FROM registrasi";
$result = $conn->query($sql);

// Format data menjadi JSON
if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        // Pemetaan pilihan_beasiswa menjadi teks deskriptif
        if ($row['pilihan_beasiswa'] == 1) {
            $row['pilihan_beasiswa'] = "Beasiswa Akademik";
        } elseif ($row['pilihan_beasiswa'] == 2) {
            $row['pilihan_beasiswa'] = "Beasiswa Non Akademik";
        } else {
            $row['pilihan_beasiswa'] = "Tidak Ada Beasiswa";
        }

        // Tambahkan data yang sudah diproses ke array
        $data[] = $row;
    }
    // Mengirim data dalam format JSON
    echo json_encode($data);
} else {
    echo json_encode([]);
}

$conn->close();
?>
