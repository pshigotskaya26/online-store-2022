import {CountedProduct, ProductInterface, RangeCounterProducts} from "../../types/Product";
import {productsData} from "../../data/products";
import {FilterParams, keysParamsFilter} from "../../types/FilterParams";
import {isEmpty} from "../../utils/isEmpty";
import {SortKeys} from "../view/sortBy";
import {ModesViewKeys} from "../view/modeViewProductsList";
import {sortArrayOfObjects} from "../../utils/sortArrayOfObjects";


export class ProductsModel {

    products: ProductInterface[];
    filteredProducts: ProductInterface[];
    paramsFilter: FilterParams;
    modeSort: SortKeys
    modeView: ModesViewKeys

    constructor() {
        this.products = productsData
        this.filteredProducts = []
        this.generateFilteredProducts()

        this.paramsFilter = {
            categories: [],
            brands: [],
            prices: [],
            stocks: [],
            search: "",
        }

        this.modeSort = SortKeys.PRICEASC
        this.modeView = ModesViewKeys.SMALL
    }

    getProduct(id: string | number): ProductInterface {
        return this.products.filter(n => n.id.toString() === id.toString())[0]
    }

    resetParamsFilter() {
        this.paramsFilter.categories = []
        this.paramsFilter.brands = []
        this.paramsFilter.prices = []
        this.paramsFilter.stocks = []
        this.paramsFilter.search = ""
        this.updateFilteredProducts()
    }

    updateFilteredProducts() {
        this.filteredProducts = this.getFilteredProducts()
    }

    getDataForForm() {
        let brands = this.getCountedProducts("brand")
        let categories = this.getCountedProducts("category")
        let pricesRange = this.rangeValues("price")
        let stocksRange = this.rangeValues("stock")

        return {
            search: this.paramsFilter.search,
            brands: brands,
            categories: categories,
            stocks: stocksRange,
            prices: pricesRange
        }
    }

    setSortProducts() {
        let keyForSort = this.modeSort.substring(0, this.modeSort.indexOf("-")) as keyof ProductInterface
        let figureSort = this.modeSort.substring(this.modeSort.indexOf("-") + 1, this.modeSort.length)
        let sortedArray = sortArrayOfObjects<ProductInterface>(this.filteredProducts, keyForSort, figureSort)
        this.filteredProducts = sortedArray
    }

    private getCountedProducts(key: keyof ProductInterface): CountedProduct[] {
        let res: CountedProduct[] = []
        if (key === "category" || key === "brand") {
            let allValues = Array.from(new Set(this.products.map(el => el[key])))

            res = allValues.map(el => {
                const countFilteredProducts = this.countElementsByKey<ProductInterface>(el, key, this.filteredProducts)
                return {
                    title: el,
                    filteredCount: countFilteredProducts,
                    count: this.countElementsByKey<ProductInterface>(el, key, this.products),
                    selected: this.isSelectedFilterItem(key, el)
                }
            })
        }
        return res
    }

    isSelectedFilterItem(key: keyof ProductInterface, value: string): boolean {
        if (key === "brand") {
            return this.paramsFilter.brands.some(el => el === value)
        }
        if (key === "category") {
            return this.paramsFilter.categories.some(el => el === value)
        }
        return false
    }

    countElementsByKey<T>(str: string, key: keyof T, arr: T[]): number {
        return arr.filter(el => el[key] === str).length
    }

    private rangeValues(key: keyof ProductInterface): RangeCounterProducts {
        let allValues = [0, 0]
        let filteredValues = [0, 0]
        if (key === "price" || key === "stock") {
            allValues = this.getMinMaxValue(this.products.map(el => el[key]))
            filteredValues = this.getMinMaxValue(this.filteredProducts.map(el => el[key]))


        }
        return {
            min: allValues[0], max: allValues[1], minDefault: filteredValues[0], maxDefault: filteredValues[1]
        }
    }

    getMinMaxValue(arr: number[]): [number, number] {
        let a = arr.sort((a, b) => a - b);
        return [a[0], a[a.length - 1]]
    }

