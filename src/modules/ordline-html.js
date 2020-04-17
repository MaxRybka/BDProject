let _makeHtml = ({
	prod_cd,
	prod_name,
	bat_price,
	bat_extra,
	bat_amount,
	bat_initamount,
	bat_endprice,
	bat_lineprice,
	man_name
}) => {
	let $product = $(`<tr data-prod-id="${prod_cd}">
      <th scope="row" >${prod_cd}</th>
      <td>${prod_name}</td>
      <td>${bat_price}</td>
      <td>${bat_extra}</td>
      <td>${bat_initamount}</td>
      <td>${bat_amount}</td>
      <td>${bat_endprice}</td>
      <td>${bat_lineprice}</td>
      <td><a href="#" id="class="badge badge-light">${man_name}</a></td>`);
	return $product;
};
 module.exports = _makeHtml;

