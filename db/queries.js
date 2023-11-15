export const demoCreateQuery = `
drop schema if exists University cascade;
create schema University;
set search_path to University;

create domain Grade as smallint 
	default null
	check (value>=0 and value <=100);
	
create domain CGPA as numeric(10,2)
	default 0
	check (value>=0 and value <=4.0);

create domain Campus as varchar(4)
	not null
	check (value in ('StG', 'UTM', 'UTSC'));
	
create domain Department as varchar(20)
	default null
	check (value in ('ANT', 'EEB', 'CSC', 'ENG', 'ENV', 'HIS'));

create table Student(
	sID integer primary key,
	firstName varchar(15) not null,
	surName varchar(15) not null,
	campus Campus,
	email varchar(25),
	cgpa CGPA);

create table Course(
	cNum integer,			-- E.g., 343
	name varchar(40) not null, 	-- E.g., 'Introduction to Databases'
	dept Department,		-- E.g., 'CSC'
	breadth boolean,	
	primary key (cNum, dept));
	
create table Offering(
	oID integer primary key,
	cNum integer,
	dept Department,
	term integer not null,
	instructor varchar(40),	
	foreign key (cNum, dept) references Course);
	
create table Took(
	sID integer,
	oID integer,
	grade Grade,	
	primary key (sID, oID),	
	foreign key (sID) references Student,
	foreign key (oID) references Offering);
`;

