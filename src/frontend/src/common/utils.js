export const prepareDetails = (map, item) => {
  return {
    ...item,
    value: map[item.name],
    isChecked: item.id === 1,
  };
};

export const prepareIngredients = (list, item) => {
  return {
    ...item,
    englishName: list[item.name],
    value: 0,
  };
};

export const getCartItems = () => {
  const items = localStorage.getItem("items");
  if (items) {
    return JSON.parse(items);
  }
  return [];
};

export const setCartItems = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};