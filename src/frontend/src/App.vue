<template>
  <div id="app">
    <AppLayout>
      <transition name="slide" :appear="isAnimated">
        <router-view />
      </transition>
    </AppLayout>
  </div>
</template>

<script>
import { setAuth } from "@/common/utils";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: { AppLayout },
  computed: {
    isAnimated() {
      return this.$route.name !== "Login";
    },
  },
  
  created() {
    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }
    this.$store.dispatch("init");
  }
};
</script>


<style lang="scss">
@import "~@/assets/scss/app";

.slide-enter-active {
  transition: all 0.6s ease-in;
}
.slide-enter {
  opacity: 0;
  transform: translateX(100%);
}
</style>
