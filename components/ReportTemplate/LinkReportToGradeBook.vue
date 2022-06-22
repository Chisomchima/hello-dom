<template>
  <div>
    <UtilsFilterComponent
      disable-visualization
      @search-input="pageChange(1, $event)"
    >
      <template #besideFilterButton>
        <BaseButton class="btn-primary" @click="$bvModal.show('report-modal')"
          >Link To Report Card</BaseButton
        >
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :pages="pages"
          :items="templates"
          :busy="false"
          @delete="onDelete($event)"
        >
        </TableComponent>
      </template>
    </UtilsFilterComponent>

    <ModalWrapper
      :id="'report-modal'"
      not-scrollable
      title="Link To ReportCard Template"
      @show="getClassTemplate()"
      @ok="handleOk($event)"
    >
      <ValidationObserver ref="form">
        <form>
          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Report Card Template'"
              :rules="['required']"
            >
              <VSelect
                v-model="reportLink.template_id"
                :options="reportTemplates"
                :reduce="(option) => option.template_id"
                label="name"
              />
            </ValidationProviderWrapper>
          </div>
          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Report Card Columns'"
              :rules="['required']"
            >
              <VSelect
                v-model="reportLink.column_id"
                :options="templateColumns"
                :reduce="(option) => option.column_id"
                label="name"
                :loading="loading"
              />
            </ValidationProviderWrapper>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
// import { DateTime } from 'luxon'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
import modalMsgBox from '@/mixins/modalMsgBox'

export default {
  mixins: [TableFunc, modalMsgBox],
  props: {
    templates: {
      type: Array,
      required: true,
      default: () => [],
    },
    classId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'template_name',
        },
        {
          key: 'column_name',
        },
        {
          key: 'actions',
        },
        // {
        //   key: 'date_created',
        //   formatter: (value) => {
        //     return DateTime.fromSQL(value).toFormat('DDD')
        //   },
        // },
      ],
      reportTemplates: [],
      templateColumns: [],
      reportLink: {
        template_id: '',
        column_id: '',
        percentage_total: '40',
      },
      loading:false
    }
  },
  watch: {
    'reportLink.template_id'(val) {
      this.reportLink.column_id = ''
      this.getTemplateColumns(val)
    },
  },
  async mounted() {
    // await this.pageChange(1)
  },
  methods: {
    // async pageChange(page = 1, search = '') {
    //   try {
    //     this.busy = true
    //     const data = await this.$axios.$get(
    //       `schools/v2/class/${this.$route.params.class}/report_card/batch?page=${page}&search=${search}&param=all`
    //     )
    //     this.items = data.data
    //     this.pages = data.pages
    //     this.busy = false
    //   } catch (error) {
    //     console.log(error)
    //     this.busy = false
    //   }
    // },

    async getTemplateColumns(templateId) {
      try {
         this.loading = true
        const { data } = await this.$axios.$get(
          `/schools/v2/class/subject/${this.$route.params.subject}/template/${templateId}/available`
        )
        this.templateColumns = data
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },

    async getClassTemplate() {
      try {
        const { data } = await this.$axios.$get(
          `slate-admin/class/${this.classId}/card_templates/`
        )
        this.reportTemplates = data
      } catch (error) {
        console.log(error)
      }
    },
    async handleOk(e) {
      try {
        e.preventDefault()
        await this.$axios.post(
          `./schools/v2/class/subject/${this.$route.params.subject}/entry/${this.$route.params.grade_book}/link/`,
          {
            data: [this.reportLink],
          }
        )

        this.$refs.form.reset()
        this.$bvModal.hide('report-modal')
        this.reportLink.column_id = ''
        this.$emit('refresh')
      } catch (error) {
        console.log(error)
        this.reportLink.column_id = ''
      }
    },

    onDelete(item) {
      try {
        this.$axios.$post(
          `/schools/v2/class/subject/${this.$route.params.subject}/entry/${this.$route.params.grade_book}/unlink/`,
          item
        )
        this.$emit('refresh')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
