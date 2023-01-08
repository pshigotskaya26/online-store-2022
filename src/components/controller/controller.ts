import {ProductInterface} from "../../types/Product";
import Model from "../model";
import {SortKeys} from "../view/sortBy";
import {ModesViewKeys} from "../view/modeViewProductsList";
import {FilterParams, keysParamsFilter} from "../../types/FilterParams";
import {FormData} from "../../types/formData";
import {replaceHash} from "../../utils/replaceHash";

class Controller {
    model: Model

    constructor() {
        this.model = new Model()
    }

    handleFilterParams(key: keysParamsFilter, value: string, name?: string) {
        if (key === keysParamsFilter.categories) {
            this.model.handleCategories(value)
        }
        if (key === keysParamsFilter.brands) {
            this.model.handleBrands(value)
        }

        if (key === keysParamsFilter.search) {
            this.model.setSearchValue(value)
        }

        if (key === keysParamsFilter.prices) {
            this.model.handlePrices(+value, name)
        }

        if (key === keysParamsFilter.stocks) {
            this.model.handleStocks(+value, name)
        }
    }

    setQueryParamsFromURLToModel(queryParams: string) {
        let arr = queryParams.split("&")

        arr.forEach(el => {
            let [key, value] = el.split("=")
            if (key === keysParamsFilter.search) {
                this.model.setSearchValue(value)
            }
            if (key === keysParamsFilter.brands) {
                this.model.setBrands(value.split(",").map(el => el.replace(/%20/g, " ")))
            }
            if (key === keysParamsFilter.categories) {
                this.model.setCategories(value.split(",").map(el => el.replace(/%20/g, " ")))
            }
            if (key === keysParamsFilter.stocks) {
                let [from, to] = value.split(",")

                this.model.setStocks([+from, +to])
            }
            if (key === keysParamsFilter.prices) {
                let [from, to] = value.split(",")

                this.model.setPrices([+from, +to])
            }
            if (key === "mode") {
                this.model.setModeView(value as ModesViewKeys)
            }
            if (key === "sort") {
                this.model.setModeSort(value as SortKeys)
            }
        })

        this.model.updateFilteredProducts()
    }

    setSortProducts() {
        this.model.setSortProducts()
    }

    getProduct(id: string | number): ProductInterface {
        return this.model.getProduct(id)
    }

    getDataForForm(): FormData {
        this.model.updateFilteredProducts()
        return this.model.getDataForForm()
    }

    getFilteredProducts(): ProductInterface[] {
        return this.model.getFilteredProducts()
    }

    updateURL() {
        let url = this.generateURL(this.model.paramsFilter, this.model.modeView, this.model.modeSort)
        window.location.href =  replaceHash(window.location.href, "#products" + url)
    }


    setView(mode: ModesViewKeys) {
        this.model.setModeView(mode)
        this.updateURL()
    }

    setSort(mode: SortKeys) {
        this.model.setModeSort(mode)
        this.updateURL()
    }

    getCurrentView(): ModesViewKeys {
        return this.model.getCurrentModeView()
    }

    getCurrentSort(): SortKeys {
        return this.model.getCurrentModeSort()
    }

    getURL() {
        navigator.clipboard.writeText(location.href)
    }

    resetFilterParams() {
        this.model.resetParamsFilter()
        this.updateURL()
    }

    generateURL(obj: FilterParams, mode: ModesViewKeys, sort: SortKeys): string {
        let arr = Object.entries(obj).map((param) => {
            if (typeof param[1] === "string") {
                if (param[1] === "") {
                    return ""
                }
            }

            if (Array.isArray(param)) {
                if (param[1].length === 0) {
                    return ""
                }
            }
            return `${param[0]}=${Array.isArray(param[1]) ? param[1].join(",") : param[1]}`
        })
        arr.push(`mode=${mode}`)
        arr.push(`sort=${sort}`)
        let str = arr.filter(n => n).join("&")

        if (str.length) {
            return "?" + str
        }

        return str
    }
}

export default Controller