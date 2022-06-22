import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD' // Uses 'iso' if missing
              },

        }
    },
    computed:{
        school(){
            return  this.$store.getters['school/getSchoolByCode'](this.$route.params.id)
        }
    }
})