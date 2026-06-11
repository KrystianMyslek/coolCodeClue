CREATE TABLE IF NOT EXISTS `library` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    user_id int NOT NULL,
    lang_id int NOT NULL,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	url VARCHAR(255) NOT NULL
);