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
$password = $data['password'];

// البحث عن المستخدم في قاعدة البيانات
$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $hashed_password);

if ($stmt->fetch() && password_verify($password, $hashed_password)) {
    echo json_encode(["status" => "success", "message" => "تم تسجيل الدخول بنجاح!"]);
} else {
    echo json_encode(["status" => "error", "message" => "اسم المستخدم أو كلمة المرور غير صحيحة"]);
}

$stmt->close();
$conn->close();
?>
