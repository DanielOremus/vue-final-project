<template>
  <div class="relative">
    <Button
      type="button"
      variant="outlined"
      label="Lang"
      class="h-12"
      @mouseenter="changeExpandedStatus(true)"
    />
    <popover
      v-model="expanded"
      :langs-list="langsList"
      @mouseleave="changeExpandedStatus(false)"
    />
  </div>
</template>

<script>
import localesList from "./settings"
import Popover from "./components/Popover.vue"

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
  },
}
</script>

<style lang="scss" scoped></style>
