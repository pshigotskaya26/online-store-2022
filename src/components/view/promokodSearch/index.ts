import CartPage from "../../../pages/cart";
import { isPromokodInData } from "../../../types/isPromokodInData";
import { promokod } from "../../app/app";
import PromokodOffer from "../promokodOffer";

class PromokodSearch {
	thisFromCartPage: CartPage ;

	constructor(thisFromCartPage: CartPage) {
		this.thisFromCartPage = thisFromCartPage;
	}

	render() {
		let inputSearch = document.createElement("input")
        inputSearch.type = "serach";
		inputSearch.classList.add('search-input');
		inputSearch.classList.add('promo-search');
		inputSearch.placeholder = "Введите навание промокода";
		this.handleEventInputInSearch(inputSearch);
		return inputSearch;
	}

	handleEventInputInSearch(tagInputSearch: HTMLInputElement) {
		tagInputSearch.addEventListener('input', (event: Event) => {

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
							this.thisFromCartPage.handleEventClickOnAddPromokod(valueOfSerach);
						}
					}
					else {
						promokodOfferNode.innerHTML = '';
					}
				}
			}
		});
	}
}

export default PromokodSearch;