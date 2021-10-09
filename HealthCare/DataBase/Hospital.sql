Create database Hospital;

Use Hospital;

Create Table User(
	UserId varchar(20) Primary Key,
    Email varchar(200) Not Null Unique,
    Password varchar(200) Not Null
);
insert into User values("Ad-101","admin@anurag.com","anurag.mehta");

Create Table TempUser(
	UserId int Primary Key,
    Email varchar(200) Not Null Unique,
    Password varchar(200) Not Null
);

Create Table Staff(
	StaffId int Primary Key auto_increment,
    Fname varchar(20) not null,
    Mname varchar(20),
    Lname varchar(20) not null,
    Address varchar(200) not null,
    City varchar(20) not null,
    DateOfBirth date not null,
    Gender varchar(10) not null,
    RoleId int not null,
    EmergencyContact varchar(15),
    IdCard varchar(20),
    Email varchar(40) not null,
    constraint FK_StaffRoleId 
    foreign key (RoleId) references Roles (RoleId)
);
delete from staff where StaffId = 6;
alter table Staff auto_increment=100;
alter table Staff modify column MobNo varchar(15) not null;
update Staff set MobNo='+91-876242131' where StaffId=6;
Create Table Roles(
	RoleId int Primary Key auto_increment,
    RoleName varchar(200) Not Null Unique
);
select * from Roles;
insert into Roles values(0,"Admin");
alter table Roles auto_increment=100;
insert into UserInRole values(0,"Ad-101",100);
Create Table UserInRole(
	RelationId int Primary Key auto_increment,
    UserId varchar(20) Not Null Unique,		
    RoleId int Not Null,
    constraint FK_RoleId 
    foreign key (RoleId) references Roles (RoleId),
    constraint FK_UserId 
    foreign key (UserId) references User (UserId) 
);

insert into UserinRole values (100,"Ad-101", 100);
insert into UserinRole values (101,"Dr-1", 101);

Alter table UserInRole Modify Column RoleId int Not Null;

alter table UserInRole auto_increment=100;
Create Table TempStaff(
	UserId int Primary Key auto_increment,
    Fname varchar(20) not null,
    Mname varchar(20),
    Lname varchar(20) not null,
    Address varchar(200) not null,
    City varchar(20) not null,
    DateOfBirth date not null,
    Gender varchar(10) not null,
    RoleId int not null,
    EmergencyContact varchar(15),
    IdCard varchar(20),
    Email varchar(40) not null
);
alter table tempstaff add column MobNo varchar(15) not null;

-- Creating the Patient Table
Create table Patient(
	PatientId int Primary Key auto_increment,
    PatientFname varchar(20) not null,
    PatientMname varchar(20),
    PatientLname varchar(20) not null,
    Address varchar(200) not null,
    City varchar(20) not null,
    DateOfBirth date not null,
    Gender varchar(10) not null,
    IPD_OPD varchar(20) not null,
    Email varchar(40),
    Roomno varchar(20),
    Disease varchar(40) not null,
    MobNo varchar(15),
    EmergencyContact varchar(15),
    IdCard varchar(20)
);
alter table Patient auto_increment=100;
-- Inserting first row
insert into Patient(
	PatientId,
    PatientFname,
    PatientMname,
    PatientLname,
    Address,
    City,
    DateOfBirth,
    Gender,
    IPD_OPD,
    Email,
    Roomno,
    Disease,
    MobNo,
    EmergencyContact,
    IdCard
) values 
(
	null,
    'Anurag',
    'Milind',
    'Mehta',
    'Kanchan Vila, Mahi Colony, Roopgarh Road, Petlawad, Dist. Jhabua, M.P.',
    'Petlawad',
    '2000-03-15',
    'Male',
    'IPD',
    'anuragmehta200026@gmail.com',
    '201',
    'COVID-19',
    '+91-9131625965',
    '+91-7746029952',
    '123456789101'
);
-- Getting records from Patients
select * from Patient;


-- Doctor Table creation
Create table Doctor(
	DoctorId varchar(20) Primary Key,
    DoctorFname varchar(20) not null,
    DoctorMname varchar(20),
    DoctorLname varchar(20) not null,
    Address varchar(200) not null,
    City varchar(20) not null,
    DateOfBirth date not null,
    Gender varchar(10) not null,
    Email varchar(40) not null,
    Specialization varchar(30) not null,
    MobNo varchar(15) not null,
    EmergencyContact varchar(15) not null,
    IdCard varchar(20) not null,
    DoctorFeesPerVisit float not null,
    DoctorICUFees float
    -- DoctorConsultationFees float not null
);

