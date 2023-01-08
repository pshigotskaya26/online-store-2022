import {createInputFieldHTMLElement} from "../inputField";
import Controller from "../../controller/controller";
import {keysParamsFilter} from "../../../types/FilterParams";
import {CountedProduct, RangeCounterProducts} from "../../../types/Product";
import {Button} from "../button";
import CheckBoxField from "../checkBoxField";
import MultiplyRangeField from "../multiplyRangeField";

interface FilterData {
    search: string,
    brands: CountedProduct[],
    categories: CountedProduct[],
    prices: RangeCounterProducts,
    stocks: RangeCounterProducts
}

const RESET = "Сбросить данные"
const COPY_URL = "Копировать URL"

export class FilterProducts {
    controller: Controller;
    root: HTMLDivElement;
    form: HTMLFormElement;
    categoriesField: CheckBoxField;
    brandsField: CheckBoxField;
    pricesField: MultiplyRangeField;
    stocksField: MultiplyRangeField

    constructor(controller: Controller, root: HTMLDivElement, private updateProductsList: () => void) {
        this.root = root;
        this.form = document.createElement("form")
        this.handlerForm()
        this.controller = controller
        this.categoriesField = new CheckBoxField("Категория", keysParamsFilter.categories, keysParamsFilter.categories)
        this.brandsField = new CheckBoxField("Бренд", keysParamsFilter.brands, keysParamsFilter.brands)
        this.pricesField = new MultiplyRangeField("Стоимость", keysParamsFilter.prices, keysParamsFilter.prices)
        this.stocksField = new MultiplyRangeField("Количество на складе", keysParamsFilter.stocks, keysParamsFilter.stocks)
    }

    createFieldsForm = ({search, brands, categories, prices, stocks}: FilterData): HTMLElement => {
        let formFields = document.createElement("div")

        const searchHTMlElement = createInputFieldHTMLElement("Поиск", "text", keysParamsFilter.search, keysParamsFilter.search, search)
        const categoriesHTMlElement = this.categoriesField.render(categories)
        const brandsHTMlElement = this.brandsField.render(brands)
        const costsHTMlElement = this.pricesField.render(prices)
        const stocksHTMlElement = this.stocksField.render(stocks)

        formFields.append(searchHTMlElement)
        formFields.append(categoriesHTMlElement)
        formFields.append(brandsHTMlElement)
        formFields.append(costsHTMlElement)
        formFields.append(stocksHTMlElement)

        let filterButtons = document.createElement("div")
        filterButtons.classList.add("filter-buttons")
        filterButtons.innerHTML = `
                ${new Button(RESET).render().outerHTML}
                ${new Button(COPY_URL).render().outerHTML}
        `
        formFields.append(filterButtons)

        return formFields
    }

    render(data: FilterData): void {
        let fieldsForm = this.createFieldsForm(data)
        this.form.append(fieldsForm)
        this.root.append(this.form)
    }

    update(category?: keyof FilterData): void {
        let data = this.controller.getDataForForm()
        this.categoriesField.update(data.categories)

        this.brandsField.update(data.brands)
        if (category !== "prices") {
            this.pricesField.update(data.prices)
        }
        if (category !== "stocks") {
            this.stocksField.update(data.stocks)
        }

    }

    handlerForm(): void {
        this.form.addEventListener("change", (event) => {
            event.preventDefault()
            if (event.target instanceof HTMLInputElement && event.currentTarget instanceof HTMLFormElement) {

                let name = event.target.getAttribute("name") as keysParamsFilter
                let value = event.target.value
                let dataName: string | null = event.target.getAttribute("data-name")

                if (dataName) {
                    this.controller.handleFilterParams(name, value, dataName)
                } else {
                    this.controller.handleFilterParams(name, value)
                }
                this.controller.updateURL()
                let category = event.target.name as keyof FilterData
                this.update(category)
                this.updateProductsList()
            }
        })

        this.form.addEventListener("click", (event) => {
            let target = event.target

            if (target instanceof HTMLButtonElement && event.currentTarget instanceof HTMLFormElement) {
                if (target.type === "button" && target.value === RESET) {
                    this.controller.resetFilterParams()
                    this.update()
                    this.updateProductsList()
                }
                if (target.type === "button" && target.value === COPY_URL) {
                    target.classList.add("copied")
                    this.controller.getURL()
                }
            }
        })

        this.form.addEventListener("animationend", () => {
            this.form.querySelector(".button.copied")?.classList.remove("copied")
        })
    }


}

export default FilterProducts;
