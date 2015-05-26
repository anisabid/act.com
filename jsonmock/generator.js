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
    }),
    // campaignTree
    "campaignTree": [
      {
        "id": 1,
        "title": "node1 20",
        "status": "1",
        "nodes": [
          {
            "id": 11,
            "title": "node1.1",
            "status": "2",
            "nodes": [
              {
                "id": 111,
                "title": "node1.1.1",
                "status": "2",
                "nodes": []
              }
            ]
          },
          {
            "id": 12,
            "title": "node1.2",
            "status": "0",
            "nodes": []
          }
        ]
      },
      {
        "id": 2,
        "title": "node2",
        "status": "2",
        "nodes": [
          {
            "id": 21,
            "title": "node2.1",
            "status": "2",
            "nodes": []
          },
          {
            "id": 22,
            "title": "node2.2",
            "status": "3",
            "nodes": []
          }
        ]
      },
      {
        "id": 3,
        "title": "node3",
        "status": "0",
        "nodes": [
          {
            "id": 31,
            "title": "node3.1",
            "status": "0",
            "nodes": []
          }
        ]
      }
    ],

    "test": _.times(20, function (n) {
      var begin = 200;
      function getId(n){
        return begin + n;
      }
      return {
        "id": getId(n),
        "title": "node-"+getId(n),
        "status": 0,
        "description": faker.lorem.paragraph() ,
        "nodes": []
      }
    })

  }
}