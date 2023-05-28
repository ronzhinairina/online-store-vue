<script>
// import { useRoute } from "vue-router";
// import { CheckIcon } from "@heroicons/vue/24/outline";
// import { useShopStore } from "../stores/shop";
//
// const route = useRoute();
// const shop = useShopStore();
// const item = shop.forSale.find((item) => item.id === route.params.id);
//
// const addToCart = () => {
//   shop.addToCart(item);
// };
import { useRoute } from "vue-router";
import { CheckIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";

export default {
  data() {
    return {
      shopStore: useShopStore(),
      route: useRoute(),
      product: undefined,
      addedMessageShown: false,
      addedToFavouriteMessageShown: false,
    }
  },
  created() {
    this.addedMessageShown = false;
    this.getProduct()
  },
  methods: {
    getProduct() {
      fetch('https://fakestoreapi.com/products/' + this.route.params.id)
          .then(response => response.json())
          .then(body => this.product = body)
          .then(() => {
            this.addedToFavouriteMessageShown = !!this.shopStore.favourite.find(product => product.id === this.product.id);
          });
    },
    addToCart() {
      if (this.addedMessageShown) return;
      this.shopStore.addToCart(this.product);
      this.addedMessageShown = true;
      const timeoutId = setTimeout(() => {
        this.addedMessageShown = false;
        clearTimeout(timeoutId);
      }, 2000)
    },
    addToFavourite() {
      if (this.addedToFavouriteMessageShown) return;
      this.shopStore.addToFavourite(this.product);
      this.addedToFavouriteMessageShown = true;
    }
  }
}
</script>

<template>
  <div v-if="product" class="flex flex-col md:flex-row gap-6">
    <img class="rounded-xl bg-beige" :src="product.image" />

    <div class="flex flex-col gap-6 md:gap-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold">{{ product.title }}</h2>

        <div class="text-2xl">${{ product.price }}</div>

        <div>{{ product.description }}</div>
      </div>

      <button
        class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
        @click="addToCart"
      >
        <transition mode="out-in">
          <div v-if="addedMessageShown" class="flex gap-2">
            <CheckIcon class="w-6 h-6" />
            Added to cart!
          </div>
          <div v-else>Add to cart</div>
        </transition>
        <br>
      </button>

      <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
          @click="addToFavourite"
      >
        <transition mode="out-in">
          <div v-if="addedToFavouriteMessageShown" class="flex gap-2">
            <CheckIcon class="w-6 h-6" />
            Added to favourite!
          </div>
          <div v-else>Add to favourite</div>
        </transition>
      </button>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.25s;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

img {
  height: 500px;
}
</style>
