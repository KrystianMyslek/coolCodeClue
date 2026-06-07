CREATE TABLE IF NOT EXISTS `clue` (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    user_id int NOT NULL,
    lang_id int NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);
