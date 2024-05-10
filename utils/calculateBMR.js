const calculate = require('fitness-health-calculations');
function BMR(gender, age, height, weight) {
    let myBmr = calculate.bmr(gender, age, height, weight);
    return myBmr;
};

module.exports = BMR;