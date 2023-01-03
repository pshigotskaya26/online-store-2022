import {CartItemInterface} from "../../../types/cart";
import CartItem from "../cartItem";
import {productsData} from "../../../data/products";

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
        return this.arrayCartItems.filter(cartItem => cartItem.id === id)[0] !== undefined;
    }

    calculateGeneralCount() {
        if (this.arrayCartItems.length === 0) {
            this.generalCountInCart = 0;
        } else {
            this.generalCountInCart = this.arrayCartItems.reduce((sum, currentCartItem) => {
                return sum + currentCartItem.count;
            }, 0);
        }
    }

    calculateGeneralPrice() {
        if (this.arrayCartItems.length === 0) {
            this.generalSummInCart = 0;
        } else {
            this.generalSummInCart = this.arrayCartItems.reduce((sum, currentCartItem) => {
                return sum + (currentCartItem.count * currentCartItem.price);
            }, 0);
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