import Promokod from "../components/view/promokod";

export function setArrayAppliedPromokod(promokodObject: Promokod): void {
	localStorage.setItem('arrayAppliedPromokod', JSON.stringify(promokodObject.arrayAppliedPromokod));
}