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
	let $product = $(`<tr data-supplier-id="${sup_edrpou}"data-supplier-itn="${sup_itn}" 
		data-supplier-name="${sup_name}" data-supplier-phone="${sup_phone}" 
		data-supplier-email="${sup_email}" data-supplier-country="${sup_country}"
		data-supplier-email="${sup_region}" data-supplier-country="${sup_city}"
		data-supplier-email="${sup_street}" data-supplier-country="${sup_building}"
		data-supplier-email="${sup_acc}" data-supplier-country="${sup_notes}">
      <th scope="row" >${sup_edrpou}</th>
      <td>${sup_itn}</td>
      <td>${sup_name}</td>
      <td>${sup_phone}</td>
      <td>${sup_email}</td>
      <td>${sup_country}</td>
      <td class="text-break">${sup_region}</td>
      <td class="text-break">${sup_city}</td>
      <td class="text-break">${sup_street}, ${sup_building}</td>
      <td class="text-break">${sup_acc}</td>`);
     if(sup_notes != null) {
	    $($product).append(`<td class="text-break">${sup_notes}</td>`);
	   }else{
	   	$($product).append(`<td>-</td>`);

	   	};
       $($product).append(`<td> <button type="button" id ="delsupbtn" class="btn btn-outline-danger butmar">Delete</button>
      <button type="button" id ="invsupbtn" class="btn btn-outline-primary butmar">Invoices</button></td>
    </tr>`);
	return $product;
};
 module.exports = _makeHtml;

