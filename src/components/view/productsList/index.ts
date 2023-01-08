import Controller from "../../controller/controller";
import {ProductInterface} from "../../../types/Product";
import {ProductItem} from "../productItem";
import {ModesViewKeys} from "../modeViewProductsList";
import {cart} from "../../app/app";
import {setCartInfoInLocal} from "../../../types/setCartInfoInLocal";
import header from "../header";
import {promokod} from "../../app/app";
import {replaceHash} from "../../../utils/replaceHash";

export class ProductsList {
    controller: Controller;
    root: HTMLElement;
    filteredProducts: ProductInterface[];
    products: HTMLDivElement;
    modeView: ModesViewKeys;

    constructor(controller: Controller) {
        this.controller = controller;
        this.modeView = this.controller.getCurrentView()
        this.root = document.createElement("div");
        this.root.classList.add("catalog__products")
        this.products = document.createElement("div")
        this.products.classList.add("products")
        this.filteredProducts = this.controller.getFilteredProducts()
    }

    render(): HTMLElement {
        this.root.innerHTML = ""
        this.modeView = this.controller.getCurrentView()
        this.root.classList.add(this.modeView)
        if (!this.filteredProducts.length) {
            let nothing = document.createElement("div")
            nothing.textContent = "Ничего нет"
            this.products.append(nothing)
        }
        this.filteredProducts.forEach(product => {
            this.products.append(new ProductItem(product).render())
        })
        this.root.append(this.products)
        this._enableHandlerCards()
        this.setActiveToButton()
        return this.root
    }

    update() {
        this.products.innerHTML = ""
        let filteredArray = this.controller.getFilteredProducts()
        this.root.className = "catalog__products"
        this.modeView = this.controller.getCurrentView()
        this.root.classList.add(this.modeView)

        if (!filteredArray.length) {
            let nothing = document.createElement("div")
            nothing.textContent = "Ничего нет"
            this.products.append(nothing)
        }

        filteredArray.forEach(product => {
            this.products.append(new ProductItem(product).render())
        })
        this.root.append(this.products)
        this.setActiveToButton()
    }

    _enableHandlerCards() {
        this.root.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                let parent = event.target.closest('.product-card');
                let parentId = parent?.getAttribute("data-id")

                if (parentId) {
                    if (event.target.classList.contains("button-to-cart")) {
                        event.target.classList.toggle('active');
                        if (event.target.classList.contains('active')) {
                            event.target.innerText = 'В корзине';
                            cart.addItemToCart(+parentId);
                            cart.calculateGeneralCount();
                            cart.calculateGeneralPrice();
                            cart.calculateGeneralDiscount(promokod.arrayAppliedPromokod);
                            cart.calculateGeneralDiscountSumm();
                            console.log('cart after add item: ', cart);
                            setCartInfoInLocal(cart);
                            cart.updateDataInHeader(header);
                        } else {
                            event.target.innerText = 'В корзину';
                            cart.removeItemFromCart(+parentId);
                            cart.calculateGeneralCount();
                            cart.calculateGeneralPrice();
                            cart.calculateGeneralDiscount(promokod.arrayAppliedPromokod);
                            cart.calculateGeneralDiscountSumm();
                            console.log('cart after add item: ', cart);
                            setCartInfoInLocal(cart);
                            cart.updateDataInHeader(header);
                        }
                    } else {
                        window.location.href = replaceHash(window.location.href, "#product/" + parentId)
                    }
                }
            }
        })
    }


    setActiveToButton(): void {
        if (cart.arrayCartItems && cart.arrayCartItems.length !== 0) {
            let productsNode: HTMLElement | null = this.root.querySelector('.products');

            if (productsNode) {
                let arrayProductsNodes = productsNode.querySelectorAll<HTMLElement>('.product-card');

                cart.arrayCartItems.forEach(item => {
                    arrayProductsNodes.forEach(productCard => {
                        let valueFromDataId = productCard.getAttribute('data-id');
                        if (Number(valueFromDataId) === item.id) {
                            let buttonNode: HTMLElement | null = productCard.querySelector('button');
                            if (buttonNode) {
                                buttonNode.classList.add('active');
                                buttonNode.innerText = 'В корзине';
                            }
                        }
                    });
                });
            }
        }
    }

}

export default ProductsList;