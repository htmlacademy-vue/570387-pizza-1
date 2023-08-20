<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <SelectorItem
          v-for="doughType in dough"
          :value="doughType.value"
          :key="doughType.id"
          :isChecked="doughType.isChecked"
          :inputName="'dought'"
          :className="'dough__input dough__input--' + doughType.value"
          @changeSelectedItem="
            changeSelectedItem({
              newValue: $event.target.value,
              itemName: 'dough',
            })
          "
        >
          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </SelectorItem>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderDoughSelector",
  components: { SelectorItem },
  computed: {
    ...mapState("Builder", ["dough"]),
  },
  methods: {
    ...mapActions("Builder", ["changeSelectedItem"]),
  },
};
</script>

<style lang="scss" scoped></style>