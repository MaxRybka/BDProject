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
	let $product = $(`<tr data-manuf-id="${man_id}"
		data-manuf-name="${man_name}"
		data-manuf-phone="${man_phone}"
		data-manuf-email="${man_email}"
		data-manuf-country="${man_country}"
		data-manuf-city="${man_city}"
		data-manuf-street="${man_street}"
		data-manuf-building="${man_building}"
		data-manuf-notes="${man_notes}"> 
      <th scope="row" >${man_id}</th>
      <td>${man_name}</td>
      <td>${man_phone}</td>
      <td>${man_email}</td>
      <td>${man_country}</td>
      <td>${man_city}</td>
      <td>${man_street}, ${man_building}</td>`);

     if(man_notes != null) {
	    $($product).append(`<td class="text-break">${man_notes}</td>`);
	   }else{
	   	$($product).append(`<td>-</td>`);

	   	};
       $($product).append(`<td> <button type="button" id ="editmanuf" class="btn btn-outline-primary butmar"
        data-toggle="modal" data-target="#editmanufmodal" >Edit</button>
       	<button type="button" id="manufprod" class="btn btn-outline-primary butmar">Show products</button></td>
    </tr>`);
	return $product;
};
 module.exports = _makeHtml;
