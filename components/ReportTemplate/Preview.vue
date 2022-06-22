<template>
  <div>
    <div class="text-right">
      <button class="btn btn-outline-primary border-gray py-2 px-3">
        <span class="iconify fs-16" data-icon="fluent:add-24-filled"></span> Add Sample
        Data
      </button>
      <button
        class="btn btn-borderless-primary py-2 px-3"
        @click="$bvModal.show('modal')"
      >
        Edit Layout Configuration
      </button>
    </div>

    <div
      class="d-flex align-items-center justify-content-center bg-size-contain mt-5 background-image"
    >
      <button
        class="btn btn-outline-primary border-gray py-2 px-3"
        @click="downloadPreview()"
      >
        <span class="iconify fs-18" data-icon="ic:outline-file-download"></span>
        Download Data
      </button>
    </div>

    <ModalWrapper title="Add Sample Data" @ok="handleOK">
      <ValidationObserver ref="form">
        <form @submit.stop.prevent="handleSubmit">
          <ValidationProviderWrapper :name="'Enter Template'" :rules="['required']">
            <textarea
              v-model="sample.template_html"
              class="form-control"
              cols="60"
              rows="10"
            >
            </textarea>
          </ValidationProviderWrapper>
          <div class="row">
            <div class="col-12 py-3">
              <label for="form-control-label w-100">Example Data</label>
            </div>

            <div class="col-12">
              <pre>{{ sampleDataExample }}</pre>
            </div>
          </div>

          <ValidationProviderWrapper :name="'Enter sample data'" :rules="['required']">
            <textarea
              v-model="sample.dummy_data"
              class="form-control"
              cols="60"
              rows="10"
            >
            </textarea>
          </ValidationProviderWrapper>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
export default {
  props: {
    template: {
      type: String,
      default: "",
      required: false,
    },
    dummyData: {
      type: [String, Array, Object],
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      sample: {
        template_html: "",
        dummy_data: [],
      },
      sampleDataExample: {
        school_name: "Slate Internation School",
        subjects: [
          {
            name: "English Language",
            score: "12",
          },
          {
            name: "English Language",
            score: "12",
          },
          {
            name: "English Language",
            score: "22",
          },
        ],
      },
    };
  },
  mounted() {
    this.sample.template_html = this.template;
    this.sample.dummy_data = this.dummyData;
  },
  methods: {
    getData() {
      console.log("get data");
    },
    handleOK(e) {
      e.preventDefault();
      this.handleSubmit();
    },
    async handleSubmit() {
      try {
        await this.$axios.$post(
          `./slate-admin/card_template/${this.$route.params.template}/preview/`,
          this.sample
        );
        this.$emit('refresh');
        this.$bvModal.hide("modal");
      } catch (error) {
        console.log(error);
      }
    },
    downloadPreview() {
      window.open(
        `${process.env.BASE_URL}/slate-admin/card_template/${this.$route.params.template}/preview/`
      );
    },
  },
};
</script>

<style scoped>
.background-image {
  background: url("~assets/img/template-preview-bg.svg") center no-repeat;
  height: 352px;
}
</style>
