<template>
  <div class="absolutebanner w-100 bg-white">
    <div class="py-1">
      <div class="d-flex justify-content-center">
        <div class="">
          <h3 class="header-denied text-center text-danger mb-0">
            No Internet Connection
          </h3>
          <div class="text-center textgray mb-0">
            Some parts of this app may be unavailable until you come back online
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.header-denied {
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -1px;
  color: #1070b7;
}

.paragraph-denied {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  color: #797b86;
}

.btn-text {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
}

.textgray {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  color: #797b86;
}

.goback {
  background: #dbeaf4;
  color: #1070b7;
}
.homepage {
  background: #1070b7;
  color: #fff;
}
</style>
