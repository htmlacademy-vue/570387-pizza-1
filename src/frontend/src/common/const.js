export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const MIN_INGREDIENTS_VALUE = 0;
export const MAX_INGREDIENTS_VALUE = 3;

export const MIN_CART_ITEM_VALUE = 0;
export const MAX_CART_ITEM_VALUE = Infinity;

export const MESSAGE_LIVE_TIME = 3000;

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const DoughMap = {
  Тонкое: "light",
  Толстое: "large",
};

export const SauceMap = {
  Томатный: "tomato",
  Сливочный: "creamy",
};

export const SizeMap = {
  "23 см": "small",
  "32 см": "normal",
  "45 см": "big",
};

export const IngredientMap = {
  Грибы: "mushrooms",
  Чеддер: "cheddar",
  Салями: "salami",
  Ветчина: "ham",
  Ананас: "ananas",
  Бекон: "bacon",
  Лук: "onion",
  Чили: "chile",
  Халапеньо: "jalapeno",
  Маслины: "olives",
  Томаты: "tomatoes",
  Лосось: "salmon",
  Моцарелла: "mozzarella",
  Пармезан: "parmesan",
  "Блю чиз": "blue_cheese",
};

export const QuantityIngredientsClassMap = {
  1: "",
  2: "second",
  3: "third",
};