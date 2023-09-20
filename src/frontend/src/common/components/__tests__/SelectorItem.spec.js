import { mount } from "@vue/test-utils";
import SelectorItem from "@/common/components/SelectorItem";

describe("SelectorItem", () => {
  const slots = { default: "content" };
  const propsData = {
    value: "testValue",
    isChecked: true,
    inputName: "testName",
    className: "testClass",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(SelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("emits changeSelectedItem event when radio button value changed", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("change");
    expect(wrapper.emitted("changeSelectedItem")).toBeTruthy();
  });
});