insert into Doctor (
	DoctorId,
    DoctorFname,
    DoctorMname,
    DoctorLname,
    Address,
    City,
    DateOfBirth,
    Gender,
    Email,
    Specialization,
    MobNo,
    EmergencyContact,
    IdCard,
    DoctorFeesPerVisit,
    DoctorICUFees
    -- DoctorConsultationFees
) values (
	'Dr-101',
    'Ramesh',
    'Mahesh',
    'Baghel',
    '55, Jawahar Marg, Petlawad, M.P.',
    'Petlawad',
    '1990-05-19',
    'Male',
    'rameshbaghel123@gmail.com',
    'Cardiologist',
    '+91-876242131',
    '+91-876242343',
    '91876242131',
    500.00,
    2500.00
    -- 299
);
Update Doctor set DoctorConsultationFees = 299 where DoctorId='Dr-101';
select * from Doctor;
delete from Doctor where DoctorId="Dr-102";
Alter table Doctor Add Column DoctorConsultationFees float not null;


create table DoctorObservation(
	Id int primary key auto_increment,
    DoctorId varchar(20) not null,
    PatientId int not null,
    Observation varchar(500) not null,
    updated datetime default current_timestamp on update current_timestamp, 
    created datetime default current_timestamp
    -- could not make it here hence used codefirst approach with timestamp:true
);
ALTER TABLE doctorobservations
ADD Constraint FK_OBSDoctorId  FOREIGN KEY (DoctorId) REFERENCES Doctor(DoctorId);
ALTER TABLE doctorobservations
ADD Constraint FK_OBSPatientId  FOREIGN KEY (PatientId) REFERENCES Patient(PatientId);

update doctorobservations set PatientId=100 where PatientId=107;

create table Admin(
	AdminEmail varchar(40) Primary Key,
    AdminPassword varchar(25) not null
);
select * from Admin;
insert into Admin values("admin@anurag.com","anurag.mehta");
Use Hospital;
delete from Patient where PatientId=106;
Create table Doctor_Patient_Relation(
	RelationId int Primary Key auto_increment,
    DoctorId varchar(20) not null,
    PatientId int not null,
    ReferredIn varchar(20),
    ReferredOut varchar(40),
    Active varchar(5) not null,
    Constraint FK_DoctorId 
    Foreign Key (DoctorId) references Doctor (DoctorId),
    Constraint FK_PatientId 
    Foreign Key (PatientId) references Patient (PatientId),
    Constraint FK_ReferredIn 
    Foreign Key (ReferredIn) references Doctor (DoctorId)
);
alter table Doctor_Patient_Relation auto_increment=100;
delete from Doctor_Patient_Relation WHERE RelationId=109;
insert into Doctor_Patient_Relation (
	RelationId,
    DoctorId,
    PatientId ,
    ReferredOut,
    Active
) values (
	null,
    'Dr-101',
    '100' ,
    'Dr. Saxena',
    'true'
);

select * from Doctor_Patient_Relation;

Create table Ward(
	WardNo int primary key auto_increment,
    WardType varchar(20) not null
);

insert into Ward(
    WardType
) values(
    'COVID-19'
);

select * from Ward;

Create table Room(
	RoomNo varchar(20) primary key,
    WardNo int not null,
    RoomType varchar(20) not null,
    RoomFeesPerDay float not null,
    Constraint FK_WardNo 
    Foreign Key (WardNo) references Ward (WardNo)
    
);

insert into Room(RoomNo,WardNo,RoomType,RoomFeesPerDay) 
values('201',1,'Private',4000.00);

select * from Room;

Create table Nurse(
	NurseId varchar(20) Primary Key,
    NurseFname varchar(20) not null,
    NurseMname varchar(20),
    NurseLname varchar(20) not null,
    Address varchar(200) not null,
    City varchar(20) not null,
    DateOfBirth date not null,
    Gender varchar(10) not null,
    Email varchar(40) not null,
    MobNo varchar(15) not null,
    EmergencyContact varchar(15) not null,
    IdCard varchar(20) not null,
    NurseFeesPerDay float not null,
    WardNo int not null,
    Constraint FK_NurseWardNo 
    Foreign Key (WardNo) references Ward (WardNo)
);

insert into Nurse (
	NurseId,
    NurseFname,
    NurseLname,
    Address,
    City,
    DateOfBirth,
    Gender,
    Email,
    MobNo,
    EmergencyContact,
    IdCard,
    NurseFeesPerDay,
    WardNo
) values (
	'Nr-101',
    'Priyanka',
    'Patel',
    '56, Jawahar Marg, Petlawad',
    'Petlawad',
    '1996-09-21',
    'Female',
    'priyankapatel@gmail.com',
    '+91-876242343',
    '+91-876242343',
    '91876242343',
    599.00,
   1
);

