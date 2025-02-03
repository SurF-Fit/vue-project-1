Vue.component('product', {
    template: `
   <div class="product">
        <div class="product-image">
                <img v-bind:alt="allText" v-bind:src="image">
        </div>
    
        <div class="product-info">
            <div style="display: flex; gap: 20px; align-items: center">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else :class="{ text_through: !inStock }">Out of Stock</p>
            </div>
            <p v-if="onSale">{{ sale }}</p>
            <span v-if="inventory <= 30 && inventory > 0">On Sale</span><br>
            <ul>
                <li v-for="productDetail in productDetails">{{ productDetail }}</li>
            </ul>
            <p>Shipping: {{ shipping }}</p>
            <div style="display: flex; gap: 20px; margin-left: 20px">
                <div
                        class="color-box"
                        v-for="(variant, index) in variants"
                        :key="variant.variantId"
                        :style="{ backgroundColor:variant.variantColor }"
                        @mouseover="updateProduct(index)"
                >
                </div>
            </div>
            <div style="display: flex; gap: 20px; margin-left: 20px">
                <div v-for="size in sizes">
                    <a style="color: black; text-decoration: none" href="#">{{ size }}</a>
                </div>
            </div>
            <div style="display: flex; gap: 20px; align-items: center">
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                <button v-on:click="delToCart">Delete to cart</button>
            </div>
        </div>
   </div>
 `,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            allText: "A pair of socks",
            onSale: true,
            inventory: 100,
            details: [
                {
                    detailsId: 2345,
                    detail: ['80% cotton' , '20% polyester' , 'Gender-neutral'],
                },
                {
                    detailsId: 2346,
                    detail: ['90% cotton' , '50% polyester' , 'Only Man'],
                }
            ],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: [],
            selectedVariant: 0,
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },
        delToCart() {
            this.$emit('del-to-cart',
            this.variants[this.selectedVariant].variantId);
            if (this.cart.length === 0) this.cart.length = 0
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        productDetails(){
            return this.details[this.selectedVariant].detail
        },
        sale() {
            return this.brand + ' ' + this.product + ' ' + "sale"
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        deleteCart(id){
            this.cart.pop();
        }
    },
})