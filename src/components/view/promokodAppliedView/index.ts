import { PromokodItemInterface } from "../../../types/promokod";

class promokodAppliedView {

	render(objectPromokodItem: PromokodItemInterface): HTMLDivElement {
		let promokodAppliedItem = document.createElement("div");
		promokodAppliedItem.classList.add('applied-promo');
		promokodAppliedItem.setAttribute('data-promo-id', `${objectPromokodItem.id}`);

		promokodAppliedItem.innerHTML = `
			<p class="applied-promo__text">${objectPromokodItem.name} - ${objectPromokodItem.discount}%</p>
			<button class="button button-promo-drop">Удалить</button>
		`;

		return promokodAppliedItem;
	}
}

export default promokodAppliedView;