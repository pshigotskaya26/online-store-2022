export function getSumFromLocal(tag: HTMLElement): void {
	if (localStorage.getItem('generalSum')) {
		tag.innerHTML = `${localStorage.getItem('generalSum')} <span class="basket-unit">$</span>`;
	}
	else {
		tag.innerHTML = `${0} <span class="basket-unit">$</span>`;
	}
}