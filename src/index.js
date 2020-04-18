import './scss/main.scss'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
let uri="http://localhost:8888";

let _makeProduct = require('./modules/product1-html');
let _makemanufopt= require('./modules/manuf-option-html');
let _makeCategory = require('./modules/category-html');
let _makebatch= require('./modules/batch-html');
let _makeinvoice= require('./modules/invoice-html');
let _makesupplier= require('./modules/supplier-html');
let _makeorder= require('./modules/order-html');
let _makecustomer= require('./modules/customer-html');
let _makemanuf= require('./modules/manuf-html');
let _makeordline= require('./modules/orderline-html');
let _makecustopt= require('./modules/cust-option-html');
let _makeprodopt= require('./modules/product-option-html');
let _makesuppopt= require('./modules/supp-option-html');

function clearGrid(){
	$('.product-grid').empty();
}
function createAllProducts(){
	clearGrid();	
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

function createProdAdd(){
	$('#catselect').append( `<select id="categories-add" multiple="multiple" >
          </select>`);
	 
          
	jQuery.ajax({
		url: uri+'/category',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(category => $('#categories-add').append(_makeCategory(category)));
		},complete: function (data) {
      		  $('#categories-add').multiselect();
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

function createAllManufs(){
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
		<th>Country</th>
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
	$('#editModal').on('hidden.bs.modal', function () {
		$('#manufsedit').empty();	
		$('#catselectedit').empty();
	});
	$('#addprodmodal').on('hidden.bs.modal', function () {
		$('#manufs').empty();	
		$('#catselect').empty();
	});
    $('#infomodal').on('hidden.bs.modal', function () {
    	//$('#infolabel').empty();	
		$('#infobody').empty();	
	});
	$('#addinvmodal').on('hidden.bs.modal', function () {
		$('#invprod').empty();
		$('#invsupp').empty();		
	});
	$('#addordmodal').on('hidden.bs.modal', function () {
		$('#ordprod').empty();
		$('#ordcust').empty();		
	});

});


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



$(document).on('click','#invoices',function(){
	$('#categ').attr('disabled','disabled');
	$('.back').attr('data-supplier-id',"");
	$('.back').addClass("invisible");
	createAllInvoices();
});


$(document).on('click','#suppliers',function(){
	console.log("suppliers");
	createAllSuppliers();
});


$(document).on('click','#orders',function(){
	createAllOrders();
});

$(document).on('click','#customers',function(){
	$('.back').addClass("invisible");
	$('.back').attr('data-supplier-id',""); 
	console.log("Customers");
	
	createAllCustomers();
});
$(document).on('click','#manufacturers',function(){
	$('.back').attr('data-supplier-id',""); 
	$('.back').addClass("invisible");
	console.log("manufacturers");
	createAllManufs();
});


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



$(document).on('submit','#addprodform',function(){
	var res={
		prod_cd:$("#article").val(),
		prod_name:$("#name").val(),
		prod_unit:$("#unit").children("option:selected").val(),
		prod_notes:$("#notes").val(),
		man_id:$("#manufs").children("option:selected").val(),
		categs: $('#categories-add').val()
	}

  
 

	console.log(res);

	$.ajax({
		type: "POST",
	    url:uri+"/prod",
	    data: JSON.stringify(res),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },complete: function (data) {
	    	createAllProducts();
     	}
	    ,failure: function(errMsg) {
        	alert(errMsg);
    	}
	})

	

	

});
$(document).on('submit','#addcatform',function(){
	var list=$('#catprod').val();
	var res={
		cat_name:$("#catname").val(),
		products:list.map(x=>+x)
	}
	console.log(res);

	$.ajax({
		type: "POST",
	    url:uri+"/category",
	    data: JSON.stringify(res),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },complete: function (data) {
	    	createProdAdd();
      		$('#addprodmodal').modal('show');
			$('#addcategmodal').modal('hide');
     }
	    ,failure: function(errMsg) {
        	alert(errMsg);
    	}
	})

	

	

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
$(document).on('click','[data-product-id] #editprodbtn',function(){
	console.log("edit prod")
	var $this = $(this);
	var article = $this.closest('[data-product-id]').data('product-id');
    var name = $this.closest('[data-product-id]').data('name');
    var unit = $this.closest('[data-product-id]').data('unit');
    var notes = $this.closest('[data-product-id]').data('notes');

	$('#articleedit').text("Article : "+article);
	$('#articleedit').attr("data-product-id",article);
	$('#nameedit').val(name);
	$('#unitedit').val(unit);
	$('#notesedit').val(notes);
	$('#catselectedit').append( `<select id="categories-addedit" multiple="multiple" >
          </select>`);
	 
          
	jQuery.ajax({
		url: uri+'/category',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(category => $('#categories-addedit').append(_makeCategory(category)));
		},complete: function (data) {
      		  $('#categories-addedit').multiselect();
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
 			json.forEach(manuf => $('#manufsedit').append(_makemanufopt(manuf)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});
});


$(document).on('submit', '#editprodform',function(){
	var article=$("#articleedit").data("product-id");
	var res={
		prod_name:$("#nameedit").val(),
		prod_unit:$("#unitedit").children("option:selected").val(),
		prod_notes:$("#notesedit").val(),
		man_id:$("#manufsedit").children("option:selected").val(),
		categs: $('#categories-addedit').val()
	}  
 

	console.log(res);

	$.ajax({
		type: "PUT",
	    url:uri+"/prod/"+article,
	    data: JSON.stringify(res),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },complete: function (data) {
	    	createAllProducts();
     	}
	    ,failure: function(errMsg) {
        	alert(errMsg);
    	}
	})
});
$(document).on('click','#editmanuf',function(){
	console.log("edit manuf")
	var $this = $(this);
	var id = $this.closest('[data-manuf-id]').data('manuf-id');
    var name = $this.closest('[data-manuf-id]').data('manuf-name');
    var phone = $this.closest('[data-manuf-id]').data('manuf-phone');
    var email = $this.closest('[data-manuf-id]').data('manuf-email');
    var country = $this.closest('[data-manuf-id]').data('manuf-country');
    var city = $this.closest('[data-manuf-id]').data('manuf-city');
    var street = $this.closest('[data-manuf-id]').data('manuf-street');
    var building = $this.closest('[data-manuf-id]').data('manuf-building');
    var notes = $this.closest('[data-manuf-id]').data('manuf-notes');

    console.log(id+name+phone+email+country+city+street+building+notes);
	$('#manufidedit').text(id);
	$('#manufnameedit').val(name);
	$('#manufphoneedit').val(phone);
	$('#manufemailedit').val(email);
	$('#manufcountryedit').val(country);
	$('#manufcityedit').val(city);
	$('#manufstreetedit').val(street);
	$('#manufbuildingedit').val(building);
	$('#manufnotesedit').val(notes);
	 
});



$(document).on('submit', '#editmanufform',function(){
	console.log('edit manuf post');	
	var id=$("#manufidedit").text();
	console.log(id)
	let result={	
		man_name: $("#manufnameedit").val(),
		man_phone: $("#manufphoneedit").val(),
		man_email: $("#manufemailedit").val(),
		man_country: $("#manufcountryedit").val(),
		man_city: $("#manufcityedit").val(),
		man_street: $("#manufstreetedit").val(),
		man_building: $("#manufbuildingedit").val(),
		man_notes: $("#manufnotesedit").val()
	}
	console.log(result);
	$.ajax({
		type: "PUT",
	    url:uri+"/manuf/"+id,
	    data: JSON.stringify(result),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },complete:function(){
	    	createAllManufs();
	    },failure: function(errMsg) {
        	alert(errMsg);
    	}
	})


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
	    },complete:function(){
	    	createAllInvoices();
	    },failure: function(errMsg) {
        	alert(errMsg);
    	}
	});


});
$(document).on('submit', '#addordform',function(){
	console.log('Order post');	
	var line=[];
	$('#prodordtable tr').each(function() {
		var $this = $(this);
    	let res={
    		prod_cd:$this.closest('[data-product-id]').data('product-id'),
    		bat_amount: $this.closest('[data-product-id]').data('amount')	
    	}; 
    	line.push(res);  
    	console.table(res); 
 	});
 	let result={ord_id: parseInt($("#ordid").val()),
				ord_date:$("#orddate").val(),
				ord_notes:$("#ordnotes").val(),
				cust_edrpou:$("#ordcust").children("option:selected").val(),
				order_lines:line};
	console.table(result);
	$.ajax({
		type: "POST",
	    url:uri+"/order",
	    data: JSON.stringify(result),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },complete:function(){
	    	createAllOrders();
	    },failure: function(errMsg) {
        	alert(errMsg);
    	}
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
	    },complete: function (data) {
      		createAllSuppliers();
     },failure: function(errMsg) {
	    	console.log("sardelka121")
        	alert(errMsg);
    	}
	});
	

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
	    },complete: function (data) {
      		createAllCustomers();
     },failure: function(errMsg) {
        	alert(errMsg);
    	}
	});

	

});

