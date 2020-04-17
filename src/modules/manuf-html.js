let _makeHtml = ({
	man_id,
	man_name,
	man_phone,
	man_email,
	man_city,
	man_street,
	man_building,
	man_notes
}) => {
	let $product = $(`<tr data-manuf-id="${man_id}"> 
      <th scope="row" >${man_id}</th>
      <td>${man_name}</td>
      <td>${man_phone}</td>
      <td>${man_email}</td>
      <td>${man_city}</td>
      <td>${man_street}, ${man_building}</td>`);

     if(man_notes != null) {
	    $($product).append(`<td class="text-break">${man_notes}</td>`);
	   }else{
	   	$($product).append(`<td>-</td>`);

	   	};
       $($product).append(`<td> <button type="button" id ="delmanbtn" class="btn btn-outline-danger butmar">Delete</button>
       	<button type="button" id="manufprod" class="btn btn-outline-primary butmar">Show products</button></td>
    </tr>`);
	return $product;
};
 module.exports = _makeHtml;
