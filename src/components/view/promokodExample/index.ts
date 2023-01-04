import { promokodsData } from "../../../data/promokods";
import { PromokodItemInterface } from "../../../types/promokod";

class PromokodExample {
	render(): HTMLDivElement {
		let promoExamplesText = document.createElement("div");
		promoExamplesText.classList.add('promo-examples__text');
		

		promoExamplesText.innerHTML = `
			Примеры промокодов: ${this.getAllPromokodId(promokodsData)}
		`;

		return promoExamplesText;
	}

	getAllPromokodId(promokodsData: PromokodItemInterface[]): string {
		let arrayOfPromokodId = promokodsData.map((promokodItem) => {
			return `"${promokodItem.id}"`;
		});

		return arrayOfPromokodId.join(', ');
	}
}

export default PromokodExample;