    generateFilteredProducts() {
        const isEmptyFilter = isEmpty<FilterParams>(this.paramsFilter)
        if (isEmptyFilter) {
            this.filteredProducts = this.products
        } else {
            let res: ProductInterface[] = []
            this.products.forEach((el, i) => {
                let isFit = this.isFitObject(el)
                if (isFit) {
                    res.push(el)
                }
            })
            this.filteredProducts = res
        }
    }

    getFilteredProducts() {
        this.generateFilteredProducts()
        let keyForSort = this.modeSort.substring(0, this.modeSort.indexOf("-")) as keyof ProductInterface
        let figureSort = this.modeSort.substring(this.modeSort.indexOf("-") + 1, this.modeSort.length)
        return sortArrayOfObjects<ProductInterface>(this.filteredProducts, keyForSort, figureSort)
    }

    private isFitObject(el: ProductInterface): boolean {
        let res: boolean[] = []

        for (const key in this.paramsFilter) {
            if (key === keysParamsFilter.brands) {
                res.push(this.isFitInArray(this.paramsFilter.brands, el.brand))
            }
            if (key === keysParamsFilter.categories) {
                res.push(this.isFitInArray(this.paramsFilter.categories, el.category))
            }
            if (key === keysParamsFilter.prices) {
                res.push(this.isFitInRange(this.paramsFilter.prices, el.price))
            }
            if (key === keysParamsFilter.stocks) {
                res.push(this.isFitInRange(this.paramsFilter.stocks, el.price))
            }
            if (key === keysParamsFilter.search) {
                let fieldsStr = el["title"] + el["description"] + el["price"] + el["stock"] + el["category"] + el["brand"]
                res.push(this.isFitInString(fieldsStr, this.paramsFilter.search))
            }
        }
        return res.every(el => el)
    }

    isFitInArray<T>(arr: T[], value: T): boolean {
        if (arr.length === 0) return true
        return arr.some(el => el === value)
    }

    isFitInRange(range: [number, number] | [], value: number): boolean {
        if (range.length === 0) return true;
        let rangeSort = range.sort((a, b) => +a - +b)

        return ((value >= rangeSort[0]) && (value <= rangeSort[1]))
    }

    isFitInString(fields: string, value: string) {
        return fields.toUpperCase().trim().includes(String(value).toUpperCase().trim())
    }

    setCategories(value: string[]) {
        this.paramsFilter.categories = value
    }

    handleCategories(value: string) {
        this.paramsFilter.categories = this.handlerValueInArray(this.paramsFilter.categories, value)
    }

    handlerValueInArray(arr: string[], value: string) {
        let res = arr
        if (arr.includes(value)) {
            res = arr.filter(el => el !== value)
        } else {
            arr.push(value)
        }
        return res
    }

    setBrands(value: string[]) {
        this.paramsFilter.brands = value
    }

    handleBrands(value: string) {
        this.paramsFilter.brands = this.handlerValueInArray(this.paramsFilter.brands, value)
    }

    setPrices(value: [number, number]) {
        this.paramsFilter.prices = value
    }

    handlePrices(value: number, name?: string) {
        if (name === "from") {
            this.paramsFilter.prices[0] = value
            if (!this.paramsFilter.prices[1]) {
                this.paramsFilter.prices[1] = 5000
            }
        }
        if (name === "to") {
            if (!this.paramsFilter.prices[0]) {
                this.paramsFilter.prices[0] = 0
            }
            this.paramsFilter.prices[1] = value
        }
    }

    setStocks(value: [number, number]) {
        this.paramsFilter.stocks = value
    }

    handleStocks(value: number, name?: string) {
        if (name === "from") {
            this.paramsFilter.stocks[0] = value
            if (!this.paramsFilter.stocks[1]) {
                this.paramsFilter.stocks[1] = 5000
            }
        }
        if (name === "to") {
            if (!this.paramsFilter.stocks[0]) {
                this.paramsFilter.stocks[0] = 0
            }
            this.paramsFilter.stocks[1] = value
        }
    }


    setSearchValue(value: string) {
        this.paramsFilter.search = value
    }

    setModeView(mode: ModesViewKeys) {
        this.modeView = mode
    }

    getCurrentModeView(): ModesViewKeys {
        return this.modeView
    }

    //Sorting

    setModeSort(mode: SortKeys) {
        this.modeSort = mode
    }

    getCurrentModeSort(): SortKeys {
        return this.modeSort
    }

}

export default ProductsModel