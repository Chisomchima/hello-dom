<template>
  <div>
    <div class="d-flex align-items-center flex-wrap mb-2">
      <div class="mr-2">
        <button
          class="btn btn-light d-flex align-items-center py-2 px-3"
          @click="$emit('download-pdf')"
        >
          <b-icon icon="download" font-scale="0.8" class="mr-2"></b-icon>
          Download
        </button>
      </div>
      <div class="mr-2">
        <button
          class="btn btn-light d-flex align-items-center py-2 px-3"
          data-toggle-visibility="#approval-sidedrawer"
        >
          <b-icon icon="check2-circle" font-scale="0.9" class="mr-2"></b-icon>
          Approval History
        </button>
      </div>
      <div class="mr-2">
        <b-button
          v-b-toggle.comments-right
          class="btn btn-light d-flex align-items-center py-2 px-3"
        >
          <b-icon icon="chat-left" font-scale="0.9" class="mr-2"></b-icon>
          Comments
        </b-button>
        <b-sidebar id="comments-right" no-header right class="below" shadow>
          <template #default="{ hide }">
            <div class="d-flex flex-column h-100">
              <div
                class="bg-grayish-blue px-3 py-3"
                style="box-shadow: 0px 2px 4px rgba(150, 150, 187, 0.12)"
              >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="fs-14 line-height-100p text-dark font-weight-bold">
                    Comments
                  </div>
                  <div class="pointer line-height-0" @click="hide">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4L4 12"
                        stroke="#8F9AA3"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4 4L12 12"
                        stroke="#8F9AA3"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="filters-container-content flex-grow-1 px-0 py-1">
                <div
                  v-for="(section, i) in sections"
                  :key="i"
                  class="border-bottom d-flex py-3 px-3"
                >
                  <div class="mr-3">
                    <img
                      height="36"
                      width="36"
                      class="object-fit-cover rounded-circle"
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                    />
                  </div>
                  <div>
                    <div
                      v-if="section.comments"
                      class="d-flex align-items-center justify-content-between line-height-100p"
                    >
                      <div class="text-dark fs-12">Jamie Jamal</div>
                      <div class="text-light fs-10">5 mins ago</div>
                    </div>
                    <div class="line-height-150p fs-12 mt-1">
                      <span class="text-light">Commented</span>
                      <span class="text-primary">“{{ section.comments }}”</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </b-sidebar>
      </div>
      <div class="mr-2">
        <button
          @click="$emit('edit-lessonplan', $event)"
          class="btn btn-outline-primary bg-white text-primary d-flex align-items-center py-2 px-3"
        >
          <svg
            class="mr-2 text-primary"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 13.333H14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04594 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Edit
        </button>
      </div>
      <div class="mr-2">
        <slot name="delete"></slot>
      </div>
      <div>
        <div class="dropdown">
          <button
            class="btn btn-primary py-2 px-3 dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Request Approval
          </button>
          <!-- <pre>{{ data }}</pre> -->
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
          >
            <a class="dropdown-item" href="#" @click="$bvModal.show('requestapproval')"
              >Request Approval</a
            >
            <a class="dropdown-item" href="#">Approve & Request Approval</a>
            <a class="dropdown-item text-success" href="#">Approve</a>
            <a class="dropdown-item text-danger" href="#">Revert</a>
          </div>
        </div>

        <ModalWrapper id="requestapproval" title="Request Approval">
          <div class="modal-body">
            <div class="mb-2">
              <ValidationProviderWrapper name="Approver" :rules="['required']">
                <v-select
                  class="style-chooser"
                  placeholder="Select Approver"
                  label="name"
                  :options="approvalslist"
                  :reduce="(option) => option.id"
                >
                </v-select>
              </ValidationProviderWrapper>
            </div>
          </div>

          <template #modal-footer>
            <div class="w-100 d-flex justify-content-end">
              <div class="d-flex align-items-center justify-content-end mt-4 mb-2">
                <div class="mr-2">
                  <button class="btn btn-light py-2 px-3" @click="show = false">
                    Cancel
                  </button>
                </div>
                <div>
                  <button class="btn btn-primary py-2 px-3" @click="submitApproval">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </template>
        </ModalWrapper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
    },

    data: {
      type: Object,
    },

    approvals: {
      type: Array,
    },
  },

  data() {
    return {
      approvalslist: this.approvals,
    };
  },

  methods: {
    submitApproval() {
      
    },
  },
};
</script>

<style></style>
