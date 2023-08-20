<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <slot />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              
              <AppDrop @drop="$emit('drop', ingredient)">
                <AppDrag
                  :transfer-data="ingredient"
                  :isDraggable="checkIsIngredientDraggable(ingredient)"
                >
                  <span :class="'filling filling--' + ingredient.englishName">{{ ingredient.name}}</span>
                </AppDrag>
              </AppDrop>
              <ItemCounter
              class="ingredients__counter"
                :value="ingredient.value"
                :minValue="minIngredientValue"
                :maxValue="maxIngredientValue"
                @changeItemValue="
                  changeIngredientValue( {
                    ...ingredient,
                    value: $event,
                  })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MIN_INGREDIENTS_VALUE, MAX_INGREDIENTS_VALUE } from "@/common/const";
import { mapState, mapActions } from "vuex";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import ItemCounter from "@/common/components/ItemCounter";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    AppDrag,
    AppDrop
  },
  computed: {
    ...mapState("Builder", ["ingredients"]),
    minIngredientValue() {
      return MIN_INGREDIENTS_VALUE;
    },
    maxIngredientValue() {
      return MAX_INGREDIENTS_VALUE;
    },
  },
  methods: {
    ...mapActions("Builder", ["changeIngredientValue"]),
    checkIsIngredientDraggable(ingredient) {
      return ingredient.value < this.maxIngredientValue;
    },
  },
};
</script>