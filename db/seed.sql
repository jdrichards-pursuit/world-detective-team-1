-- you do not need to seed users
-- you should run 'npm run db:init' to initialize the database
-- start your front and backends
-- instead now you should create users with firebase that will register also to your backend
-- when seeding other fields in other tables and you need the foreign key of user Id, retrieve the userIds from looking on postico or using psql
-- SELECT * from users 
-- manually place the id into your INSERT INTO values

\c global_agent

INSERT INTO users(uid, first_name, last_name, email, dob, photo, created_at)
VALUES
('skZmowShBkPAbWHUYx6It5XdXg73', 'Brenda', 'Soto', 'brendapuello@yahoo.com', '1985-10-14', 'https://res.cloudinary.com/dnqfg86zq/image/upload/t_Fill300x300/v1719864208/vcphjm5eiprxr8hwqcvk.jpg', NOW());

INSERT INTO stats(xp, games_played, questions_correct, questions_wrong, user_id)
VALUES
   (200, 3, 8, 4, 1);
--    (450, 5, 16, 4, 2);

-- INSERT INTO badges(name, image, description, xp_required)
-- VALUES
--     ('Rookie Detective', 'https://i.pinimg.com/originals/df/f8/89/dff8895acae6e7f29d175c9629ecea31.jpg', 'Rookie Investigator badge', 0),
--     ('Junior Investigator badge', 'https://media.istockphoto.com/id/599282176/vector/gold-realistic-police-detective-vector-badge-with-shield.jpg?s=612x612&w=0&k=20&c=LQNuz4gKYVi94yORQ5_K-ZFgRCCOqt6dnPjo6_uSYME=', 'Junior Investigator', 500),
--     ('Gumshoe', 'https://media.gettyimages.com/id/481775549/zh/%E5%90%91%E9%87%8F/cowboy-cameo.jpg?s=612x612&w=0&k=20&c=QqQDKneOPDz8Rmh_XQpiXhFOIizQKubHrliivUBHPRg=', 'Gumshoe badge', 1300),
--     ('Chief Detective', 'https://cdn.imgbin.com/24/13/24/imgbin-police-officer-badge-special-police-police-academy-yellow-shield-ryy4BGDZBi2xePLGFgqHHAiP4.jpg', 'Chief Detective badge', 2800),
--     ('Master Sleuth', 'https://cdn11.bigcommerce.com/s-yumff8kfnk/images/stencil/1280x1280/products/8454/14697/4623WCG-front__03109.1680643153.jpg?c=1', 'Master Sleuth badge', 5000);

INSERT INTO countries(name, image)
VALUES
    ('Bolivia', '🇧🇴'),
    ('China', '🇨🇳'),
    ('Dominican Republic', '🇩🇴'),
    ('Portugal', '🇵🇹'),
    ('Trinidad and Tobago', '🇹🇹');

-- INSERT INTO user_badges(badge_id, user_id)
-- VALUES
--     (1, 1);
--     -- (1, 2);

-- INSERT INTO visited_countries(countries_id, user_id)
-- VALUES
--     (2, 1);
--     -- (5, 2);