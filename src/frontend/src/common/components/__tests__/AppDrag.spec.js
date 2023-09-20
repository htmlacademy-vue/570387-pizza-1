import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag ", () => {
  const slots = { default: "content" };
  const propsData = {
    transferData: {
      id: 8,
      name: "Пармезан",
      image: "/public/img/filling/parmesan.svg",
      price: 33,
      value: "parmesan",
      quantity: 0,
    },
    isDraggable: true,
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ slots, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });
});