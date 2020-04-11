let _makeHtml = ({
	id,
	date,
	price,
	notes,
	sup_id,
	suo_name
}) => {
	let $product = $(`<tr data-invoice-id="${id}" data-date="${date}" data-price="${price}"	data-notes="${notes}" data-sup_name="${sup_name}" data-sup_id="${sup_id}">
      <th scope="row" >${id}</th>
      <td>${date}</td>
      <td>${price}</td>
      <td>${notes}</td>
      <td><a href="#" id="class="badge badge-light">${suo_name}</a></td>
      <td> <button type="button" id ="delinvbtn" class="btn btn-outline-danger">Delete</button></td>
    </tr>`);
	return $product;
};
 module.exports = _makeHtml;

