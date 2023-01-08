import {CartItemInterface} from "../../../types/cart";
import CartItem from "../cartItem";
import {productsData} from "../../../data/products";
import {PromokodItemInterface} from "../../../types/promokod";

class Cart {
    generalCountInCart: number;
    generalSummInCart: number;
    generalDiscount: number;
    discountSumm: number;
    arrayCartItems: CartItemInterface[];
    rowsPerPage: number
    currentPage: number

    constructor() {
        this.generalCountInCart = 0;
        this.generalSummInCart = 0;
        this.generalDiscount = 0;
        this.discountSumm = 0;
        this.arrayCartItems = [];
        this.rowsPerPage = 3
        this.currentPage = 1
    }

    addItemToCart(id: number) {
        let price = productsData.filter(product => product.id === id)[0].price;
        let cartItem = new CartItem(id, 1, price);
        this.arrayCartItems.push(cartItem);
    }

    removeItemFromCart(id: number) {
        this.arrayCartItems = this.arrayCartItems.filter(product => product.id !== id);
    }

    changeCountOfCartItem(id: number, newCount: number): void {
        let existInCart = this.checkIfItemInCart(id);

        if (existInCart) {
            this.arrayCartItems.forEach(product => {
                if (product.id === id) {
                    product.count = newCount;
                }
                return product;
            });
        }
    }

    checkIfItemInCart(id: number): boolean {
        if (this.arrayCartItems.filter(cartItem => cartItem.id === id)[0] !== undefined) {
            return true;
        } else {
            return false;
        }
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

    calculateGeneralDiscount(arrayOfPromokods: PromokodItemInterface[]) {
        let sumOfDiscounts = arrayOfPromokods.reduce((sum, currentPromokod) => {
            return sum + currentPromokod.discount;
        }, 0);

        this.generalDiscount = sumOfDiscounts;
    }

    calculateGeneralDiscountSumm() {
        this.discountSumm = this.generalSummInCart - ((this.generalSummInCart * this.generalDiscount) / 100);
    }

    updateDataInHeader(header: HTMLElement) {
        let countInHeader: HTMLElement | null = header.querySelector('.basket-info__count');
        let sumInHeader: HTMLElement | null = header.querySelector('.basket-info__sum');

        if (countInHeader) {
            countInHeader.innerHTML = `${this.generalCountInCart} <span class="basket-unit">шт.</span>`;
        }
        if (sumInHeader) {
            sumInHeader.innerHTML = `${this.generalSummInCart} $<span class="basket-unit"></span>`;
        }
    }


    clearCart() {
        this.clearLocalStorage()
        this.arrayCartItems = []
        this.calculateGeneralCount()
        this.calculateGeneralDiscountSumm()
        this.calculateGeneralPrice()
        this.clearLocalStorage()
    }

    clearLocalStorage = () => {
        localStorage.removeItem("generalCount")
        localStorage.removeItem("generalSum")
        localStorage.removeItem("generalDiscount")
        localStorage.removeItem("discountSumm")
        localStorage.removeItem("arrayCartItems")
    }

    setDataFromLS(queryParams: string) {
        let arr = queryParams.split("&")
        arr.forEach(el => {
            let [key, value] = el.split("=")
            if (key === "page") {
                this.currentPage = +value
            }
            if (key === "rows") {
                this.rowsPerPage = +value
            }
        })
    }

    setCurrentPage(page: number) {
        this.currentPage = page
    }

    setRowsPerPage(rows: number) {
        this.rowsPerPage = rows
    }
}

export default Cart;