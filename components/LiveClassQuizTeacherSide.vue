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
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          fontFamily: 'Museo Sans',
          type: 'column',
        },
        title: {
          align: 'center',
          text: 'The question could be here',
        },
        subtitle: {
          align: 'left',
          text: '',
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          type: 'category',
          labels: {
            // formatter() {
            //   return this.value + ' aaa'
            // },
            style: {
              fontSize: '17px',
              fontFamily: 'Museo Sans',
            },
          },
        },
        yAxis: {
          title: {
            text: 'Total',
          },
          gridLineWidth: 0,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
          },
        },

        // tooltip: {
        //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        //   pointFormat:
        //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
        // },

        series: [
          {
            name: 'Options',
            colorByPoint: true,
            data: [
              //   {
              //     name: 'Chrome',
              //     y: 62.74,
              //   },
              //   {
              //     name: 'Firefox',
              //     y: 10.57,
              //   },
              //   {
              //     name: 'Internet Explorer',
              //     y: 7.23,
              //   },
              //   {
              //     name: 'Safari',
              //     y: 5.58,
              //   },
              //   {
              //     name: 'Edge',
              //     y: 4.02,
              //   },
              //   {
              //     name: 'Opera',
              //     y: 1.92,
              //   },
              //   {
              //     name: 'Other',
              //     y: 7.62,
              //   },
            ],
          },
        ],
      },
    }
  },

  mounted() {
    this.chartOptions.title.text = this.question
    this.options.forEach((option, index) => {
      this.chartOptions.series[0].data.push({
        name: option.option,
        y: 0,
        index,
      })
    })
  },
  methods: {
    updateDataByIndex(index) {
      const updateIndex = this.chartOptions.series[0].data.findIndex(
        (item) => item.index === index
      )
      if (updateIndex > -1) {
        const prevVal = this.chartOptions.series[0].data[updateIndex].y
        this.chartOptions.series[0].data[updateIndex].y = prevVal + 1
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>