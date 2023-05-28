<script setup>
import { ShoppingBagIcon, HeartIcon } from "@heroicons/vue/24/outline";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();
</script>

<template>
  <div class="flex justify-between items-center">
    <RouterLink class="text-3xl" to="/">Vue Online Store</RouterLink>

    <RouterLink class="flex gap-2 text-gray-500 hover:text-black" to="/cart">
      <ShoppingBagIcon class="h-6 w-6" />
      <span class="text-black">{{ shop.cart.reduce((count, curr) => count += curr.quantity, 0) }}</span>
    </RouterLink>

    <RouterLink class="flex gap-2 text-gray-500 hover:text-black" to="/favourite">
      <HeartIcon class="h-6 w-6" />
      <span class="text-black">{{ shop.favourite.length }}</span>
    </RouterLink>
  </div>
</template>
