import { shallowMount } from "@vue/test-utils";
import AppLayoutMain from "@/layouts/AppLayoutMain";

const slots = { default: "content" };

describe("AppLayoutMain", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutMain, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});