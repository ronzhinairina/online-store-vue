<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();
</script>

<template>
  <div>
    <h2 class="text-2xl">Shopping Favourite</h2>

    <div v-if="shop.favourite.length > 0">
      <div>
        <div v-for="item in shop.favourite" :key="item.id" class="py-6 flex gap-4">
          <img class=" cart-product w-32 bg-beige rounded-md" :src="item.image" />
          <div class="flex justify-between w-full">
            <div>
              <div>{{ item.title }}</div>
              <div class="text-sm">${{ item.price }}</div>
            </div>

            <div>
              <XMarkIcon
                  class="w-5 h-5 text-gray-500 hover:text-black cursor-pointer"
                  @click="shop.removeFromFavourite(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="mt-10">
      Nothing here, yet!
    </div>
  </div>
</template>

<style>
.cart-product {
  width: 200px !important;
}
</style>
