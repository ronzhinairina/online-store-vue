<script setup>
import { useShopStore } from "../stores/shop";
import { filter } from "../utils/filter-argument"

const shop = useShopStore();
</script>

<template>
  <div class="filters">
    <div class="sort">
      <span>Sort by: </span>
      <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
          @click="shop.sortBy(filter.alphabet)"
      >
        <transition mode="out-in">
          alphabet
        </transition>
        <br>
      </button>
      <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
          @click="shop.sortBy(filter.price)"
      >
        <transition mode="out-in">
          <div>price</div>
        </transition>
        <br>
      </button>
    </div>

    <div class="filter">
      <span>Show: </span>
      <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
          @click="shop.showAll()"
      >
        <transition mode="out-in">
          all
        </transition>
        <br>
      </button>
      <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3"
          @click="shop.showOnlyFavourites()"
      >
        <transition mode="out-in">
          favourite
        </transition>
        <br>
      </button>

      <select
          class="bg-white border border-gray-300 rounded px-2 py-1"
          @change="shop.showByCategory($event)"
      >
        <option>select category</option>
        <option v-for="category of shop.categories">
          {{ category }}
        </option>
      </select>
    </div>
  </div>

</template>

<style>
.filters {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}
.sort {
  display: flex;
  gap: 10px;
}
.filter {
  display: flex;
  gap: 10px;
}

@media (max-width: 1024px) {
  .filters {
    flex-direction: column;
  }
}
</style>
