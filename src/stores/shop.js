import { defineStore } from "pinia";
import { filter, getFieldByFilter } from "@/utils/filter-argument";

export const useShopStore = defineStore("shop", {
  state: () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favourite = JSON.parse(localStorage.getItem('favourite')) || [];

    return {
      cart,
      favourite,
      sortedBy: filter.default,
      reverseSorted: true,
      products: [],
      allProducts: [],
      categories: [],
    };
  },
  actions: {
    addToFavourite(item) {
      if (!this.favourite.find(product => product.id === item.id)) {
        this.favourite.push(item);
      }
      localStorage.setItem('favourite', JSON.stringify(this.favourite));
    },
    addToCart(item) {
      const existingId = this.cart
        .findIndex((cartItem) => cartItem.id === item.id);

      if (existingId !== -1) {
        this.cart[existingId].quantity += 1;
      } else {
        this.cart.push({
          ...item,
          quantity: 1,
        });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    removeItem(removedItem) {
      this.cart = this.cart.filter((item) => item.id !== removedItem.id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    removeFromFavourite(removedItem) {
      this.favourite = this.favourite.filter((item) => item.id !== removedItem.id);
      localStorage.setItem('favourite', JSON.stringify(this.favourite));
    },
    showOnlyFavourites() {
      this.products = this.favourite;
    },
    showAll() {
      this.products = this.allProducts;
    },
    showByCategory(event) {
      const category = event.target.value;
      if (category === 'select category') {
        this.showAll();
        return;
      }
      this.products = this.allProducts.filter(product => product.category === category);
    },
    sortBy(filter) {
      const field = getFieldByFilter(filter);
      this.products.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
      if (!this.reverseSorted) {
        this.products.reverse();
      }
      this.reverseSorted = !this.reverseSorted;
    }
  },
});
