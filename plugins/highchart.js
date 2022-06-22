import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import wordCloud from "highcharts/modules/wordcloud";

// if (typeof Highcharts === "object") {
//   stockInit(Highcharts);
// }

wordCloud(Highcharts);
Vue.use(HighchartsVue);