$(document).on('submit', '#addmanufform',function(){
	console.log('Manufacturer post');	
	let result={	
		man_name: $("#manufname").val(),
		man_phone: $("#manufphone").val(),
		man_email: $("#manufemail").val(),
		man_country: $("#manufcountry").val(),
		man_city: $("#manufcity").val(),
		man_street: $("#manufstreet").val(),
		man_building: $("#manufbuilding").val(),
		man_notes: $("#manufnotes").val()
	}
	console.log(result);

	$.ajax({
		type: "POST",
	    url:uri+"/manuf",
	    data: JSON.stringify(result),
	    contentType: "application/json; charset=utf-8",
	    dataType: 'json',
	    success: function(data){
	    	alert(data);
	    },
    	complete: function (data) {
      		createAllManufs();
     },failure: function(errMsg) {
        	alert(errMsg);
    	}
	});

});
$(document).on('click','#addOrder',function(){
	
 	jQuery.ajax({
		url: uri+'/cust',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(cust => $('#ordcust').append(_makecustopt(cust)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});
 	createProdAdd();
 	createOrdProds();
});

$(document).on('click','#addProductOrd',function(){
	console.log('add product In Order');
	$('.prodpost').attr('id','addProductOrdPost'); 
	$('#invprod').empty();

});
$(document).on('click','#addProductOrdPost',function(){
	console.log('add product In Order post');
	$('#addprodmodal').modal('hide');
	$('#addordmodal').modal('show');
	$('.prodpost').attr('id','addpost'); 
	createOrdProds();
});




$(document).on('click','#addProduct',function(){
	console.log('add prod');
	createProdAdd();

});


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

function createOrdProds(){
	jQuery.ajax({
		url: uri+'/prod',
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			json.forEach(prod => $('#ordprod').append(_makeprodopt(prod)));
		},
		error: function(xhr){
			alert("An error occured: " + xhr.status + " " + xhr.statusText);
 		},
 	});
}



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


$(document).on('click','#addprodordtable',function(){
	var id=$("#ordprod").children("option:selected").val()
	jQuery.ajax({
		url: uri+'/prod/'+id,
		method: 'get',
 		dataType: 'json',
 		success: function(json){
 			let amount=json.prod_total_am;
 			console.log(amount);
 			if(amount>=$("#ordamount").val()){
 				$('#prodordtable').append(`
				<tr data-product-id="${$("#ordprod").children("option:selected").val()}"
				data-amount="${$("#ordamount").val()}" >
		      <th scope="row" >${$("#ordprod").children("option:selected").text()}</th>
		      <td>${$("#ordamount").val()}</td>
			`);
 			}else{
 				alert("Wrong amount entered");
 			}
		
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




$(document).on('click','#supplike',function(){
	var id=$(this).closest('[data-supplier-id]').data('supplier-id');
	console.log(id)
	clearGrid();
	let $table = $(`<table class="table"><thead><tr>
		<th scope="col">Edrpou</th><th >Itn</th>
		<th >name</th><th>Phone</th><th>Email</th><th>Country</th>
		<th>Region</th><th>City</th><th>Street</th><th>Account</th>
		<th>Notes</th></tr></thead><tbody id="supptable"></tbody> </table>`);
	$('.product-grid').append($table);
  	jQuery.ajax({
		url: uri+'/supplike/'+id,
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

//console.log(`The time is ${new Date()}`);






