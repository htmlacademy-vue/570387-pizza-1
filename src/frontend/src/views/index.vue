<template>
  <div>
    <main class="content">
      <router-view />
      <form action="#" method="post">

        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector 
            :dough="doughItems" 
            @changeSelectedItem="changeSelectedItem"
          />
          <BuilderSizeSelector 
            :sizes="sizeItems" 
            @changeSelectedItem="changeSelectedItem"
          />
          
          <BuilderIngredientsSelector 
            :ingredients="ingredientItems" 
            @changeIngredientValue="changeIngredientValue">
            <BuilderSauceSelector 
              :sauces="sauceItems" 
              @changeSelectedItem="changeSelectedItem"
            />
          </BuilderIngredientsSelector>

          <BuilderPizzaView
            v-model="pizzaName"
            :dough="selectedDough.value"
            :sauce="selectedSauce.value"
            :ingredients="selectedIngredients"
            :price="pizzaPrice"
            @addToCart="addToCart"
            @addIngredient="addIngredient"
          />

        </div>

      </form>
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import { MAX_INGREDIENTS_VALUE } from "@/common/const";

import {DoughMap, SizeMap, SauceMap, IngredientMap} from "@/common/const.js";
import {dough,ingredients,sauces,sizes} from "@/static/pizza.json";
import {prepareDetails, prepareIngredients,  getCartItems, setCartItems} from "@/common/utils.js";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue"
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue"
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector.vue"
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue"
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue"

export default {
  name: "Index",
  data() {
    return {
      doughItems : dough.map((item) => prepareDetails(DoughMap, item)),
      sauceItems: sauces.map((item) => prepareDetails(SauceMap, item)),
      ingredientItems:ingredients.map((item) => prepareIngredients(IngredientMap, item)),
      sizeItems: sizes.map((item) => prepareDetails(SizeMap, item)),
      pizzaName: "",
      cartItems: [],
    };
  },
  computed: {
    selectedDough() {
      return this.findSelectedItem(this.doughItems);
    },
    selectedSauce() {
      return this.findSelectedItem(this.sauceItems);
    },
    selectedSize() {
      return this.findSelectedItem(this.sizeItems);
    },
    selectedIngredients() {
      return this.ingredientItems.filter((item) => item.value > 0);
    },
    pizzaPrice() {
      const ingredientsPrices = this.selectedIngredients.map(
        (item) => item.price * item.value
      );
      const ingredientsSum = ingredientsPrices.reduce((a, b) => a + b, 0);
      return (
        (this.selectedDough.price + this.selectedSauce.price + ingredientsSum) *
        this.selectedSize.multiplier
      );
    },
    totalPrice() {
      const pizzaPrices = this.cartItems.map((item) => item.price);
      return pizzaPrices.length ? pizzaPrices.reduce((a, b) => a + b, 0) : 0;
    },
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderSauceSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView
  },
  mounted() {
    this.cartItems = getCartItems();
    this.$emit("updateTotalPrice", this.totalPrice);
  },
  methods:{
    addToCart() {
      const newPizza = {
        dough: this.selectedDough,
        sauce: this.selectedSauce,
        size: this.selectedSize,
        ingredients: this.selectedIngredients,
        name: this.pizzaName,
        price: this.pizzaPrice,
      };
      this.cartItems = [...this.cartItems, newPizza];
      setCartItems(this.cartItems);
      this.$emit("updateTotalPrice", this.totalPrice);
      this.pizzaName = "";
    },
    findSelectedItem(items) {
      return items.find((item) => item.isChecked);
    },
    changeSelectedItem({ newValue, items }) {
      items.find((el) => el.isChecked).isChecked = false;
      items.find((el) => el.value === newValue).isChecked = true;
    },
    changeIngredientValue({ name, value }) {
      this.ingredientItems.find((item) => item.name === name).value = value;
    },
    addIngredient(ingredient) {
      if (ingredient.value !== MAX_INGREDIENTS_VALUE) {
        this.changeIngredientValue({
          name: ingredient.name,
          value: ingredient.value + 1,
        });
      }
    },
  },
  
};
</script>