select * from Nurse;

Create table WardBoy(
	WardBoyId varchar(20) Primary Key,
    WardBoyFname varchar(20) not null,
    WardBoyMname varchar(20),
    WardBoyLname varchar(20) not null,
    Address varchar(200) not null,
    City varchar(20) not null,
    DateOfBirth date not null,
    Gender varchar(10) not null,
    Email varchar(40) not null,
    MobNo varchar(15) not null,
    EmergencyContact varchar(15) not null,
    IdCard varchar(20) not null,
    WardBoySalary float not null,
    WardNo int not null,
    Constraint FK_WardBoyWardNo 
    Foreign Key (WardNo) references Ward (WardNo)
);

insert into WardBoy (
	WardBoyId,
    WardBoyFname,
    WardBoyLname,
    Address,
    City,
    DateOfBirth,
    Gender,
    Email,
    MobNo,
    EmergencyContact,
    IdCard,
    WardBoySalary,
    WardNo
) values (
	'Wr-101',
    'Bahadur',
    'Singh',
    '59, Jawahar Marg, Petlawad',
    'Petlawad',
    '1998-09-21',
    'Male',
    'bahadur@gmail.com',
    '+91-876242343',
    '+91-876242343',
    '91876242343',
    199.00,
   1
);

select * from WardBoy;

create table Medical(
	MedId varchar(20) primary key,
    MedName varchar(20) not null,
    MedType varchar(20) not null,
    Manufacturer varchar(20) not null,
    ManuDate date not null,
    ExpiryDate date not null,
    HospitalInDate date not null,
    Quantity int not null,
    UnitPrice float not null,
    Ingredients varchar(100)
);

insert into Medical(
	MedId,
    MedName,
    MedType,
    Manufacturer,
    ManuDate,
    ExpiryDate,
    HospitalInDate,
    Quantity,
    UnitPrice,
    Ingredients
) values(
	'Md-101',
    'Crocin',
    'Tablet',
    'Cipla',
    '2021-08-21',
    '2023-08-20',
    '2021-09-01',
    900,
    2.00,
    'Di-methyl hexapropane, Paracetamol'
);

insert into Medical(
	MedId,
    MedName,
    MedType,
    Manufacturer,
    ManuDate,
    ExpiryDate,
    HospitalInDate,
    Quantity,
    UnitPrice,
    Ingredients
) values(
	'Md-102',
    'Paracetamol',
    'Tablet',
    'Cipla',
    '2021-08-21',
    '2023-08-20',
    '2021-09-01',
    900,
    2.00,
    'Paracetamol'
);

select * from Medical;

create table MedicalBill(
	BillNo varchar(20) primary key,
    BillDate date not null,
    BillTime varchar(20) not null,
    PatientId int not null,
    DoctorId varchar(20) not null,
    AmtBeforeTax float not null,
    TotalBill float not null,
    AmtAfterTax float not null,
    Constraint FK_BillDoctorId
    Foreign Key (DoctorId) references Doctor (DoctorId),
    Constraint FK_BillPatientId 
    Foreign Key (PatientId) references Patient (PatientId)
);

insert into MedicalBill(
	BillNo,
    BillDate,
    BillTime,
    PatientId,
    DoctorId,
    AmtBeforeTax,
    TotalBill,
    AmtAfterTax
) values(
	'Bill-101',
    '2021-04-09',
    '19:55',
    '100',
    'Dr-101',
    2500.00,
    2950.00,
    2950.00
);

select * from MedicalBill;

create table MedicalBillDetails(
	BillDetailsNo varchar(20) primary key,
    BillNo varchar(20) not null,
    MedId varchar(20) not null,
    Quantity int not null,
    Price float not null,
    Constraint FK_BillNo
    Foreign Key (BillNo) references MedicalBill (BillNo),
    Constraint FK_MedId 
    Foreign Key (MedId) references Medical (MedId)
);

insert into MedicalBillDetails(BillDetailsNo,BillNo,MedId,Quantity,Price)
 values('BillD-101','Bill-101','Md-101',900,1800.00);
 
 insert into MedicalBillDetails(BillDetailsNo,BillNo,MedId,Quantity,Price)
 values('BillD-102','Bill-101','Md-102',350,700.00);
 
 select * from MedicalBillDetails;
 
 

