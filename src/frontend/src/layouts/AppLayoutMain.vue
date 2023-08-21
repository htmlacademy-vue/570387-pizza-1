<template>
  <div class="app-layout-main">
    <AppLayoutHeader />
    <main class="content">
      <slot />

    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
};
</script>