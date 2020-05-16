CREATE DATABASE todo_js_api DEFAULT CHARACTER SET utf8 DEAFULT COLLATE utf8_general_ci;

CREATE TABLE tasks (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	description VARCHAR(255) NOT NULL,
	completed TINYINT(1) NOT NULL DEAFULT 0,
	created DATETIME NOT NULL DEFAULT NOW(),
	last_updated DATETIME NOT NULL DEFAULT NOW()
)
