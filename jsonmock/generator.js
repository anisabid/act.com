var faker = require("faker");
var _ = require("lodash");




module.exports = function () {
  //return setInterval(getJson, 2000)

  return getJson();

}

function cb(){
  console.log("x");
}


function getJson(){
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
        "title": "Création d'un ordre simple ACTION Achat avec prix limite",
        "status": "1",
        "nodes": [
          {
            "id": 11,
            "title": "Ordre simple achat",
            "status": "2",
            "nodes": [
              {
                "id": 111,
                "title": "Ouverture de l'application SANTORIN",
                "status": "1",
                "nodes": []
              },
              {
                "id": 112,
                "title": "Création d'un ordre Obligation",
                "status": "3",
                "nodes": []
              }
            ]
          },
          {
            "id": 12,
            "title": "Ordre simple vente",
            "status": "0",
            "nodes": []
          },
          {
            "id": 13,
            "title": "Ordre simple action avec prix limite",
            "status": "0",
            "nodes": []
          },
          {
            "id": 14,
            "title": "Ordre simple action en mode confirmation",
            "status": "0",
            "nodes": []
          },
          {
            "id": 15,
            "title": "Ordre simple avec exécution partielle",
            "status": "0",
            "nodes": []
          },
          {
            "id": 16,
            "title": "Ordre bloc",
            "status": "0",
            "nodes": []
          },
          {
            "id": 17,
            "title": "Ordre bloc avec exec partielle",
            "status": "0",
            "nodes": []
          },
          {
            "id": 17,
            "title": "Bonus capés",
            "status": "0",
            "nodes": []
          }
        ]
      },
      {
        "id": 2,
        "title": "Obligations",
        "status": "2",
        "nodes": [
          {
            "id": 21,
            "title": "1- Ordre simple OBLIGATION - ACHAT",
            "status": "0",
            "nodes": [
              {
                "id": 211,
                "title": "Ouverture de l'application SANTORIN",
                "status": "1",
                "nodes": []
              },
              {
                "id": 212,
                "title": "Création d'un ordre Obligation",
                "status": "3",
                "nodes": []
              }
            ]
          },
          {
            "id": 22,
            "title": "2- Ordre simple OBLIGATION - VENTE",
            "status": "3",
            "nodes": [
              {
                "id": 221,
                "title": "Ouverture de l'application SANTORIN",
                "status": "3",
                "nodes": []
              },
              {
                "id": 222,
                "title": "Création d'un ordre Obligation",
                "status": "3",
                "nodes": []
              }
            ]
          },
          {
            "id": 23,
            "title": "Ordre simple obligation TPA",
            "status": "3",
            "nodes": [
              {
                "id": 231,
                "title": "Ouverture de l'application SANTORIN",
                "status": "3",
                "nodes": []
              },
              {
                "id": 232,
                "title": "Création d'un ordre Obligation TPA",
                "status": "3",
                "nodes": []
              },
              {
                "id": 233,
                "title": "Traitement dans la MCE négo",
                "status": "3",
                "nodes": []
              },
              {
                "id": 234,
                "title": "Traitement dans l'ETC",
                "status": "3",
                "nodes": []
              },
              {
                "id": 235,
                "title": "Vérification dans Santorin",
                "status": "3",
                "nodes": []
              }
            ]
          },
          {
            "id": 24,
            "title": "Ordre simple Obligation avec exécution partielle - Achat",
            "status": "2",
            "nodes": [
              {
                "id": 241,
                "title": "Ouverture de l'application SANTORIN",
                "status": "3",
                "nodes": []
              },
              {
                "id": 242,
                "title": "Création d'un ordre Obligation",
                "status": "3",
                "nodes": []
              }
            ]
          },
          {
            "id": 25,
            "title": "Ordre bloc avec exécution partielle",
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

      function getId (n) {
        return begin + n;
      }

      return {
        "id": getId(n),
        "title": "node-" + getId(n),
        "status": 0,
        "description": faker.lorem.paragraph(),
        "nodes": []
      }
    })

  }
}