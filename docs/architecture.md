# Initial architecture

```text
Client
  |
  v
Express routes
  |
  +--> Time service ------> TimeAPI.io
  +--> Currency service --> Frankfurter
  +--> Weather service ---> Open-Meteo
  +--> Network service ---> ipify
  +--> Holiday service ---> Nager.Date
```

## Layers

1. **Routes** define the HTTP contract exposed by our application.
2. **Services** know how to call and normalize one external provider.
3. **HTTP utility** applies common timeout and error behavior.
4. **Configuration** separates deploy-time settings from source code.

## Deliberate distributed-systems behavior

The overview route calls the five services concurrently. It uses isolated results instead of failing the whole request when one dependency is unavailable. This is a first example of partial failure: the ATW server can be healthy while one upstream provider is not.

