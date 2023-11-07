//root URL for RESTful services
var rootURL = 'http://localhost/Book_WebDev/api/books';
var userURL = 'http://localhost/Book_WebDev/api/users';

var currentBook;


//GET ALL BOOKS
var findAll= function () {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", 
		success: renderList
	});
};

//get one book by id 
var findById = function(id){
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.title);
			currentBook = data;
			renderDetails(data);
		}
	});
};


var findByTitle = function(title) {
	console.log('findByTitle: ' + title);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + title,
		dataType: "json",
		success: function(data){
			console.log('findByTitle success: ' + data.title);
			renderDetails(data)
		}
	});
};

//create new book
var newBook = function(){
	$('#createBtn').hide();
	currentBook = {};
	renderDetails(currentBook)
};

var addNewBook = function() {
	console.log('addBook');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Book created successfully');
			$('#id').val(data.id);
			location.reload();
			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addBook error: ' + errorThrown);
		}
	});
};

//update book
var updateBook = function(id) {
	console.log('updateBook');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + id,
		dataType: "json",
		data: editFormToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Book updated successfully');
			$('#editBookForm').modal('hide');
			location.reload();
			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateBook error: ' + errorThrown);
		}
	});
};

//delete book
var deleteBook = function(id) {
	console.log('deleteBook');
	console.log(id);
	if(confirm('Are you sure to delete this book?')){
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json',
			url: rootURL + '/' + id,
			success: function(data, textStatus, jqXHR){
				alert('Book deleted successfully');
				location.reload();
				findAll();
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('deleteBook error: ', errorThrown);
			}
		});
	}
	
};

var renderList = function (data) {
	var list = data.Books;
			console.log("response");
			$.each(list, function(i ,Books){
				$("#table_body").append('<tr><td>' +  Books.isbn + '</td><td>' + 
				Books.title + '</td><td>' + Books.category + '</td><td>' + 
				Books.author + '</td><td>' + Books.price + '</td><td>' + 
				Books.publishYear + '</td><td ><a href="#" id="'+Books.id+'">More Info</a></td>' +
				'<td><a href="#"><button type="button" class="btn btn-light btnEdit" id="editBookBtn" data-id="'+Books.id+'" data-toggle="modal" data-target="#editBookForm">Edit</a>'
				+'<a href="#"><button type="button" class="btn btn-light btnDelete" id="btnDeleteBook" data-id="'+Books.id+'">Delete</a></button</td></tr>');
			});
			$('#table_id').DataTable();
};

var renderDetails = function(book){
	var htmlStr = '<h4>' + book.title + '</h4><P style="text-align: justify;">' + book.synopsis + '<P>ISBN: ' + book.isbn + 
	'<P>Cateogry: ' + book.category + '<P>Author: ' + book.author + '<P>Publisher: ' +
	book.publisher + '<P>Price: ' + book.price + '<P>Publication Year: ' + book.publishYear + '<BR><BR>'; 
	
	$("#contents").html(htmlStr);
	$('#myModal').modal('show');
};

var formToJSON = function() {
	var bookID = $('#id').val();
	return JSON.stringify({
		"id": bookID == "" ? null : bookID, 
		"isbn": $('#isbn').val(),
		"title": $('#title').val(),
		"synopsis": $('#synopsis').val(),
		"category": $('#category').val(),
		"author": $('#author').val(),
		"publisher": $('#publisher').val(),
		"price": $('#price').val(),
		"publishYear": $('#publishYear').val()
	});
	
};

var editFormToJSON = function() {
	return JSON.stringify({
			"id": $("#editBookForm [name=\"id\"]").val(),
			"isbn":	$("#editBookForm [name=\"isbn\"]").val(),
			"title":	$("#editBookForm [name=\"title\"]").val(),
			"synopsis":	$("#editBookForm [name=\"synopsis\"]").val(),
			"category":	$("#editBookForm [name=\"category\"]").val(),
			"author":	$("#editBookForm [name=\"author\"]").val(),
			"publisher":	$("#editBookForm [name=\"publisher\"]").val(),
			"price":	$("#editBookForm [name=\"price\"]").val(),
			"publishYear":	$("#editBookForm [name=\"publishYear\"]").val()
	});
};

var findAllUsers= function () {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: userURL,
		dataType: "json", 
		success: renderUserList
	});
};

//get one user by id 
var findUserById = function(id){
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: userURL + '/' + id,
		dataType: "json",
		success: function(data){
			console.log('findById success: ' + data.name);
			renderUserDetails(data);
		}
	});
};


var addNewUser = function() {
	console.log('addUser');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: userURL,
		dataType: "json",
		data: userFormToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('User created successfully');
			$('#id').val(data.id);
			location.reload();
			findAllUsers();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addUser error: ' + errorThrown);
		}
	});
};

//update User
var updateUser = function(id) {
	console.log('updateUser');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: userURL + '/' + id,
		dataType: "json",
		data: editUserFormToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('User updated successfully');
			$('#editUserForm').modal('hide');
			location.reload();
			findAllUsers();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateUser error: ' + errorThrown);
		}
	});
};

//delete User
var deleteUser = function(id) {
	console.log('deleteUser');
	console.log(id);
	if(confirm('Are you sure to delete this user?')){
		$.ajax({
			type: 'DELETE',
			contentType: 'application/json',
			url: userURL + '/' + id,
			success: function(data, textStatus, jqXHR){
				alert('User deleted successfully');
				location.reload();
				findAllUsers();
			},
			error: function(jqXHR, textStatuss, errorThrown){
				alert('deleteUser error: ', errorThrown);
			}
		});
	}
	
};

