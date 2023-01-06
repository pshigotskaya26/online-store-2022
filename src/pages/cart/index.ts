import { Button } from './../../components/view/button/index';
import { CheckBoxField } from './../../components/view/checkBoxField/index';
import { PromokodItemInterface } from './../../types/promokod';
import { ProductInterface } from './../../types/Product';
import { promokod } from './../../components/app/app';
import CartLayout from "./index.html"
import "./style.scss"
import { CartItemInterface } from "../../types/cart";
import { productsData } from '../../data/products';
import CartItem from "../../components/view/cartItem";
import { cart } from "../../components/app/app";
import SummaryBlock from "../../components/view/summaryBlock";
import { setCartInfoInLocal } from '../../types/setCartInfoInLocal';
import { setArrayAppliedPromokod } from '../../types/setArrayAppliedPromokod';
import header from "../../components/view/header";
import { getStockOfProduct } from "../../types/getStockOfProduct";
import { isPromokodInData } from '../../types/isPromokodInData';
import PromokodBlock from '../../components/view/promokodBlock';
import PromokodExample from '../../components/view/promokodExample';
import PromokodSearch from '../../components/view/promokodSearch';
import PromokodOffer from '../../components/view/promokodOffer';

class CartPage {
    private container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement("main");
        this.container.classList.add("main");
        this.container.id = id;
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

		let appliedPromokodsBlockNode: HTMLElement | null = mainContainer.querySelector('.applied-promokods-block');
		appliedPromokodsBlockNode?.append(this.renderAppliedBlock(promokod.arrayAppliedPromokod));

		let promokodExamplesNode: HTMLElement | null = mainContainer.querySelector('.promokod-examples');
		promokodExamplesNode?.append(this.renderPromokodExampleBlock());

        template.append(mainContainer);
        return template;
    }

	private renderPromokodOffer() {
		let promokodOfferBlock = document.createElement('div')
		promokodOfferBlock.classList.add('promokod-offer');
		//promokodOfferBlock.append(new PromokodOffer().render());
		//return promokodOfferBlock;
	}

