
const fs = require('fs'); 
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 


var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
// var certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
// var credentials = {key: privateKey, cert: certificate};



const app = express(); 
// your express configuration here

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 3000;

let mysql = require('mysql2');

// app.use(express.urlencoded({extended: true})); // New
// app.use(express.json()); // New


//app.use(express.static('public')); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 





// this connection is for live server
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'tupham',
//     database: 'premierductsnsw',
//     password: 'tupham@NSW2566',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     //port: 3306
//   });

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
        connection.query('select distinct j.*,s.stationName from jobtiming j left join stationManagement s on s.stationNo=j.stationNo where j.jobno not like "%valid%" and j.jobno not like "%on%" and j.jobno not like "%out%" order by STR_TO_DATE(j.jobday,"%d/%m/%Y") desc,j.jobtime desc' , (err, rows) => {
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
        connection.query('select distinct j.*,s.stationName from jobtiming j left join stationManagement s on s.stationNo=j.stationNo where j.jobno = ? order by STR_TO_DATE(j.jobday,"%d/%m/%Y") desc,j.jobtime desc' ,[jobSearch.jobno], (err, rows) => {
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
        connection.query('select distinct j.*,s.stationName from jobtiming j left join stationManagement s on s.stationNo=j.stationNo where j.stationNo = ? and j.jobno not like "%valid%" and j.jobno not like "%on%" and j.jobno not like "%out%" order by STR_TO_DATE(j.jobday,"%d/%m/%Y") desc,j.jobtime desc' ,[stationSearch.stationNo], (err, rows) => {
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
        connection.query('select distinct j.*,s.stationName from jobtiming j left join stationManagement s on s.stationNo=j.stationNo where j.jobday = ? and j.jobno not like "%valid%" and j.jobno not like "%on%" and j.jobno not like "%out%" order by STR_TO_DATE(j.jobday,"%d/%m/%Y") desc,j.jobtime desc' ,[dateSearch.jobday], (err, rows) => {
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
        connection.query('select distinct j.*,s.stationName from jobtiming j left join stationManagement s on s.stationNo=j.stationNo where j.jobday = ? and j.stationNo = ? and j.jobno not like "%valid%" and j.jobno not like "%on%" and j.jobno not like "%out%" order by STR_TO_DATE(j.jobday,"%d/%m/%Y") desc,j.jobtime desc ' ,[dateStationSearch.jobday,dateStationSearch.stationNo], (err, rows) => {
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



// app.listen(port,() => {
//     console.log('the web server has started on port:', port); 
// }); 



// For http
httpServer.listen(port);
// For https
// httpsServer.listen(8443);