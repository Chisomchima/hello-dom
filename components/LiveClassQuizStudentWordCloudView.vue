<template>
  <div class="row" style="height: 60vh">
    <div class="col-12 text-center">
      <!-- <h3 class="text-grey">{{ question }}</h3> -->
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
      default: '',
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        credits: {
          enabled: false,
        },
        accessibility: {
          screenReaderSection: {
            beforeChartFormat:
              '<h5>{chartTitle}</h5>' +
              '<div>{chartSubtitle}</div>' +
              '<div>{chartLongdesc}</div>' +
              '<div>{viewTableButton}</div>',
          },
        },
        series: [
          {
            type: 'wordcloud',
            data: [],
            name: 'Occurrences',
          },
        ],
        title: {
          text: 'Wordcloud of Lorem Ipsum',
        },
      },
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.chartOptions.series[0].data = newVal
      },
      deep: true,
    },
  },
  mounted() {
    this.chartOptions.title.text = this.question
  },
}
</script>

<style lang="scss" scoped>
</style>