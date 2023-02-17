<template>
  <div>
    <div v-if="busy">
      <b-row>
        <b-col cols="12" class="mt-4 ml-3">
          <b-skeleton animation="wave" width="70%"></b-skeleton>
          <b-skeleton animation="wave" width="65%"></b-skeleton>
          <b-skeleton animation="wave" width="60%"></b-skeleton>
        </b-col>
        <b-col cols="12" class="mt-3 ml-3">
          <b-skeleton animation="fade" width="70%"></b-skeleton>
          <b-skeleton animation="fade" width="65%"></b-skeleton>
          <b-skeleton animation="fade" width="60%"></b-skeleton>
        </b-col>

      </b-row>
    </div>
    <div v-else>
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="text-grey text-18 mb-0">Physical Exam</h4>
      </div>

        <br />
        <div class="pt-3" v-if="comments.length > 0">
          <div v-for="(comment, index) in comments" :key="index" class="card text-14 px-3 pt-3 pb-1 mb-2 pt-2 shadow-sm">
            {{ comment.value }}
            <div class="d-flex justify-content-end">
              <p class="text-12 mb-0">
                <span class="text-12 text-capitalize">
                  {{
                    comment.created_by.first_name +
                    " " +
                    comment.created_by.last_name
                  }},
                </span>
                <span class="text-12">
                  {{ comment.created_at }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="p-3 text-center" v-else>
          <div class="text-16 text-grey">
            No physical exam added.
          </div>
          <div class="text-primary my-3">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="30" height="30"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
              <g fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="m8.93 6.588l-2.29.287l-.082.38l.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319c.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246c-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0z" />
              </g>
            </svg>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tag: false,
      isLoading: false,
      busy: false,
      kink: false,
      allow: true,
      step: true,
      exam: "",
      form: {},
    };
  },
  watch: {
    exam() {
      if (this.exam != "") {
        this.allow = false;
      } else {
        this.allow = true;
      }
    },
  },
  props: {
    consultationData: {
      type: Object,
      default: () => { },
    },
    comments: {
      type: Array,
      default: () => [],
    }
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style></style>