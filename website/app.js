
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


const link = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const api = ',us&appid=c26f04150224362d9468395236f55e36&units=Metric';

/* Function to generate the Api,  */
function generateApi (e) {
    fetch(link+document.getElementById('zip').value+api).then(response => response.json())
    .then(response => {
        return fetch('http://localhost:3000/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                temperature: response.main.temp,
                date: newDate,
                feeling: document.getElementById('feelings').value,
            }),
        });
    })

    /* Promise to GET Project Data */
    .then(() =>{
        return fetch('http://localhost:3000/get', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    })
    .then(response => response.json())

    // Write updated data to DOM elements
    .then(response => {
        document.getElementById('date').innerHTML = response.date;
        document.getElementById('temp').innerHTML = response.temperature + ' &#176C';
        document.getElementById('content').innerHTML = response.feeling;
    })

    //Shows error if Zip is invalid (clearing previous inputs).
    .catch(error => {
        console.log("error", error);
        document.getElementById('date').innerHTML = 'ERROR';
        document.getElementById('temp').innerHTML = '';
        document.getElementById('content').innerHTML = '';
        })
        
}

document.getElementById('generate').addEventListener('click', generateApi)