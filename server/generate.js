module.exports = function () {
    const faker = require("faker");
    const _ = require("lodash");
    return {
        departments: _.times(5, function (n) {
            return {
                id: n,
                name: faker.company.companyName()
            }
        }),
        employees: _.times(10, function (n) {
            return {
                id: n,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                departmentId: _.random(0, 4)
            }
        })
    }
}