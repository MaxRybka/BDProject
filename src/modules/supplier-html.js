let _makeHtml = ({
	id,
	itn,
	name,
	phone,
	email,
	country,
	region,
	city,
	street,
	building,
	acc,
	notes
}) => {
	let $product = $(`<tr data-supplier-id="${id}"data-supplier-itn="${itn}" 
		data-supplier-name="${name}" data-supplier-phone="${phone}" 
		data-supplier-email="${email}" data-supplier-country="${country}"
		data-supplier-email="${region}" data-supplier-country="${city}"
		data-supplier-email="${street}" data-supplier-country="${building}"
		data-supplier-email="${acc}" data-supplier-country="${notes}">
      <th scope="row" >${id}</th>
      <td>${itn}</td>
      <td>${name}</td>
      <td>${phone}</td>
      <td>${email}</td>
      <td>${country}</td>
      <td>${region}</td>
      <td>${city}</td>
      <td>${street}, ${building}</td>
      <td>${acc}</td>
      <td>${notes}</td>
      <td> <button type="button" id ="delsupbtn" class="btn btn-outline-danger">Delete</button></td>
    </tr>`);
	return $product;
};
 module.exports = _makeHtml;

