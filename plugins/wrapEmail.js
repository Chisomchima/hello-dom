import Vue from 'vue'

export default () => {
  Vue.filter('wrapEmail', function (value) {
    // const count = 20;
        if(value){
          const result2 = value.split(/(.{23})/).filter(O=>O).join('\n')
          return result2


        }
        else{
          return value
        }
    // const result = value.slice(0, count) + (value.length > count ? "..." : "");
  })
  Vue.filter('wrapHouse', function (value) {
    // const count = 20;
        if(value){
          const result2 = value.split(/(.{15})/).filter(O=>O).join('\n')
          return result2


        }
        else{
          return value
        }
    // const result = value.slice(0, count) + (value.length > count ? "..." : "");
  })
}
