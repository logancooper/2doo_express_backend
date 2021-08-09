CREATE TABLE tasks(
    id serial PRIMARY KEY,
    content text default NULL,
    completed bool default false,
    favorited bool default false,
    has_due_date bool default false,
    date_created TIMESTAMP default NOW(),
    due_date TIMESTAMP
);