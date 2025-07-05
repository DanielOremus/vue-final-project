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
@import url("@/assets/style/layouts/head_img.scss");
</style>
