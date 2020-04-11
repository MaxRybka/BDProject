let _makeHtml = ({
	id,
	name,
}) => {
	let $product = $(`<option value="${id}">${name}</option>`);
	return $product;
};
 module.exports = _makeHtml;