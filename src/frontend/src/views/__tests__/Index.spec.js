
import { shallowMount } from "@vue/test-utils";
import Index from "@/views/Index";

describe("IndexView", () => {
  const stubs = ["router-view"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});