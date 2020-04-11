let _makeHtml = ({
	cd,
	name,
	unit,
	total_am,
	notes,
	man_id,
	man_name
}) => {
	let $product = $(`<div class="card col-xs-10 col-sm-4 col-md-3  product text-center " 
		data-product-id="${cd}" data-name="${name}" data-unit="${unit}"	data-amount="${total_am}" data-notes="${notes}" data-man-id="${man_id}"  data-man-name="${man_name}">`);
		
		$product.append($(`<h5 class="badge card-title">Article: ${cd}</h5>`));
		$product.append($(`<p class="text-center">Title: ${name}</p>`));
		$product.append($(`<p class="card-text">Unit:  ${unit}</p>`));
		$product.append($(`<p class="card-text">Amount left: ${total_am}</p>`));
		$product.append($(`<p class="card-text">Виробник ${man_name}</p>`));
		$product.append($(`<div> <button id="editprodbtn" type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#editModal">Edit</button>  
    		<button id="delprodbtn" type="button" class="btn btn-outline-danger">Delete</button>
	 		</div>`));
    	$product.append($(`</div></div>`));

	return $product;
};
 module.exports = _makeHtml;