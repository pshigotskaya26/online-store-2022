import {ProductInterface} from "../../types/Product";
import FilterBlock from "../../components/view/filterBlock";
import Controller from "../../components/controller/controller";
import ProductsList from "../../components/view/productsListBlock";


class ProductsPage {
    controller: Controller
    private readonly container: HTMLElement;

    filterBlockHTML: HTMLElement;
    listProductsHTML: HTMLElement
    filterBlock: FilterBlock;
    productsList: ProductsList

    constructor(id: string, products: ProductInterface[], controller: Controller) {
        this.controller = controller
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;

        this.filterBlockHTML = document.createElement("div")
        this.filterBlock = new FilterBlock(this.filterBlockHTML, controller, this.updateProductsList)

        this.listProductsHTML = document.createElement("div")
        this.productsList = new ProductsList(this.listProductsHTML, controller)
    }

    private createHeaderTitle(text: string): HTMLHeadElement {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage(): HTMLElement {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main__container")

        mainContainer.append(this.filterBlock.render())
        mainContainer.append(this.productsList.render())

        // this.setActiveToButton();
        // this._enableHandlerPageCard()

        template.append(mainContainer)
        return template;
    }

    render() {
        const title = this.createHeaderTitle("Products Page")
        const content = this.createContentPage()
        const container = document.createElement("div")
        container.classList.add("container")
        container.append(title)
        container.append(content)
        this.container.append(container)
        return this.container
    }


    updateProductsList = () => {
        console.log("updateList")
        this.productsList.updateCounterElements()
        this.productsList.productsList.update()
    }

    // private setActiveToButton(): void {
    //     if (cart.arrayCartItems && cart.arrayCartItems.length !== 0) {
    //         let productsNode: HTMLElement | null = this.catalogProducts.querySelector('.products');
    //
    //         if (productsNode) {
    //             let arrayProductsNodes = productsNode.querySelectorAll<HTMLElement>('.product-card');
    //
    //             cart.arrayCartItems.forEach(item => {
    //                 arrayProductsNodes.forEach(productCard => {
    //                     let valueFromDataId = productCard.getAttribute('data-id');
    //                     if (Number(valueFromDataId) === item.id) {
    //                         let buttonNode: HTMLElement | null = productCard.querySelector('button');
    //                         if (buttonNode) {
    //                             buttonNode.classList.add('active');
    //                             buttonNode.innerText = 'В корзине';
    //                         }
    //                     }
    //                 });
    //             });
    //         }
    //     }
    // }
    //

    // private _enableHandlerPageCard(): void {
    //     let productsNode: HTMLElement | null = this.catalogProducts.querySelector('.products');
    //     if (productsNode) {
    //
    //         let arrayProductsNodes = productsNode.querySelectorAll<HTMLElement>('.product-card');
    //
    //         arrayProductsNodes.forEach(productItem => {
    //             productItem.addEventListener('click', (event: Event) => {
    //                 if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
    //                     if (event.target.classList.contains('button')) {
    //
    //                         let valueFromDataId = Number(event.currentTarget.getAttribute('data-id'));
    //
    //                         event.target.classList.toggle('active');
    //                         if (event.target.classList.contains('active')) {
    //                             event.target.innerText = 'В корзине';
    //                             cart.addItemToCart(valueFromDataId);
    //                             cart.calculateGeneralCount();
    //                             cart.calculateGeneralPrice();
    //                             console.log('cart after add item: ', cart);
    //                             setCartInfoInLocal(cart);
    //                             updateDataInHeader(header);
    //                         } else {
    //                             event.target.innerText = 'В корзину';
    //                             cart.removeItemFromCart(valueFromDataId);
    //                             cart.calculateGeneralCount();
    //                             cart.calculateGeneralPrice();
    //                             console.log('cart after add item: ', cart);
    //                             setCartInfoInLocal(cart);
    //                             updateDataInHeader(header);
    //                         }
    //
    //                     } else {
    //                         let valueFromDataId = event.currentTarget.getAttribute('data-id');
    //                         window.location.href = `/#product/${valueFromDataId}`;
    //                     }
    //                 }
    //             });
    //         });
    //     }
    // }


    //


}

export default ProductsPage;