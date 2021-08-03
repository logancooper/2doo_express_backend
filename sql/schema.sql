CREATE TABLE tasks(
    id serial PRIMARY KEY,
    content text default NULL,
    favorited bool default false,
    overdue bool default false,
    date_created TIMESTAMP default NOW(),
    due_date TIMESTAMP
);