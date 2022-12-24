import {ProductInterface} from "../../../types/Product";
import ProductItemTemplate from "./index.html"

export class ProductItem {

	constructor(private product: ProductInterface) {
	}

	private handleEventClickOnProductItem() {
		//this.product.
	}

	render() {

		let productItemNode = `
			<div class="product-card" data-id = "${this.product.id}">
				<div class="product-card__image">
					<img class="card-image" src="${this.product.thumbnail}" alt="${this.product.title}">
				</div>
				<div class="product-card__content">
					<h4 class="product-card__title">${this.product.title}</h4>
					<div class="product-card__details">
						<div class="product-info">
							<div class="product-category">Категория: <span class="product-category__value">${this.product.category}</span></div>
							<div class="product-brand">Производитель: <span class="product-brand__value">${this.product.brand}</span></div>
							<div class="product-price">Стоимость: <span class="product-price__value">${this.product.price}$</span></div>
							<div class="product-discount">Скидка: <span class="product-discount__value">${this.product.discountPercentage}%</span></div>
							<div class="product-block">
								<div class="product-stock">На складе: <span class="product-stock__value">${this.product.stock} <span class="product-stock-unit">шт.</span></span></div>
								<button class="button">В корзину</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		return productItemNode;

	}
}