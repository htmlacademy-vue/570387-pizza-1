<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <SelectorItem
        v-for="size of sizes"
        :key ="size.id"
        :value="size.value"
        :isChecked="size.isChecked"
        :inputName="'diameter'"
        :className="'diameter__input diameter__input--' + size.value"
        @changeSelectedItem="
          $emit('changeSelectedItem', {
            newValue: $event.target.value,
            items: sizes,
          })
        ">
          <span>{{size.name}}</span>
        </SelectorItem>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectorItem from "@/common/components/SelectorItem";
  export default {
    components: {
      SelectorItem,
    },
    props: {
      sizes: {
        type: Array,
        required: true,
      }
    }
  }
</script>