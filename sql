CREATE DATABASE Solera_Job;

USE Solera_Job;

CREATE TABLE Solera_Customer
(
P_Id int NOT NULL AUTO_INCREMENT,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
Date_Joined DATE,
Date_Last_Log_In DATE,
PRIMARY KEY (P_Id)
);

CREATE TABLE Solera_Car
(
C_Id int NOT NULL AUTO_INCREMENT,
P_Id int NOT NULL,
Reg varchar(255),
Milage int,
ServiceDate varchar(255),
MOT varchar(255),
Reg_Keeper varchar(255),
Date_Added DATE,
Date_Last_Viewed DATE,
PRIMARY KEY (C_Id),
FOREIGN KEY (P_Id) REFERENCES Solera_Customer(P_Id)
);

CREATE TABLE Solera_Repairs
(
R_Id int NOT NULL AUTO_INCREMENT,
C_Id int NOT NULL,
Date_Added DATE,
Date_Last_Viewed DATE,
Date_Fixed DATE,
PRIMARY KEY (R_Id),
FOREIGN KEY (C_Id) REFERENCES Solera_Car(C_Id)
);

INSERT INTO Solera_Customer (LastName, FirstName, Address, Date_Joined, Date_Last_Log_In)
VALUES ('Schumann','Terry','53','2016-08-18','2016-08-18');

INSERT INTO Solera_Car (P_Id, Reg, Milage, ServiceDate, Date_Last_Viewed)
VALUES ('1','GK57RVJ','48000','2016-08-18','2016-08-18');