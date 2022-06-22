import { DateTime } from 'luxon';

export default {
    data() {
        return {
            genData: []
        }
    },


    methods: {
        autoGenerateWeek(startDate, endDate) {
            const end = DateTime.fromISO(endDate);
            const start = DateTime.fromISO(startDate);

            const diffInMonths = end.diff(start, 'weeks');
            const { weeks } = diffInMonths.toObject(); //= > { months: 1 }
            const abrvWeeks = Math.floor(weeks);

            let val = start
            const dates = [start.toISODate()];
            // console.log(val);
            for (let index = 0; index < abrvWeeks; index++) {
                val = val.plus({ days: 7 }).toISODate();
                dates.push(val);
                val = DateTime.fromISO(val);
            }

            // console.log(dates);
            const actualDate = []
            dates.forEach((date, index) => {
                // console.log(date);
                const endDate = DateTime.fromISO(date).plus({ days: 6 }).toISODate()
                actualDate.push({ name: `week ${index + 1}`, week_start: date, week_end: endDate });
            })

            // console.log(actualDate);
            this.genData = actualDate;
        },
        async handleSubmitAutoGenWeek() {
            try {
                await this.$axios.$post(
                    `/slate-admin/period/${this.$route.params.academic_period_id}/week/`,
                    {
                        weeks: this.genData
                    }
                )

                await this.pageChange(1);
                this.$nextTick(() => {
                    this.$bvModal.hide('genWeek')
                })
                // this.resetForm()
            } catch (e) {
                console.log(e)
            }
        },
    }
}