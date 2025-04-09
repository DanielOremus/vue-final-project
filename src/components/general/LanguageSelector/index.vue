<template>
  <div class="relative" @mouseleave="changeExpandedStatus(false)">
    <Button
      variant="outlined"
      label="Lang"
      class="h-12"
      @mouseenter="changeExpandedStatus(true)"
    />
    <popover
      v-model="expanded"
      :langs-list="langsList"
      @lang-select="changeLang"
    />
  </div>
</template>

<script>
import localesList from "./settings"
import Popover from "./components/Popover.vue"
import LocaleController from "@/moduleHelpers/i18n"

export default {
  name: "LanguageSelector",
  components: {
    Popover,
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    langsList() {
      return localesList
    },
  },
  methods: {
    changeExpandedStatus(status) {
      this.expanded = status
    },
    changeLang(lang) {
      LocaleController.setLocale(lang.value)
    },
  },
  created() {
    LocaleController.init()
  },
  unmounted() {
    LocaleController.destroy()
  },
}
</script>

<style lang="scss" scoped></style>
