<template>
  <div>
    <UtilsFilterComponent disable-visualization>
      <template #besideFilterButton>
        <BaseButton @click="$bvModal.show('modal')">Add Grade Entry</BaseButton>
      </template>
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :fields="fields"
          :items="items"
          :busy="false"
          @edit="editItem($event)"
          @delete="deleteItem($event)"
        />
        <div v-else class="row">
          <div
            v-for="(value, index) in items"
            :key="index"
            class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
          >
            <UtilsGridViewCard
              :data="value"
              :display-key="['name', 'name', 'week_start', 'week_end']"
            ></UtilsGridViewCard>
          </div>
        </div>
      </template>
    </UtilsFilterComponent>

    <!-- <PageConfigurationsReportCardTemplateModalGradeEntry
      title="Add Grade Entry"
    /> -->

    <ModalWrapper
      :title="modalTitle"
      @ok="handleOk($event)"
      @hide="resetModal()"
    >
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <ValidationProviderWrapper
            name="Entry Name"
            :rules="['required']"
            label="Entry Name"
          >
            <input
              v-model="fieldObj.name"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Entry Name"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            name="Entry Type"
            :rules="['required']"
            label="Entry Type"
          >
            <VSelect v-model="fieldObj.type" :options="entries">
              <template #option="{ label }">
                <span class="text-capitalize">{{ label }}</span>
              </template>
            </VSelect>
          </ValidationProviderWrapper>
        </div>

        <div v-if="fieldObj.type != 'comment'" class="form-group">
          <ValidationProviderWrapper
            name="Scale"
            :rules="['required']"
            label="Scale"
          >
            <div class="input-group">
              <input
                v-model="fieldObj.scale_score"
                type="number"
                class="form-control border-right-0"
                placeholder="Enter Entry Scale"
                value="20"
              />
              <span class="input-group-text border-left-0 bg-white">%</span>
            </div>
          </ValidationProviderWrapper>
        </div>

        <div v-if="fieldObj.type === 'total'" class="form-group">
          <div class="mt-4">
            <div class="border-bottom text-light fs-12 py-1 mb-2">
              Entries to be summed together
            </div>
            <div>
              <div
                v-for="(item, index) in fieldObj.element"
                :key="index"
                class="row align-items-center mb-3"
              >
                <div class="col-9 col-sm-10">
                  <div class="input-group">
                    <select
                      v-model="fieldObj.element[index]"
                      class="form-control"
                    >
                      <template v-for="(entry, index2) in items">
                        <option
                          v-if="entry.type != 'total'"
                          :key="index2"
                          :value="{ name: entry.name, column_id: entry.id }"
                        >
                          {{ entry.name }}
                        </option>
                      </template>
                    </select>
                  </div>
                </div>
                <div class="col-3 col-sm-2">
                  <div
                    class="pointer text-danger fs-16"
                    @click="removeItem(index)"
                  >
                    <span class="iconify" data-icon="feather:trash-2"></span>
                  </div>
                </div>
              </div>
              <div
                class="pointer col-12 pt-2 text-primary fs-14"
                @click="addToElements()"
              >
                Add +
              </div>
            </div>
          </div>
        </div>
      </form>
    </ModalWrapper>
  </div>
</template>

<script>
import { findIndex } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  name: 'AcademicsTab',
  mixins: [TableFunc],
  props: {
    editField: {
      type: [Object, Array],
      require: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      modalTitle: 'Add Grade Entry',
      onEdit: false,
      onEditIndex: null,
      fields: [
        {
          key: 'name',
        },
        {
          key: 'scale_score',
        },
        {
          key: 'type',
        },
        {
          key: 'actions',
        },
      ],
      elementSelected: '',
      fieldObj: {
        name: '',
        scale_score: '',
        type: '',
        element: [],
      },
      // entries: [
      //   {
      //     id: 1,
      //     name: 'Classwork',
      //     scale_score: 10,
      //   },
      //   {
      //     id: 2,
      //     name: 'Test',
      //     scale: 20,
      //   },
      //   {
      //     id: 3,
      //     name: 'Exam',
      //     scale: 30,
      //   },
      //   {
      //     id: 4,
      //     name: 'Project',
      //     scale: 40,
      //   },
      // ],
      entries: ['entry', 'comment', 'total'],
    }
  },
  watch: {
    items: {
      handler(newVal) {
        this.$emit('field-input', newVal)
      },
    },
  },
  mounted() {
    if (Object.values(this.editField).length > 0) {
      this.items = this.editField
    }
  },
  methods: {
    handleOk(e) {
      e.preventDefault()
      if (this.onEdit) {
        this.items.splice(this.onEditIndex, 1, this.fieldObj)
        this.modalTitle = 'Add Grade Entry'
      } else {
        this.items.push({ ...this.fieldObj })
      }

      this.fieldObj = {
        name: '',
        scale_score: '',
        type: '',
        element: [],
      }
      this.$bvModal.hide('modal')
    },

    addToElements() {
      this.fieldObj.element.push(this.elementSelected)
    },
    removeItem(index) {
      this.fieldObj.element.splice(index, 1)
      this.elementSelected = ''
    },
    async deleteItem(e) {
      if (
        await this.showDeleteMessageBox(
          'Are you sure you want to delete this entry?'
        )
      ) {
        const index = findIndex(this.items, e)
        this.items.splice(index, 1)
      }
    },

    editItem(e) {
      this.onEdit = true
      this.onEditIndex = findIndex(this.items, e)
      this.fieldObj = this.items[this.onEditIndex]
      this.modalTitle = 'Edit Grade Entry'
      this.$bvModal.show('modal')
    },

    resetModal() {
      this.onEditIndex = null
      this.onEdit = false
      this.fieldObj = {
        name: '',
        scale_score: '',
        type: '',
        element: [],
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
