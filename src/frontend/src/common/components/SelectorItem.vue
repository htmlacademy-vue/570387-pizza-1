<template>
  <RadioButton
    :class="className"
    :value="value"
    :is-checked="isChecked"
    :input-name="inputName"
    @change="$emit('changeSelectedItem')"
  >
    <slot />
  </RadioButton>
</template>

<script>
import RadioButton from "./RadioButton.vue";
export default {
  name: "SelectorItem",
  components: { RadioButton },

  props: {
    value: {
      type: String,
      required: true,
    },

    isChecked: {
      type: Boolean,
      default: false,
    },

    inputName: {
      type: String,
      required: true,
    },

    className: {
      type: String,
      required: true,
    },
  },
};
</script>