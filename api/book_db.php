<?php
function getBooks() {
	if (isset($_GET['sort'])){
		$col=$_GET['sort'];
	}
	else{
		$col="title";
	}
	$query = "SELECT * FROM book ORDER BY "."$col";
	try {
	global $db;
		$books = $db->query($query);  
		$books = $books->fetchAll(PDO::FETCH_ASSOC);
		header("Content-Type: application/json", true);
		echo '{"Books": ' . json_encode($books) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getBookByID($id) {
	$query = "SELECT * FROM book WHERE id = '$id'";
    try {
		global $db;
		$books = $db->query($query);  
		$book = $books->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
		if(!empty($book)){
			echo json_encode($book);	
		}else{
			echo '{"message": {"No book is found with ID '. $id .'"}}';
		}
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function findByTitle($title) {
$query = "SELECT * FROM book WHERE UPPER(title) LIKE ". '"%'.$title.'%"'." ORDER BY title";
    try {
		global $db;
		$books = $db->query($query);  
		$books = $books->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json", true);
		if(!empty($books)){
			echo json_encode($books);
		}else{
			echo '{"message": {"No book is found"}}';
		}
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addBook() {
    global $app;
	$request = $app->request();
	$book = json_decode($request->getBody());
	$isbn = $book->isbn;
	$title = $book->title;
	$synopsis = $book->synopsis;
	$category = $book->category;
	$author = $book->author;
	$publisher = $book->publisher;
	$price = $book->price;
	$publishYear = $book->publishYear;
	$selQuery = "SELECT * FROM book WHERE isbn='$isbn' OR title='$title'";
	$query= "INSERT INTO book
                 (isbn, title, synopsis, category, author, publisher, price, publishYear)
              VALUES
                 ('$isbn', '$title', '$synopsis', '$category', '$author', '$publisher', '$price', '$publishYear')";
	try {
		global $db;
		$books = $db->query($selQuery);  
		$checkBook = $books->fetch(PDO::FETCH_ASSOC);
		if(!empty($checkBook)){
			echo '{"message": {"Book already created."}}';
		}else{
			$db->exec($query);
			$book->id = $db->lastInsertId();
			echo json_encode($book); 
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteBook($id) {
	$selQuery = "SELECT * FROM book WHERE id = $id";
	$delQuery = "DELETE FROM book WHERE id = $id";
	try {
		global $db;
		$books = $db->query($selQuery);  
		$book = $books->fetch(PDO::FETCH_ASSOC);
		if(!empty($book)){
			$db->exec($delQuery);	
			echo '{"message": {"Book successfully deleted."}}';
		}else{
			echo '{"message": {"Book with ID "'. $id .'" not found"}}';
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateBook($id) {
	global $app;
	$request = $app->request();
	$book = json_decode($request->getBody());
	$book->id = $id;
	$isbn = $book->isbn;
	$title = $book->title;
	$synopsis = $book->synopsis;
	$category = $book->category;
	$author = $book->author;
	$publisher = $book->publisher;
	$price = $book->price;
	$publishYear = $book->publishYear;
	$query = "UPDATE book SET isbn='$isbn', title='$title', synopsis='$synopsis', category='$category', author='$author', publisher='$publisher', price='$price', publishYear='$publishYear' WHERE id=$id";
	$selQuery = "SELECT * FROM book WHERE id=$id";
	try {
		global $db;
		$books = $db->query($selQuery);  
		$checkBook = $books->fetch(PDO::FETCH_ASSOC);
		if(!empty($checkBook)){
			$db->exec($query); 
			echo json_encode($book);
		}else {
			echo '{"message": {"Book with ID "'. $id .'" not found"}}';
		}
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
?>