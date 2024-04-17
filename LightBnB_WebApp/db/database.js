const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  let query = "SELECT * FROM users WHERE users.email = $1"

  return pool
    .query(query, [email])
    .then((result) => {
      if (result.rows.length > 0) { // Check if user was found
        return Promise.resolve(result.rows[0]);
      } else {
        return Promise.resolve(null); // Return null if no user found
      }
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err); // Forward the error
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  let query = "SELECT * FROM users WHERE users.id = $1"

  return pool
    .query(query, [id])
    .then((result) => {
      if (result.rows.length > 0) { // Check if user was found
        return Promise.resolve(result.rows[0]);
      } else {
        return Promise.resolve(null); // Return null if no user found
      }
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err); // Forward the error
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  let query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *"
  return pool
    .query(query, [user.name, user.email, user.password])
    .then((result) => {
      if (result.rows.length > 0) { // Check if user was found
        return Promise.resolve(result.rows[0]);
      } else {
        return Promise.resolve(null); // Return null if no user found
      }
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err); // Forward the error
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  let query = `SELECT reservations.id, properties.*, reservations.start_date, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;
  return pool
    .query(
      query,
      [guest_id, limit])
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err); // Forward the error
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {

  const queryParams = [];

  let query = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    query += ` WHERE city LIKE $${queryParams.length}`;
  }
  if (options.owner_id) {
    queryParams.push(`${options.city}`);
    query += ` WHERE owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    let minimumPrice = options.minimum_price_per_night * 100;
    queryParams.push(`${minimumPrice}`);
    query += ` AND cost_per_night >= $${queryParams.length}`;
  }
  if (options.maximum_price_per_night) {
    let maximumPrice = options.maximum_price_per_night * 100;
    queryParams.push(`${maximumPrice}`);
    query += ` AND cost_per_night <= $${queryParams.length}`;
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    query += ` AND average_rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  query += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(query, queryParams)
    .then((result) => {
      return Promise.resolve(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err); // Forward the error
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
