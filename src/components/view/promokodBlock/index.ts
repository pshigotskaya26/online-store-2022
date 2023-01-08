import { PromokodItemInterface } from './../../../types/promokod';
import { promokod } from "../../app/app";
import promokodAppliedView from '../promokodAppliedView';

class PromokodBlock {
	arrayAppliedPromokod: PromokodItemInterface[];

	constructor(arrayAppliedPromokod: PromokodItemInterface[]) {
		this.arrayAppliedPromokod = arrayAppliedPromokod;

	}
	render() {
		let promokodBlock = document.createElement('div');
		promokodBlock.classList.add('promokod-block');

		if (this.arrayAppliedPromokod.length) {
			this.arrayAppliedPromokod.forEach((promokodItem: PromokodItemInterface) => {
				let appliedPromokodItem = new promokodAppliedView().render(promokodItem);
				promokodBlock.append(appliedPromokodItem);
			});
		}
		return promokodBlock;
	}
}

export default PromokodBlock;
