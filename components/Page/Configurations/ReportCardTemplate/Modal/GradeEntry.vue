<template>
  <ModalWrapper :title="title" @ok="handleOk($event)">
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
          <select v-model="fieldObj.type" class="form-control">
            <option>Select Entry Type</option>
          </select>
        </ValidationProviderWrapper>
      </div>

      <div class="form-group">
        <ValidationProviderWrapper
          name="Scale"
          :rules="['required']"
          label="Scale"
        >
          <div class="input-group">
            <input
              v-model="fieldObj.scale"
              type="text"
              class="form-control border-right-0"
              placeholder="Enter Entry Scale"
              value="20"
            />
            <span class="input-group-text border-left-0 bg-white">%</span>
          </div>
        </ValidationProviderWrapper>
      </div>

      <div class="form-group">
        <div class="mt-4">
          <div class="border-bottom text-light fs-12 py-1 mb-2">
            Entries to be summed together
          </div>
          <div>
            <div class="row align-items-center mb-3">
              <div class="col-9 col-sm-10">
                <div class="input-group disable-interaction">
                  <input
                    type="text"
                    class="form-control bg-grayish-variant-2 border-right-0"
                    value="Classwork"
                  />
                  <span
                    class="input-group-text border-left-0 bg-grayish-variant-2"
                    >10%</span
                  >
                </div>
              </div>
              <div class="col-3 col-sm-2">
                <div class="pointer text-danger fs-16">
                  <span class="iconify" data-icon="feather:trash-2"></span>
                </div>
              </div>
            </div>
            <div class="row align-items-center mb-3">
              <div class="col-9 col-sm-10">
                <div class="input-group disable-interaction">
                  <input
                    type="text"
                    class="form-control bg-grayish-variant-2 border-right-0"
                    value="Test"
                  />
                  <span
                    class="input-group-text border-left-0 bg-grayish-variant-2"
                    >20%</span
                  >
                </div>
              </div>
              <div class="col-3 col-sm-2">
                <div class="pointer text-danger fs-16">
                  <span class="iconify" data-icon="feather:trash-2"></span>
                </div>
              </div>
            </div>
            <div class="row align-items-center mb-3">
              <div class="col-9 col-sm-10">
                <select class="form-control">
                  <option selected>Select Entry</option>
                  <option v-for="(entry, index) in entries" :key="index">
                    {{ entry.name }}
                  </option>
                </select>
              </div>
              <div class="col-3 col-sm-2">
                <div class="pointer text-primary fs-14">Add</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </ModalWrapper>
</template>

<script>
import AddEditFunction from '~/mixins/AddEditModal'

export default {
  mixins: [AddEditFunction],
  data() {
    return {
      fieldObj: {
        name: '',
        code: '',
        scale: '',
        summed_entries: []
      },
      entries: [
        {
          id: 1,
          name: 'Classwork',
          scale: 10
        },
        {
          id: 2,
          name: 'Test',
          scale: 20
        },
        {
          id: 3,
          name: 'Exam',
          scale: 30
        },
        {
          id: 4,
          name: 'Project',
          scale: 40
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
