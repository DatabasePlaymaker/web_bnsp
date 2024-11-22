<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection
    $koneksi = new mysqli('localhost', 'root', '', 'pendaftaran');
    
    if ($koneksi->connect_error) {
        die("Koneksi gagal: " . $koneksi->connect_error);
    }

    // File upload handling
    $berkas_upload = '';
    if(isset($_FILES['upload']) && $_FILES['upload']['error'] == 0) {
        $target_dir = "uploads/";
        $berkas_upload = $target_dir . basename($_FILES['upload']['name']);
        move_uploaded_file($_FILES['upload']['tmp_name'], $berkas_upload);
    }

    // Prepare SQL statement
    $stmt = $koneksi->prepare("INSERT INTO mahasiswa (nama, email, nomor_hp, semester, ipk, pilihan_beasiswa, berkas_upload) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssisss", 
        $_POST['nama'], 
        $_POST['email'], 
        $_POST['phone'], 
        $_POST['semester'], 
        $_POST['ipk'], 
        $_POST['pilihan_beasiswa'], 
        $berkas_upload
    );

    // Execute and redirect
    if ($stmt->execute()) {
        // Store data in session to display in hasil.html
        session_start();
        $_SESSION['pendaftaran'] = [
            'nama' => $_POST['nama'],
            'email' => $_POST['email'],
            'nomor_hp' => $_POST['phone'],
            'semester' => $_POST['semester'],
            'ipk' => $_POST['ipk'],
            'pilihan_beasiswa' => $_POST['pilihan_beasiswa'],
            'status_ajuan' => 'Belum di verifikasi'
        ];
        
        header("Location: ../frontend/hasil.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $koneksi->close();
}
?>