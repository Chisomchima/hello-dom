<template>
  <ModalWrapper title="Topic" @show="$fetch()">
    <!-- <pre>{{ topics }}</pre> -->
    <TreeTable :value="topics">
      <Column field="name" header="Name" :expander="true"></Column>
      <Column field="sequence" header="Sequence"></Column>
      <Column field="objectives" header="Objectives"></Column>
    </TreeTable>
  </ModalWrapper>
</template>

<script>
import TreeTable from 'primevue/treetable'
import Column from 'primevue/column'

export default {
  components: {
    TreeTable,
    Column
  },

  props: {
    // subject: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      topics: []
    }
  },
  async fetch() {
    const { data } = await this.$axios.$get(
      `schools/v2/class_subject/${this.$route.params.subject}/topics/`
    )
    this.topics = data.topics
  }
}
</script>

<style lang="scss" scoped></style>
