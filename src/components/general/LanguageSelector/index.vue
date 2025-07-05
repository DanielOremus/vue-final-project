<template>
  <div class="relative" @mouseleave="changeExpandedStatus(false)">
    <div class="lang-icon-container" @mouseenter="changeExpandedStatus(true)">
      <i class="lang-icon bi bi-translate" />
      <i class="bi bi-chevron-down text-sm" />
    </div>
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
      LocaleController.locale = lang.value
    },
  },
  created() {
    LocaleController.init()
  },
  unmounted() {
    LocaleController.removeListener()
  },
}
</script>

<style lang="css" scoped></style>
