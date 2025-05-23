<template>
  <div class="head-img-layout">
    <slot name="header">
      <Header />
    </slot>
    <div class="head-img-container relative w-full h-80">
      <Image v-if="headImgSrc" :src="headImg" image-class="head-img" />
      <slot name="headImgCaption">
        <div class="head-img-caption">
          <h1 class="page-title">
            {{ $t(`views.${$route.name}.title.page`) }}
          </h1>
        </div>
      </slot>
    </div>
    <div class="content" :class="{ 'overflow-hidden': contentOverflowHidden }">
      <slot></slot>
    </div>
    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<script>
import Header from "@/components/sections/Header/index.vue"
import Footer from "@/components/sections/Footer/index.vue"
export default {
  name: "HeadImgLayout",
  components: {
    Header,
    Footer,
  },
  props: {
    headImgSrc: {
      type: String,
      default: null,
    },
    contentOverflowHidden: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    headImg() {
      let relativePath = this.headImgSrc
      if (relativePath.startsWith("@")) {
        relativePath = `..${relativePath.slice(1)}`
      }
      return new URL(relativePath, import.meta.url).href
    },
  },
}
</script>

<style lang="scss" scoped>
.page-title {
  @apply absolute top-1/2 left-[10%] -translate-y-1/2 uppercase text-5xl font-bold italic;
  letter-spacing: 0.3rem;
}
:deep(.head-img) {
  @apply w-full h-full object-cover brightness-[0.65];
}
.head-img-layout {
  @apply min-h-screen grid w-full;
  grid-template-rows: auto auto 1fr auto;
}
// .head-img-layout {
//   @apply min-h-screen flex flex-col;
// }
// .content {
//   @apply grow flex flex-col;
// }
.content {
  @apply min-h-0;
}
</style>
