<template>
  <ul class="cart-list sheet">
    <li 
      v-for="pizza in pizzaItems" 
      :key="pizza.id" 
      class="cart-list__item"
    >
      <PizzaItem 
        class="cart-list__product" 
        :pizza="pizza" 
      />

      <ItemCounter
        class="cart-list__counter"
        :value="pizza.quantity"
        :is-orange-btn="true"
        :min-value="minPizzaValue"
        :max-value="maxPizzaValue"
        data-test="cart-list-counter"
        @changeItemValue="
          changePizzaQuantity({
            quantity: $event,
            pizza,
          })
        "
      />

      <div class="cart-list__price">
        <b>{{ getPizzaPrice(pizza) }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          data-test="cart-list-edit"
          @click="setPizzaToBuilder(pizza)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { MIN_CART_ITEM_VALUE, MAX_CART_ITEM_VALUE } from "@/common/const";
import { mapActions, mapState } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";
import PizzaItem from "@/common/components/PizzaItem";

export default {
  name: "CartProductList",
  components: { ItemCounter, PizzaItem },

  computed: {
    ...mapState("Cart", ["pizzaItems"]),

    minPizzaValue() {
      return MIN_CART_ITEM_VALUE;
    },

    maxPizzaValue() {
      return MAX_CART_ITEM_VALUE;
    },
  },

  methods: {
    ...mapActions("Cart", ["changeItemQuantity", "deleteItem"]),
    ...mapActions("Builder", ["editPizza"]),

    getPizzaPrice(pizza) {
      return pizza.price * pizza.quantity;
    },

    changePizzaQuantity({ pizza, quantity }) {
      if (quantity === 0) {
        this.deleteItem(pizza.id);
      } else {
        this.changeItemQuantity({ ...pizza, quantity });
      }
    },

    async setPizzaToBuilder(pizza) {
      this.editPizza(pizza);

      await this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>