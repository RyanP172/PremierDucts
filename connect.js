const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const https = require('https');
const app = express(); 

//For server
 
// Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/tu.y.fo/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/tu.y.fo/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/tu.y.fo/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };

// Starting both http & https servers
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
const port = process.env.PORT || 3000;

let mysql = require('mysql2');

// app.use(express.urlencoded({extended: true})); // New
// app.use(express.json()); // New


app.use(express.static('public')); 
app.use(bodyParser.json()); 


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

// Create the connection pool. The pool-specific settings are the defaults
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

// httpsServer.listen(port,() => {
//     console.log('the web server has started on port:', port); 
// }); 
// httpServer.listen(port,() => {
//     console.log('the web server has started on port:', port); 
// }); 

app.listen(port,() => {
   console.log('the web server has started on port', port);
});
