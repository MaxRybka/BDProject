import './scss/main.scss'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
let uri=""

let _makeProduct = require('./modules/product1-html');


function clearProducts(){
	$('.product-grid').empty();
}
function createAllProducts(){
	
	jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
}

 $(document).ready(function() {
       createAllProducts();
 });

let _makeCategory = require('./modules/category-html');
$(document).on('change','.categories',function(){
	console.log('change');
	$('.product-grid').empty();
	var id = $(this).children("option:selected").val();
	console.log(id);
    if (id === '0') {
        createAllProducts();
    }else{
    	
		var url1="https://nit.tron.net.ua/api/product/list/category/"+id;
		jQuery.ajax({
		url: url1,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(product => $('.product-grid').append(_makeProduct(product)));

		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});
    }
});



function createAllInvoices(){
	
	jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
}



let _makeinvoice= require('./modules/invoice-html');
$(document).on('click','#invoices',function(){
	console.log("invoices");
	$('.product-grid').empty();
	$("#addProd").html('Add invoice');
	$('#addProd').attr('id','addInvoice'); 
	$('#addInvoice').attr('data-target','#addinvmodal'); 
	let $table = $(`<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Date</th>
		<th scope="col">Total price</th><th scope="col">Notes</th><th scope="col">Supplier</th></tr></thead><tbody id="invtable"></tbody> </table>`);
	$('.product-grid').append($table);

//   	jQuery.ajax({
// 	url: uri+'/inv',
// 	method: 'get',
//  	dataType: 'json',
//  	success: function(json){
// 		console.table(json);
//  		json.forEach(invoice => $('#invtable').append(_makeinvoice(invoice)));
// 	},
// 	error: function(xhr){
// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
//  	},
// });
});

$(document).on('click','#suppliers',function(){
	console.log("suppliers");
	$('.product-grid').empty();
	$(".add").html('Add Supplier');
	$('.add').attr('id','addSupplier'); 
	$('.add').attr('data-target','#addsupmodal'); 
	let $table = $(`<table class="table"><thead><tr><th scope="col">Edrpou</th><th >Itn</th>
		<th >name</th><th>Phone</th><th>Email</th><th>Country</th><th>Region</th><th>City</th><th>Street</th><th>Account</th><th>Notes</th></tr></thead><tbody id="invtable"></tbody> </table>`);
	$('.product-grid').append($table);
//   	jQuery.ajax({
// 	url: uri+'/inv',
// 	method: 'get',
//  	dataType: 'json',
//  	success: function(json){
// 		console.table(json);
//  		json.forEach(invoice => $('#invtable').append(_makeinvoice(invoice)));
// 	},
// 	error: function(xhr){
// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
//  	},
// });
});

$(document).on('click','#customers',function(){
	console.log("suppliers");
	$('.product-grid').empty();
	$(".add").html('Add Customer');
	$('.add').attr('id','addCustomer'); 
	$('.add').attr('data-target','#addsupmodal'); 
	let $table = $(`<table class="table"><thead><tr><th scope="col">Edrpou</th><th >Itn</th>
		<th >name</th><th>Phone</th><th>Email</th><th>Country</th><th>Region</th><th>City</th><th>Street</th><th>Account</th><th>Debt</th><th>Notes</th></tr></thead><tbody id="invtable"></tbody> </table>`);
	$('.product-grid').append($table);
//   	jQuery.ajax({
// 	url: uri+'/inv',
// 	method: 'get',
//  	dataType: 'json',
//  	success: function(json){
// 		console.table(json);
//  		json.forEach(invoice => $('#invtable').append(_makeinvoice(invoice)));
// 	},
// 	error: function(xhr){
// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
//  	},
// });
});






$(document).on('click','#delinvbtn',function(){
	var $this = $(this);

	var article = $this.closest('[data-invoice-id]').data('invoice-id');
    console.log("delete inv "+article);
 //    $.ajax({
 //    url: url+article,
 //    method: 'delete',
 //    dataType: 'json',
 //    success: function(json){
 //        console.log(json);
 //    },error: function(xhr){
	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	//  	},
	// });

	//createAllProducts();
});




$(document).on('click','[data-product-id] #delprodbtn',function(){
	var $this = $(this);

	var article = $this.closest('[data-product-id]').data('product-id');
    console.log("delete"+article);
 //    $.ajax({
 //    url: url+article,
 //    method: 'delete',
 //    dataType: 'json',
 //    success: function(json){
 //        console.log(json);
 //    },error: function(xhr){
	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	//  	},
	// });

	//createAllProducts();
});


$(document).on('click','[data-product-id] #editprodbtn',function(){
	var $this = $(this);


	var article = $this.closest('[data-product-id]').data('product-id');
    var name = $this.closest('[data-product-id]').data('name');
    var unit = $this.closest('[data-product-id]').data('unit');
    var amount = $this.closest('[data-product-id]').data('amount');
    var notes = $this.closest('[data-product-id]').data('notes');

	$('#editarticle').val(article);
	$('#editname').val(name);
	$('#editamount').val(amount);
	$('#editunit').val(unit);
	$('#editnotes').val(notes);
$(document).ready(function() {
       $('#editcategories-add').multiselect();
 });
 $(document).ready(function() {
       $('#editmanufecturers-add').multiselect();
 });
    //var special_price = $this.closest('[data-product-id]').data('price');
	//var product = { id: id , ammount: 1, name:name ,image_url:image_url ,price:price };
	//console.log(product);
	//createAllProducts();
});


$(document).on('click', '#addpost',function(){
	console.log('add post');
	let result={article: $("#article").val(),
				title:$("#title").val(),
				unit:$("#unit").children("option:selected").val(),

	}

    alert($('#categories-add').val());
 
	console.log(result);
	// $.ajax({
 //    url: '',
 //    method: 'post',
 //    data:result,
 //    dataType: 'json',
 //    success: function(json){
 //        console.log(json);
 //    },error: function(xhr){
	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	//  	},
	// });
	
});


$(document).on('click','#addProd',function(){
	console.log('add');
	jQuery.ajax({
		url: 'https://nit.tron.net.ua/api/category/list',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
		console.table('addd-',json);
 			json.forEach(category => $('#categories-add').append(_makeCategory(category)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});

 $(document).ready(function() {
       $('#categories-add').multiselect();
 });
 $(document).ready(function() {
       $('#manufecturers-add').multiselect();
 });

});


$('.categories').change(function() {
	console.log($(this).attr('id'));
	console.log($(this).val());
	clearProducts();

	
	console.log(id);
 //    if (id === '0') {
 //        createAllProducts();
 //    }else{
    	
	// 	var url1="https://nit.tron.net.ua/api/product/list/category/"+id;
	// 	jQuery.ajax({
	// 	url: url1,
	// 	method: 'get',
	//  	dataType: 'json',
	//  	success: function(json){
	// 		console.table(json);
	//  		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
	// 	},
	// 	error: function(xhr){
	// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	//  	},
	// });
 //    }
});
jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/category/list',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		//console.table(json);
 		json.forEach(category => $('.categories').append(_makeCategory(category)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
//console.log(`The time is ${new Date()}`);