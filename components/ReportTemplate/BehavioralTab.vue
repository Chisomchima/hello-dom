<template>
  <div>
    <UtilsFilterComponent disable-visualization>
      <template #besideFilterButton>
        <BaseButton @click="$bvModal.show('modal')">Add Parameter</BaseButton>
      </template>
      <template #default>
        <TableComponent
          :fields="fields"
          :items="items"
          :busy="busy"
          @edit="editItem($event)"
          @delete="deleteItem($event)"
        />
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
            name="Parameter Name"
            :rules="['required']"
          >
            <input
              v-model="fieldObj.name"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Parameter Name"
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

        <div v-if="fieldObj.type === 'range'" class="mt-4">
          <div class="text-center text-light fs-12 py-1 mb-2">
            Select the maximum and minimum of the range
          </div>
          <div class="d-flex align-items-center mb-3">
            <input
              v-model="fieldObj.range.min"
              type="number"
              class="form-control flex-grow-1"
              placeholder="Minimum"
            />
            <div class="text-center flex-grow-1 mx-3">-</div>
            <input
              v-model="fieldObj.range.max"
              type="number"
              class="form-control flex-grow-1"
              placeholder="Maximum"
            />
          </div>
        </div>

        <div v-if="fieldObj.type === 'options'" class="mt-4">
          <div class="text-light fs-12 py-1 mb-2">Manage Options</div>
          <div>
            <div
              v-for="(option, index) in fieldObj.options"
              :key="index"
              class="row align-items-center mb-2"
            >
              <div class="col-9 col-sm-6">
                <input v-model="fieldObj.options[index]" class="form-control" />
              </div>
              <div class="col-3 col-sm-2 pl-0">
                <div
                  class="pointer text-danger fs-20"
                  @click="removeOption(index)"
                >
                  <span class="iconify" data-icon="ci:off-outline-close"></span>
                </div>
              </div>
            </div>
            <div class="row align-items-center mb-2">
              <div class="col-9 col-sm-6">
                <input v-model="optionInput" class="form-control" />
              </div>
              <div class="col-3 col-sm-2 pl-0">
                <div class="pointer text-primary fs-20" @click="addOption()">
                  <strong class="fs-14">Add</strong>
                  <span class="iconify" data-icon="fluent:add-24-filled"></span>
                </div>
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
  name: 'BehavioralTab',
  mixins: [TableFunc],
  props: {
    editField: {
      type: [Object, Array],
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      modalTitle: 'Add Parameter',
      onEdit: false,
      busy: false,
      onEditIndex: null,
      fields: [
        {
          key: 'name',
        },
        {
          key: 'type',
        },
        {
          key: 'actions',
        },
      ],
      optionInput: '',
      fieldObj: {
        name: '',
        type: '',
        range: {
          min: 0,
          max: 10,
        },
        options: [],
      },
      entries: ['range', 'options'],
    }
  },
  watch: {
    items: {
      handler(newVal) {
        this.$emit('field-input', newVal)
      },
      deep: true,
    },
  },
  mounted() {
    if (this.editField.length > 0) {
      this.items = this.editField
    }
  },
  methods: {
    handleOk(e) {
      e.preventDefault()
      if (this.onEdit) {
        this.items.splice(this.onEditIndex, 1, {...this.fieldObj})
      } else {
        this.items.push({ ...this.fieldObj })
      }
      this.fieldObj = {
        name: '',
        type: '',
        range: {
          min: 0,
          max: 10,
        },
        options: [],
      }
      this.$bvModal.hide('modal')
    },
    async deleteItem(item) {
      if (
        await this.showDeleteMessageBox(
          'Are you sure you want to delete this entry?'
        )
      ) {
        this.items.splice(findIndex(this.items, item), 1)
      }
    },

    addOption() {
      this.fieldObj.options.push(this.optionInput)
      this.optionInput = ''
    },
    removeOption(index) {
      this.fieldObj.options.splice(index, 1)
      this.optionInput = ''
    },

    editItem(item) {
      this.onEdit = true
      this.onEditIndex = findIndex(this.items, item)
      this.modalTitle = 'Edit Parameter Entry'
      this.fieldObj = { ...item }
      this.$bvModal.show('modal')
    },
    resetModal() {
      this.modalTitle = 'Add Parameter Entry'
      this.onEdit = false
      this.onEditIndex = null
      this.fieldObj = {
        name: '',
        type: '',
        range: {
          min: 0,
          max: 10,
        },
        options: [],
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
