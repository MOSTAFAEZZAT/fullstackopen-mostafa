CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title TEXT(255) NOT NULL,
    author TEXT(255) NOT NULL,
    url TEXT(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('mostafa', 'localhost', 'part13');
INSERT INTO "blogs" ("id","title","author","url","likes") VALUES (DEFAULT,$1,$2,$3,$4) RETURNING "id","title","author","url","likes";

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT(255) NOT NULL UNIQUE,
    name TEXT(255) NOT NULL,
    passwordHash TEXT(255) NOT NULL
);

