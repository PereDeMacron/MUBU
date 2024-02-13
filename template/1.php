<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];

$sql = "INSERT INTO users (email) VALUES ('$email')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$to = $email;
$subject = "Welcome to MUBU!";
$message = "Thank you for signing up for MUBU. We're excited to have you on board!";
$headers = "From: info@mubu.com";

mail($to, $subject, $message, $headers);

$conn->close();
?>
