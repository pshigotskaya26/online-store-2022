import { CartItemInterface } from "../../../types/cart";
import CartItem from "../cartItem";
import { productsData } from "../../../data/products";
import header from "../header";
import { getCountFromLocal } from "../../../types/getCountFromLocal";
import { getSumFromLocal } from "../../../types/getSumFromLocal";

class Cart {
	generalCountInCart: number;
	generalSummInCart: number;
	arrayCartItems: CartItemInterface[];

	constructor() {
		this.generalCountInCart = 0;
		this.generalSummInCart = 0;
		this.arrayCartItems = [];
	}

	addItemToCart(id: number) {
		let existInCart = this.checkIfItemInCart(id);

		//if cart has product
		if (existInCart) {
			let price = productsData.filter(product => product.id === id)[0].price;
			let currentCount = this.arrayCartItems.filter(product => product.id === id)[0].count;
			let cartItem = new CartItem(id, currentCount + 1, price);
			this.arrayCartItems.push(cartItem);
		}
		//if cart doesn't have product
		else {
			let price = productsData.filter(product => product.id === id)[0].price;
			let cartItem = new CartItem(id, 1, price);
			this.arrayCartItems.push(cartItem);
		}
	}

	removeItemFromCart(id: number) {
		this.arrayCartItems = this.arrayCartItems.filter(product => product.id !== id);
	}

	checkIfItemInCart(id: number) {
		if (this.arrayCartItems.filter(cartItem => cartItem.id === id)[0] !== undefined) {
			return true;
		}
		else {
			return false;
		}
	}

	calculateGeneralCount() {
		if (this.arrayCartItems.length === 0) {
			this.generalCountInCart = 0;
		}
		else {
			this.generalCountInCart = this.arrayCartItems.reduce((sum, currentCartItem) => {
				return sum + currentCartItem.count;
			}, 0);
		}
	}

	calculateGeneralPrice() {
		if (this.arrayCartItems.length === 0) {
			this.generalSummInCart = 0;
		}
		else {
			this.generalSummInCart = this.arrayCartItems.reduce((sum, currentCartItem) => {
				return sum + (currentCartItem.count * currentCartItem.price);
			}, 0);
		}
	}

	updateDataInHeader(header: HTMLElement) {
		let countInHeader: HTMLElement | null = header.querySelector('.basket-info__count');
		let sumInHeader: HTMLElement | null = header.querySelector('.basket-info__sum');
	
		if (countInHeader) {
			getCountFromLocal(countInHeader);
		}
		if (sumInHeader) {
			getSumFromLocal(sumInHeader);
		}
	}

	displayGeneralCountInCart() {

	}

	displayGeneralSummInCart() {

	}
}

//let cart = new Cart();

//export { cart };

export default Cart;