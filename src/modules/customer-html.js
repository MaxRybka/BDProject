let _makeHtml = ({
	cust_edrpou,
	cust_itn,
	cust_name,
	cust_phone,
	cust_email,
	cust_region,
	cust_city,
	cust_street,
	cust_building,
	cust_debt,
	cust_acc,
	cust_notes
}) => {
	let $product = $(`<tr data-customer-id="${cust_edrpou}"data-customer-itn="${cust_itn}" 
		data-customer-name="${cust_name}" data-customer-phone="${cust_phone}" 
		data-customer-email="${cust_email}" 
		data-customer-email="${cust_region}" data-customer-country="${cust_city}"
		data-customer-email="${cust_street}" data-customer-country="${cust_building}"
		data-customer-email="${cust_acc}" data-customer-debt="${cust_debt}"> 
		data-customer-country="${cust_notes}">
      <th scope="row" >${cust_edrpou}</th>
      <td>${cust_itn}</td>
      <td>${cust_name}</td>
      <td>${cust_phone}</td>
      <td>${cust_email}</td>
      <td class="text-break">${cust_region}</td>
      <td class="text-break">${cust_city}</td>
      <td class="text-break">${cust_street}, ${cust_building}</td>
      <td class="text-break">${cust_acc}</td>
      <td >${cust_debt}</td>`);

     if(cust_notes != null) {
	    $($product).append(`<td class="text-break">${cust_notes}</td>`);
	   }else{
	   	$($product).append(`<td>-</td>`);

	   	};
       $($product).append(`<td> <button type="button" id ="delcustbtn" class="btn btn-outline-danger butmar">Delete</button>
      <button type="button" id ="custordbtn" class="btn btn-outline-primary butmar">Orders</button></td>
    </tr>`);
	return $product;
};
 module.exports = _makeHtml;
