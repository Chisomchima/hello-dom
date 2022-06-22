<template>
  <div class="row bg-light rounded text-nowrap ml-1 p-2 mb-2">
    <div class="width45 col-lg-4 col-6">
      <div class="fontlongdiv">Comprehensive Comprehension</div>
      <div class="fontlongdiv">Writing Comprehension</div>
    </div>
    <div class="width20 col-lg-3 col-4">
      <div class="fontlongdiv">SUBMISSIONS</div>
      <div class="fontlongdiv">1/3</div>
    </div>
    <div class="width17 col-lg-2 col-6">
      <div class="fontlongdiv">SUBJECT</div>
      <div class="fontlongdiv">French</div>
    </div>
    <div class="width17 col-lg-2 col-6">
      <div class="fontlongdiv">DUE DATE</div>
      <div class="fontlongdiv">{{ data.time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,

      default() {
        return { time: 'August' }
      },
    },
  },
}
</script>

<style>
.width45 {
  width: 45%;
}
.width20 {
  width: 20%;
}
.width17 {
  width: 17%;
}

.fontlongdiv {
  font-size: 12px;
}

@media screen and (max-width: 996px) {
  .width45 {
    width: 50%;
  }
  .width20 {
    width: 15%;
    margin-right: 30px;
  }
}
</style>
