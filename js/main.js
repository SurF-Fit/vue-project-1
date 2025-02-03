let product = "Socks";

let app = new Vue({
    methods: {
        addToCart() {
            this.cart += 1
        },
        delToCart() {
            if (this.cart === 0) this.cart = 0
            else this.cart -= 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
    },
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
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    }
})