let _makeHtml = ({
	prod_cd,
	prod_name,
	price,
	line_amount,
	total_price,
	man_name
}) => {
	let $product = $(`<tr data-prod-id="${prod_cd}">
      <th scope="row" >${prod_cd}</th>
      <td>${prod_name}</td>
      <td>${price}</td>
      <td>${line_amount}</td>
      <td>${total_price}</td>
      <td><a href="#" id="manufinfo" class="badge badge-light">${man_name}</a></td>`);
	return $product;
};
 module.exports = _makeHtml;

