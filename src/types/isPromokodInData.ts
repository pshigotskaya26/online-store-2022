import { promokodsData } from "../data/promokods";
import { PromokodItemInterface } from "./promokod";

export function isPromokodInData(value: string) {
	if (promokodsData.filter((promokod: PromokodItemInterface) => promokod.id === value)[0] !== undefined) {
		return true;
	}
	else {
		return false;
	}
}