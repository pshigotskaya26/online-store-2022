import {ProductInterface} from "../../types/Product";
import {FilterParams, FilterParamSetter, keysParamsFilter} from "../../types/FilterParams";
import {ProductItem} from "../../components/view/productItem";
import Filter from "../../components/view/filter";
import {getMinMaxValueInObject} from "../../types/getMinMaxValueInObject";
import {isEmpty} from "../../utils/isEmpty";
import {generateURL} from "../../utils/generateURL";
import {SortBy} from "../../components/view/sortBy";
import {sortArrayOfObjects} from "../../utils/sortArrayOfObjects";

export enum SortKeys {
    PRICEASC = "price-ASC",
    PRICEDESK = "price-DESC",
    RATINGASC = "rating-ASC",
    RATINGDESK = "rating-DESC",
}


let sortFields = [
    {
        key: SortKeys.PRICEASC,
        title: "По возрастанию цены"
    },
    {
        key: SortKeys.PRICEDESK,
        title: "По убыванию цены"
    },
    {
        key: SortKeys.RATINGASC,
        title: "По возрастанию рейтинга"
    },
    {
        key: SortKeys.RATINGDESK,
        title: "По убыванию рейтинга"
    }
]


class ProductsPage {
    private readonly container: HTMLElement;
    private readonly products: ProductInterface[];
    private filteredProducts: ProductInterface[];
    public filterParams: FilterParams;
    private readonly catalogProducts: HTMLDivElement;
    private sort: string;
    private readonly queryParams: string
    private view: string;
    private readonly filterWrapper: HTMLDivElement;

    constructor(id: string, products: ProductInterface[], queryParams: string = "") {
        this.container = document.createElement("main");
        this.container.classList.add("main")
        this.container.id = id;

        this.products = products
        this.sort = SortKeys.RATINGASC
        this.view = "" // "blocks"
        this.filterParams = {
            category: [],
            brand: [],
            price: [],
            stock: [],
            search: "",
        }
        this._setParamsFromURL(queryParams)
        this.filterWrapper = document.createElement("div")
        this.queryParams = queryParams
        this.filteredProducts = this.getFilteredProducts(this.filterParams, this.products)
        this.catalogProducts = document.createElement("div")
    }

    private _setParamsFromURL(queryParams: string) {
        if (queryParams) {
            let arr = queryParams.split("&")
            arr.forEach(el => {
                let arr = el.split("=")
                let key = arr[0] as keyof FilterParams
                let values = [...arr[1].split(",")]
                if (key === keysParamsFilter.search) {
                    this.filterParams[key] = arr[1]
                } else {
                    if (key === keysParamsFilter.stock || key === keysParamsFilter.price) {
                        this.filterParams[key] = [+values[0], +values[1]]
                    } else {
                        this.filterParams[key] = values
                    }
                }
            })
        }

    }

    private createContentPage() {
        let template = document.createElement("div");
        let mainContainer = document.createElement("div")
        mainContainer.classList.add("main__container")

        mainContainer.append(this.createFilterBlock())
        mainContainer.append(this.createListBlock())

        this._enableHandlerPageCard()

        template.append(mainContainer)
        return template;
    }

    private _enableHandlerPageCard() {
        let productsNode: HTMLElement | null = this.catalogProducts.querySelector('.products');
        if (productsNode) {
            let arrayProductsNodes = productsNode.querySelectorAll<HTMLElement>('.product-card');
            arrayProductsNodes.forEach(productItem => {
                productItem.addEventListener('click', (event: Event) => {
                    if (event.target instanceof HTMLElement && event.currentTarget instanceof HTMLElement) {
                        if (event.target.classList.contains('button')) {
                            event.target.classList.toggle('active');
                            event.target.innerText = 'В корзине';
                        } else {
                            let valueFromDataId = event.currentTarget.getAttribute('data-id');
                            window.location.href = `/#product/${valueFromDataId}`;
                        }
                    }
                });
            });
        }
    }

    private createFilterBlock(): HTMLDivElement {
        let template = document.createElement("div")
        template.classList.add("filters")
        let title = document.createElement("h2")
        title.classList.add("filters__title")
        title.textContent = "Параметры"
        template.append(title)
        let filter = new Filter(this.filterParams, this.products, (data) => this.handleFilterParams(data))
        this.filterWrapper.append(filter.drawFilter())

        template.append(this.filterWrapper)

        return template

    }

