<?php
header("Access-Control-Allow-Origin: *");  // Replace "*" with specific domain if needed, e.g., "http://localhost"
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE"); // Allow methods you will use
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Rest of your existing code
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "dbvnb";
$port = 3307;

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Add content type header for the actual response
header("Content-Type: application/json");

$name = $_POST['fullname'];
$email = $_POST['email'];
$contact = $_POST['mobile-number'];
$address = $_POST['address'];
$month1 = $_POST['month'];
$day1 = $_POST['day'];
$year1 = $_POST['year'];
$time1 = $_POST['time'];
$month2 = $_POST['month2'];
$day2 = $_POST['day2'];
$year2 = $_POST['year2'];
$time2 = $_POST['time2'];

$first_date = "$year1-$month1-$day1";
$second_date = "$year2-$month2-$day2";

$stmt = $conn->prepare("INSERT INTO reservations (fullname, email, mobile_number, address, first_date, first_time, second_date, second_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $name, $email, $contact, $address, $first_date, $time1, $second_date, $time2);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = "Reservation saved!";
} else {
    $response['success'] = false;
    $response['message'] = "Error: " . $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>