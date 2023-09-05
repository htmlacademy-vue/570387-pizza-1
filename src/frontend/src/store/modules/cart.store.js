import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  RESET_CART_STATE,
} from "@/store/mutation-types";
import {
  capitalize,
  prepareAdditionalItems,
  getCartItems,
  setCartItems,
  clearCartItems,
  createUUIDv4,
  getOrderPrice,
} from "@/common/utils";

const module = capitalize("cart");

const initialState = () => ({
  pizzaItems: [],
  additionalItems: [],
});

export default {
  namespaced: true,
  state: initialState(),

  getters: {
    totalPrice(state) {
      return getOrderPrice(state.pizzaItems, state.additionalItems);
    },
  },

  mutations: {
    [RESET_CART_STATE](state) {
      Object.assign(state, initialState());
    },
  },

  actions: {
    resetCartState({ commit }) {
      commit(RESET_CART_STATE);
      clearCartItems("pizzaItems");
      clearCartItems("additionalItems");
    },

    async fetchAdditionalItems({ commit }) {
      const data = await this.$api.misc.query();
      const items = data.map((item) => prepareAdditionalItems(item));

      commit(
        SET_ENTITY,
        {
          module,
          entity: "additionalItems",
          value: items,
        },
        { root: true }
      );
    },

    setCartItemsLS({ commit }) {
      const pizzaItems = getCartItems("pizzaItems");
      const additionalItems = getCartItems("additionalItems");

      if (pizzaItems.length > 0) {
        commit(
          SET_ENTITY,
          {
            module,
            entity: "pizzaItems",
            value: pizzaItems,
          },
          { root: true }
        );
      }

      if (additionalItems.length > 0) {
        commit(
          SET_ENTITY,
          {
            module,
            entity: "additionalItems",
            value: additionalItems,
          },
          { root: true }
        );
      }
    },

    addItem({ state, commit }, pizza) {
      const mutation = pizza.id ? UPDATE_ENTITY : ADD_ENTITY;

      commit(
        mutation,
        {
          module,
          entity: "pizzaItems",
          value: pizza.id ? pizza : { ...pizza, id: createUUIDv4() },
        },
        { root: true }
      );

      setCartItems("pizzaItems", state.pizzaItems);
    },

    changeItemQuantity({ state, commit }, item) {
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity: "pizzaItems",
          value: item,
        },
        { root: true }
      );

      setCartItems("pizzaItems", state.pizzaItems);
    },

    changeAdditionalItemQuantity({ state, commit }, item) {
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity: "additionalItems",
          value: item,
        },
        { root: true }
      );

      setCartItems("additionalItems", state.additionalItems);
    },

    deleteItem({ state, commit }, id) {
      commit(
        DELETE_ENTITY,
        {
          module,
          entity: "pizzaItems",
          id,
        },
        { root: true }
      );

      setCartItems("pizzaItems", state.pizzaItems);
    },
  },
};