-- SQLite
create table 'videogames_v2' (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title VARCHAR(100) NOT NULL,
genre VARCHAR(40) NOT NULL,
platform VARCHAR(200) NOT NULL,
img VARCHAR(200))