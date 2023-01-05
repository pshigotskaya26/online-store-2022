import {InputForm} from "../inputForm";
import VirtualCard from "../virtualCard";

export class FormOrder {
    root: HTMLFormElement;

    constructor() {
        this.root = document.createElement("form")
        this.root.action = "#"
        this.root.classList.add("form")
        this.handlerForm()
    }

    handlerForm() {
        this.root.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log(this.root.querySelectorAll("input"))
        })


    }

    render(): HTMLElement {

        let inputs = [
            {
                label: "Имя и фамилия",
                name: "name",
                type: "text",
                placeholder: "Иванов Иван",
                errorText: "менее двух слов, длина каждого не менее 3 символов",
                regex: new RegExp(/[A-Za-z]{3,}\b.+?[A-Za-z]{3,}/)
            },
            {
                label: "Номер телефона",
                name: "phone",
                type: "text",
                placeholder: "+37529999999",
                errorText: "должно начинаться с '+', содержать только цифры и быть не короче 9 цифр",
                regex: new RegExp(/^((\+)[\s]?)(\(?\d{3}\)?[\s]?)?[\d\s]{9,}$/)
            },
            {
                label: "Адрес доставки",
                name: "phone",
                type: "text",
                placeholder: "г.Минск, пр.Независимости, 18",
                errorText: "не менее трех слов, длина каждого не менее 5 символов ",
                regex: new RegExp(/[A-Za-z]{5,}.+[A-Za-z]{5,}.+?[A-Za-z]{5,}/)
            },
            {
                label: "E-mail",
                name: "email",
                type: "email",
                placeholder: "info@gmail.com",
                errorText: "Валидация: проверяется, является ли введенный текст электронной почтой",
                regex: new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)
            }
        ]
        inputs.forEach(input => {
            this.root.append(new InputForm(input.label, input.name, input.name, input.type, input.placeholder, input.errorText, input.regex).render())
        })

        this.root.append(new VirtualCard().render())

        let buttonSubmit = document.createElement("input")
        buttonSubmit.type = "submit"
        buttonSubmit.classList.add("button")

        this.root.append(buttonSubmit)
        return this.root
    }

}

export default FormOrder