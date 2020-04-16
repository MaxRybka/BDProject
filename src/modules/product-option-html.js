let _makeHtml = ({
	prod_cd,
	prod_name,
}) => {
	let $product = $(`<option value="${prod_cd}">${prod_name}</option>`);
	return $product;
};
 module.exports = _makeHtml;