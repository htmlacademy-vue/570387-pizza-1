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


export const prepareAdditionalItems = (item) => {
  return {
    ...item,
    value: 0,
  };
};

export const getCartItems = (keyName) => {
  const items = localStorage.getItem(keyName);
  if (items) {
    return JSON.parse(items);
  }
  return [];
};

export const setCartItems = (keyName, items) => {
  localStorage.setItem(keyName, JSON.stringify(items));
};


export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const findSelectedItem = (items) => {
  return items.find((item) => item.isChecked);
};

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};