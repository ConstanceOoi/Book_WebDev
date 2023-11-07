<?php
function getUsers() {
	if (isset($_GET['sort'])){
		$col=$_GET['sort'];
	}
	else{
		$col="name";
	}
	$query = "SELECT * FROM user ORDER BY "."$col";
	try {
	global $db;
		$users = $db->query($query);  
		$users = $users->fetchAll(PDO::FETCH_ASSOC);
		header("Content-Type: application/json", true);
		echo '{"Users": ' . json_encode($users) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getUser($id) {
	$query = "SELECT * FROM user WHERE id = $id";
    try {
		global $db;
		$users = $db->query($query);  
		$user = $users->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
		if(!empty($user)){
			echo json_encode($user);
		}else{
			echo '{"message": {"No user is found with ID '. $id .'"}}';
		}
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function findByName($name) {
$query = "SELECT * FROM user WHERE UPPER(name) LIKE ". '"%'.$name.'%"'." ORDER BY name";
    try {
		global $db;
		$users = $db->query($query);  
		$user = $users->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
        if(!empty($user)){
			echo json_encode($user);
		}else{
			echo '{"message": {"No user is found"}}';
		}
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addUser() {
    global $app;
	$request = $app->request();
	$user = json_decode($request->getBody());
	$name = $user->name;
	$email = $user->email;
	$phoneNo = $user->phoneNo;
	$address = $user->address;
	$birthDate = $user->birthDate;
	$password = $user->password;
	$selQuery = "SELECT * FROM user WHERE name='$name' OR email='$email'";
	$query= "INSERT INTO user
                 (name, email, phoneNo, address, birthDate, password)
              VALUES
                 ('$name', '$email', '$phoneNo', '$address', '$birthDate', '$password')";
	try {
		global $db;
		$users = $db->query($selQuery);
		$checkUser = $users->fetch(PDO::FETCH_ASSOC);
		if(!empty($checkUser)){
			echo '{"message": {"User already created."}}';
		}else{
			$db->exec($query);
			$user->id = $db->lastInsertId();
			echo json_encode($user); 
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteUser($id) {
	$selQuery = "SELECT * FROM user WHERE id = $id";
	$query = "DELETE FROM user WHERE id=$id";
	try {
		global $db;
		$users = $db->query($selQuery);
		$user = $users->fetch(PDO::FETCH_ASSOC);
		if(!empty($user)){
			$db->exec($query);
			echo '{"message": {"User successfully deleted."}}';
		}else{
			echo '{"message": {"User with ID "'. $id .'" not found"}}';
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateUser($id) {
	global $app;
	$request = $app->request();
	$user = json_decode($request->getBody());
	$name = $user->name;
	$email = $user->email;
	$phoneNo = $user->phoneNo;
	$address = $user->address;
	$birthDate = $user->birthDate;
	$password = $user->password;
	$query = "UPDATE user SET name='$name', email='$email', phoneNo='$phoneNo', address='$address', birthDate='$birthDate', password='$password' WHERE id=$id";
	$selQuery = "SELECT * FROM user WHERE id=$id";

	try {
		global $db;
		$users = $db->query($selQuery);
		$checkUser = $users->fetch(PDO::FETCH_ASSOC);
		if(!empty($checkUser)){
			$db->exec($query);
			echo json_encode($user); 
		}else{
			echo '{"message": {"User with ID "'. $id .'" not found"}}';
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function login() {
	global $app;
	$request = $app->request();
	$user = json_decode($request->getBody());
	$email = $user->email;
	$password = $user->password;
	$query = "SELECT * FROM user WHERE email='$email' AND password='$password'";
	try{
		global $db;
		$users = $db->query($query);
		$user = $users->fetch(PDO::FETCH_ASSOC);
		header("Content-Type: application/json", true);
		if(!empty($user)){
			echo '{"message": {"User successfully login."}}';
		}else{
			echo '{"message": {"Wrong login credentials."}}';
		}
	}catch(PDOException $e){
		echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
		
?>