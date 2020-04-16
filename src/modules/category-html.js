let _makeHtml = ({
	cat_id,
	cat_name,
}) => {
	let $product = $(`<option value="${cat_id}">${cat_name}</option>`);
	return $product;
};
 module.exports = _makeHtml;