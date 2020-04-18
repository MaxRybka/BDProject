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

function createAllSuppliers(){
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
}
function createAllCustOrders(id){
	clearGrid()
	$(".add").html('Add Order');
	$('.add').attr('id','addOrder'); 
	$('.add').attr('data-target','#addordmodal'); 
	$('.add').attr('data-customer-id',id); 
	let $table = $(`<table class="table"><thead><tr>
		<th scope="col">Id</th><th >Date</th><th >Price</th>
		<th >Notes</th><th>Customer</th></tr>
		</thead><tbody id="ordtable">
		</tbody> </table>`);
	$('.product-grid').append($table);
  	jQuery.ajax({
		url: uri+'/custord/'+id,
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
}

function createAllCustomers(){
	clearGrid()
	$('#categ').attr('disabled','disabled');
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
}

function createAllOrders(){
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

	$('#addprodmodal').on('hidden.bs.modal', function () {
		$('#manufs').empty();	
	});
    $('#infomodal').on('hidden.bs.modal', function () {
    	//$('#infolabel').empty();	
		$('#infobody').empty();	
	});
	$('#addinvmodal').on('hidden.bs.modal', function () {
		$('#invprod').empty();
		$('#invsupp').empty();		
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
	$('#categ').attr('disabled','disabled');
	$('.back').attr('data-supplier-id',"");
	$('.back').addClass("invisible");
	createAllInvoices();
});

let _makesupplier= require('./modules/supplier-html');
$(document).on('click','#suppliers',function(){
	console.log("suppliers");
	createAllSuppliers();
});


let _makeorder= require('./modules/order-html');
$(document).on('click','#orders',function(){
	createAllOrders();
});

let _makecustomer= require('./modules/customer-html');
$(document).on('click','#customers',function(){
	$('.back').addClass("invisible");
	$('.back').attr('data-supplier-id',""); 
	console.log("Customers");
	
	createAllCustomers();
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

let _makeordline= require('./modules/orderline-html');
$(document).on('click','#showordline',function(){
	var $this = $(this);

	var id = $this.closest('[data-order-id]').data('order-id');
	$('.back').attr('data-orline-id',id); 
	$('.back').attr('id','backtoord'); 
	$('.back').removeClass("invisible");
    console.log("showorder lines "+id);
	clearGrid()
	let $table = $(`<table class="table">
		<thead><tr>
		<th>Product code</th>
		<th>Product</th>
		<th>Price</th>
		<th>Amount</th>
		<th>Total price</th>
		<th>Manufacturer</th>
		</tr></thead><tbody id="ordlinetable"></tbody> </table>`);
	$('.product-grid').append($table);

  	jQuery.ajax({
		url: uri+'/order/'+id,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(line => $('#ordlinetable').append(_makeordline(line)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});
});

$(document).on('click','#manufprod',function(){
	var $this = $(this);
	$(".add").html('Add Prdouct');
	$('.add').attr('id','addProduct'); 
	$('.add').attr('data-target','#addprodmodal'); 
	var id = $this.closest('[data-manuf-id]').data('manuf-id');
	$('.back').attr('id','manufacturers'); 
	$('.back').removeClass("invisible");
	$('.add').attr('data-manuf-id',id); 
    console.log("show products of "+id);
	clearGrid()
	jQuery.ajax({
		url: uri+"/prodmanuf/"+id,
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
});
let _makebatch= require('./modules/batch-html');
$(document).on('click','#showinvbatch',function(){
	var $this = $(this);

	var id = $this.closest('[data-invoice-id]').data('invoice-id');
	$('.back').attr('data-invoice-id',id); 
	$('.back').attr('id','backtoinv'); 
	$('.back').removeClass("invisible");
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
	$('.back').attr('id','suppliers'); 
	$('.back').attr('data-supplier-id',id); 
	$('.back').removeClass("invisible");
    console.log("show inv "+id);
	createAllSupInvoices(id);
});

$(document).on('click','#custordbtn',function(){
	var $this = $(this);
	var id = $this.closest('[data-customer-id]').data('customer-id');
	$('.back').attr('id','customers'); 
	$('.back').attr('data-customer-id',id); 
	$('.back').removeClass("invisible");
    console.log("show order "+id);
	createAllCustOrders(id);
});
let _makesupinfo= require('./modules/supplier-info-html');
$(document).on('click','#supinfo',function(){
	var $this = $(this);
	var id = $this.closest('[data-supplier-id]').data('supplier-id');
	$('#infoLabel').text("Supplier");
    console.log("show info "+id);
    jQuery.ajax({
		url: uri+'/supp/'+id,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(supp => $('#infobody').append(_makesupinfo(supp)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});
});
let _makecustinfo= require('./modules/customer-info-html');
$(document).on('click','#custinfo',function(){
	var $this = $(this);
	var id = $this.closest('[data-customer-id]').data('customer-id');
	$('#infoLabel').text("Customer");
    console.log("show info "+id);
    jQuery.ajax({
		url: uri+'/cust/'+id,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(cust => $('#infobody').append(_makecustinfo(cust)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});
});
let _makemaninfo= require('./modules/manuf-info-html');
$(document).on('click','#maninfo',function(){
	var $this = $(this);
	var id = $this.closest('[data-manuf-id]').data('manuf-id');
	$('#infoLabel').text("Manufacturer");
    console.log("show info "+id);
    jQuery.ajax({
		url: uri+'/manuf/'+id,
		method: 'get',
	 	dataType: 'json',
	 	success: function(json){
			console.table(json);
	 		json.forEach(manuf => $('#infobody').append(_makemaninfo(manuf)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
	 	},
	});
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


$(document).on('click', '#backtoord',function(){
	console.log('back order');
	$('.back').attr('id','customers'); 
	if($(this).data('customer-id')===""){
		createAllOrders();
	}else{
		//$('.back').attr('id','suppliers'); 
		createAllCustOrders($(this).data('customer-id'));
	}
});

$(document).on('click', '#backtoinv',function(){
	console.log('back');
	$('.back').attr('id','suppliers'); 
	if($(this).data('supplier-id')===""){
		createAllInvoices();
	}else{
		//$('.back').attr('id','suppliers'); 
		createAllSupInvoices($(this).data('supplier-id'));
	}
});


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


$(document).on('click','#addcatpost',function(){
	var res={
		cat_name:$("#catname").val(),
		products:$('#catprod').val()
	}
	console.log(res);

	$('#addprodmodal').modal('show');
	$('#addcategmodal').modal('hide');
	

});


$(document).on('click','#supppost',function(){
	var res={
		sup_edrpou:$("#supedrpou").val(),
		sup_itn:$("#supitn").val(),
		sup_name:$("#supname").val(),
		sup_phone:$("#supphone").val(),
		sup_email:$("#supemail").val(),
		sup_country:$("#supcountry").val(),
		sup_region:$("#supregion").val(),
		sup_city:$("#supcity").val(),
		sup_street:$("#supstreet").val(),
		sup_building:$("#supbuild").val(),
		sup_acc:$("#supacc").val(),
		sup_notes:$("#supnotes").val(),
	}
	console.log(res);
});

$(document).on('click','#addcateg',function(){
	$('#categories-add').empty();
	
	jQuery.ajax({
		url: uri+'/prod',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			console.table(json);
 			json.forEach(prod => $('#catprod').append(_makeprodopt(prod)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	}).done(function(){
 		$('#catprod').multiselect();
	});

});

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

$(document).on('click','[data-product-id] #editprodbtn',function(){
	var $this = $(this);
	var article = $this.closest('[data-product-id]').data('product-id');
    var name = $this.closest('[data-product-id]').data('name');
    var unit = $this.closest('[data-product-id]').data('unit');
    var amount = $this.closest('[data-product-id]').data('amount');
    var notes = $this.closest('[data-product-id]').data('notes');

	$('#editarticle').text(article);
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

$(document).on('submit', '#addinvform',function(){
	console.log('Invoice post');	
	var batch=[];
	$('#prodinvtable tr').each(function() {
		var $this = $(this);
    	let res={
    		prod_cd:$this.closest('[data-product-id]').data('product-id'),
    		inv_id: parseInt($("#invid").val()),
    		bat_price:$this.closest('[data-product-id]').data('price'),
    		bat_amount: $this.closest('[data-product-id]').data('amount'),
    		bat_extra: $this.closest('[data-product-id]').data('extra'),
    		bat_initamount: $this.closest('[data-product-id]').data('amount')
    	}; 
    	batch.push(res);  
    	console.table(res); 
 	});
 	let result={inv_id: parseInt($("#invid").val()),
				inv_date:$("#invdate").val(),
				inv_notes:$("#invnotes").val(),
				sup_edrpou:$("#invsupp").children("option:selected").val(),
				batches:batch};
	console.table(result);
	$.ajax({
		type: "POST",
	    url:uri+"/inv",
	    data: JSON.stringify(result),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },failure: function(errMsg) {
        	alert(errMsg);
    	}
	}).done(function(){
 		createAllInvoices();
	});


});


$(document).on('submit', '#addsupform',function(){
	console.log('Supplier post');	
	let result={	
		sup_edrpou: $("#supedrpou").val(),
		sup_itn: $("#supitn").val(),
		sup_name: $("#supname").val(),
		sup_phone: $("#supphone").val(),
		sup_email: $("#supemail").val(),
		sup_region: $("#supregion").val(),
		sup_country: $("#supcountry").val(),
		sup_city: $("#supcity").val(),
		sup_street: $("#supstreet").val(),
		sup_building: $("#supbuilding").val(),
		sup_acc: $("#supacc").val(),
		sup_notes: $("#supnotes").val()
	}
	console.log(result);

	$.ajax({
		type: "POST",
	    url:uri+"/supp",
	    data: JSON.stringify(result),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	console.log("sardelka")
	    	alert(data);
	    },failure: function(errMsg) {
	    	console.log("sardelka121")
        	alert(errMsg);
    	}
	}).done(function(){
		console.log("sosiska1")
 		createAllSuppliers();
	});
	console.log("sosiska")
	

});

$(document).on('submit', '#addcustform',function(){
	console.log('Customer post');	
	let result={	
		cust_edrpou: $("#custedrpou").val(),
		cust_itn: $("#custitn").val(),
		cust_name: $("#custname").val(),
		cust_phone: $("#custphone").val(),
		cust_email: $("#custemail").val(),
		cust_region: $("#custregion").val(),
		cust_city: $("#custcity").val(),
		cust_street: $("#custstreet").val(),
		cust_building: $("#custbuilding").val(),
		cust_debt: 0,
		cust_acc: $("#custacc").val(),
		cust_notes: $("#custnotes").val()
	}

	$.ajax({
		type: "POST",
	    url:uri+"/cust",
	    data: JSON.stringify(result),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },failure: function(errMsg) {
        	alert(errMsg);
    	}
	}).done(function(){
 		createAllCustomers();
	});

	

});

$(document).on('click', '.prodpost',function(){
	console.log('add post');
	let result={article: $("#article").val(),
				title:$("#title").val(),
				unit:$("#unit").children("option:selected").val(),

	}

   $('#categories-add').val();
 
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
$('#myForm').submit(function(e){
    e.preventDefault();
   	console.log("check")
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


let _makeprodopt= require('./modules/product-option-html');
function createInvProds(){
	jQuery.ajax({
		url: uri+'/prod',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(prod => $('#invprod').append(_makeprodopt(prod)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});
}


let _makesuppopt= require('./modules/supp-option-html');
$(document).on('click','#addInvoice',function(){
	console.log('adding invoice');
 	createInvProds();	
 	jQuery.ajax({
		url: uri+'/supp',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(supp => $('#invsupp').append(_makesuppopt(supp)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});
});

$(document).on('click','#addprodinvtable',function(){
	$('#prodinvtable').append(`
		<tr data-product-id="${$("#invprod").children("option:selected").val()}"
		data-price="${$("#invprice").val()}" 
		data-amount="${$("#invamount").val()}" 
		data-extra="${$("#invextra").val()}">
      <th scope="row" >${$("#invprod").children("option:selected").text()}</th>
      <td>${$("#invprice").val()}</td>
      <td>${$("#invamount").val()}</td>
       <td>${$("#invextra").val()}</td>
	`);
	
});


$(document).on('click','#addProductInv',function(){
	console.log('add product In invoice');
	$('.prodpost').attr('id','addProductInvPost'); 
	$('#invprod').empty();

});
$(document).on('click','#addProductInvPost',function(){
	console.log('add product In invoice post');
	$('#addprodmodal').modal('hide');
	$('#addinvmodal').modal('show');
	$('.prodpost').attr('id','addpost'); 
	createInvProds();
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






