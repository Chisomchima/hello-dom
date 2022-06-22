<template>
  <div>
    <ReportTemplatePage :edit-fields="data" @refresh="$nuxt.refresh()" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios , route}) {
    const {data} = await $axios.$get(
      `/slate-admin/card_template/${route.params.template}/`
    )
    return {
      data,
    }
  },
}
</script>

<style lang="scss" scoped></style>
