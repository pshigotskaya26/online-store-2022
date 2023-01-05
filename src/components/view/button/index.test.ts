import {Button} from "./index";
describe("board", () => {
    let button = new Button("Temp")

    it("should be have class button", () => {
        expect(button.render().classList[0]).toBe("button")
    })

    it("should be have text", () => {
        expect(button.render().textContent).toBe("Temp")
    })
})