export const demoInsertQuery = `
SET search_path to University;

insert into Student values (99132, 'Avery', 'Marchmount', 'StG', 'avery@cs', 3.13);
insert into Student values (98000, 'William', 'Fairgrieve', 'StG', 'will@cs', 4.00);
insert into Student values (99999, 'Afsaneh', 'Ali', 'UTSC', 'aali@cs', 2.98);
insert into Student values (00157, 'Leilani', 'Lakemeyer', 'UTM', 'lani@cs', 3.42);
insert into Student values (11111, 'Homer', 'Simpson', 'StG', 'doh@gmail', 0.4);
insert into Student values (1, 'FirstName1', 'Surname1', 'UTM', 'name1@cs', 0.1);
insert into Student values (2, 'FirstName2', 'Surname2', 'UTM', 'name2@cs', 0.2);
insert into Student values (3, 'FirstName3', 'Surname3', 'UTM', 'name3@cs', 0.3);
insert into Student values (4, 'FirstName4', 'Surname4', 'UTM', 'name4@cs', 0.4);


insert into Course values (343, 'Intro to Databases', 'CSC', false);
insert into Course values (207, 'Software Design', 'CSC', false);
insert into Course values (148, 'Intro to Comp Sci', 'CSC', false);
insert into Course values (263, 'Data Struct & Analy', 'CSC', false);
insert into Course values (320, 'Intro to Visual Computing', 'CSC', false);
insert into Course values (200, 'Intro Archaeology', 'ANT', true);
insert into Course values (203, 'Human Biol & Evol', 'ANT', false);
insert into Course values (150, 'Organisms in Environ', 'EEB', false);
insert into Course values (216, 'Marine Mammal Bio', 'EEB', false);
insert into Course values (263, 'Compar Vert Anatomy', 'EEB', false);
insert into Course values (110, 'Narrative', 'ENG', true);
insert into Course values (205, 'Rhetoric', 'ENG', true);
insert into Course values (235, 'The Graphic Novel', 'ENG', true);
insert into Course values (200, 'Environmental Change', 'ENV', false);
insert into Course values (320, 'Natl & Intl Env Policy', 'ENV', false);
insert into Course values (220, 'Mediaeval Society', 'HIS', true);
insert into Course values (296, 'Black Freedom', 'HIS', true);
insert into Course values (222, 'COBOL programming', 'CSC', false);

insert into Offering values (1, 343, 'CSC', 20089, 'Horton');
insert into Offering values (2, 343, 'CSC', 20089, 'Truta');
insert into Offering values (3, 343, 'CSC', 20089, 'Heap');
insert into Offering values (4, 320, 'CSC', 20089, 'Jepson');
insert into Offering values (5, 207, 'CSC', 20089, 'Craig');
insert into Offering values (6, 207, 'CSC', 20089, 'Gries');
insert into Offering values (7, 148, 'CSC', 20089, 'Jepson');
insert into Offering values (8, 148, 'CSC', 20089, 'Chechik');
insert into Offering values (9, 263, 'CSC', 20089, 'Horton');
insert into Offering values (11, 200, 'ANT', 20089, 'Zorich');
insert into Offering values (12, 203, 'ANT', 20089, 'Davies');
insert into Offering values (13, 263, 'EEB', 20089, 'Johancsik');
insert into Offering values (14, 235, 'ENG', 20089, 'Percy');
insert into Offering values (15, 205, 'ENG', 20089, 'Reisman');
insert into Offering values (16, 110, 'ENG', 20089, 'Atwood');
insert into Offering values (17, 320, 'ENV', 20089, 'Suzuki');
insert into Offering values (18, 220, 'HIS', 20089, 'Young');
insert into Offering values (19, 220, 'HIS', 20089, 'Dow');

insert into Offering values (21, 343, 'CSC', 20081, 'Mylopoulos');
insert into Offering values (22, 343, 'CSC', 20081, 'Mylopoulos');
insert into Offering values (23, 263, 'CSC', 20081, 'Craig');
insert into Offering values (24, 320, 'CSC', 20081, 'Jepson');
insert into Offering values (25, 207, 'CSC', 20081, 'Craig');
insert into Offering values (26, 207, 'CSC', 20081, 'Gries');
insert into Offering values (27, 148, 'CSC', 20081, 'Jepson');
insert into Offering values (28, 148, 'CSC', 20081, 'Miller');
insert into Offering values (29, 263, 'CSC', 20081, 'Horton');
insert into Offering values (31, 203, 'ANT', 20081, 'Zorich');
insert into Offering values (32, 216, 'EEB', 20081, 'Suzuki');
insert into Offering values (33, 263, 'EEB', 20081, 'Suzuki');
insert into Offering values (34, 150, 'EEB', 20081, 'Mendel');
insert into Offering values (35, 110, 'ENG', 20081, 'Percy');
insert into Offering values (36, 200, 'ENV', 20081, 'Suzuki');
insert into Offering values (37, 205, 'ENG', 20081, 'Atwood');
insert into Offering values (38, 235, 'ENG', 20081, 'Richler');
insert into Offering values (39, 296, 'HIS', 20081, 'Young');

insert into Took values (99132, 1, 79);
insert into Took values (99132, 16, 98);
insert into Took values (99132, 31, 82);
insert into Took values (99132, 11, 99);
insert into Took values (99132, 14, 39);
insert into Took values (99132, 15, 62);
insert into Took values (99132, 34, 75);

insert into Took values (98000, 11, 79);
insert into Took values (98000, 1, 82);
insert into Took values (98000, 5, 89);
insert into Took values (98000, 6, 72);
insert into Took values (98000, 7, 89);
insert into Took values (98000, 8, 93);
insert into Took values (98000, 13, 98);
insert into Took values (98000, 16, 79);
insert into Took values (98000, 17, 79);
insert into Took values (98000, 22, 54);
insert into Took values (98000, 27, 89);
insert into Took values (98000, 31, 78);
insert into Took values (98000, 38, 92);
insert into Took values (98000, 39, 97);
insert into Took values (98000, 9, 78);

insert into Took values (99999, 11, 99);
insert into Took values (99999, 1, 89);
insert into Took values (99999, 5, 76);
insert into Took values (99999, 6, 78);
insert into Took values (99999, 7, 71);
insert into Took values (99999, 8, 91);
insert into Took values (99999, 13, 99);
insert into Took values (99999, 16, 100);
insert into Took values (99999, 17, 94);
insert into Took values (99999, 22, 96);
insert into Took values (99999, 27, 52);
insert into Took values (99999, 31, 70);

insert into Took values (00157, 1, 99);
insert into Took values (00157, 14, 98);
insert into Took values (00157, 31, 82);
insert into Took values (00157, 21, 71);
insert into Took values (00157, 11, 39);
insert into Took values (00157, 34, 62);
insert into Took values (00157, 35, 75);
insert into Took values (00157, 3, 82);
insert into Took values (00157, 5, 59);
insert into Took values (00157, 6, 72);
insert into Took values (00157, 7, 89);
insert into Took values (00157, 28, 91);
insert into Took values (00157, 13, 90);
insert into Took values (00157, 26, 71);
insert into Took values (00157, 17, 59);

insert into Took values (11111, 17, 46);
insert into Took values (11111, 14, 40);
insert into Took values (11111, 15, 0);
insert into Took values (11111, 16, 17);
insert into Took values (11111, 34, 45);

insert into Took values (1, 1, 99);
insert into Took values (1, 14, 98);
insert into Took values (1, 31, 82);
insert into Took values (1, 21, 71);
insert into Took values (1, 11, 39);
insert into Took values (1, 34, 62);
insert into Took values (1, 35, 75);
insert into Took values (1, 3, 82);
insert into Took values (1, 5, 59);
insert into Took values (1, 6, 72);
insert into Took values (1, 7, 89);
insert into Took values (1, 28, 91);
insert into Took values (1, 13, 90);
insert into Took values (1, 26, 71);
insert into Took values (1, 17, 59);

insert into Took values (2, 1, 99);
insert into Took values (2, 14, 98);
insert into Took values (2, 31, 82);
insert into Took values (2, 21, 71);
insert into Took values (2, 11, 39);
insert into Took values (2, 34, 62);
insert into Took values (2, 35, 75);
insert into Took values (2, 3, 82);
insert into Took values (2, 5, 59);
insert into Took values (2, 6, 72);
insert into Took values (2, 7, 89);
insert into Took values (2, 28, 91);
insert into Took values (2, 13, 90);
insert into Took values (2, 26, 71);
insert into Took values (2, 17, 59);

insert into Took values (3, 1, 99);
insert into Took values (3, 14, 98);
insert into Took values (3, 31, 82);
insert into Took values (3, 21, 71);
insert into Took values (3, 11, 39);
insert into Took values (3, 34, 62);
insert into Took values (3, 35, 75);
insert into Took values (3, 3, 82);
insert into Took values (3, 5, 59);
insert into Took values (3, 6, 72);
insert into Took values (3, 7, 89);
insert into Took values (3, 28, 91);
insert into Took values (3, 13, 90);
insert into Took values (3, 26, 71);
insert into Took values (3, 17, 59);

insert into Took values (4, 14, 98);
insert into Took values (4, 31, 82);
insert into Took values (4, 11, 39);
insert into Took values (4, 34, 62);
insert into Took values (4, 35, 75);
insert into Took values (4, 5, 59);
insert into Took values (4, 6, 72);
insert into Took values (4, 7, 89);
insert into Took values (4, 28, 91);
insert into Took values (4, 13, 90);
insert into Took values (4, 26, 71);
insert into Took values (4, 17, 59);
`;

