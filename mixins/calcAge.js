export default {
   methods: {
    calcAge(e) {
        // **********calc year***********
        let presentDate = new Date().getFullYear();
        let yearOfBirth = e.substring(0, 4);
        let month = new Date().getMonth();
        let monthOfBirth = parseInt(e.substring(5, 7));

        let diff = presentDate - yearOfBirth;
        let x = parseInt(diff);
        if (x === 0) {
            this.year = 0;
            this.month = 0;
        } else {
            this.year = x;
        }

        if (monthOfBirth < month) {
            this.year;
        } else {
            if (this.year === 0) {
                this.year;
            } else {
                this.year--;
            }
        }

        // **************calc month***********
        let tempMonth;
       
        // tempMonth = monthOfBirth - month
        if (presentDate === yearOfBirth) {
            this.patient.age.month = 0;
        } else {
            tempMonth = 12 - monthOfBirth;
        }

        if (monthOfBirth <= month) {
            this.month = month - monthOfBirth;
            // this.patient.age.month + 1;
        } else if (month + 1 === monthOfBirth) {
            this.month = 0;
        } else {
            this.month = tempMonth + month;
            // this.patient.age.month + 1;
        }

        // **************calc day**************
        let day = new Date().getDate();
        let dayOfBirth = e.substring(8, 10);
        // this.patient.age.day = new Date().getDate();

        if (day > dayOfBirth) {
            this.day = day - dayOfBirth;
        } else if (day === dayOfBirth) {
            this.day = 0;
        } else {
            this.day = day;
        }

        // *********************************
    },
   }
}