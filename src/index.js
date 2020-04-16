import './scss/main.scss'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
let uri="http://localhost:8888";

let _makeProduct = require('./modules/product1-html');


function clearGrid(){
	$('.product-grid').empty();
}
function createAllProducts(){	
	jQuery.ajax({
	url: uri+"/prod",
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



function createAllInvoices(){
	clearGrid()
	$(".add").html('Add Invoice');
	$('.add').attr('id','addInvoice'); 
	$('.add').attr('data-target','#addinvmodal'); 
	let $table = $(`<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Date</th>
		<th scope="col">Total price</th><th scope="col">Notes</th><th scope="col">Supplier</th></tr></thead><tbody id="invtable"></tbody> </table>`);
	$('.product-grid').append($table);
  		jQuery.ajax({
		url: uri+'/inv',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
			console.table(json);
 			json.forEach(invoice => $('#invtable').append(_makeinvoice(invoice)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
	});
	
}

function createAllSupInvoices(id){
	clearGrid()
	$(".add").html('Add invoice');
	$('.add').attr('id','addInvoice'); 
	$('.add').attr('data-target','#addinvmodal'); 
	$('.add').attr('data-supplier-id',id); 


	$('.back').attr('data-supplier-id',id); 
	$('.back').removeClass("invisible");
	let $table = $(`<table class="table"><thead><tr>
		<th >#</th><th >Date</th>
		<th >Total price</th><th >Notes</th><th >Supplier</th></tr></thead><tbody id="invtable"></tbody> </table>`);
	$('.product-grid').append($table);

  	jQuery.ajax({
		url: uri+'/suppinv/'+id,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(invoice => $('#invtable').append(_makeinvoice(invoice)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});	
}


 $(document).ready(function() {
       createAllProducts();
       jQuery.ajax({
		url: uri+'/category',
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
});

let _makeCategory = require('./modules/category-html');
$(document).on('change','.categories',function(){
	console.log('change');
	clearGrid()
	var id = $(this).children("option:selected").val();
	console.log(id);
    if (id === '0') {
        createAllProducts();
    }else{
    	
		var url1=uri+"/category/"+id;
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




$(document).on('click','#products',function(){
	console.log("invoices");
	$('#categ').removeAttr('disabled');
	$('.back').attr('data-supplier-id',""); 
	$('.back').addClass("invisible");
	clearGrid()
	$(".add").html('Add Product');
	$('.add').attr('id','addProduct'); 
	$('.add').attr('data-target','#addprodmodal'); 
	createAllProducts();
});

let _makeinvoice= require('./modules/invoice-html');
$(document).on('click','#invoices',function(){
	$('.back').attr('data-supplier-id',"");
	$('.back').addClass("invisible");
	createAllInvoices();
});

let _makesupplier= require('./modules/supplier-html');
$(document).on('click','#suppliers',function(){
	console.log("suppliers");
	$('#categ').attr('disabled','disabled');
	clearGrid()
	$('.back').addClass("invisible");
	$('.back').attr('data-supplier-id',""); 
	$('.add').html('Add Supplier');
	$('.add').attr('id','addSupplier'); 
	$('.add').attr('data-target','#addsupmodal'); 
	let $table = $(`<table class="table"><thead><tr>
		<th scope="col">Edrpou</th><th >Itn</th>
		<th >name</th><th>Phone</th><th>Email</th><th>Country</th>
		<th>Region</th><th>City</th><th>Street</th><th>Account</th>
		<th>Notes</th></tr></thead><tbody id="supptable"></tbody> </table>`);
	$('.product-grid').append($table);
  	jQuery.ajax({
	url: uri+'/supp',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(supplier => $('#supptable').append(_makesupplier(supplier)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
});


let _makeorder= require('./modules/order-html');
$(document).on('click','#orders',function(){
	console.log("orders");
	$('#categ').attr('disabled','disabled');
	$('.back').addClass("invisible");
	$('.back').attr('data-supplier-id',""); 
	clearGrid()
	$(".add").html('Add Order');
	$('.add').attr('id','addOrder'); 
	$('.add').attr('data-target','#addordmodal'); 
	let $table = $(`<table class="table"><thead><tr>
		<th scope="col">Id</th><th >Date</th><th >Price</th>
		<th >Notes</th><th>Customer</th></tr>
		</thead><tbody id="ordtable">
		</tbody> </table>`);
	$('.product-grid').append($table);
  	jQuery.ajax({
	url: uri+'/order',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(order => $('#ordtable').append(_makeorder(order)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
});

let _makecustomer= require('./modules/customer-html');
$(document).on('click','#customers',function(){
	$('.back').addClass("invisible");
	$('.back').attr('data-supplier-id',""); 
	console.log("suppliers");
	$('#categ').attr('disabled','disabled');
	clearGrid()
	$(".add").html('Add Customer');
	$('.add').attr('id','addCustomer'); 
	$('.add').attr('data-target','#addcustmodal'); 
	let $table = $(`<table class="table"><thead><tr>
		<th scope="col">Edrpou</th><th >Itn</th>
		<th >name</th><th>Phone</th><th>Email</th>
		<th>Region</th>
		<th>City</th><th>Street</th><th>Account</th><th>Debt</th>
		<th>Notes</th></tr></thead><tbody id="custtable">
		</tbody> </table>`);
	$('.product-grid').append($table);
  	jQuery.ajax({
	url: uri+'/cust',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(customer => $('#custtable').append(_makecustomer(customer)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
});


let _makemanuf= require('./modules/manuf-html');
$(document).on('click','#manufacturers',function(){
	$('.back').attr('data-supplier-id',""); 
	$('.back').addClass("invisible");
	console.log("manufacturers");
	$('#categ').attr('disabled','disabled'); 
	clearGrid()
	$(".add").html('Add Manufecturer');
	$('.add').attr('id','addManuf'); 
	$('.add').attr('data-target','#addmanufmodal'); 
	let $table = $(`<table class="table"><thead><tr>
		<th scope="col">Id</th>
		<th>Name</th>
		<th>Phone</th>
		<th>Email</th>
		<th>City</th>
		<th>Street</th>
		<th>Notes</th></tr></thead><tbody id="manuftable">
		</tbody> </table>`);
	$('.product-grid').append($table);

  	jQuery.ajax({
	url: uri+'/manuf',
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(manuf => $('#manuftable').append(_makemanuf(manuf)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
});

let _makebatch= require('./modules/batch-html');
$(document).on('click','#showinvbatch',function(){
	var $this = $(this);
	var id = $this.closest('[data-invoice-id]').data('invoice-id');
    console.log("show batches of inv "+id);
	clearGrid()
	let $table = $(`<table class="table">
		<thead><tr>
		<th>Product code</th>
		<th>Product</th>
		<th>Price</th>
		<th>Extra</th>
		<th>Initial amount</th>
		<th>Left amount</th>
		<th>End Price</th>
		<th>Total price</th>
		<th>Manufacturer</th>
		</tr></thead><tbody id="batchtable"></tbody> </table>`);
	$('.product-grid').append($table);

  	jQuery.ajax({
	url: uri+'/batchinv/'+id,
	method: 'get',
 	dataType: 'json',
 	success: function(json){
		console.table(json);
 		json.forEach(batch => $('#batchtable').append(_makebatch(batch)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
 	},
});
});

$(document).on('click','#invsupbtn',function(){
	var $this = $(this);
	var id = $this.closest('[data-supplier-id]').data('supplier-id');

    console.log("show inv "+id);
	createAllSupInvoices(id);
});


$(document).on('click','#delinvbtn',function(){
	var $this = $(this);

	var id = $this.closest('[data-invoice-id]').data('invoice-id');
    console.log("delete inv "+id);
   
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

$(document).on('click', '#back',function(){
	console.log('back');
	if($(this).data('supplier-id')===""){
		createAllInvoices();
	}else{
		createAllSupInvoices($(this).data('supplier-id'));
	}
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

let _makemanufopt= require('./modules/manuf-option-html');
$(document).on('click','#addProduct',function(){
	console.log('add prod');
	jQuery.ajax({
		url: uri+'/category',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(category => $('#categories-add').append(_makeCategory(category)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});
 	jQuery.ajax({
		url: uri+'/manuf',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(manuf => $('#manufs').append(_makemanufopt(manuf)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});

	$(document).ready(function() {
	    $('#categories-add').multiselect();
	});

});


$(document).on('click','#addSupplier',function(){
	console.log('add supp');
	

});


$('.categories').change(function() {
	console.log($(this).attr('id'));
	console.log($(this).val());
	clearProducts();

	
	console.log(id);
    if (id === '0') {
        createAllProducts();
    }else{
    	
		var url1=uri+"/category/"+id;
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

//console.log(`The time is ${new Date()}`);






