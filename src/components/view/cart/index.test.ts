import Cart from "./index";
import * as assert from "assert";

describe("test cart", () => {
    let cart = new Cart()
    test("should add item to cart", () => {
        expect(cart.arrayCartItems.length).toBe(0)
        cart.addItemToCart(1)
        expect(cart.arrayCartItems.length).toBe(1)
    })

    test("should add 2 items to cart", () => {
        cart.arrayCartItems = []
        expect(cart.arrayCartItems.length).toBe(0)
        cart.addItemToCart(1)
        cart.addItemToCart(2)
        expect(cart.arrayCartItems.length).toBe(2)
    })


    test("should remove item from cart", () => {
        cart.arrayCartItems = []
        expect(cart.arrayCartItems.length).toBe(0)
        cart.addItemToCart(1)
        cart.addItemToCart(2)
        expect(cart.arrayCartItems.length).toBe(2)
        cart.removeItemFromCart(1)
        expect(cart.arrayCartItems.length).toBe(1)
    })


    test("should check item in cart", () => {
        cart.arrayCartItems = []
        expect(cart.checkIfItemInCart(2)).toBeFalsy()
        cart.addItemToCart(2)
        expect(cart.checkIfItemInCart(2)).toBeTruthy()
    })
})