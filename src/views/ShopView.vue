<script>
import { useRouter } from 'vue-router'
import router from "@/router";
import FilterView from "@/views/FilterView.vue";
import { useShopStore } from "@/stores/shop";

export default {
  components: {FilterView},
  data() {
    return {
      shopStore: useShopStore(),
      router: useRouter(),
    }
  },
  created() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    getProducts() {
      fetch('https://fakestoreapi.com/products')
          .then(response => response.json())
          .then(body => {
            this.shopStore.products = body;
            this.shopStore.allProducts = body;
          });
    },
    getCategories() {
      fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(body => {
          this.shopStore.categories = body;
        });
    }
  }
}

</script>

<template>
  <FilterView></FilterView>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 justify-items-center">
    <div
      class="w-56 flex flex-col gap-2"
      v-for="item in shopStore.products"
      v-on:click="router.push('item/' + item.id)"
    >
      <img
        class="product rounded-md bg-beige"
        :src="item.image"
        alt="280 by 320 pixel placeholder"
      />
      <div class="flex justify-between">
        <div>{{ item.title }}</div>
        <div class="font-bold">${{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<style>

.product {
  height: 250px;
}
</style>
