import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import ItemView from "../views/ItemView.vue";
import CartView from "../views/CartView.vue";
import FavouriteView from "@/views/FavouriteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/item/:id",
      name: "item",
      component: ItemView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/favourite",
      name: "favourite",
      component: FavouriteView,
    }
  ]
})

export default router;
