import {sortArrayOfObjects} from "./sortArrayOfObjects";

describe("sort array of objects by properrty", () => {

    let array = [
        {id: 1, price: 100, stocks: 55},
        {id: 2, price: 95, stocks: 100},
        {id: 3, price: 25, stocks: 578},
        {id: 4, price: 11, stocks: 66},
    ]

    it("right sort", () => {
        let res = sortArrayOfObjects(array, "price", "ASC")
        let ids = res.map(el => el.id).join("")
        expect(ids).toBe("4321")

        let resDESC = sortArrayOfObjects(array, "stocks", "DESC")
        let idsDESC = resDESC.map(el => el.id).join("")
        expect(idsDESC).toBe("3241")
    })


})