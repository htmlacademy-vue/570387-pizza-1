<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isMinusBtnDisabled"
      @click="removeItem"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input 
      :value="actualCounter()" 
      type="text" 
      name="counter" 
      class="counter__input" 
    />
    <button
      type="button"
      :class="[
        'counter__button counter__button--plus',
        isOrangeBtn ? 'counter__button--orange' : '',
      ]"
      :disabled="isPlusBtnDisabled"
      @click="addItem"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  props: {
    value: {
      type: Number,
      required: true,
    },

    minValue: {
      type: Number,
      required: true,
    },

    maxValue: {
      type: Number,
      required: true,
    },

    isOrangeBtn: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({ 
    counter: 0 
  }),

  computed: {
    isMinusBtnDisabled() {
      return this.value === this.minValue;
    },

    isPlusBtnDisabled() {
      return this.value === this.maxValue;
    },
  },

  methods: {
    actualCounter() {
      this.counter = this.value
      return this.counter
    },

    addItem() {
      this.counter++;
      this.$emit("changeItemValue", this.counter);
    },

    removeItem() {
      this.counter--;
      this.$emit("changeItemValue", this.counter);
    },
  },
};
</script>
