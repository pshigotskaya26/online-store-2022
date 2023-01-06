import {PromokodItemInterface} from '../../types/promokod';
import {promokod} from '../../components/app/app';
import CartLayout from "./index.html"
import "./style.scss"
import {CartItemInterface} from "../../types/cart";
import CartItem from "../../components/view/cartItem";
import {cart} from "../../components/app/app";
import SummaryBlock from "../../components/view/summaryBlock";
import {setCartInfoInLocal} from '../../types/setCartInfoInLocal';
import header from "../../components/view/header";
import {getStockOfProduct} from "../../types/getStockOfProduct";
import PromokodBlock from '../../components/view/promokodBlock';
import {Modal} from "../../components/view/modal";
import FormOrder from "../../components/view/formOrder";


class CartPage {
    private container: HTMLElement;
    modal: Modal;
    formOrder: FormOrder;

    constructor(id: string) {
        this.container = document.createElement("main");
        this.container.classList.add("main");
        this.container.id = id;
        this.modal = new Modal()
        this.formOrder = new FormOrder()
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div");
        mainContainer.classList.add("main__container");
        mainContainer.innerHTML = CartLayout;
        let modalWindow: HTMLElement | null = mainContainer.querySelector("#modal");

        modalWindow?.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.classList.contains('modal__button-close')) {
                modalWindow?.classList.remove("hidden");
            }
        })

        let cartListNode: HTMLElement | null = mainContainer.querySelector('.cart__list');
        cartListNode?.append(this.renderCartProductList(cart.arrayCartItems));

        let summaryBlockGeneralSumCountNode: HTMLElement | null = mainContainer.querySelector('.cart__summary-positions');
        summaryBlockGeneralSumCountNode?.append(this.renderSummaryBlock());


        let appliedPromokodsNode: HTMLElement | null = mainContainer.querySelector('.applied-promokods');
        appliedPromokodsNode?.append(this.renderAppliedBlock(promokod.arrayAppliedPromokod));

        template.append(mainContainer);
        return template;
    }

    private renderAppliedBlock(arrayAppliedPromokod: PromokodItemInterface[]): HTMLDivElement {
        let appliedPromokodsBlockNode = document.createElement('div')
        appliedPromokodsBlockNode.classList.add('applied-promokods-block');

        if (arrayAppliedPromokod.length) {
            appliedPromokodsBlockNode.append(new PromokodBlock().render());
        }

        return appliedPromokodsBlockNode;
    }

    private updateAppliedBlock() {

        /*
        let cartListNode: HTMLElement | null = document.querySelector('.cart__list');
        if (cartListNode) {
            cartListNode.innerHTML = '';
            cartListNode.append(this.renderCartProductList(cart.arrayCartItems));
        }
        */
    }

    private renderCartProductList(productsInCart: CartItemInterface[]): HTMLDivElement {
        let cartProductsList = document.createElement('div');
        cartProductsList.classList.add('cart-list');

        if (productsInCart.length) {
            productsInCart.forEach((cartProductItem: CartItemInterface, index) => {
                let cartItem = new CartItem(cartProductItem.id, cartProductItem.count, cartProductItem.price).render(index);
                console.log('cartItem: ', cartItem);
                //when we click on button remove or click onblock cart-item
                cartItem.addEventListener('click', (event: Event) => {
                    if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                        if (event.target.classList.contains('button-remove')) {
                            let idCartItem = event.currentTarget.getAttribute('data-cart-id');
                            cart.removeItemFromCart(Number(idCartItem));
                            cart.calculateGeneralCount();
                            cart.calculateGeneralPrice();
                            setCartInfoInLocal(cart);
                            cart.updateDataInHeader(header);
                            this.updateCartProductList();
                            this.updateSummaryBlock();
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
                                setCartInfoInLocal(cart);

                                cart.updateDataInHeader(header);
                                this.updateCartProductList();
                                this.updateSummaryBlock();
                            }
                        }
                    });
                }
                cartProductsList.append(cartItem);
            });
        } else {
            let el = document.createElement('p');
            el.textContent = 'Товаров в корзине нет';
            cartProductsList.append(el);
        }
        return cartProductsList;
    }

    private updateCartProductList() {
        let cartListNode: HTMLElement | null = document.querySelector('.cart__list');
        if (cartListNode) {
            cartListNode.innerHTML = '';
            cartListNode.append(this.renderCartProductList(cart.arrayCartItems));
        }
    }

    private renderSummaryBlock(): HTMLDivElement {
        let summaryPositions = document.createElement('div');
        summaryPositions.classList.add('summary-positions');
        summaryPositions.append(new SummaryBlock().render());
        return summaryPositions;
    }

    private updateSummaryBlock() {
        let summaryBlockGeneralSumCountNode: HTMLElement | null = document.querySelector('.cart__summary-positions');
        if (summaryBlockGeneralSumCountNode) {
            summaryBlockGeneralSumCountNode.innerHTML = '';
            summaryBlockGeneralSumCountNode.append(this.renderSummaryBlock());
        }
    }


    enableHandlerModal() {
        let buttonOrder: HTMLButtonElement | null = this.container.querySelector(".cart-button")

        buttonOrder?.addEventListener("click", () => {
            this.modal.handleModal()
        })
    }

    render() {
        const title = this.createHeaderTitle("Cart Page");
        const content = this.createContentPage();
        const container = document.createElement("div");
        container.classList.add("container");
        container.append(title);
        container.append(content);
        const modalFormOrder = this.modal.render("Форма заказа", this.formOrder.render())
        container.append(modalFormOrder)
        this.container.append(container);
        this.enableHandlerModal()
        return this.container;
    }
}

export default CartPage;