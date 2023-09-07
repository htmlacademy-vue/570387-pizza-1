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
      changeSelectedItem( {
        id: sauce.id,
        itemName: 'sauces',
      })
    ">
      <span>{{sauce.name}}</span>
    </SelectorItem>
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
    ...mapState("Builder", ["sauces"]),
  },
  methods: {
    ...mapActions("Builder", ["changeSelectedItem"]),
  },
  }
</script>