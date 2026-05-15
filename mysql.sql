CREATE DATABASE IF NOT EXISTS campus_notice
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE campus_notice;

CREATE TABLE users (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('admin','user') NOT NULL DEFAULT 'user',
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE posts (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id      INT UNSIGNED NOT NULL,
    content      TEXT NOT NULL,
    type         ENUM('announcement','wall') NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    is_pinned    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    INDEX idx_posts_type (type),
    INDEX idx_posts_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE comments (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id      INT UNSIGNED NOT NULL,
    user_id      INT UNSIGNED NOT NULL,
    parent_id    INT UNSIGNED NULL,
    content      TEXT NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    is_pinned    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_comments_parent FOREIGN KEY (parent_id) REFERENCES comments(id)
        ON UPDATE CASCADE ON DELETE SET NULL,
    INDEX idx_comments_post (post_id),
    INDEX idx_comments_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tools (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    description  TEXT,
    download_url VARCHAR(500) NOT NULL,
    uploader_id  INT UNSIGNED NOT NULL,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tools_uploader FOREIGN KEY (uploader_id) REFERENCES users(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    UNIQUE INDEX uniq_tools_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO users (username, password_hash, role)
VALUES 
('admin',   SHA2('admin123', 256), 'admin'),
('alice',   SHA2('alicePwd', 256), 'user'),
('bob',     SHA2('bobPwd',   256), 'user');

INSERT INTO posts (user_id, content, type, is_anonymous, is_pinned)
VALUES
(1, '欢迎使用校园公告系统！', 'announcement', FALSE, TRUE),
(2, '今天晚上 7 点在图书馆举办读书会。', 'announcement', FALSE, FALSE),
(3, '随手把教室门关好~', 'wall', TRUE, FALSE);