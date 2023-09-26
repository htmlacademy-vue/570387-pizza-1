
import { shallowMount } from "@vue/test-utils";
import IndexPage from "@/views/IndexPage";

describe("IndexPage", () => {
  const stubs = ["router-view"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(IndexPage, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});