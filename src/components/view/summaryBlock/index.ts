import { cart } from "../../app/app";

class SummaryBlock {

	render(): HTMLDivElement {
		let summaryBlockGeneralSumCountNode = document.createElement("div");
		summaryBlockGeneralSumCountNode.classList.add('cart__summary-positions');

		summaryBlockGeneralSumCountNode.innerHTML = `
			<p class="cart__total-count">Total count: <span class="cart__total-count-value">${cart.generalCountInCart} шт.</span></p>
			<p class="cart__total-sum">Total sum: <span class="cart__total-sum-value">${cart.generalSummInCart} $</span></p>
		`;

		return summaryBlockGeneralSumCountNode;
	}
}

export default SummaryBlock;