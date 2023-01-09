import Pagination from "./index";

describe("pagination", () => {
    let pagination = new Pagination(35, () => { }, 6, 2)
    it("should be render pagination", () => {
        let html = pagination.render().classList[0]
        expect(html).toBe("pagination__wrapper")
    })
})