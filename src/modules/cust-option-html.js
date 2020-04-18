let _makeHtml = ({
	cust_edrpou,
	cust_name,
}) => {
	let $product = $(`<option value="${cust_edrpou}">${cust_name}</option>`);
	return $product;
};
 module.exports = _makeHtml;