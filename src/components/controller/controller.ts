import {ProductInterface} from "../../types/Product";
import Model from "../model";
import {SortKeys} from "../view/sortBy";
import {ModesViewKeys} from "../view/modeViewProductsList";
import {keysParamsFilter} from "../../types/FilterParams";

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
                this.model.setBrands(value.split(","))
            }
            if (key === keysParamsFilter.categories) {
                this.model.setCategories(value.split(","))
            }
            if (key === keysParamsFilter.stocks) {
                let [from, to] = value.split(",")
                this.model.setStocks([+from, +to])
            }
            if (key === keysParamsFilter.prices) {
                let [from, to] = value.split(",")
                this.model.setPrices([+from, +to])
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

    getDataForForm(): any {
        this.model.updateFilteredProducts()
        return this.model.getDataForForm()
    }

    getFilteredProducts(): ProductInterface[] {
        return this.model.getFilteredProducts()
    }

    setView(mode: ModesViewKeys) {
        this.model.setModeView(mode)
    }

    setSort(mode: SortKeys) {
        this.model.setModeSort(mode)
    }

    getCurrentView(): ModesViewKeys {
        return this.model.getCurrentModeView()
    }

    getCurrentSort(): SortKeys {
        return this.model.getCurrentModeSort()
    }
}

export default Controller