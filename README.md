# Implementing Keycloak Auth

- Most of the oidc auths available for javascript have become deprecated or unusable.
- Here we will be implmenting OIDC with keycloak but in general it works with all providers supporting Open ID Connect.

# Setting up the project

### clone the repository

``` git clone https://github.com/salim-bt/keycloak-starter ```

### Install the dependencies

``` bun install ```
##### OR
``` npm install ```

# Installing a provider of choice if you dont have one setup already

### docker compose file

```jsx
version: '3'

services:
  postgresql:
    image: docker.io/bitnami/postgresql:15
    environment:
      - POSTGRESQL_USERNAME=net_keycloak
      - POSTGRESQL_PASSWORD=keycloak_password
      - POSTGRESQL_DATABASE=bitnami_keycloak
    ports:
      - "5432:5432"
    volumes:
      - postgresql_data:/net/keycloak/postgresql

  keycloak:
    image: docker.io/bitnami/keycloak:23
    environment:
      - KEYCLOAK_CREATE_ADMIN_USER=true
      - KEYCLOAK_ADMIN_USER=admin
      - KEYCLOAK_ADMIN_PASSWORD=admin
      - KEYCLOAK_DATABASE_HOST=postgresql
      - KEYCLOAK_DATABASE_PORT_NUMBER=5432
      - KEYCLOAK_DATABASE_NAME=bitnami_keycloak
      - KEYCLOAK_DATABASE_USER=net_keycloak
      - KEYCLOAK_DATABASE_PASSWORD=keycloak_password
      - KEYCLOAK_DATABASE_EXTERNAL=true
      - KEYCLOAK_LOGLEVEL=DEBUG
      - KEYCLOAK_HTTP_PORT=8080
      - KEYCLOAK_HTTPS_PORT=8081
    depends_on:
      - postgresql
    expose:
      - "8080"
      - "8081"

  nginx:
    image: nginx:1.19.2-alpine
    hostname: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - "8080:8080"
      - keycloak

volumes:
  postgresql_data:
    driver: local 

```

### Run the docker compose file

```
docker compose up -d
```
- After completion of the installation go to keycloak console and create the required realms and clients for the project.

### Setting up the project

- you can use a environment file:
- client_secret: "PmsdRdXjZ0H6Jfef7eGtY39zeU9qjVeu"
- client_id: "hr"
- redirect_uri: "http://localhost:5173"
- authority: "http://localhost:8080/realms/neterp"

#### Add the details in the config

```jsx
const oidcConfig: OidcClientSettings = {
  client_secret: "PmsdRdXjZ0H6Jfef7eGtY39zeU9qjVeu",
  client_id: "hr",
  redirect_uri: "http://localhost:5173",
  authority: "http://localhost:8080/realms/neterp",
};
```

### Thank you and hope you find it useful

