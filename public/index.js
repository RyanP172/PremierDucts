var input = document.getElementById('job_number');
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("jobNo").click();
    }
       
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

            let placeHolder = document.querySelector("#data-output");
            let out = "";

            for(let u of json) {
                out +=`
                    <tr>
                        <td>${u.jobno}</td>
                        <td>${u.jobday}</td>
                        <td>${u.jobtime}</td>
                        <td>${u.stationName}</td>
                        <td>${u.storageInfo}</td>
                        <td>${u.operatorID}</td>
                    </tr>
                `;
            }
            placeHolder.innerHTML = out;

        })
        .catch(error => alert(error))

    document.getElementById("job_number").value ='';

});









document.getElementById('test').addEventListener('click', () => {
    //debugger
    fetch('/jobs')//make background request   
        .then(res => res.json())
        .then(json => {
            //debugger

            let placeHolder = document.querySelector("#data-output");
            let out = "";

            for(let u of json) {
                out +=`
                    <tr>
                        <td>${u.jobno}</td>
                        <td>${u.jobday}</td>
                        <td>${u.jobtime}</td>
                        <td>${u.stationName}</td>
                        <td>${u.storageInfo}</td>
                        <td>${u.operatorID}</td>
                    </tr>
                `;
            }
            placeHolder.innerHTML = out;
            

        })

});


var input = document.getElementById('station_id');
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("stationNo").click();
    }
       
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

            let placeHolder = document.querySelector("#data-output");
            let out = "";

            for(let u of json) {
                out +=`
                    <tr>
                        <td>${u.jobno}</td>
                        <td>${u.jobday}</td>
                        <td>${u.jobtime}</td>
                        <td>${u.stationName}</td>
                        <td>${u.storageInfo}</td>
                        <td>${u.operatorID}</td>
                    </tr>
                `;
            }
            placeHolder.innerHTML = out;

        })
        .catch(error => alert(error))

    document.getElementById("station_id").value ='';

});


var input = document.getElementById('day');
debugger;
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("date").click();
    }
       
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

            let placeHolder = document.querySelector("#data-output");
            let out = "";

            for(let u of json) {
                out +=`
                    <tr>
                        <td>${u.jobno}</td>
                        <td>${u.jobday}</td>
                        <td>${u.jobtime}</td>
                        <td>${u.stationName}</td>
                        <td>${u.storageInfo}</td>
                        <td>${u.operatorID}</td>
                    </tr>
                `;
            }
            placeHolder.innerHTML = out;

        })
        .catch(error => alert(error))


    document.getElementById("day").value ='';

}); 


var input = document.getElementById('station_day');
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("station_on_date").click();
    }
       
});


document.getElementById("station_on_date").addEventListener('click', () => {
    debugger
    let data = {
        jobday: document.getElementById("day_station").value,
        stationNo:document.getElementById("station_day").value
    };

    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    //http post method
    fetch('/datestation', options)
        .then(res => res.json())
        .then(json => {

            let placeHolder = document.querySelector("#data-output");
            let out = "";

            for(let u of json) {
                out +=`
                    <tr>
                        <td>${u.jobno}</td>
                        <td>${u.jobday}</td>
                        <td>${u.jobtime}</td>
                        <td>${u.stationName}</td>
                        <td>${u.storageInfo}</td>
                        <td>${u.operatorID}</td>
                    </tr>
                `;
            }
            placeHolder.innerHTML = out;

        })
        .catch(error => alert(error))


    //document.getElementById("day").value ='';

}); 