    private createViewModeBlock(): HTMLDivElement {
        let modeView = document.createElement("div")
        modeView.classList.add("sort-view")
        let modeSmall = document.createElement("div")
        modeSmall.classList.add("icon-view")
        modeSmall.classList.add("icon-view_small")
        modeSmall.textContent = "1"

        let modeBig = document.createElement("div")
        modeBig.classList.add("icon-view")
        modeBig.classList.add("icon-view_big")
        modeBig.textContent = "2"
        modeView.append(modeSmall)
        modeView.append(modeBig)
        return modeView
    }

    private createCountsElementsBlock(): HTMLDivElement {
        let countElements = document.createElement("div")
        countElements.classList.add("count-products")

        let countFoundProducts = document.createElement("span")
        countFoundProducts.classList.add("count-found-products")
        countFoundProducts.textContent = String(this.filteredProducts.length)

        countElements.textContent = "Найдено: "
        countElements.append(countFoundProducts)

        return countElements
    }

    private createListBlock(): HTMLDivElement {
        let catalog = document.createElement("div")
        catalog.classList.add("catalog")
        let catalogTitle = document.createElement("h2")
        catalogTitle.classList.add("catalog__title")
        catalogTitle.textContent = "Каталог"

        let catalogContent = document.createElement("div")


        let catalogSort = document.createElement("div")
        catalogSort.classList.add("catalog__sort")


        catalogSort.append(this.createViewModeBlock())
        catalogSort.append(this.createCountsElementsBlock())
        catalogSort.append(new SortBy().render(this.sort, sortFields, (data: SortKeys) => this.handleSortBy(data)))

        this.catalogProducts.classList.add("catalog__products")

        let list = this.renderProductList(this.filteredProducts)

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
            products.forEach((el, i) => {
                let isFit = this.isFitObject(el, filterParams)
                if (isFit) {
                    res.push(el)
                }
            })
            return res
        }
    }

    private isFitObject(el: ProductInterface, params: FilterParams): boolean {
        let res: boolean[] = []
        for (const key in params) {
            let filterParamsValues = params[key as keyof typeof params]
            let currentElValue = el[key as keyof typeof el]

            if (filterParamsValues.length === 0) {
                res.push(true)
            } else {
                if (key === keysParamsFilter.brand || key === keysParamsFilter.category) {
                    if (Array.isArray(filterParamsValues) && currentElValue) {
                        let resT = filterParamsValues.some(el => el === currentElValue)
                        res.push(resT)
                    }
                }
                if (key === keysParamsFilter.price || key === keysParamsFilter.stock) {
                    if (Array.isArray(filterParamsValues) && currentElValue) {
                        let sortArr = filterParamsValues.sort((a, b) => +a - +b)
                        if ((currentElValue >= sortArr[0]) && (currentElValue <= sortArr[1])) {
                            res.push(true)
                        } else {
                            res.push(false)
                        }
                    }
                }
                if (key === keysParamsFilter.search) {
                    let name = el["title"] + el["description"] + el["price"] + el["stock"]
                    if (name.toUpperCase().trim().includes(String(filterParamsValues).toUpperCase().trim())) {
                        res.push(true)
                    } else {
                        res.push(false)
                    }
                }
            }
        }
        return res.every(el => el)
    }

    private createHeaderTitle(text: string): HTMLHeadElement {
        let headerTitle = document.createElement("h1");
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    private renderProductList(productsArr: ProductInterface[]): HTMLDivElement {

        let products = document.createElement("div")
        products.classList.add("products")
        if (productsArr.length) {
            productsArr.forEach((product: ProductInterface) => {
                let productItem = new ProductItem(product).render()
                products.append(productItem)
            })
        } else {
            let el = document.createElement("div")
            el.textContent = "Ничего нет :("
            products.append(el)
        }

        return products
    }

    private updateProductList(products: ProductInterface[]) {
        this.catalogProducts.innerHTML = ""
        this.filteredProducts = products
        let list = this.renderProductList(this.filteredProducts)
        this.catalogProducts.append(list)
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

        let newOBj = Object.assign(this.filterParams, {sort: this.sort}, {view: this.view})

        let newURL = generateURL(newOBj)
        window.history.pushState({}, "", "/#products" + newURL);

        let newObj  = this.getFilteredProducts(this.filterParams, this.products)
        this.updateProductList(newObj)
    }

    private handleSortBy(key: SortKeys) {
        this.sort = key
        let keyForSort = key.substring(0, key.indexOf("-")) as keyof ProductInterface
        let figureSort = key.substring(key.indexOf("-") + 1, key.length)

        let newObj  = sortArrayOfObjects<ProductInterface>(this.filteredProducts, keyForSort, figureSort);
        this.updateProductList(newObj)
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