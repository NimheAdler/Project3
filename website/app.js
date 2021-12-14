/* Global Variables */
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const link = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const api = ',us&appid=c26f04150224362d9468395236f55e36&units=Metric';

// Create a new date instance dynamically with JS
//Async function to update UI, selecting DOM elements by their ID, with innerHTML.
async function neWeather (e) {
    const response = await fetchData();
    document.getElementById('date').innerHTML = response.date;
    document.getElementById('temp').innerHTML = response.temperature + ' &#176C';
    document.getElementById('content').innerHTML = response.feeling; 
}

const fetchData = async ()=> {
    /* Function to generate the Api*/
   return fetch(link+document.getElementById('zip').value+api).then(response => response.json())
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

    /* Promise to GET Project Data retrieving that app’s data on the client side*/
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

    //Shows error if Zip is invalid (clearing previous inputs).
    .catch(error => {
        console.log("error", error);
        document.getElementById('date').innerHTML = 'ERROR';
        document.getElementById('temp').innerHTML = '';
        document.getElementById('content').innerHTML = '';
        })
}

document.getElementById('generate').addEventListener('click', neWeather)