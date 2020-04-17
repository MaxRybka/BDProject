let _makeHtml = ({
	cust_edrpou,
	cust_itn,
	cust_name,
	cust_phone,
	cust_email,
	cust_country,
	cust_region,
	cust_city,
	cust_street,
	cust_building,
	cust_acc,
	cust_debt,
	cust_notes
}) => {
	let $product = $(`<ul class="list-group list-group-flush text-center">
    	 <li class="list-group-item">Edrpou: ${cust_edrpou}</li>
    	 <li class="list-group-item">Itn: ${cust_itn}</li>
    	 <li class="list-group-item">Name: ${cust_name}</li>
         <li class="list-group-item">Phone: ${cust_phone}</li>
         <li class="list-group-item">Email: ${cust_email}</li>
         <li class="list-group-item">Country: ${cust_country}</li>
         <li class="list-group-item">Region: ${cust_region}</li>
         <li class="list-group-item">City: ${cust_city}</li>
         <li class="list-group-item">Street: ${cust_street} ,${cust_building}</li>
         <li class="list-group-item">Account number: ${cust_acc}</li>
          <li class="list-group-item">Debt: ${cust_debt}</li>`);

        if(cust_notes != null) {
	    	$($product).append(`<li class="list-group-item">Notes: ${cust_notes}</li>`);
	   	}else{
	   		$($product).append(`<li class="list-group-item">Notes:-</li>`);
	   	};
	   	 $($product).append(` </ul>`);

	return $product;
};
 module.exports = _makeHtml;

