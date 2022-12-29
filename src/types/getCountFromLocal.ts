export function getCountFromLocal(tag: HTMLElement): void {
	if (localStorage.getItem('generalCount')) {
		tag.innerHTML = `${localStorage.getItem('generalCount')} <span class="basket-unit">шт.</span>`;
	}
	else {
		tag.innerHTML = `${0} <span class="basket-unit">шт.</span>`;
	}
}