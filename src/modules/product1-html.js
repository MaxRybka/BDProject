let _makeHtml = ({
	prod_cd,
	prod_name,
	prod_unit,
	prod_total_am,
	//notes,
	man_id,
	man_name
}) => {
	let $product = $(`<div class="card col-xs-10 col-sm-4 col-md-3  product text-center " 
		data-product-id="${prod_cd}" data-name="${prod_name}" data-unit="${prod_unit}" 
		data-amount="${prod_total_am}" data-man-id="${man_id}"  data-man-name="${man_name}">`);
		
		$product.append($(`<h5 class="badge card-title">Article: ${prod_cd}</h5>`));
		$product.append($(`<p class="text-center">Title: ${prod_name}</p>`));
		$product.append($(`<p class="card-text">Unit:  ${prod_unit}</p>`));
		$product.append($(`<p class="card-text">Amount left: ${prod_total_am}</p>`));
		$product.append($(`<p class="card-text">Виробник ${man_name}</p>`));
		$product.append($(`<div> <button id="editprodbtn" type="button" class="btn btn-outline-primary butmar" data-toggle="modal" data-target="#editModal">Edit</button>  
    		<button id="delprodbtn" type="button" class="btn btn-outline-danger butmar">Delete</button>
	 		</div>`));
    	$product.append($(`</div></div>`));

	return $product;
};
 module.exports = _makeHtml;