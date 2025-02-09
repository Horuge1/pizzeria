## Description
This application is designed to allow users to manage pizzas and their toppings. Users can list, create, update  and delete pizzas and their toppings

### Frontend  
I chose **Angular** for the frontend due to its component-based architecture, which enables reusable UI elements and efficient state management.

### Backend  
The backend was built using **NestJs** to provide a RESTful API for managing pizzas and toppings. This choice ensures scalability and smooth data flow between the frontend and the database.

### Database  
A **PostgreSQL** database was used to store pizzas and toppings, allowing structured and efficient data retrieval. The relational model of **PostgreSQL** helped manage the relationships between pizzas and their respective toppings.

### User Experience & Design  
The UI was designed using the component library **Taiga-UI** to be **minimalistic and user-friendly**, allowing users to create and modify pizzas easily. A **responsive design** approach was taken to ensure usability across different devices.





## Installation

```bash
$ npm run install
```

## .env
```bash
$ cp back/.env.example back/.env
```
Edit the environment variables

```
DB_HOST="localhost"
DB_NAME="name"
DB_USERNAME="postgres"
DB_PASSWORD="postgres"
DB_PORT="5432"
```

## Database

```
cp back/docker-compose.yaml.example back/docker-compose.yaml
```
Edit the docker-compose.yaml file
```yaml
services:
  db:
    image: postgres:16
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./postgres-data:/var/lib/postgresql/data

  #Testing DATABASE
  test-db:
    container_name: test_db
    image: postgres:16
    ports: 
      - "5435:5432" 
    environment:
      POSTGRES_PASSWORD: "postgres"
      POSTGRES_DB: "testdb"
```
Then run the containers
```bash
$ docker compose up -d
```




## Running the app

Run these commands in different terminals
```bash
# backend
$ npm run start:back

# frontend
$ npm run start:front
```

## Tests

```bash
$ npm run test
```