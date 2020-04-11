let _makeHtml = ({
	id,
	name,
	unit,
	amount,
	notes,
	special_price
}) => {
	let $product = $(`<div class="card col-xs-10 col-sm-4 col-md-3  product text-center " 
		data-product-id="${id}" data-name="${name}" data-unit="${unit}"	data-amount="${amount}" data-notes="${notes}" data-price="${special_price}">`);
		
		//$product.append($(`<div class="card-body">`));
		$product.append($(`<h5 class="badge card-title ">Article: ${id}</h5>`));
		$product.append($(`<p class="text-center  ">Title: ${name}</p>`));
		$product.append($(`<p class="card-text">Unit:  ${id}</p>`));
		$product.append($(`<p class="card-text">Amount left: ${amount}</p>`));
		$product.append($(`<p class="card-text">${id}</p>`));
		$product.append($(`<div > <button id="editprodbtn" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#editModal">Edit</button>  
    		<button id="delprodbtn" type="button" class="btn btn-outline-danger">Delete</button>
	 		</div>`));
    	$product.append($(`</div></div>`));
 //    <p class="card-text">With supporting text below as a natural lead-in to additional content</p>
    
 // 	</div>")
	// $product.append($(`<span class=" card-title product-title">Article: `).text(price));
	// $product.append($(`<span class=" card-title product-title">Ttile: `).text(name));
	// $product.append($('<div class="card1">'));
	// $product.append($(`<div > <span class="badge card-title product-price">${price + "₴"}</span> 
	// 	</div>`));
	// $product.append($(`<div > <span class="badge card-title ">${name}</span> 
	// 	</div>`));
	// $product.append($(`<div > <button id="editprodbtn" type="button" class="btn btn-outline-primary">Edit</button>  
 //   		<button id="delprodbtn" type="button" class="btn btn-outline-danger">Delete</button>
	// 	</div>`));
 //  	$product.append($(`<div class="collapse scroll" id="collapseExample${id}">`).text(notes));
	return $product;
};
 module.exports = _makeHtml;