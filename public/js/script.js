let editBtn = document.querySelector('#editBtn')
let loc = document.querySelector('#loc')

editBtn.addEventListener('click', ()=>{
    let addrs = document.querySelector('#addrs')
    addrs.style.display = 'flex'
})

async function getCurrentLocation() {
    let apiG = 'AIzaSyANrolFRxZ3VrW9CvXD8i2WrSCkP4lslWA'
    const api = 'e7ea121f1d534eba9edb15b181c253c1'
    let lat = ''
    let lng = ''

    // getting longitude and latitude
    navigator.geolocation.getCurrentPosition((data)=>{
        lat = data.coords.latitude
        lng = data.coords.longitude
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#add').value = data.results[0].formatted
        })
        .catch(err => document.querySelector('#add').placeholder = "Cannot find your location, please insert manually!")
    })
}

loc.addEventListener('click', ()=>{
    getCurrentLocation()
})