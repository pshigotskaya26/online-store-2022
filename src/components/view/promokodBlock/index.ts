import { PromokodItemInterface } from './../../../types/promokod';
import { promokod } from "../../app/app";
import promokodAppliedView from '../promokodAppliedView';

class PromokodBlock {
	render() {
		let promokodBlock = document.createElement('div');
		promokodBlock.classList.add('promo-block');

		promokod.arrayAppliedPromokod.forEach((promokodItem: PromokodItemInterface) => {
			let appliedPromokodItem = new promokodAppliedView().render(promokodItem);
			promokodBlock.append(appliedPromokodItem);
		});

		return promokodBlock;

	}
}

export default PromokodBlock;
