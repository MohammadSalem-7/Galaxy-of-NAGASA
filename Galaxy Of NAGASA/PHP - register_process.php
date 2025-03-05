<?php
header('Content-Type: application/json');

// الاتصال بقاعدة البيانات
$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "your_database_name";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "فشل الاتصال بقاعدة البيانات"]));
}

// استقبال البيانات من النموذج
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // تشفير كلمة المرور

// إدخال البيانات في قاعدة البيانات
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "تم إنشاء الحساب بنجاح!"]);
} else {
    echo json_encode(["status" => "error", "message" => "حدث خطأ أثناء إنشاء الحساب"]);
}

$stmt->close();
$conn->close();
?>