var renderUserList = function (data) {
	var list = data.Users;
			console.log("response");
			$.each(list, function(i ,Users){
				$("#user_table_body").append('<tr><td>' + Users.id + '</td><td>' +  Users.name + '</td><td>' + 
				Users.email + '</td><td>' + Users.phoneNo + '</td><td>' + 
				Users.address + '</td><td>' + Users.birthDate + 
                '</td><td ><a href="#" id="'+Users.id+'">More Info</a></td>' +
				'<td><a href="#"><button type="button" class="btn btn-light btnEdit" id="editUserBtn" data-id="'+Users.id+'" data-toggle="modal" data-target="#editUserForm">Edit</a>'
				+'<a href="#"><button type="button" class="btn btn-light btnDelete" id="btnDeleteUser" data-id="'+Users.id+'">Delete</a></button</td></tr>');
			});
			$('#user_table_id').DataTable();
};

var renderUserDetails = function(user){
	var htmlStr = '<h4>' + user.name + '</h4><P>Email: ' + user.email+ '<P>Phone No: ' + user.phoneNo + 
	'<P>Address: ' + user.address + '<P>Birthday: ' + user.birthDate + '<BR><BR>'; 
	
	$("#user_contents").html(htmlStr);
	$('#userModal').modal('show');
};

var userFormToJSON = function() {
	var userID = $('#id').val();
	return JSON.stringify({
		"id": userID == "" ? null : userID, 
		"name": $('#name').val(),
		"email": $('#email').val(),
		"phoneNo": $('#phoneNo').val(),
		"address": $('#address').val(),
		"birthDate": $('#birthDate').val(),
		"password": $('#password').val()
	});
	
};

var editUserFormToJSON = function() {
	return JSON.stringify({
			"id": $("#editUserForm [name=\"id\"]").val(),
			"name":	$("#editUserForm [name=\"name\"]").val(),
			"email":	$("#editUserForm [name=\"email\"]").val(),
			"phoneNo":	$("#editUserForm [name=\"phoneNo\"]").val(),
			"address":	$("#editUserForm [name=\"address\"]").val(),
			"birthDate": $("#editUserForm [name=\"birthDate\"]").val(),
			"password":	$("#editUserForm [name=\"password\"]").val()
	});
};


$(document).ready(function () {
	
	/* $("#books_tab").click(function() {
		$("#books").toggle();
		console.log('test'); */
		findAll();
	//});
		$('#btnSearch').click(function() {
			search($('#searchKey').val());
			return false;
		});
		
		$('#searchKey').keypress(function(e){
			if(e.which == 13) { 
				search($('#searchKey').val());
				e.preventDefault();
				return false;
			}
		});
		
		$('#btnAddBook').click(function () {
			addNewBook();
			return false;
		});


		$('#btnEditBook').click(function() {
			
			var id = $('#id').val();
			console.log(id);
			if($('#id').val() == '')
				addNewBook();
			else
				updateBook(id);
				
			return false;
		});

		
		$(document).on("click", '#table_body a', function(){findById(this.id);});
		
		$(document).on("click", '#btnDeleteBook', function(){
			var id = $(this).attr('data-id');
			deleteBook(id);
		});

		$(document).delegate('#editBookBtn', "click", function(){
			var id = $(this).attr('data-id');
			console.log(id);
			$.ajax({
				type: 'GET',
				url: rootURL + '/' + id,
				data: {
					"id" : id
				},
				success: function(response){
					data = JSON.parse(response);
					$("#editBookForm [name=\"id\"]").val(data.id);
					$("#editBookForm [name=\"isbn\"]").val(data.isbn);
					$("#editBookForm [name=\"title\"]").val(data.title);
					$("#editBookForm [name=\"synopsis\"]").val(data.synopsis);
					$("#editBookForm [name=\"category\"]").val(data.category);
					$("#editBookForm [name=\"author\"]").val(data.author);
					$("#editBookForm [name=\"publisher\"]").val(data.publisher);
					$("#editBookForm [name=\"price\"]").val(data.price);
					$("#editBookForm [name=\"publishYear\"]").val(data.publishYear);
				}
			})
		});
		
		
	
	
	/* $("#users_tab").click(function() {
		$("#users").toggle();
		console.log("users"); */
		findAllUsers();
	//});
		$('#btnSearch').click(function() {
		search($('#searchKey').val());
		return false;
		});
		
		$('#searchKey').keypress(function(e){
			if(e.which == 13) { 
				search($('#searchKey').val());
				e.preventDefault();
				return false;
			}
		});
		
		$('#btnAddUser').click(function () {
			addNewUser();
			return false;
		});


		$('#btnEditUser').click(function() {
			var id = $('#user_id').val();
			console.log(id);
			if($('#user_id').val() == '')
				addNewUser();
			else
				updateUser(id);
				
			return false;
		});

		
		$(document).on("click", '#user_table_body a', function(){findUserById(this.id);});
		
		$(document).on("click", '#btnDeleteUser', function(){
			var id = $(this).attr('data-id');
			console.log(id);
			deleteUser(id);
		});

		$(document).delegate('#editUserBtn', "click", function(){
			var id = $(this).attr('data-id');
			console.log(id);
			$.ajax({
				type: 'GET',
				url: userURL + '/' + id,
				data: {
					"id" : id
				},
				success: function(response){
					data = JSON.parse(response);
					$("#editUserForm [name=\"id\"]").val(data.id);
					$("#editUserForm [name=\"name\"]").val(data.name);
					$("#editUserForm [name=\"email\"]").val(data.email);
					$("#editUserForm [name=\"phoneNo\"]").val(data.phoneNo);
					$("#editUserForm [name=\"address\"]").val(data.address);
					$("#editUserForm [name=\"birthDate\"]").val(data.birthDate);
					$("#editUserForm [name=\"password\"]").val(data.password);
				}
			})
		});
			
		
	
});
	

