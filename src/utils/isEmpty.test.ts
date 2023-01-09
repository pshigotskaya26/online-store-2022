import {isEmpty} from "./isEmpty";

it("tests", () => {
    let obj = {
        aaa: [],
        b: "",
        v: " ",
    }

    let obj1 = {
        aaa: [],
        b: "",
        v: "",
    }

    let obj2 = {
        aaa: [],
        b: [],
        v: "",
    }

    let obj3 = {
        aaa: ["dsfsdf"],
        b: [],
        v: "",
    }

    expect(isEmpty(obj)).toBeTruthy()
    expect(isEmpty(obj1)).toBeTruthy()
    expect(isEmpty(obj2)).toBeTruthy()
    expect(isEmpty(obj3)).toBeFalsy()

})