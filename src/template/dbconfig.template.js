/* eslint-disable operator-linebreak */
export const template = {}

template.db =
`{
  "patchPath": "./api/database/scripts",
  "database": {
    "postgres": {
      "#projectName#": {
        "db": "#dbname#",
        "host": "#host#",
        "port": #port#,
        "credentials": {
          "username": "#username#",
          "password": "#password#"
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

template.api =
`{
  "name": "app service",
  "locales": "zh-cn",
  "swagger": {
    "host": "127.0.0.1",
    "schemes": ["http"]
  },
  "server": {
    "port": 5123
  },
  "third-party": {},
  "database": "postgresql://#username#:#password#@#host#:#port#/#dbname#",
  "jwtOptions": {
    "expiresIn": "180d"
  },
  "serviceToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2RvIjoi6L-Z5Y-q5piv5Li05pe26Kej5Yaz5pa55qGI77yM5Lul5ZCO6ZyA6KaB5ouG5YiG5a-55YaF5ZKM5a-55aSW55qE5pyN5Yqh77yM5a-55YaF5LiN5L2_55So6K6k6K-B77yM5a-55aSW5omN6ZyA6KaB6K6k6K-BIiwiaWF0IjoxNTQ3NTE3MTI1LCJleHAiOjE1NzkwNTMxMjUsImlzcyI6Ind3dy5tZWluZW5naHVhLmNvbSIsImp0aSI6IjFjNWJmM2NkLTJkMDYtNDcyNi1iM2RjLTMxODRkYzdkOTU0ZiJ9.Zlc6YdUDCC3Cy_EYSHDjRateCPUJ6Gz0vlo5TeylK1s",
  "secret": {
    "jwt": "jd98u3oijmrf9u02p3kemf9q7uyrhfgnm4tuer9vcjkm34ijo",
    "cookie": "1dy-7C6-a4H-eEa",
    "hash": "Fc5-vhT-zG5-7vh"
  }
}
`