export const demo3CreateQuery = `
drop schema if exists university3 cascade;
CREATE SCHEMA university3;
set search_path to university3;

CREATE TABLE Vendors (
    Vnr VARCHAR(10) PRIMARY KEY,
    Vname VARCHAR(50),
    Status INT,
    Location VARCHAR(50)
);

CREATE TABLE Teams (
    Tnr VARCHAR(10) PRIMARY KEY,
    Tname VARCHAR(50),
    Location VARCHAR(50)
);

CREATE TABLE Parts (
    Pnr VARCHAR(10) PRIMARY KEY,
    Pname VARCHAR(50),
    Color VARCHAR(10),
    Price INT
);

CREATE TABLE VTP (
    Vnr VARCHAR(10),
    Tnr VARCHAR(10),
    Pnr VARCHAR(10),
    Number INT,
    PRIMARY KEY (Vnr, Tnr, Pnr),
    FOREIGN KEY (Vnr) REFERENCES Vendors(Vnr),
    FOREIGN KEY (Tnr) REFERENCES Teams(Tnr),
    FOREIGN KEY (Pnr) REFERENCES Parts(Pnr)
);
`;

export const demo3InsertQuery = `
-- Inserting data into Vendors table
INSERT INTO Vendors(Vnr, Vname, Status, Location) VALUES 
('L1', 'Smith', 20, 'Berlin'),
('L2', 'Miller', 10, 'Atlanta'),
('L3', 'Williams', 50, 'Atlanta'),
('L4', 'Johnson', 30, 'Los Angeles'),
('L5', 'David', 40, 'New Orleans');

-- Inserting data into Teams table
INSERT INTO Teams(Tnr, Tname, Location) VALUES 
('T1', 'Peach', 'Atlanta'),
('T2', 'Mardi Gras', 'New Orleans'),
('T3', 'Octoberfest', 'Munich'),
('T4', 'Software', 'Los Angeles'),
('T5', 'Hardware', 'New Orleans'),
('T6', 'Tech Support', 'Atlanta'),
('T7', 'Unicorns', 'New Orleans'),
('T8', 'Crazy Cats', 'Munich');

-- Inserting data into Parts table
INSERT INTO Parts(Pnr, Pname, Color, Price) VALUES 
('P1', 'Adapter', 'Red', 15),
('P2', 'Cable', 'Blue', 27),
('P3', 'Switch', 'White', 5),
('P4', 'Box', 'Red', 21),
('P5', 'Disk', 'Blue', 2),
('P6', 'Screw', 'Red', 3);

-- Inserting data into VTP table
INSERT INTO VTP(Vnr, Tnr, Pnr, Number) VALUES 
('L1', 'T1', 'P1', 200),
('L1', 'T1', 'P4', 300),
('L1', 'T1', 'P6', 200),
('L1', 'T4', 'P1', 700),
('L1', 'T8', 'P1', 100),
('L2', 'T1', 'P3', 400),
('L2', 'T2', 'P3', 200),
('L2', 'T2', 'P5', 100),
('L2', 'T3', 'P3', 200),
('L2', 'T4', 'P3', 500),
('L2', 'T5', 'P3', 600),
('L2', 'T6', 'P3', 400),
('L2', 'T7', 'P3', 800),
('L2', 'T8', 'P3', 300),
('L3', 'T1', 'P3', 200),
('L3', 'T2', 'P4', 500),
('L4', 'T3', 'P6', 300),
('L4', 'T7', 'P6', 300),
('L5', 'T2', 'P2', 200),
('L5', 'T2', 'P6', 200),
('L5', 'T4', 'P1', 1000),
('L5', 'T4', 'P2', 100),
('L5', 'T4', 'P3', 1200),
('L5', 'T4', 'P4', 800),
('L5', 'T4', 'P5', 400),
('L5', 'T4', 'P6', 500),
('L5', 'T5', 'P5', 500),
('L5', 'T7', 'P5', 200);
`;
