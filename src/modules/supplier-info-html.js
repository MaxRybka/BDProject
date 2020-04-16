let _makeHtml = ({
	sup_edrpou,
	sup_itn,
	sup_name,
	sup_phone,
	sup_email,
	sup_country,
	sup_region,
	sup_city,
	sup_street,
	sup_building,
	sup_acc,
	sup_notes
}) => {
	let $product = $(`<ul class="list-group list-group-flush text-center">
    	 <li class="list-group-item">Edrpou: ${sup_edrpou}</li>
    	 <li class="list-group-item">Itn: ${sup_itn}</li>
    	 <li class="list-group-item">Name: ${sup_name}</li>
         <li class="list-group-item">Phone: ${sup_phone}</li>
         <li class="list-group-item">Email: ${sup_email}</li>
         <li class="list-group-item">Country: ${sup_country}</li>
         <li class="list-group-item">Region: ${sup_region}</li>
         <li class="list-group-item">City: ${sup_city}</li>
         <li class="list-group-item">Street: ${sup_street} ,${sup_building}</li>
         <li class="list-group-item">Account number: ${sup_acc}</li>`);

        if(sup_notes != null) {
	    	$($product).append(`<li class="list-group-item">Notes: ${sup_notes}</li>`);
	   	}else{
	   		$($product).append(`<li class="list-group-item">Notes:-</li>`);
	   	};
	   	 $($product).append(` </ul>`);

	return $product;
};
 module.exports = _makeHtml;

