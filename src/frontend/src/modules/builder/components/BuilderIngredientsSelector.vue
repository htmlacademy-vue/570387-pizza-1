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
                :value="ingredient.value"
                @changeIngredientValue="
                  $emit('changeIngredientValue', {
                    value: $event,
                    name: ingredient.name,
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
import { MAX_INGREDIENTS_VALUE } from "@/common/const";
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
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    checkIsIngredientDraggable(ingredient) {
      return ingredient.value < MAX_INGREDIENTS_VALUE;
    },
  },
};
</script>