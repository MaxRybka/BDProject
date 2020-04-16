let _makeHtml = ({
	man_id,
	man_name,
}) => {
	let $product = $(`<option value="${man_id}">${man_name}</option>`);
	return $product;
};
 module.exports = _makeHtml;