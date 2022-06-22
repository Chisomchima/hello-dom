<template>
  <div>
    <div class="mt-4 class-details-card border-0 bg-transparent">
      <ReportTemplateClassHeader :data="fields" />

      <UtilsFilterComponent disable-visualization>
        
      </UtilsFilterComponent>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Object,
      required: true,
    },
  },
  methods: {
    log() {
      console.log('hello')
    },
  },
}
</script>

<style lang="scss" scoped></style>
