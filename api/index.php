<?php
require 'Slim/Slim.php';
require 'book_db.php';
require 'user_db.php';
require 'database.php';
use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();
$app->get('/books', 'getBooks');
$app->get('/books/:id',  'getBookByID');
$app->get('/books/search/:query', 'findByTitle');
$app->post('/books', 'addBook');
$app->delete('/books/:id',	'deleteBook');
$app->put('/books/:id', 'updateBook');

$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->get('/users/search/:name', 'findByName');
$app->post('/users', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id', 'deleteUser'); 

$app->post('/login', 'login'); 


$app->run();
?>