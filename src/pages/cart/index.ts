import { Button } from './../../components/view/button/index';
import { CheckBoxField } from './../../components/view/checkBoxField/index';
import { PromokodItemInterface } from './../../types/promokod';
import { ProductInterface } from './../../types/Product';
import { promokod } from './../../components/app/app';
import CartLayout from "./index.html"
import "./style.scss"
import {CartItemInterface} from "../../types/cart";
import CartItem from "../../components/view/cartItem";
import {cart} from "../../components/app/app";
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
import CartProductList from '../../components/view/cartProductList';
import {Modal} from "../../components/view/modal";
import FormOrder from "../../components/view/formOrder";

class CartPage {
    private container: HTMLElement;
    modal: Modal;
    formOrder: FormOrder;
	cartProductList: HTMLDivElement;
	summaryBlock: HTMLDivElement;
	promokodExamplesBlock: HTMLDivElement;
	appliedPromokodsBlock: HTMLDivElement;
	promokodSearch: PromokodSearch;
	promokodSearchHTML: HTMLDivElement;

    constructor(id: string) {
        this.container = document.createElement("main");
        this.container.classList.add("main");
        this.container.id = id;
        this.modal = new Modal()
        this.formOrder = new FormOrder()
		this.cartProductList = new CartProductList(cart.arrayCartItems, this).render();
		this.summaryBlock = new SummaryBlock().render();
		this.promokodExamplesBlock = new PromokodExample().render();
		this.appliedPromokodsBlock = new PromokodBlock(promokod.arrayAppliedPromokod).render();
		this.promokodSearch = new PromokodSearch(this);
		this.promokodSearch.handleEventInputInSearch;
		this.promokodSearchHTML = this.promokodSearch.render();
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
		cartListNode?.append(this.cartProductList);

		let summaryBlockGeneralSumCountNode: HTMLElement | null = mainContainer.querySelector('.cart__summary-positions');
		summaryBlockGeneralSumCountNode?.append(this.summaryBlock);

		let promokodExamplesNode: HTMLElement | null = mainContainer.querySelector('.promokod-examples');
		promokodExamplesNode?.append(this.promokodExamplesBlock);

		let appliedPromokodsBlockNode: HTMLElement | null = mainContainer.querySelector('.applied-promokods-block');
		appliedPromokodsBlockNode?.append(this.appliedPromokodsBlock);

		let promokodSearchBlock: HTMLElement | null = mainContainer.querySelector('.promokod__search');
		promokodSearchBlock?.append(this.promokodSearchHTML);
		
        template.append(mainContainer);
        return template;
    }
    
    
	updateCartProductList() {
		let cartListNode: HTMLElement | null = this.container.querySelector('.cart__list');
		if (cartListNode) {
			cartListNode.innerHTML = '';
			this.cartProductList = new CartProductList(cart.arrayCartItems, this).render();
			cartListNode.append(this.cartProductList);
		}
	}

	updateSummaryBlock() {
		let summaryBlockGeneralSumCountNode: HTMLElement | null = document.querySelector('.cart__summary-positions');
		if (summaryBlockGeneralSumCountNode) {
			summaryBlockGeneralSumCountNode.innerHTML = '';
			this.summaryBlock = new SummaryBlock().render();
			summaryBlockGeneralSumCountNode.append(this.summaryBlock);
		}	
	}

	updateAppliedBlock() {
		let appliedPromokodsBlockNode: HTMLElement | null = document.querySelector('.applied-promokods-block');
		
		if (appliedPromokodsBlockNode) {
			appliedPromokodsBlockNode.innerHTML = '';
			this.appliedPromokodsBlock = new PromokodBlock(promokod.arrayAppliedPromokod).render();
			appliedPromokodsBlockNode.append(this.appliedPromokodsBlock);
			this.handleEventClickOnRemovePromokod();
		}
	}

	handleEventClickOnAddPromokod(value: string) {
		let buttonPromokodAdd: HTMLElement | null = document.querySelector('.button-promokod-add');
		if (buttonPromokodAdd) {

			buttonPromokodAdd?.addEventListener('click', (event: Event) => {
				if (event.target instanceof HTMLElement && event.target.classList.contains('button-promokod-add')) {
					if (!promokod.checkIfPromokodIsApplied(value)) {
						promokod.addPromokod(value);
						cart.calculateGeneralDiscount(promokod.arrayAppliedPromokod);
						cart.calculateGeneralDiscountSumm();
						setCartInfoInLocal(cart);
						setArrayAppliedPromokod(promokod);
						this.updateSummaryBlock();
						this.updateAppliedBlock();
						
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
		let arrayButtonsRemovePromokod = this.container.querySelectorAll<HTMLElement>('.button-promo-drop');

		if (arrayButtonsRemovePromokod) {
			arrayButtonsRemovePromokod.forEach((buttonItem: HTMLElement) => {
				buttonItem.addEventListener('click', (event: Event) => {
					if (event.target instanceof HTMLElement) {
						let idFromParentNode = buttonItem.parentElement?.getAttribute('data-promokod-id');

						if (idFromParentNode) {
							promokod.removePromokod(idFromParentNode);
							buttonItem.remove();
							cart.calculateGeneralDiscount(promokod.arrayAppliedPromokod);
							cart.calculateGeneralDiscountSumm();
							setCartInfoInLocal(cart);
							setArrayAppliedPromokod(promokod);
							this.updateSummaryBlock();
							this.updateAppliedBlock();
						}
					}
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
		this.promokodSearch.handleEventInputInSearch;
		//this.handleEventInputInSerach();
		this.handleEventClickOnRemovePromokod();
        return this.container;
    }
}

export default CartPage;