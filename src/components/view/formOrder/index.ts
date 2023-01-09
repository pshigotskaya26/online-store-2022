import {InputForm} from "../inputForm";
import VirtualCard from "../virtualCard";

export class FormOrder {
    root: HTMLFormElement;
    isOrder: boolean;
    successMessage: HTMLElement;
    cbSubmit: () => void

    constructor(cbSubmit: () => void) {
        this.root = document.createElement("form")
        this.root.action = "#"
        this.root.classList.add("form")
        this.isOrder = false;
        this.successMessage = document.createElement("div")
        this.handlerForm()
        this.cbSubmit = cbSubmit
    }

    handlerForm = () => {
        this.root.addEventListener('submit', (e) => {
            e.preventDefault()

            let count = this.root.querySelectorAll("input").length - 1
            let errors = this.root.querySelectorAll(".hidden").length;
            if (count === errors) {
                this.successMessage.innerHTML = "<h2>Заказ принят, перенаправление на главную страницу</h2>"
                setTimeout(() => {

                    this.cbSubmit()

                }, 4000)

            } else {
                this.successMessage.innerHTML = "<h2>Заполните все поля</h2>"
            }
        })

    }
    writeMessageOrder = () => {
        this.successMessage.innerHTML = "<h2>Заказ принят, перенаправление на главную страницу</h2>"
    }

    render(): HTMLElement {
        this.successMessage.innerHTML = ""
        let inputs = [
            {
                label: "Имя и фамилия",
                name: "name",
                type: "text",
                placeholder: "Иванов Иван",
                errorText: "2 слова от 3 символов",
                regex: new RegExp(/[A-Яа-яA-Za-z]{3,}\s[A-Яа-яA-Za-z]{3,}/)
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
                regex: new RegExp(/[а-яa-z]{5,}.+[а-яa-z]{5,}.+?[а-яa-z]{5,}/i)
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
        let virtualCard = new VirtualCard()
        let virtualCardTemplate = virtualCard.render()
        this.root.append(virtualCardTemplate)

        let buttonSubmit = document.createElement("input")
        buttonSubmit.type = "submit"
        buttonSubmit.classList.add("button")

        this.root.append(buttonSubmit)
        this.root.append(this.successMessage)
        return this.root
    }

}

export default FormOrder