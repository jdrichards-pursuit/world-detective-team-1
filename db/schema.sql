-- db/schema.sql
DROP DATABASE IF EXISTS global_agent;
CREATE DATABASE debug_arena;

\c global_agent;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255),
    email UNIQUE VARCHAR(100),
    username UNIQUE VARCHAR(100) NOT NULL,
    dob DATE,
    photo VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
)

CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    xp INTEGER NOT NULL,
    games_played INTEGER NOT NULL,
    questions_correct INTEGER NOT NULL,
    questions_wrong INTEGER NOT NULL,
    user_id INTEGER NOT NULL
)

CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    image TEXT NOT NULL,
    description VARCHAR(200),
    xp_required INTEGER NOT NULL
)

CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    badge_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
)

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    name VARCHAR(30)
)

CREATE TABLE visited_countries (
   id SERIAL PRIMARY KEY,
   countries_id INTEGER NOT NULL,
   user_id INTEGER NOT NULL
);

