import { promokodsData } from "../data/promokods";
import { PromokodItemInterface } from "./promokod";

export function getPromokodFromData(value: string) {
	let findedPromokod = promokodsData.filter((promokod: PromokodItemInterface) => promokod.id === value)[0];
	return findedPromokod;
}