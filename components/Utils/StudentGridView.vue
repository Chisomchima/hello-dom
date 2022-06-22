<template>
  <div class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4">
    <div class="classes-list-card px-4">
      <div class="dropdown">
        <button
          v-if="hambugmenu"
          id="dropdownMenuButton"
          class="btn btn-sm"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span
            class="iconify"
            data-inline="false"
            data-icon="bi:three-dots-vertical"
          ></span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <a class="dropdown-item" href="#">View Profile</a>
          <a class="dropdown-item" href="#">Push Communication</a>
          <a class="dropdown-item" @click="$emit('capture', others)"
            >Capture Image</a
          >
          <a class="dropdown-item" @click="$emit('upload', others)"
            >Upload Image</a
          >
        </div>
      </div>

      <div class="user-image text-center mb-3">
        <template v-if="image === null">
          <img
            v-if="data.gender === 'male'"
            class="mx-auto"
            src="~/assets/img/male-young.jpeg"
          />
          <img v-else class="mx-auto" src="~/assets/img/female-young.jpeg" />
        </template>

        <img v-else class="mx-auto" :src="image" />
      </div>

      <div class="subtitle-text mb-2 text-capitalize">
        {{ data.first_name }} {{ data.last_name }}
      </div>

      <div v-if="data.house" class="text-center mb-3">
        <span
          class="badge"
          :style="{
            color: data.house_color,
            borderColor: data.house_color,
          }"
          >{{ data.house }}</span
        >
      </div>

      <div class="text-center mt-3">
        <button
          class="btn btn-light"
          @click="$emit('message', data.admission_id)"
        >
          <div class="d-flex align-items-center">
            <div class="mr-1">
              <span
                class="iconify"
                data-inline="false"
                data-icon="fluent:mail-16-regular"
                style="font-size: 20px"
              ></span>
            </div>
            <div>Message</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    others: {
      type: Object,
      required: false,
      default: () => {},
    },
    hambugmenu: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
