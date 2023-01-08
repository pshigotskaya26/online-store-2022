export function setIsVisibleModal(booleanValue: boolean): void {
	localStorage.setItem('isVisibleModal', String(booleanValue));
}