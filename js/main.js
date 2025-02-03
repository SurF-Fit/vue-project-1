let product = "Socks";

let app = new Vue({
    el: '#app',
    data:{
        product: "Socks",
        allText: "A pair of socks",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        inStock: true,
        inventory: 100,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green'
            },
            {
                variantId: 2235,
                variantColor: 'blue'
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
})