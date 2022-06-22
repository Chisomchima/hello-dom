<template>
  <div class="row">
    <div class="col-12">
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
export default {
  props: {
    question: {
      type: String,
      required: true,
      default: '',
    },
  },

  data() {
    return {
      lines: [],
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
  watch: {},
  mounted() {
    this.chartOptions.title.text = this.question
  },
  methods: {
    updateWordCloud(arrayOfWords) {
      for (let index = 0; index < arrayOfWords.length; index++) {
        const element = arrayOfWords[index]
        this.lines.push(element)
      }

      const data = this.lines.reduce((arr, word) => {
        let obj = Highcharts.find(arr, (obj) => obj.name === word)
        if (obj) {
          obj.weight += 1
        } else {
          obj = {
            name: word,
            weight: 1,
          }
          arr.push(obj)
        }
        return arr
      }, [])
      this.chartOptions.series[0].data = data
    },
  },
}
</script>

<style lang="scss" scoped>
</style>