<template>
  <div class="app-layout-main">
    <NotificationsContainer />
    <AppLayoutHeader />
    <main class="content">
      <slot />

    </main>
  </div>
</template>

<script>
import NotificationsContainer from "@/common/components/NotificationsContainer";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
export default {
  name: "AppLayoutMain",
  components: {
    NotificationsContainer,
    AppLayoutHeader,
  },
};
</script>