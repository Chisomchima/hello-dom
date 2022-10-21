function check(array) {
    return array.reduce((r, a, i, { [i - 1]: b }) => a.map((v, j) => i
            ? r[j] && b[j] < v
            : true
    ), []);
}


var array = [[1, 2, 3, 2, 1, 1], [2, 4, 4, 3, 2, 2], [5, 5, 5, 5, 4, 4], [6, 6, 7, 6, 5, 5], [4, 7, 6, 8, 7, 6], [4, 9, 6, 7, 8, 9]];

console.log(check(array));

// connect to bitpay nodejs?
var client = new BitPay('MY_192_BIT_HUGE_API_TOKEN'); //192 bit string


//connect to mongodb in python?

mongodb = MongoClient("mongodb://host:port")
db = mongodb["db_name"]
col = db["collection_name"]


// differenceby lodash?












