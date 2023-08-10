<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>
    <SelectorItem
    v-for="sauce of sauces"
    :key ="sauce.id"
    :value="sauce.value"
    :isChecked="sauce.isChecked"
    :inputName="'sauce'"
    :className="'radio ingredients__input'"
    @changeSelectedItem="
      $emit('changeSelectedItem', {
        newValue: $event.target.value,
        items: sauces,
      })
    ">
      <span>{{sauce.name}}</span>
    </SelectorItem>
  </div>
</template>

<script>
  import SelectorItem from "@/common/components/SelectorItem";
  export default {
    components: {
      SelectorItem,
    },
    props: {
      sauces: {
        type: Array,
        required: false,
      }
    }
  }
</script>