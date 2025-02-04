let eventBus = new Vue()

Vue.component('product-tabs', {
    template: `
      <div>
        <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
        </ul>
        <div v-show="selectedTab === 'Reviews'">
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
            <li v-for="review in reviews">
              <p>Name: {{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>Review: {{ review.review }}</p>
              <p>Recommend: {{ review.recommend }}</p>
            </li>
          </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
        </div>
        <div v-show="selectedTab === 'Shipping'">
          <p>Shipping: {{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="productDetail in productDetails">{{ productDetail }}</li>
          </ul>
        </div>
      </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    },
    props: {
        reviews: {
            type: Array,
            required: false,
        },
        shipping: {
            type: String,
            required: false,
        },
        productDetails: {
            type: Array,
            required: false,
        }
    }
})



Vue.component('product-review', {
    template: `
      <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>


        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>
    
        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>
    
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        
        <p>
          <label for="recommend">Would you recommend this product?</label>
          <div style="display: flex; gap: 40px">
            <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">
              <input v-model="recommend" id="recommend" style="width: 100%;height: 25px;margin-bottom: 0;" name="recommend" type="radio" value="yes">
              <label for="recommend">yes</label>
            </div>
            <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">
              <input v-model="recommend" id="recommend" style="width: 100%;height: 25px;margin-bottom: 0;" name="recommend" type="radio" value="no">
              <label for="recommend">no</label>
            </div>
          </div>
        </p>
    
        <p>
          <input type="submit" value="Submit">
        </p>
    
      </form>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: [],
        }
    },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
                this.errors = [];
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommend required.")
            }
        }

    }

})

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
                        :style="{ backgroundColor: variant.variantColor }"
                        @mouseover="updateProduct(index)"
                        @dragstart="drag($event, index)"
                        draggable="true"
                >
                </div>
            </div>
            <div style="display: flex; gap: 20px; margin-left: 20px; margin-top: 20px">
                <div v-for="size in sizes">
                    <a style="color: black; text-decoration: none" href="#">{{ size }}</a>
                </div>
            </div>
        </div>
        <product-tabs :reviews="reviews" :shipping="shipping" :product-details="productDetails"></product-tabs>
   </div>
 `,
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
            required: true
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
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
                    variantQuantity: 100,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 100,
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            selectedVariant: 0,
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            const variant = this.variants[this.selectedVariant];
            if (variant.variantQuantity > 0) {
                this.$emit('add-to-cart', variant);
                variant.variantQuantity--;
            } else {
                alert(`Sorry, ${variant.variantColor} is out of stock!`);
            }
        },
        delToCart() {
            this.$emit('del-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        drag(event, index) {
            event.dataTransfer.setData("text/plain", index);
        },
        drop(event) {
            event.preventDefault();
            const index = event.dataTransfer.getData("text/plain");
            const variant = this.variants[index];
            if (variant.variantQuantity > 0) {
                this.$emit('add-to-cart', variant);
                alert(`Added ${variant.variantColor} to cart!`);
            } else
                alert(`Sorry, ${variant.variantColor} is out of stock!`);
        },
        allowDrop(event) {
            event.preventDefault();
        }
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
            return this.premium ? "Free" : 2.99;
        },
    },
})

Vue.component('cart', {
    template: `
    <div class="cart" @drop="drop" @dragover="allowDrop">
        <h2>Корзина</h2>
        <ul>
            <li v-for="(item, index) in cart" :key="index">
                {{ item.variantColor }} - {{ item.variantQuantity }}
              <div style="display: flex; gap: 20px; align-items: center">
                <button @click="plass(index)">+</button>
                <button @click="minus(index)" :disabled="item.variantQuantity < 1">-</button>
              </div>
            </li>
        </ul>
    </div>
    `,
    props: {
        cart: {
            type: Array,
            required: true
        }
    },
    methods: {
        drop(event) {
            event.preventDefault();
            const index = event.dataTransfer.getData("text/plain");
            const variant = this.$parent.$children[0].variants[index];
            this.$emit('add-to-cart', variant);
        },
        allowDrop(event) {
            event.preventDefault();
        },
        plass(index) {
            const variantId = this.cart[index].variantId;
            this.$emit('add-to-cart', this.cart[index]);
        },
        minus(index) {
            const variantId = this.cart[index].variantId;
            this.$emit('del-to-cart', variantId);
            if (this.cart[index].variantQuantity > 1) {
                this.cart[index].variantQuantity--;
            } else {
                this.removeFromCart(index);
            }
        },
        removeFromCart(index) {
            const variantId = this.cart[index].variantId;
            this.$emit('del-to-cart', variantId);
            this.cart.splice(index, 1);
        }
    }
});

new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(variant) {
            const existingVariant = this.cart.find(item => item.variantId === variant.variantId);
            if (existingVariant) {
                existingVariant.variantQuantity++;
            } else {
                this.cart.push({...variant, variantQuantity: 1});
            }
        },
        removeFromCart(id) {
            const index = this.cart.findIndex(item => item.variantId === id);
            if (index > -1) {
                this.cart.splice(id, 1);
            }
        }
    },
})