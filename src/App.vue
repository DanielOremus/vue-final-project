<template>
  <Toast />
  <ConfirmDialog class="confirm-dialog" :draggable="false" />
  <router-view></router-view>
  <!-- <transition name="fade"> -->
  <!-- <component :is="Component" /> -->
  <!-- </transition> -->
</template>

<script>
export default {
  name: "App",
}
</script>

<style lang="scss" scoped>
// .slide-enter-active,
// .slide-leave-active {
//   transition: all 0.75s ease-out;
// }

// .slide-enter-to {
//   position: absolute;
//   right: 0;
// }

// .slide-enter-from {
//   position: absolute;
//   right: -100%;
// }

// .slide-leave-to {
//   position: absolute;
//   left: -100%;
// }

// .slide-leave-from {
//   position: absolute;
//   left: 0;
// }
</style>
