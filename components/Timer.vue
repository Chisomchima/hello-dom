<template>
  <div ref="timer">
    <!-- Hours
    <span data-hours></span><br /> -->

    <span data-minutes></span>
    <span>:</span>
    <span data-seconds></span>
  </div>
</template>
<script>
import { DateTime } from 'luxon'
import timezz from 'timezz'

export default {
  props: {
    minutes: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  data() {
    return {
      instance: null,
    }
  },
  mounted() {
    const now = DateTime.now()
    console.log(this.minutes)
    const timeString = now
      .plus({ minutes: this.minutes })
      .toFormat('yyyy-MM-dd HH:mm:ss')

    console.log('TIME STRING ISSS', timeString)
    this.instance = timezz(this.$refs.timer, {
      date: timeString,
      //   date: '2022-05-26 17:30:00',
    })
    console.log(this.instance)
    this.instance.update = (event) => {
      if (event.isTimeOver) {
        this.$emit('timeover')
      }
    }
  },
}
</script>
<style lang="scss" scoped>
</style>