import { pullAll,capitalize } from 'lodash';
export default {
    head() {
        const route = this.$route.name.split('-');
        const routeParamsName = Object.keys(this.$route.params);
        const routeNameWithoutsParamId = pullAll(route, routeParamsName);
          routeNameWithoutsParamId.forEach(function(item, index) {
            routeNameWithoutsParamId[index] = capitalize(item);
          })
        return {
            title: "Slate.ng | " + routeNameWithoutsParamId.join(' | '),
        }
    }
}