/*
	private renderPromokodSearch() {
		let promokodSearchBlock = document.createElement('div')
		promokodSearchBlock.classList.add('promokod-search-block');

		let inpuSearch = new PromokodSearch().render();

		inpuSearch.addEventListener('input', (event: Event) => {
			console.log('event.target serach: ', event.target);

			if (event.target instanceof HTMLInputElement) {
				let valueOfSerach= event.target.value.trim().toUpperCase();

				let promokodOfferNode: HTMLElement | null = document.querySelector('.promokod__offer');

				if (promokodOfferNode) {
					if (isPromokodInData(valueOfSerach)) {
						if (promokod.checkIfPromokodIsApplied(valueOfSerach)) {
							promokodOfferNode.append(new PromokodOffer().render(true, valueOfSerach));
			
						}
						else {
							promokodOfferNode.append(new PromokodOffer().render(false, valueOfSerach));
						}
					}
					else {
						promokodOfferNode.innerHTML = '';
					}
				}
			}
		});
		promokodSearchBlock.append(inpuSearch);
		return promokodSearchBlock;
	}
*/

	private renderPromokodExampleBlock():HTMLDivElement {
		let promoExamplesBlock = document.createElement('div')
		promoExamplesBlock.classList.add('promokod-examples-block');
		promoExamplesBlock.append(new PromokodExample().render());
		return promoExamplesBlock;
	}
	
	private renderAppliedBlock(arrayAppliedPromokod: PromokodItemInterface[]): HTMLDivElement {
		let appliedPromokodsWrapper = document.createElement('div')
		appliedPromokodsWrapper.classList.add('applied-promokods-wrapper');

		if (arrayAppliedPromokod.length) {
			appliedPromokodsWrapper.append(new PromokodBlock().render());
		}

		this.handleEventClickOnRemovePromokod();
		return appliedPromokodsWrapper;
	}

	private updateAppliedBlock() {
		console.log('---update');
		let appliedPromokodsBlockNode: HTMLElement | null = document.querySelector('.applied-promokods-block');
		
		if (appliedPromokodsBlockNode) {
			appliedPromokodsBlockNode.innerHTML = '';
			appliedPromokodsBlockNode.append(this.renderAppliedBlock(promokod.arrayAppliedPromokod));
			this.handleEventClickOnRemovePromokod();
		}	
	}


	renderCartProductList(productsInCart: CartItemInterface[]): HTMLDivElement {
		let cartProductsList = document.createElement('div');
		cartProductsList.classList.add('cart-list');

		if (productsInCart.length) {
			productsInCart.forEach((cartProductItem: CartItemInterface, index) => {
				let cartItem = new CartItem(cartProductItem.id, cartProductItem.count, cartProductItem.price).render(index);
				
				//when we click on button remove or click onblock cart-item
				cartItem.addEventListener('click', (event: Event) => {
					if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
						if (event.target.classList.contains('button-remove')) {
							//console.log('cartItem: ', cartItem);
							let idCartItem = event.currentTarget.getAttribute('data-cart-id');
							cart.removeItemFromCart(Number(idCartItem));
							cart.calculateGeneralCount();
							cart.calculateGeneralPrice();
							setCartInfoInLocal(cart);
							cart.updateDataInHeader(header);
							this.updateCartProductList();
							this.updateSummaryBlock();
						}
						else if (event.target.classList.contains('cart__item-title')) {
							let idCartItem = event.currentTarget.getAttribute('data-cart-id');
							window.location.href=`/#product/${idCartItem}`;
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
							}
							else if (`${currentInputValue}` !== '') {
								if (Number(currentInputValue) > 0 && Number(currentInputValue) < stockOfProduct) {
									cart.changeCountOfCartItem(idCartItem, Number(currentInputValue));
								}
								else if (currentInputValue === '0') {
									cart.removeItemFromCart(idCartItem);
								}
								else if (Number(currentInputValue) >= stockOfProduct) {
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
								this.updateAppliedBlock();
							}
						}
					});
				}
				cartProductsList.append(cartItem);
			});
		}
		else {
			let el = document.createElement('p');
			el.textContent = 'Товаров в корзине нет';
			cartProductsList.append(el);
		}
		return cartProductsList;
	}

	updateCartProductList() {
		let cartListNode: HTMLElement | null = this.container.querySelector('.cart__list');
		if (cartListNode) {
			cartListNode.innerHTML = '';
			cartListNode.append(this.renderCartProductList(cart.arrayCartItems));
		}
	}

	renderSummaryBlock(): HTMLDivElement {
		let summaryPositions = document.createElement('div');
		summaryPositions.classList.add('summary-positions');
		summaryPositions.append(new SummaryBlock().render());
		return summaryPositions;
	}

	updateSummaryBlock() {
		let summaryBlockGeneralSumCountNode: HTMLElement | null = document.querySelector('.cart__summary-positions');
		if (summaryBlockGeneralSumCountNode) {
			summaryBlockGeneralSumCountNode.innerHTML = '';
			summaryBlockGeneralSumCountNode.append(this.renderSummaryBlock());
		}	
	}

	handleEventInputInSerach() {
		let searchNode: HTMLElement | null = this.container.querySelector('.promokod-search');
	
		searchNode?.addEventListener('input', (event: Event) => {
			console.log('event.target serach: ', event.target);

			if (event.target instanceof HTMLInputElement) {
				let valueOfSerach= event.target.value.trim().toUpperCase();
				console.log('valueOfSerach: ', valueOfSerach);

				let promokodOfferNode: HTMLElement | null = document.querySelector('.promokod__offer');

				if (promokodOfferNode) {
					if (isPromokodInData(valueOfSerach)) {
						if (promokod.checkIfPromokodIsApplied(valueOfSerach)) {
							promokodOfferNode.append(new PromokodOffer().render(true, valueOfSerach));
						}
						else {
							promokodOfferNode.append(new PromokodOffer().render(false, valueOfSerach));
							this.handleEventClickOnAddPromokod(valueOfSerach);
						}
					}
					else {
						promokodOfferNode.innerHTML = '';
					}
				}
			}
		});
	}

	handleEventClickOnAddPromokod(value: string) {
		let buttonPromokodAdd: HTMLElement | null = document.querySelector('.button-promokod-add');
		if (buttonPromokodAdd) {

			buttonPromokodAdd?.addEventListener('click', (event: Event) => {
				if (event.target instanceof HTMLElement && event.target.classList.contains('button-promokod-add')) {
					if (!promokod.checkIfPromokodIsApplied(value)) {
						promokod.addPromokod(value);

						console.log('promokod: add : ', promokod.arrayAppliedPromokod);
						setArrayAppliedPromokod(promokod);
						this.updateSummaryBlock();
						this.updateAppliedBlock();
						//this.handleEventClickOnRemovePromokod();
						
						let promokodOfferNode: HTMLElement | null = document.querySelector('.promokod__offer');

						if (promokodOfferNode) {
							promokodOfferNode.innerHTML = '';
						}
					}
				}
			});
		}
	}

	handleEventClickOnRemovePromokod() {
		console.log('this.container for remove: ', this.container);
		let arrayButtonsRemovePromokod = this.container.querySelectorAll<HTMLElement>('.button-promo-drop');

		if (arrayButtonsRemovePromokod) {
			arrayButtonsRemovePromokod.forEach((buttonItem: HTMLElement) => {
				buttonItem.addEventListener('click', (event: Event) => {
					if (event.target instanceof HTMLElement) {
						
						let idFromParentNode = buttonItem.parentElement?.getAttribute('data-promokod-id');

						if (idFromParentNode) {
							console.log('idFromParentNode: ', idFromParentNode);
							promokod.removePromokod(idFromParentNode);
							buttonItem.remove();
							console.log(promokod.arrayAppliedPromokod);

							setArrayAppliedPromokod(promokod);
							this.updateSummaryBlock();
							this.updateAppliedBlock();
						}
					}
					console.log('click on button Remove promo');
				});
			});
		}
	}

    render(): HTMLElement{
        const title = this.createHeaderTitle("Cart Page");
        const content = this.createContentPage();
        const container = document.createElement("div");
        container.classList.add("container");
        container.append(title);
        container.append(content);
        this.container.append(container);
		this.handleEventInputInSerach();
		this.handleEventClickOnRemovePromokod();
        return this.container;
    }
}

export default CartPage;