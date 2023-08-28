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
          changeSelectedItem({
            newValue: $event.target.value,
            itemName: 'sizes',
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
  import { mapState, mapActions } from "vuex";

  export default {
    components: {
      SelectorItem,
    },
    computed: {
      ...mapState("Builder", ["sizes"]),
    },
    methods: {
      ...mapActions("Builder", ["changeSelectedItem"]),
    },
  }
</script>