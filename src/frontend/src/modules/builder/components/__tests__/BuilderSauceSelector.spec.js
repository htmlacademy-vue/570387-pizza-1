import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, setSauces} from "@/store/mocks";
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSauceSelector", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(BuilderSauceSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    setSauces(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders sauce name for sauce selector", () => {
    createComponent({ localVue, store });
    const sauceSelector = wrapper.find('[data-test="sauce-input"]');
    expect(sauceSelector.html()).toContain("Томатный");
  });

  it("changes selected sauce on sauce selector click", async () => {
    createComponent({ localVue, store });
    const spyOnAction = jest.spyOn(wrapper.vm, "changeSelectedItem");
    const selector = wrapper.find('input[name="sauce"]');
    await selector.trigger("change");
    expect(spyOnAction).toHaveBeenCalledWith({
      id: 1,
      itemName: "sauces",
    });
  });
});