<template>
  <div>
    <UtilsFilterComponent disable-visualization>
      <template #besideFilterButton>
        <BaseButton @click="$bvModal.show('modal')"
          >Add Comment Field</BaseButton
        >
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
          <ValidationProviderWrapper name="Comment Name" :rules="['required']">
            <input
              v-model="fieldObj.name"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Comment Name"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
        <div class="form-group">
          <ValidationProviderWrapper
            name="Character length"
            :rules="['required']"
          >
            <input
              v-model.number="fieldObj.character"
              class="form-control ng-untouched ng-pristine ng-valid"
              placeholder="Minimum number of characters"
              type="number"
            />
          </ValidationProviderWrapper>
        </div>
      </form>
    </ModalWrapper>
  </div>
</template>

<script>
import { findIndex } from 'lodash'
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  name: 'CommentTab',
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
      onEdit: false,
      onEditIndex: null,
      modalTitle: 'Add Comment Field',
      fields: [
        {
          key: 'name',
        },
        {
          key: 'character',
        },
        {
          key: 'actions',
        },
      ],
      // optionInput: '',
      fieldObj: {
        name: '',
        character: '',
      },
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
    if (this.editField.length > 0) {
      this.items = this.editField
    }
  },
  methods: {
    handleOk(e) {
      e.preventDefault()
      if (this.onEdit) {
          this.items.splice(this.onEditIndex, 1, this.fieldObj)
      } else {
        this.items.push({ ...this.fieldObj })
        this.fieldObj = {
          name: '',
          character: '',
        }
      }

      this.$bvModal.hide('modal')
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
        scale: '',
        type: '',
        range: {
          min: 0,
          max: 10,
        },
        options: [],
      }
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

    // addOption() {
    //   this.fieldObj.options.push(this.optionInput)
    //   this.optionInput = ''
    // },
    // removeOption(index) {
    //   this.fieldObj.options.splice(index, 1)
    //   this.optionInput = ''
    // },
  },
}
</script>

<style lang="scss" scoped></style>
