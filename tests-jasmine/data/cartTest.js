import { addToCart,cart,loadFromStorage, updateDeliveryOption } from "../../data/cart.js";

describe('test suite : addtocart',() => {
    it('adds an exsisting product to cart', ()=>{


spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual();
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });

    it('adds a new product to the cart', ()=>{
        
spyOn(localStorage,'setItem')

        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual();
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

    });
});