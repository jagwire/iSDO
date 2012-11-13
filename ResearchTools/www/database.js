
console.log("database.js loaded!");

/* DATABASE LOADING ZONE */

var db;
var DATABASE_NAME = "MTS";
var DATABASE_VERSION = "1.0";
var DATABASE_DISPLAY = "MTS+ Configurations";
var DATABASE_SIZE = 1000000; // in bytes

function loadDefaults(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Configs (id unique, data)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS States (Code unique text, Description text')
    tx.executeSql('CREATE TABLE IF NOT EXISTS')
    tx.executeSql('SELECT * FROM CONFIGS WHERE')
}

function onDeviceReady() {
    db = window.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_DISPLAY, DATABASE_SIZE);
    db.transaction(loadDefaults, error, success);
}

document.addEventListener("deviceready", onDeviceReady, false);