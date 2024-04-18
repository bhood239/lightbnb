# LightBnB

A simple Airbnb clone that uses server-side javascript to display the information from queries to web pages using SQL queries. I have implemented the migrations directory, seeds directory, queries directory and the database.js file.
In this project I have used postgresql and javascript to create a database and run all queries made by the user to the database using SQL.

## Project Structure

```
.
├──lightbnb
│   └── LightBnB_WebApp
│   │   ├── db
│   │   │   ├── 1_queries
│   │   │   │   │   ├── 01_user_login.sql
│   │   │   │   │   ├── 02_average_reservation_length.sql
│   │   │   │   │   ├── 03_property_listings_by_city.sql
│   │   │   │   │   ├── 04_most_visited_cities.sql
│   │   │   │   │   └── 05_show_users_reservations.sql
│   │   │   │   ├── json
│   │   │   │   ├── migrations
│   │   │   │   │   └── 01_schema.sql
│   │   │   │   ├── seeds
│   │   │   │   │   ├── 01_seeds.sql
│   │   │   │   │   └── 02_seeds.sql
│   │   │   │   └── database.js
│   │   ├── public
│   │   │   │   ├── javascript
│   │   │   │   │   ├── components 
│   │   │   │   │   │   ├── header.js
│   │   │   │   │   │   ├── login_form.js
│   │   │   │   │   │   ├── new_property_form.js
│   │   │   │   │   │   ├── property_listing.js
│   │   │   │   │   │   ├── property_listings.js
│   │   │   │   │   │   ├── search_form.js
│   │   │   │   │   │   └── signup_form.js
│   │   │   │   │   ├── libraries
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── network.js
│   │   │   │   │   └── views_manager.js
│   │   │   │   ├── styles
│   │   │   │   │   ├── main.css
│   │   │   │   │   └── main.css.map
│   │   │   │   └── index.html
│   │   ├── routes
│   │   │   │   ├── apiRoutes.js
│   │   │   │   └── userRoutes.js
│   │   ├── styles  
│   │   │   │   ├── _forms.scss
│   │   │   │   ├── _header.scss
│   │   │   │   ├── _property-listings.scss
│   │   │   │   └── main.scss
│   │   ├── .gitignore
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── server.js
└── README.md
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It connects to the database using SQL.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.
