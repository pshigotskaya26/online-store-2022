import { productsData } from '../../../data/products';

class CartItem {
	id: number;
	count: number;
	price: number;

	constructor(id: number, count: number, price: number) {
		this.id = id;
		this.count = count;
		this.price = price;
	}

	render(index: number): HTMLDivElement {
		let cartItem = document.createElement("div");
		cartItem.classList.add('cart__item');
		cartItem.setAttribute('data-cart-id', String(this.id));

		let productItemFounded = productsData.filter(item => item.id === this.id);

		cartItem.innerHTML = `
					<div class="cart__item-order-numb">${index + 1}</div>
                    <div class="cart__item-image">
                        <img src="${productItemFounded[0].thumbnail}" alt="${productItemFounded[0].title}">
                    </div>
                    <div class="cart__item-description">
                        <h3 class="cart__item-title">${productItemFounded[0].title}</h3>
                        <p class="cart__item-text">${productItemFounded[0].description}</p>
						<div class="cart__item-parametrs">
							<div class="cart__item-rating">Рейтинг: <span class="cart-rating__value">${productItemFounded[0].rating}</span></div>
							<div class="cart__item-discount">Скидка: <span class="cart-discount__value">${productItemFounded[0].discountPercentage}%</span></div>
							<div class="cart__item-stock">Кол-во на складе: <span class="cart-stock__value">${productItemFounded[0].stock}</span></div>
						</div>
						
                        <div class="cart__item--actions">
                            <button class=" button button-remove cart__item--actions cart__item--actions--remove">
                                remove
                            </button>
                        </div>
                    </div>
                    <div class="cart__item-count">
                        <div class="cart__item-price">${this.price}</div>
                        <input class="input-count" type="number" min="0" max="${productItemFounded[0].stock}" value="${this.count}">
						<p class="cart__text-error">Введите кол-во товара</p>
                    </div>
		`;

		return cartItem;
	}

}

export default CartItem;