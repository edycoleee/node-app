Pembuatan Database dan Table pada mysql

CREATE TABLE users (
username VARCHAR(100) PRIMARY KEY,
password VARCHAR(100),
name VARCHAR(100),
token VARCHAR(100)
);

CREATE TABLE contacts (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(200),
phone VARCHAR(20),
username VARCHAR(100),
FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE addresses (
id INT AUTO_INCREMENT PRIMARY KEY,
street VARCHAR(255),
city VARCHAR(100),
province VARCHAR(100),
country VARCHAR(100),
postal_code VARCHAR(10),
contact_id INT,
FOREIGN KEY (contact_id) REFERENCES contacts(id)
);

Jika Menggunakan Prisma (tidak digunakan pada pelajaran ini)
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "mysql"
url = env("DATABASE_URL")
}

model User {
username String @id @db.VarChar(100)
password String @db.VarChar(100)
name String @db.VarChar(100)
token String? @db.VarChar(100)
contacts Contact[]

@@map("users")
}

model Contact {
id Int @id @default(autoincrement())
first_name String @db.VarChar(100)
last_name String? @db.VarChar(100)
email String? @db.VarChar(200)
phone String? @db.VarChar(20)
username String @db.VarChar(100)
user User @relation(fields: [username], references: [username])
addresses Address[]

@@map("contacts")
}

model Address {
id Int @id @default(autoincrement())
street String? @db.VarChar(255)
city String? @db.VarChar(100)
province String? @db.VarChar(100)
country String @db.VarChar(100)
postal_code String @db.VarChar(10)
contact_id Int
contact Contact @relation(fields: [contact_id], references: [id])

@@map("addresses")
}
