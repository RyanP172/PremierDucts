document.getElementById('test').addEventListener('click', () => {
    //debugger
    fetch('/jobs')//make background request   
        .then(res => res.json())
        .then(json => {

            document.getElementById("my-data").innerHTML = ''; //empty the element
            for (let u of json) {

                document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} 
                &nbsp;&nbsp;&nbsp;&nbsp; Date: ${u.jobday}
                &nbsp;&nbsp;&nbsp;&nbsp; Station: ${u.stationNo}
                &nbsp;&nbsp;&nbsp;&nbsp; Storage: ${u.storageInfo}</p>`
                // document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} </p>`

            }

        })

});

document.getElementById("jobNo").addEventListener('click', () => {
    //debugger
    let data = {
        jobno: document.getElementById("job_number").value
    };

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    //http post method
    fetch('/jobs', options)
        .then(res => res.json())
        .then(json => {

            document.getElementById("my-data").innerHTML = ''; //empty the element
            for (let u of json) {

                document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} 
                    &nbsp;&nbsp;&nbsp;&nbsp; Date: ${u.jobday}
                    &nbsp;&nbsp;&nbsp;&nbsp; Station: ${u.stationNo}
                    &nbsp;&nbsp;&nbsp;&nbsp; Storage: ${u.storageInfo}</p>`
                // document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} </p>`

            }

        })
        .catch(error => alert(error))

});


document.getElementById("stationNo").addEventListener('click', () => {
    //debugger
    let data = {
        stationNo: document.getElementById("station_id").value
    };

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    //http post method
    fetch('/stations', options)
        .then(res => res.json())
        .then(json => {

            document.getElementById("my-data").innerHTML = ''; //empty the element
            for (let u of json) {

                document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} 
                        &nbsp;&nbsp;&nbsp;&nbsp; Date: ${u.jobday}
                        &nbsp;&nbsp;&nbsp;&nbsp; Station: ${u.stationNo}
                        &nbsp;&nbsp;&nbsp;&nbsp; Storage: ${u.storageInfo}</p>`
                // document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} </p>`

            }

        })
        .catch(error => alert(error))

}); 

document.getElementById("date").addEventListener('click', () => {
    debugger
    let data = {
        jobday: document.getElementById("day").value
    };

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    //http post method
    fetch('/date', options)
        .then(res => res.json())
        .then(json => {

            document.getElementById("my-data").innerHTML = ''; //empty the element
            for (let u of json) {

                document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} 
                        &nbsp;&nbsp;&nbsp;&nbsp; Date: ${u.jobday}
                        &nbsp;&nbsp;&nbsp;&nbsp; Station: ${u.stationNo}
                        &nbsp;&nbsp;&nbsp;&nbsp; Storage: ${u.storageInfo}</p>`
                // document.getElementById("my-data").innerHTML += `<p>job no: ${u.jobno} </p>`

            }

        })
        .catch(error => alert(error))

}); 
