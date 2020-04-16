let _makeHtml = ({
	sup_edrpou,
	sup_name,
}) => {
	let $product = $(`<option value="${sup_edrpou}">${sup_name}</option>`);
	return $product;
};
 module.exports = _makeHtml;