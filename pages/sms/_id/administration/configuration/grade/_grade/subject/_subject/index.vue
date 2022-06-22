<template>
  <div>
    <!-- <BackwardNavigation
      text="Grade"
      link-name="sms-id-administration-configuration-grade"
    /> -->

    <UtilsHeaderCardWithColor
      enable-image
      :color="data.icon_data.icon_font_color"
      :img-src="data.icon_data.icon"
      :img-src-base64="
        'data:image/svg+xml;base64,' + data.icon_data.icon_base_64
      "
      :bg-color="data.icon_data.icon_bg_color"
      :title="data.name"
      :data="data"
      :display-key="['grade', 'code', 'category_name', 'sequence']"
      @edit="onEdit(data)"
      @delete="onDelete(data)"
    ></UtilsHeaderCardWithColor>

    <!-- <template #besideFilterButton>
        <BaseButton
          ref="btnShow"
          @click="$root.$emit('bv::show::modal', 'add-topic', '#btnShow')"
          >Create Topic</BaseButton
        >
      </template> -->
    <UtilsBaseCardTab>
      <UtilsCardTab title="Scheme Of Work">
        <new-scheme-of-work
          page="admin"
          @refresh="refreshPage"
          :data="data.scheme_of_work"
        />
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <!-- <PageConfigurationsSubjectCreateTopic ref="modal" @refresh="getTopics" /> -->
  </div>
</template>

<script>
import modalMsgBox from '~/mixins/modalMsgBox'
export default {
  mixins: [modalMsgBox],
  async asyncData({ route, $axios, error }) {
    // error({ statusCode: 401, message: 'Errror Guy' })

    try {
      const { data } = await $axios.$get(
        `./slate-admin/subject/${route.params.subject}`
      )
      return { data }
    } catch (e) {
      error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  data() {
    return {
      treeData: {
        name: 'My Tree',
        children: [
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              {
                name: 'child folder',
                children: [{ name: 'hello' }, { name: 'wat' }],
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child folder',
                children: [{ name: 'hello' }, { name: 'wat' }],
              },
            ],
          },
        ],
      },
      mapTree: {},
    }
  },
  async mounted() {
    await this.getTopics()
  },

  methods: {
    async refreshPage() {
      await this.$nuxt.refresh()
    },
    async getTopics() {
      const { data } = await this.$axios.$get(
        `./slate-admin/subject/${this.$route.params.subject}/topics/sub/`
      )
      const mapToTree = data.topics.map((item) => {
        return {
          name: item.name,
          children: item.sub_topics,
        }
      })

      this.mapTree = {
        name: 'Scheme of Work',
        children: mapToTree,
      }
    },
    onEdit(data) {
      this.$router.push({
        name: 'sms-id-administration-configuration-grade-grade-subject-subject-edit',
        params: {
          subject: data.id,
          // grade: this.$route.params.grade }
        },
      })
    },
    async onDelete(data) {
      const result = await this.showDeleteMessageBox()
      if (result) {
        try {
          await this.$axios.$delete(`slate-admin/subject/${data.id}/`)
          this.$router.push({
            name: 'sms-id-administration-configuration-grade',
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
