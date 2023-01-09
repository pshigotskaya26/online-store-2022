import {splitArrayAndChangeSpaces} from "./splitArrayAndChangeSpaces";

test("should split arr", () => {
    let str = "Impression%20of%20Acqua%20Di%20Gio,Fog%20Scent%20Xpressio"
    expect(splitArrayAndChangeSpaces(str).length).toBe(2)
})

test("should split arr and change spaces", () => {
    let str = "Impression%20of%20Acqua%20Di%20Gio,Fog%20Scent%20Xpressio"
    expect(splitArrayAndChangeSpaces(str)).toEqual(["Impression of Acqua Di Gio", "Fog Scent Xpressio"])
})