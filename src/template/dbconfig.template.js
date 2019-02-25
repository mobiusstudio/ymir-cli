/* eslint-disable operator-linebreak */
export const template = {}

template.schema =
`{
  "patchPath": "database/scripts",
  "database": {
    "postgres": {
      "#projectName#": {
        "db": "#dbName#",
        "host": "localhost",
        "port": 5432,
        "credentials": {
          "username": "postgres",
          "password": "postgres"
        },
        "default": true
      },
      "postgres": {
        "db": "postgres",
        "host": "localhost",
        "port": 5432,
        "credentials": {
          "username": "postgres",
          "password": "postgres"
        }
      }
    }
  }
}
`
