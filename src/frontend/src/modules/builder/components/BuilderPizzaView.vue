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
            <div
              v-for="ingredients in selectedIngredients"
              :key="ingredients.name"
            >
            <div
              v-for="i in ingredients.quantity"
              :key="i"
              :class="`pizza__filling 
                       pizza__filling--${quantityIngridientsClassName(i)} 
                       pizza__filling--${ingredients.englishName}`"
            >
            </div>
              <!-- <div
                class="pizza__filling"
                :class="`pizza__filling--${ingredient.englishName}`"
              ></div>
              <div
                v-if="ingredient.quantity >= 2"
                class="pizza__filling pizza__filling--second"
                :class="`pizza__filling--${ingredient.englishName}`"
              ></div>
              <div
                v-if="ingredient.quantity === 3"
                class="pizza__filling pizza__filling--third"
                :class="`pizza__filling--${ingredient.englishName}`"
              ></div> -->
            </div>
          </div>
        </div>
      </div>
    </AppDrop>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import { MAX_INGREDIENTS_VALUE, QuantityIngridientsClassMap } from "@/common/const";
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
      return QuantityIngridientsClassMap[number]
    }
  },
};
</script>

<style lang="scss" scoped></style>