import { cart } from "../../app/app";
import { promokod } from "../../app/app";

class SummaryBlock {
	/*
	constructor(container : HTMLElement) {
		console.log('container fromcart page:  ', container);

	}
	*/

	render(): HTMLDivElement {
		let summaryBlockGeneralSumCountNode = document.createElement("div");
		summaryBlockGeneralSumCountNode.classList.add('cart__summary-positions');

		if (promokod.arrayAppliedPromokod.length) {
			summaryBlockGeneralSumCountNode.innerHTML = `
			<p class="cart__total-count">Total count: <span class="cart__total-count-value">${cart.generalCountInCart} шт.</span></p>
			<p class="cart__total-sum active">Total sum: <span class="cart__total-sum-value">${cart.generalSummInCart} $</span></p>
			<p class="cart__total-discount-sum">Discount sum: <span class="cart__total-sum-value">${cart.discountSumm} $</span></p>
		`;
		}
		else {
			summaryBlockGeneralSumCountNode.innerHTML = `
			<p class="cart__total-count">Total count: <span class="cart__total-count-value">${cart.generalCountInCart} шт.</span></p>
			<p class="cart__total-sum">Total sum: <span class="cart__total-sum-value">${cart.generalSummInCart} $</span></p>
		`;
		}

		

		return summaryBlockGeneralSumCountNode;
	}
}

export default SummaryBlock;