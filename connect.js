const express = require('express');
const bodyParser = require('body-parser'); 

const fs = require('fs'); 

const app = express(); 
// const port = process.env.PORT || 5000;

let mysql = require('mysql2');

// app.use(express.urlencoded({extended: true})); // New
// app.use(express.json()); // New


app.use(express.static('public')); 
app.use(bodyParser.json()); 


// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nsw',
//     port: 3307
// });

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nsw',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3307
  });



app.get('/jobs', (req, res) => {    
    pool.getConnection((err, connection) => {
        if (err) throw err;       
        connection.query('select DISTINCT `jobno`, `jobday`, `stationNo`, `storageInfo` from `jobtiming` where `jobno` NOT LIKE "%valid%" AND `jobno` NOT LIKE "%on%" AND `jobno` NOT LIKE "%out%" ORDER BY `jobday` DESC LIMIT 20' , (err, rows) => {
            connection.release(); // return the connection to pool
            if (!err) {
                
                res.json(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from Job Timming table are: \n', rows)            
        })
    })
})

app.post('/jobs',(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let jobSearch = req.body;        
        connection.query('select DISTINCT `jobno`, `jobday`, `stationNo`, `storageInfo` from `jobtiming` where `jobno` = ? ORDER BY `jobday` DESC', [jobSearch.jobno], (err, rows) => {
             connection.release() // return the connection to pool

            if (!err) {
                
                res.json(rows)
            } else {
                console.log(err)
            }
            console.log('The data from Job Timming table are: \n', rows)    

                      
        })
    })
});

app.post('/stations',(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let stationSearch = req.body;        
        connection.query('select DISTINCT `jobno`, `jobday`, `stationNo`, `storageInfo` from `jobtiming` where `stationNo` = ? AND `jobno` NOT LIKE "%valid%" AND `jobno` NOT LIKE "%on%" AND `jobno` NOT LIKE "%out%" ORDER BY `jobday` DESC LIMIT 20', [stationSearch.stationNo], (err, rows) => {
             connection.release() // return the connection to pool

            if (!err) {
                
                res.json(rows)
            } else {
                console.log(err)
            }
            console.log('The data from Job Timming table are: \n', rows)    

                      
        })
    })
});

app.post('/date',(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let dateSearch = req.body;        
        connection.query('select DISTINCT `jobno`, `jobday`, `stationNo`, `storageInfo` from `jobtiming` where `jobday` = ? AND `jobno` NOT LIKE "%valid%" AND `jobno` NOT LIKE "%on%" AND `jobno` NOT LIKE "%out%" ORDER BY `jobday` DESC LIMIT 20', [dateSearch.jobday], (err, rows) => {
             connection.release() // return the connection to pool

            if (!err) {
                
                res.json(rows)
            } else {
                console.log(err)
            }
            console.log('The data from Job Timming table are: \n', rows)    

                      
        })
    })
});

app.post('/datestation',(req,res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        let dateStationSearch = req.body;        
        connection.query('select DISTINCT `jobno`, `jobday`, `stationNo`, `storageInfo` from `jobtiming` where `jobday` = ? AND `stationNo` = ? AND `jobno` NOT LIKE "%valid%" AND `jobno` NOT LIKE "%on%" AND `jobno` NOT LIKE "%out%" ORDER BY `jobday` DESC LIMIT 20', [dateStationSearch.jobday,dateStationSearch.stationNo], (err, rows) => {
             connection.release() // return the connection to pool

            if (!err) {
                
                res.json(rows)
            } else {
                console.log(err)
            }
            console.log('The data from Job Timming table are: \n', rows)    

                      
        })
    })
});



app.listen(3000,() => {
    console.log('the web server has started on port 3000'); 
}); 
