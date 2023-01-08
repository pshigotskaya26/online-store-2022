import { PromokodItemInterface } from "../../../types/promokod";

class promokodAppliedView {

	render(objectPromokodItem: PromokodItemInterface): HTMLDivElement {
		let promokodAppliedItem = document.createElement("div");
		promokodAppliedItem.classList.add('applied-promokod');
		promokodAppliedItem.setAttribute('data-promokod-id', `${objectPromokodItem.id}`);

		promokodAppliedItem.innerHTML = `
			<p class="applied-promokod__text">${objectPromokodItem.name} - ${objectPromokodItem.discount}%</p>
			<button class="button button-promo-drop">Удалить</button>
		`;
		return promokodAppliedItem;
	}
}

export default promokodAppliedView;