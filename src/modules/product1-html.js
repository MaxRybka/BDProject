let _makeHtml = ({
	prod_cd,
	prod_name,
	prod_unit,
	prod_total_am,
	prod_notes,
	man_id,
	man_name
}) => {
	let $product = $(`<div class="card col-xs-10 col-sm-4 col-md-3  product text-center " 
		data-product-id="${prod_cd}" 
		data-product-name="${prod_name}"
		data-product-unit="${prod_unit}"
		data-manuf-name="${man_name}"
		data-product-notes="${prod_notes}"data-manuf-id="${man_id}" >`);
		
		$product.append($(`<h5 class="badge card-title">Article: ${prod_cd}</h5>`));
		$product.append($(`<p class="text-center">Title: ${prod_name}</p>`));
		$product.append($(`<p class="card-text">Unit:  ${prod_unit}</p>`));
		$product.append($(`<p class="card-text">Amount left: ${prod_total_am}</p>`));
		$product.append($(`<p>Manufacturer:<a href="#" id="maninfo" class="badge badge-light" data-toggle="modal" 
      	data-target="#infomodal">  ${man_name}</a></p>`));
      	if(prod_notes != null) {
	    $($product).append(`<p class="text-break">Notes: ${prod_notes}</p>`);
	   		}else{
	   	$($product).append(`<p>Notes: -</p>`);

	   	};
		$product.append($(`<div> <button id="editprodbtn" type="button" class="btn btn-outline-primary butmar" data-toggle="modal" data-target="#editModal">Edit</button>  
	 		</div>`));
    	$product.append($(`</div></div>`));

	return $product;
};
 module.exports = _makeHtml;