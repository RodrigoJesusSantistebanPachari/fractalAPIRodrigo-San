## API for technical test in FRACTAL
## Author: Rodrigo Santisteban
## Technologies used: React, Spring Boot JAVA, MongoDB

## Pipeline

### Phases:

#### DIAGRAMS
There were diagrams I used to have the basis of the API, including funcionalities, modeling of the DataBase (MongoDB Atlas), views, mockups, etc.

#### ANALYSIS
The tool of SONARQUBE was used to analyze the code and to find some code smells, specially in the backend part.
The Builder Design Pattern was used to build the class of Order, it had to include products.

#### BACKEND PART
The construction of the backend part was made using the framework Spring Boot, including all the necessary deppendencies to get Json files as outputs to connect them with the Frontend part using the necessary endpoints and requests.

### FRONTEND PART
The frontend part was made using React, it allowed to work with components and to have more order when implementing new views. It used the Json files and request to get connected with the backend part.



## To run the program:

-Download or clone the repository

-Import the backend part to your IDE

-Create your .env files using your credencials for MongoDB, create it inside the "resources" directory

-Run the server

-Import the frontend part to your IDE

-Add the node_modules inside the directory of ordersappreact

-Run the program and find it in http://localhost:3000/

-Interact with the API


## Functionalities:

-View All the Orders

-Add New Order

-Delete Order

-Edit Order

-Add products

-Delete products

-View Pending orders

-View Completed orders

-View InProgress orders

-Autocompleted spaces (Total price, date, etc)

