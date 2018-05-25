# AngryWipes
Browser based game (javascript/phaser.js/HTML5) w/ leaderboard(MYSQL)

/*
START HERE: Angry Wipes game is a javascript phaser.js browser based game. Users throw wipes at toilets (angry birds style) and answer questions about hospital plumbing systems. The point of the game is to create awareness for hospital employees that wipes cause toilet system backups. Leaderboard is built from mysql backend. See details below for initializing leaderboard.
*/

To Run:
*download repo
*download phaser.js
*MAMP server directory point to this folder
*setup mysql database as seen below in notes
*ensure login credentials are appropriate @ dbc.php
*view @ http://localhost:8888/index.html


NOTES:
BEFORE GOING PRODUCTION: change dbc.php $production = true;	// changes which connection credentials to use


// for local testing.
$link = mysqli_connect("localhost", "root", "root", "test");

// for production - not yet tested.
$link = mysqli_connect("localhost", "miccou3_test", "password", “test”);


ACCESS ON LOCAL HOST- MAMP directory must be at PhaserRepos/TestZone/AngryWipes/AngryWipes

http://localhost:8888/databaseDisplay.php



// CREATE THE TABLE FOR RECORDING USERS COMPLETING
// MIGHT REPLACE UNIT WITH AN ENUM (‘SICU, ‘MICU’, ‘CLC’, ).
CREATE TABLE angry_wipes_test(
	unit VARCHAR(30) NOT NULL,
	comp_date DATE NOT NULL);

// INSERT INTO ANGRY WIPES TABLE
INSERT INTO `angry_wipes_test`( `unit`, `comp_date`) VALUES ('SICU','2017-11-21');


AREAS:(unit)
1E
2W
5E
6W
7W
Admin
Audiology
BMTU
CLC
Cath_Lab
ED
Environmental
GI
IR
Kitchen
MICU
MRI
Pain_Clinic
Primary_Care
RDU
Radiology
SCI
SICU
Student
Woman's_Care
