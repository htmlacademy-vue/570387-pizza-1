<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        :value="pizzaName"
        @input="setPizzaName($event.target.value)"
      />
    </label>

    <AppDrop @drop="addIngredient($event)">
      <div class="content__constructor">
        <div :class="['pizza', pizzaClassName]">
          <div class="pizza__wrapper">
            <transition-group name="ingredient">
              <div
                v-for="ingredients in selectedIngredients"
                :key="ingredients.name"
              >
                <transition-group name="ingredient-element">
                <div
                  v-for="i in ingredients.quantity"
                  :key="i"
                  :class="`pizza__filling 
                          pizza__filling--${quantityIngridientsClassName(i)} 
                          pizza__filling--${ingredients.englishName}`"
                >
                </div>
                </transition-group>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </AppDrop>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import { MAX_INGREDIENTS_VALUE, QuantityIngredientsClassMap } from "@/common/const";
import { mapState, mapActions, mapGetters } from "vuex";
import AppDrop from "@/common/components/AppDrop";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },

  computed: {
    ...mapState("Builder", ["pizzaName"]),

    ...mapGetters("Builder", [
      "isPizzaDataLoading",
      "selectedDough",
      "selectedSauce",
      "selectedIngredients",
    ]),

    pizzaClassName() {
      if (this.isPizzaDataLoading) {
        return "";
      }

      const dough = this.selectedDough.value === "large" ? "big" : "small";
      const sauce = this.selectedSauce.value;

      return `pizza--foundation--${dough}-${sauce}`;
    },
  },

  methods: {
    ...mapActions("Builder", ["setPizzaName", "changeIngredientQuantity"]),

    addIngredient(ingredient) {
      if (ingredient.quantity !== MAX_INGREDIENTS_VALUE) {
        this.changeIngredientQuantity({
          ...ingredient,
          quantity: ingredient.quantity + 1,
        });
      }
    },

    quantityIngridientsClassName (number) {
      return QuantityIngredientsClassMap[number]
    }
  },
};
</script>

<style lang="scss" scoped>
	.ingredient-enter-active,
  .ingredient-leave-active,
  .ingredient-element-enter-active,
  .ingredient-element-leave-active {
    transition: all 0.5s;
  }

  .ingredient-enter,
  .ingredient-element-enter,
  .ingredient-leave-to,
  .ingredient-element-leave-to {
    opacity: 0;
  }
</style>