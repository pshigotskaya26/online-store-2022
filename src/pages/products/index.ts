import {ProductInterface} from "../../types/Product";
import {FilterParams, FilterParamSetter, keysParamsFilter} from "../../types/FilterParams";
import {ProductItem} from "../../components/view/productItem";
import Filter from "../../components/view/filter";
import {getMinMaxValueInObject} from "../../types/getMinMaxValueInObject";
import {isEmpty} from "../../utils/isEmpty";
import {isFitObject} from "../../utils/isFitObject";

class ProductsPage {
    private readonly container: HTMLElement;
    private readonly products: ProductInterface[];
    private filteredProducts: ProductInterface[];
    private readonly filterParams: FilterParams;
    private readonly catalogProducts: HTMLDivElement

    constructor(id: string, products: ProductInterface[]) {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;
        //Наверное вынести в контроллер
        this.products = products
        this.filterParams = {
            category: [],
            brand: ["Apple"],
            price: [],
            stock: [],
            search: ""
        }
        this.filteredProducts = this.getFilteredProducts(this.filterParams, this.products)
        this.catalogProducts = document.createElement("div")
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
        let catalog = document.createElement("div")
        catalog.classList.add("catalog")
        let catalogTitle = document.createElement("h2")
        catalogTitle.classList.add("catalog__title")
        catalogTitle.textContent = "Каталог"

        let catalogContent = document.createElement("div")

        let catalogSort = document.createElement("div")
        catalogSort.classList.add("catalog__sort")
        catalogSort.innerHTML = `
                        <div class="sort-view">
                    <div class="icon-view icon-view_small"></div>
                    <div class="icon-view icon-view_big active"></div>
                </div>
                <div class="count-products">Найдено: <span class="count-found-products">${this.filteredProducts.length}</span></div>
                <div class="sort-bar">
                    <div class="sort-bar__text">Сортировать по:</div>
                    <select name="select-parametr">
                        <option value="price-ASC">По возрастанию цены</option>
                        <option value="price-DESC">По убыванию цены</option>
                        <option value="raiting-ASC">По возрастанию рейтинга</option>
                        <option value="raiting-DESC">По убыванию рейтинга</option>
                    </select>
                </div>
`
        this.catalogProducts.classList.add("catalog__products")

        let list = this.renderProductList(this.filterParams, this.filteredProducts)

        this.catalogProducts.append(list)

        catalogContent.append(catalogSort)
        catalogContent.append(this.catalogProducts)

        catalog.append(catalogTitle)
        catalog.append(catalogContent)

        return catalog
    }

    private getFilteredProducts(filterParams: FilterParams, products: ProductInterface[]): ProductInterface[] | [] {

        const isEmptyFilter = isEmpty<FilterParams>(this.filterParams)
        if (isEmptyFilter) {
            return products
        } else {
            let res: ProductInterface[] = []
            // let [o, b,c] = products
            products.forEach((el,i) => {
                if (i <= 10) {
                    let temp = isFitObject(el, filterParams)
                    console.log("--------")
                }

            return res

            })
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

    }
    private createHeaderTitle(text: string) {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }
    private renderProductList(params: FilterParams, productsArr: ProductInterface[]): HTMLDivElement {

        let products = document.createElement("div")
        products.classList.add("products")

        productsArr.forEach((product: ProductInterface) => {
            let productItem = new ProductItem(product).render()
            products.append(productItem)
        })

        return products
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

        // this.catalogProducts.innerHTML = ""
        // this.filteredProducts = this.getFilteredProducts(this.filterParams, this.products)
        // console.log(this.filteredProducts)
        // this.catalogProducts.append(this.renderProductList(this.filterParams, this.products))
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
}

export default ProductsPage;