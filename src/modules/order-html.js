let _makeHtml = ({
	ord_id,
	ord_date,
	ord_price,
	ord_notes,
	cust_edrpou,
	cust_name
}) => {
	let $product = $(`<tr data-order-id="${ord_id}" data-customer-id="${cust_edrpou}">
      <th scope="row" >${ord_id}</th>
      <td>${ord_date.split("T")[0]}</td>
      <td>${ord_price}</td>`);
	  if(ord_notes != null) {
	    $($product).append(`<td class="text-break">${ord_notes}</td>`);
	   }else{
	   	$($product).append(`<td>-</td>`);

	   	};
      $($product).append(`<td><a href="#" id="custinfo"class="badge badge-light" data-toggle="modal" 
      	data-target="#infomodal">${cust_name}</a></td>
      		<td>
      		<button type="button" id ="showordline" class="btn btn-outline-primary butmar">Show info</button>
      		</td>
    	</tr>`);
	return $product;
};
 module.exports = _makeHtml;

