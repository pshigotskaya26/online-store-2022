import {ProductInterface} from "../../types/Product";
import {FilterParams, FilterParamSetter, keysParamsFilter} from "../../types/FilterParams";
import { ProductItem } from "../../components/view/productItem";
import Filter from "../../components/view/filter";
import {getMinMaxValueInObject} from "../../types/getMinMaxValueInObject";

class ProductsPage {
    private readonly container: HTMLElement;
    private readonly products: ProductInterface[];
    private filteredProducts: ProductInterface[];
    private readonly filterParams: FilterParams;

    constructor(id: string, products: ProductInterface[]) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;
        //Наверное вынести в контроллер
        this.products = products
        this.filteredProducts = []
        this.filterParams = {
            category: [],
            brand: [],
            price: [],
            stock: [],
            search: ""
        }
    }

    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private createContentPage() {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main__container")
        mainContainer.append(this.createFilterBlock())
        mainContainer.append(this.createListBlock())
        template.append(mainContainer)
        return template;
    }

    private createFilterBlock() {
        let template = document.createElement("div")
        template.classList.add("filters")
        let title = document.createElement("h2")
        title.classList.add("filters__title")
        title.textContent = "Параметры"
        template.append(title)

        let filter = new Filter(this.filterParams, this.products, (data) => this.handleFilterParams(data))
        template.append(filter.drawFilter())

        return template

    }
    
    private createListBlock() {
        let template = document.createElement("div")
        template.textContent = "createListBlock"
        
            let generatedProducts = this.products
            .map((product: ProductInterface) => new ProductItem(product))
            .map((product: ProductItem) => {
                return product.render();
            })
            .join('');

        template.innerHTML = PageContent;

        let productsNode: HTMLElement | null = template.content.querySelector('.products');
        if (productsNode) {
            productsNode.innerHTML = generatedProducts;

            let arrayProductsNodes = productsNode.querySelectorAll<HTMLElement>('.product-card');

            arrayProductsNodes.forEach(productItem => {
                productItem.addEventListener('click', (event: Event) => {
                    if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                        if (event.target.classList.contains('button')) {
                            event.target.classList.toggle('active');
                            event.target.innerText = 'В корзине';
                        }
                        else {
                            let valueFromDataId = event.currentTarget.getAttribute('data-id');
                            window.location.href=`/#product/${valueFromDataId}`;
                        }
                    }
                });
            });
        }
        
        return template
    }

    private handleFilterParams({key, keyHelper, value}: FilterParamSetter) {
        if (key === keysParamsFilter.search) {
            this.filterParams[key] = value
        }
        if (key === keysParamsFilter.category || key === keysParamsFilter.brand) {
            if (this.filterParams[key].includes(value)) {
                this.filterParams[key] = this.filterParams[key].filter(v => v != value)
            } else {
                this.filterParams[key].push(value)
            }

        }
        if (key === keysParamsFilter.price || key === keysParamsFilter.stock) {
            if (keyHelper === "from") {
                if (!this.filterParams[key].length) {
                    let [, max] = getMinMaxValueInObject<ProductInterface>(key, this.products)
                    this.filterParams[key][0] = +value
                    this.filterParams[key][1] = max
                } else {

                    this.filterParams[key][0] = +value
                }
            }

            if (keyHelper === "to") {
                if (!this.filterParams[key].length) {
                    let [min,] = getMinMaxValueInObject<ProductInterface>(key, this.products)
                    this.filterParams[key][0] = min
                    this.filterParams[key][1] = +value
                } else {
                    this.filterParams[key][1] = +value
                }
            }
        }

        console.log(this.filterParams)
    }

    render() {
        const title = this.createHeaderTitle("Products1 Page")
        const content = this.createContentPage()
        const container = document.createElement("div")
        container.classList.add("container")
        container.append(title)
        container.append(content)
        this.container.append(container)
        return this.container
    }
}

export default ProductsPage;