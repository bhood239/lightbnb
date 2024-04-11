INSERT INTO users (name, email, password)
VALUES ('joe bloggs', 'jb@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('martha stewart', 'ms@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('gordon ramsey', 'grams@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, description, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'description', 'rabbit hole', 'thumbnailurl', 'coverurl', 20, 1, 2, 1, 'USA', 'wonderland', 'rabbit hole city', 'CA', '123abc'),
(2, 'description', 'marthas house', 'thumbnailurl', 'coverurl', 50, 2, 3, 2, 'Canada', 'Martha road', 'Vancouver', 'BC', 'V8E111'),
(3, 'description', 'kitchen house', 'thumbnailurl', 'coverurl', 500, 4, 1, 1, 'England', 'Ramsey Street', 'London', 'UK', 'W1');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2025-01-07', 1, 2),
('2019-01-04', '2030-01-02', 2, 3),
('2023-10-01', '3000-09-27', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 2, 2, 5, 'the fish was raw!'),
(2, 1, 1, 3, 'not quite to my taste'),
(1, 3, 3, 5, 'absolutely stupendous!');