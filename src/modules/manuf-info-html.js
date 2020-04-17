let _makeHtml = ({
	man_id,
	man_name,
	man_phone,
	man_email,
	man_country,
	man_city,
	man_street,
	man_building,
	man_notes
}) => {
	let $product = $(`<ul class="list-group list-group-flush text-center">
    	 <li class="list-group-item">Id: ${man_id}</li>
    	 <li class="list-group-item">Name: ${man_name}</li>
         <li class="list-group-item">Phone: ${man_phone}</li>
         <li class="list-group-item">Email: ${man_email}</li>
         <li class="list-group-item">Country: ${man_country}</li>
         <li class="list-group-item">City: ${man_city}</li>
         <li class="list-group-item">Street: ${man_street} ,${man_building}</li>
        `);

        if(man_notes != null) {
	    	$($product).append(`<li class="list-group-item">Notes: ${man_notes}</li>`);
	   	}else{
	   		$($product).append(`<li class="list-group-item">Notes:-</li>`);
	   	};
	   	 $($product).append(` </ul>`);

	return $product;
};
 module.exports = _makeHtml;

