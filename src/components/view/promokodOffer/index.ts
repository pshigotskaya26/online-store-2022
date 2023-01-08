import { getPromokodFromData } from "../../../types/getPromokodFromData";

class PromokodOffer {

	render(booleanValue: boolean, valueOfSerach: string): HTMLDivElement {
		let promokodOfferNode = document.createElement("div");
		promokodOfferNode.classList.add('promokod-offer');
		
		let findedPromokod = getPromokodFromData(valueOfSerach);
		promokodOfferNode.setAttribute('data-id-offer', findedPromokod.id);

		if (booleanValue) {
			promokodOfferNode.innerHTML = `
				<p class="promokod-offer__text">${findedPromokod.name} - ${findedPromokod.discount}%</p>
				
			`;
		}
		else {
			promokodOfferNode.innerHTML = `
				<p class="promokod-offer__text">${findedPromokod.name} - ${findedPromokod.discount}%</p>
				<button class="button button-promokod-add">Добавить</button>
			`;
		}
		return promokodOfferNode;
	}
}

export default PromokodOffer;