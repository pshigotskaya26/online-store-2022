import { getCountFromLocal } from "./getCountFromLocal";
import { getSumFromLocal } from "./getSumFromLocal";

export function updateDataInHeader(tag: HTMLElement) {
	let countInHeader: HTMLElement | null = tag.querySelector('.basket-info__count');
	let sumInHeader: HTMLElement | null = tag.querySelector('.basket-info__sum');

	if (countInHeader) {
		getCountFromLocal(countInHeader);
	}
	if (sumInHeader) {
		getSumFromLocal(sumInHeader);
	}
}