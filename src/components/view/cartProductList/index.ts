import {CartItemInterface} from "../../../types/cart";
import CartItem from "../cartItem";
import {cart} from "../../app/app";
import {promokod} from "../../app/app";
import {setCartInfoInLocal} from "../../../types/setCartInfoInLocal";
import header from "../header";
import CartPage from "../../../pages/cart";
import {getStockOfProduct} from "../../../types/getStockOfProduct";
import createPagination from "../pagination";
import Pagination from "../pagination";
import {replaceHash} from "../../../utils/replaceHash";

class CartProductList {
    thisFromCartPage: CartPage;
    arrayCartItems: CartItemInterface[];
    pagination: Pagination
    cartProductsList: HTMLElement

    constructor(arrayCartItems: CartItemInterface[], thisFromCartPage: CartPage) {
        this.thisFromCartPage = thisFromCartPage;
        this.arrayCartItems = arrayCartItems;
        this.pagination = new Pagination(arrayCartItems.length, this.updateProductList, cart.rowsPerPage, cart.currentPage)

        this.cartProductsList = document.createElement('div')
    }

    render(): HTMLDivElement {

        let productsWrapper = document.createElement("div")
        this.cartProductsList.classList.add('cart-list');

        if (this.arrayCartItems.length) {
            this.createList()
            productsWrapper.append(this.cartProductsList)
            productsWrapper.append(this.pagination.render())
        } else {
            promokod.arrayAppliedPromokod = [];
            this.thisFromCartPage.updateSummaryBlock();
            this.thisFromCartPage.updateAppliedBlock();
            let el = document.createElement('p');
            el.textContent = 'Товаров в корзине нет';
            productsWrapper.append(el)
        }

        this.thisFromCartPage.updateSummaryBlock();
        this.thisFromCartPage.updateAppliedBlock();

        return productsWrapper;
    }

    createList() {
        this.cartProductsList.innerHTML = ""
        this.arrayCartItems.forEach((cartProductItem: CartItemInterface, index) => {
            if (index >= this.pagination.currentPage * this.pagination.rows - this.pagination.rows
                && index < this.pagination.currentPage * this.pagination.rows) {
                let cartItem = new CartItem(cartProductItem.id, cartProductItem.count, cartProductItem.price).render(index);
                //when we click on button remove or click onblock cart-item

                cartItem.addEventListener('click', (event: Event) => {
                    if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                        if (event.target.classList.contains('button-remove')) {
                            let idCartItem = event.currentTarget.getAttribute('data-cart-id');
                            cart.removeItemFromCart(Number(idCartItem));
                            cart.calculateGeneralCount();
                            cart.calculateGeneralPrice();
                            cart.calculateGeneralDiscount(promokod.arrayAppliedPromokod);
                            cart.calculateGeneralDiscountSumm();
                            setCartInfoInLocal(cart);
                            cart.updateDataInHeader(header);
                            this.thisFromCartPage.updateCartProductList();
                            this.thisFromCartPage.updateSummaryBlock();
                            this.checkLastPagePagination()
                        } else if (event.target.classList.contains('cart__item-title')) {
                            let idCartItem = event.currentTarget.getAttribute('data-cart-id');
                            window.location.href = `/#product/${idCartItem}`;
                        }
                    }
                });

                let inputCountNode = cartItem.querySelector('.input-count');

                if (inputCountNode) {
                    inputCountNode.addEventListener('input', (event: Event) => {
                        if (event.target instanceof HTMLInputElement) {
                            let currentInputValue = event.target.value;
                            let idCartItem = Number(cartItem.getAttribute('data-cart-id'));
                            let stockOfProduct = getStockOfProduct(Number(idCartItem));
                            let errorNode: HTMLElement | null = cartItem.querySelector('.cart__text-error');

                            if (`${currentInputValue}` === '') {
                                alert('Введите количество товара');
                                errorNode?.classList.add('active');
                            } else if (`${currentInputValue}` !== '') {
                                if (Number(currentInputValue) > 0 && Number(currentInputValue) < stockOfProduct) {
                                    cart.changeCountOfCartItem(idCartItem, Number(currentInputValue));
                                } else if (currentInputValue === '0') {
                                    cart.removeItemFromCart(idCartItem);
                                } else if (Number(currentInputValue) >= stockOfProduct) {
                                    event.target.value = `${stockOfProduct}`;
                                    cart.changeCountOfCartItem(idCartItem, Number(stockOfProduct));
                                }
                                errorNode?.classList.remove('active');

                                cart.calculateGeneralCount();
                                cart.calculateGeneralPrice();
                                cart.calculateGeneralDiscount(promokod.arrayAppliedPromokod);
                                cart.calculateGeneralDiscountSumm();
                                setCartInfoInLocal(cart);
                                cart.updateDataInHeader(header);
                                this.thisFromCartPage.updateCartProductList();
                                this.thisFromCartPage.updateSummaryBlock();
                                this.thisFromCartPage.updateAppliedBlock();
                            }
                        }
                    });
                }
                this.cartProductsList.append(cartItem);
            }

        });
    }

    checkLastPagePagination() {
        let elementsOrTheLastPage = cart.arrayCartItems.length - this.pagination.rows * Math.ceil(cart.arrayCartItems.length / this.pagination.rows)
        if (elementsOrTheLastPage === 0) {
            cart.setCurrentPage(cart.currentPage >= 2 ? cart.currentPage - 1 : 1)
            this.pagination.currentPage = cart.currentPage >= 2 ? cart.currentPage : 1
        }
        this.pushToURL()
    }


    pushToURL() {
        let page = this.pagination.currentPage
        let rowsPerPage = this.pagination.rows
        window.location.href = replaceHash(window.location.href, `#cart?page=${page}&rows=${rowsPerPage}`)
    }

    updateProductList = () => {
        cart.setCurrentPage(this.pagination.currentPage)
        cart.setRowsPerPage(this.pagination.rows)
        this.pushToURL()
        this.createList()
    }
}

export default CartProductList;