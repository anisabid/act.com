module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");

  return {
    // Application
    "application": _.times(5, function (n) {
      return {
        id: n,
        name: faker.company.bsBuzz()
      }
    }),
    // campaign
    "campaign": _.times(10, function (n) {
      return {
        "id": n,
        "name": "ACT100" + n + " :: " + faker.company.companyName(),
        "userId": faker.random.uuid(),
        "user": faker.helpers.userCard(),
        "date": faker.date.recent(),
        "application": faker.random.array_element([1, 2, 3, 4, 5]),
        "status": faker.random.array_element(['standby', 'progress', 'ok', 'ko']),
        "json": {
          "standby": faker.random.number({max: 50, max: 50, min: 1}),
          "progress": faker.random.number({max: 50, min: 1}),
          "ok": faker.random.number({max: 50, min: 1}),
          "ko": faker.random.number({max: 50, min: 1})
        },
        "requirements": {
          "series": {
            "json": {
              "standby": faker.random.number({max: 50, min: 1}),
              "progress": faker.random.number({max: 50, min: 1}),
              "ok": faker.random.number({max: 50, min: 1}),
              "ko": faker.random.number({max: 50, min: 1})
            }
          },
          "tests": {
            "json": {
              "standby": faker.random.number({max: 50, min: 1}),
              "progress": faker.random.number({max: 50, min: 1}),
              "ok": faker.random.number({max: 50, min: 1}),
              "ko": faker.random.number({max: 50, min: 1})
            }
          }
        },
        "scenarios": {
          "series": {
            "json": {
              "standby": faker.random.number({max: 50, min: 1}),
              "progress": faker.random.number({max: 50, min: 1}),
              "ok": faker.random.number({max: 50, min: 1}),
              "ko": faker.random.number({max: 50, min: 1})
            }
          },
          "tests": {
            "json": {
              "standby": faker.random.number({max: 50, min: 1}),
              "progress": faker.random.number({max: 50, min: 1}),
              "ok": faker.random.number({max: 50, min: 1}),
              "ko": faker.random.number({max: 50, min: 1})
            }
          }
        }
      }
    })

  }
}