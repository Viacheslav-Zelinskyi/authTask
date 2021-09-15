CREATE TABLE users (
    key SERIAL PRIMARY KEY ,
    social_id TEXT,
    name TEXT,
    social_network CHAR(30),
    firstLogIn CHAR(30),
    lastLogIn CHAR(30),
    status CHAR(30)
)
