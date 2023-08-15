<template>
  <div class="app-layout-main">
    <AppLayoutHeader :price="price" :userData="userData" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
  props: {
    price: {
      type: Number,
      required: true,
    },
    userData: {
      type: Boolean,
      required: true,
    },
  },
};
</script>