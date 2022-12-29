
class CartItem {
	id: number;
	count: number;
	price: number;

	constructor(id: number, count: number, price: number) {
		this.id = id;
		this.count = count;
		this.price = price;
	}

	/*
	updateCount(count: number) {
		this.count += 1;
	}
	*/
}

export default CartItem;