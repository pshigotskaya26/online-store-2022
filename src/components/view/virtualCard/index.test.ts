import VirtualCard from "./index";

describe("virtual card", () => {
    let card = new VirtualCard()
    test("should render card", () => {
        let childrenlayout = card.render().children[0]
        expect(childrenlayout.classList[0]).toBe("credit-card__content")


        let inputs = childrenlayout.querySelectorAll("input").length
        expect(inputs).toBe(3)
    })


    test("should update logo card", () => {
        let cardlayout = card.render()

        let inputNumberCard = cardlayout.querySelector("#numberCard")
        
        console.log(inputNumberCard)

    })

})