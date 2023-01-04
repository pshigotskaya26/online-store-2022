import { productsData } from "../data/products";

export function getStockOfProduct(id: number): number {
	let stock = productsData.filter(product => product.id === id)[0].stock;
	return stock;
}