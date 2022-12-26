import {ProductInterface} from "../../types/Product";
import PageTemplate from "./index.html";
import "./index.scss";

class ProductPage {
    private container: HTMLElement;
    product: ProductInterface;

    constructor(idTag: string, product: ProductInterface) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.product = product
    }

	private createBreadCrumbs() {
		let breadCrumbsNode = document.createElement("div");
		breadCrumbsNode.classList.add("bread__navigation");
		breadCrumbsNode.innerHTML = `
			<ul class="bread-navigation">
				<li class="bread-navigation__item"><a href="#products">Store</a></li>
				<li class="bread-navigation__item bread-navigation__item_arrow">>></li>
				<li class="bread-navigation__item bread-navigation__item_category">${this.product.category}</li>
				<li class="bread-navigation__item bread-navigation__item_arrow">>></li>
				<li class="bread-navigation__item bread-navigation__item_brand">${this.product.brand}</li>
				<li class="bread-navigation__item bread-navigation__item_arrow">>></li>
				<li class="bread-navigation__item bread-navigation__item_title">${this.product.title}</li>
			</ul>
		`;
		return breadCrumbsNode;
	}

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h2");
		headerTitle.classList.add("product-item__title");
        headerTitle.innerHTML = `${this.product.title}`;
        return headerTitle;
    }

	private createGallery(): string {
		let galleryNode = '';

		this.product.images.forEach((pathOfImage, index) => {
			galleryNode += `
				<div class="additional-photos__item" data-id-photo="${index}">
					<img class="additional-photos__image" src="${pathOfImage}" alt="${this.product.title}">
				</div>
			`;
		});

		return galleryNode;
	}

	private handleOfClickEventOnButtonToCart() {
		let buttonInCartNode: HTMLElement | null = this.container.querySelector('.button-to-cart');

		if (buttonInCartNode) {
			buttonInCartNode.addEventListener('click', (event: Event) => {
				if (event.target instanceof HTMLElement && event.target.classList.contains('button-to-cart')) {
					event.target.classList.toggle('active');
					if (event.target.classList.contains('active')) {
						event.target.innerText = 'В корзине';
					}
					else {
						event.target.innerText = 'В корзину';
					}
				}
			});
		}
	}

	private handleOfClickEventOnButtonBuy() {
		let buttonBuyNode: HTMLElement | null = this.container.querySelector('.button-buy');

		if (buttonBuyNode) {
			buttonBuyNode.addEventListener('click', (event: Event) => {
				if (event.target instanceof HTMLElement && event.target.classList.contains('button-buy')) {
					window.location.href="/#cart";
				}
			});
		}
	}

	private handleOfClickEventOnImage() {
		let arrayProductsNodes = this.container.querySelectorAll<HTMLElement>('.additional-photos__item');
		console.log('arrayProductsNodes');
		
		if (arrayProductsNodes) {
			arrayProductsNodes.forEach(photoItem => {
				photoItem.addEventListener('click', (event: Event) => {
					if (event.currentTarget instanceof HTMLElement && event.currentTarget.classList.contains('additional-photos__item')) {
						let idPhotoItem = event.currentTarget.getAttribute('data-id-photo');
						
						let mainPhotoNode: HTMLImageElement | null = this.container.querySelector(".main-photo__image");
		
						if (mainPhotoNode) {
							mainPhotoNode.src = this.product.images[Number(idPhotoItem)];
						}
					}
				});
			});
		}
	}

    private createContentPage() {
        let template: HTMLTemplateElement = document.createElement("template");
        // Вынести во view

        template.innerHTML = PageTemplate;

		let valueOfPrice: HTMLElement | null = template.content.querySelector(".product-info__price");

		if (valueOfPrice) {
			valueOfPrice.textContent = `${this.product.price} $`;
		}

		let valueOfProductCategory: HTMLElement | null = template.content.querySelector(".product-description__value_category");

		if (valueOfProductCategory) {
			valueOfProductCategory.textContent = this.product.category;
		}

		let valueOfProductBrand: HTMLElement | null = template.content.querySelector(".product-description__value_brand");
		
		if (valueOfProductBrand) {
			valueOfProductBrand.textContent = this.product.brand;
		}

		let valueOfProductDescription: HTMLElement | null = template.content.querySelector(".product-description__value_descr");
		
		if (valueOfProductDescription) {
			valueOfProductDescription.textContent = this.product.description;
		}

		let valueOfProductDiscount: HTMLElement | null = template.content.querySelector(".product-description__value_discount");
		
		if (valueOfProductDiscount) {
			valueOfProductDiscount.textContent = `${this.product.discountPercentage}%`;
		}

		let valueOfProductRating: HTMLElement | null = template.content.querySelector(".product-description__value_rating");
		
		if (valueOfProductRating) {
			valueOfProductRating.textContent = `${this.product.rating}`;
		}

		let valueOfProductStock: HTMLElement | null = template.content.querySelector(".product-description__value_stock");
		
		if (valueOfProductStock) {
			valueOfProductStock.textContent = `${this.product.stock}`;
		}

		let additionalPhotosNode = template.content.querySelector(".gallery__additional-photos");
		
		if (additionalPhotosNode) {
			additionalPhotosNode.innerHTML = this.createGallery();
		}

		let mainPhotoNode: HTMLImageElement | null = template.content.querySelector(".main-photo__image");
		
		if (mainPhotoNode) {
			mainPhotoNode.src = this.product.thumbnail;
		}

       return <HTMLDivElement>template.content.firstChild
    }

    render() {
		const breadCrumbs = this.createBreadCrumbs();
        const title = this.createHeaderTitle("Products Page")
        const content = this.createContentPage()
        const container = document.createElement("div")
        container.classList.add("container")
		container.classList.add("product-item__container")
		container.append(breadCrumbs)
        container.append(title)
        container.append(content)
        this.container.append(container)
		this.handleOfClickEventOnImage();
		this.handleOfClickEventOnButtonToCart();
		this.handleOfClickEventOnButtonBuy();
        return this.container
    }
}

export default ProductPage;