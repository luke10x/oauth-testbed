
```
docker-compose run reactapp 'npm install'
```

This will start [the web app](https://0.0.0.0:13000/)
(Notice the https even for local dev, this is required for `window.crypto.subtle` to work)

[Keycloak admin](http://0.0.0.0:28080/admin)

Keycloak is not obvious to configure:

- To export entire realm: Realm Settings -> Action (Top Right) -> Partial export
- To export client: Clients -> [three-dots for each client] -> Export


[How to configure Keycloak container](https://www.keycloak.org/server/containers)
[Spring OAuthh docs](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html)
