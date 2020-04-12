let _makeHtml = ({
	inv_id,
	inv_date,
	inv_total,
	inv_notes,
	sup_edrpou,
	sup_name
}) => {
	let $product = $(`<tr data-invoice-id="${inv_id}" data-date="${inv_date}" data-price="${inv_total}"	
		data-notes="${inv_notes}" data-sup_name="${sup_name}" data-sup_id="${sup_edrpou}">
      <th scope="row" >${inv_id}</th>
      <td>${inv_date.split("T")[0]}</td>
      <td>${inv_total}</td>`);
	  if(inv_notes != null) {
	    $($product).append(`<td class="text-break">${inv_notes}</td>`);
	   }else{
	   	$($product).append(`<td>-</td>`);

	   	};
      $($product).append(`<td><a href="#" id="class="badge badge-light">${sup_name}</a></td>
      		<td> <button type="button" id ="delinvbtn" class="btn btn-outline-danger butmar">Delete</button>
      		<button type="button" id ="showinvbatch" class="btn btn-outline-primary butmar">Show batches</button>
      		</td>
    	</tr>`);
	return $product;
};
 module.exports = _makeHtml;

