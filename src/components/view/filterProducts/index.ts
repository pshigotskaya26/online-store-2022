import InputField from "../inputField";
import CheckBoxField from "../checkBoxField";
import MultiplyRangeField from "../multiplyRangeField";
import Controller from "../../controller/controller";
import {keysParamsFilter} from "../../../types/FilterParams";
import {CountedProduct, RangeCounterProducts} from "../../../types/Product";
import {render} from "sass";

interface FilterData {
    search: string,
    brands: CountedProduct[],
    categories: CountedProduct[],
    prices: RangeCounterProducts,
    stocks: RangeCounterProducts
}

export class FilterProducts {
    controller: Controller;
    root: HTMLDivElement;
    form: HTMLFormElement;

    constructor(controller: Controller, root: HTMLDivElement, private updateProductsList: () => void) {
        this.root = root;
        this.form = document.createElement("form")
        this.handlerForm()
        this.controller = controller
    }

    createFieldsForm({search, brands, categories, prices, stocks}: FilterData): HTMLElement {
        let formFields = document.createElement("div")
        formFields.innerHTML = `
            ${new InputField("Поиск", "text", keysParamsFilter.search, keysParamsFilter.search, search).render().outerHTML}
            ${new CheckBoxField("Категория", keysParamsFilter.categories, keysParamsFilter.categories, categories).render().outerHTML}
            ${new CheckBoxField("Бренд", keysParamsFilter.brands, keysParamsFilter.brands, brands).render().outerHTML}
            ${new MultiplyRangeField("Стоимость", keysParamsFilter.prices, keysParamsFilter.prices, prices).render().outerHTML} 
            ${new MultiplyRangeField("Количество на складе", keysParamsFilter.stocks, keysParamsFilter.stocks, stocks).render().outerHTML} 
        `
        return formFields
    }

    render(data: FilterData) {

        let fieldsForm = this.createFieldsForm(data)
        this.form.append(fieldsForm)
        this.root.append(this.form)
    }

    update() {
        let data = this.controller.getDataForForm()
        this.form.innerHTML = ""
        this.form.innerHTML = this.createFieldsForm(data).outerHTML
    }

    handlerForm() {
        this.form.addEventListener("change", (event) => {
            if (event.target instanceof HTMLInputElement && event.currentTarget instanceof HTMLFormElement) {
                let name = event.target.getAttribute("name") as keysParamsFilter
                let value = event.target.value
                let dataName: string | null = event.target.getAttribute("data-name")

                if (dataName) {
                    this.controller.handleFilterParams(name, value, dataName)
                } else {
                    this.controller.handleFilterParams(name, value)
                }
                this.update()
                this.updateProductsList()
            }
        })
    }


}

export default FilterProducts;
