import { promokodsData } from '../../../data/promokods';
import { PromokodItemInterface } from "../../../types/promokod";
import PromokodItem from '../promokodItem/promokodItem';

class Promokod {
	arrayAppliedPromokod: PromokodItemInterface[];

	constructor() {
		this.arrayAppliedPromokod = [];
	}

	addPromokod(id: string) {
		let idUpperCase = id.toUpperCase();

		let idPromoFounded = promokodsData.filter(promo => promo.id === idUpperCase)[0].id;
		let namePromoFounded = promokodsData.filter(promo => promo.id === idUpperCase)[0].name;
		let discountPromoFounded = promokodsData.filter(promo => promo.id === idUpperCase)[0].discount;
		
		let promokodItem = new PromokodItem(idPromoFounded, namePromoFounded, discountPromoFounded);
		
		this.arrayAppliedPromokod.push(promokodItem)
	}

	removePromokod(id: string) {
		this.arrayAppliedPromokod = this.arrayAppliedPromokod.filter(promoItem => promoItem.id !== id);
	}

	checkIfPromokodIsApplied(id: string): boolean {
		if (this.arrayAppliedPromokod.filter(promokodItem => promokodItem.id === id)[0] !== undefined) {
			return true;
		}
		else {
			return false;
		}
	}
}

export default Promokod;