import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setIngredients } from "@/store/mocks";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setIngredients(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders ingredient name for ingredient item", () => {
    createComponent({ localVue, store });
    const ingredientItem = wrapper.find('[data-test="ingredients-item"]');
    expect(ingredientItem.html()).toContain("Грибы");
  });

  it("emits drop event on ingredient drop", async () => {
    createComponent({ localVue, store });
    const ingredientItem = wrapper.find('[data-test="ingredients-item"]');
    const appDropElement = ingredientItem.find('[data-test="app-drop"]');
    await appDropElement.vm.$emit("drop");
    expect(wrapper.emitted().drop).toBeTruthy();
  });

  it("changes ingredient quantity on ingredient counter click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "changeIngredientQuantity");
    const counter = wrapper.find('[data-test="ingredients-counter"]');
    const inputValue = parseInt(counter.find("input").element.value);
    await counter.vm.$emit("changeItemValue", inputValue + 1);
    expect(spyOnAction).toHaveBeenCalled();
  });
});