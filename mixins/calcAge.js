export default function calcAge(e) {
        let age = {
            year: '',
            month: '',
            day: ''
        }
        // **********calc year***********
        let presentDate = new Date().getFullYear();
        let yearOfBirth = e.substring(0, 4);
        let month = new Date().getMonth();
        let monthOfBirth = parseInt(e.substring(5, 7));

        let diff = presentDate - yearOfBirth;
        let x = parseInt(diff);
        if (x === 0) {
            age.year = 0;
            age.month = 0;
        } else {
            age.year = x;
        }

        if (monthOfBirth < month) {
            age.year;
        } else {
            if (age.year === 0) {
                age.year;
            } else {
                age.year--;
            }
        }

        // **************calc month***********
        let tempMonth;
       
        // tempMonth = monthOfBirth - month
        if (presentDate === yearOfBirth) {
            age.month = 0;
        } else {
            tempMonth = 12 - monthOfBirth;
        }

        if (monthOfBirth <= month) {
            age.month = month - monthOfBirth;
            // this.patient.age.month + 1;
        } else if (month + 1 === monthOfBirth) {
            age.month = 0;
        } else {
            age.month = tempMonth + month;
            // this.patient.age.month + 1;
        }

        // **************calc day**************
        let day = new Date().getDate();
        let dayOfBirth = e.substring(8, 10);
        // this.patient.age.day = new Date().getDate();

        if (day > dayOfBirth) {
            age.day = day - dayOfBirth;
        } else if (day === dayOfBirth) {
            age.day = 0;
        } else {
            age.day = day;
        }

        // *********************************

        return age
}