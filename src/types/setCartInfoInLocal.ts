import Cart from "../components/view/cart";

export function setCartInfoInLocal(cartObject: Cart): void {
	localStorage.setItem('generalCount', `${cartObject.generalCountInCart}`);
	localStorage.setItem('generalSum', `${cartObject.generalSummInCart}`);
	localStorage.setItem('generalDiscount', `${cartObject.generalDiscount}`);
	localStorage.setItem('discountSumm', `${cartObject.discountSumm}`);
	localStorage.setItem('arrayCartItems', JSON.stringify(cartObject.arrayCartItems));
}