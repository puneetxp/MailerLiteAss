CREATE TABLE subscribers(`id` int  UNSIGNED PRIMARY KEY AUTO_INCREMENT,`created_at` timestamp  DEFAULT CURRENT_TIMESTAMP NOT NULL,`updated_at` timestamp  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,`name` varchar(255)  NOT NULL ,`lastname` varchar(255)  NOT NULL ,`email` varchar(255) UNIQUE  NOT NULL ,`phone` varchar(14) UNIQUE  NULL,`status_id` int UNSIGNED  NOT NULL )ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;