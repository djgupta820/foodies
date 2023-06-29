const login = document.querySelector('#login')
const register = document.querySelector('#register')
const loc = document.querySelector('#loc')

function createMessage(data, parentElemet, messageType) {
    const div = document.createElement('div')
    div.className = 'message-' + messageType
    const text = document.createTextNode(data)
    div.append(text)
    parentElemet.parentNode.insertBefore(div, parentElemet)
    setTimeout(() => {
        parentElemet.parentNode.removeChild(div)
    }, 3000)
}

async function getCurrentLocation() {
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
            document.querySelector('#address').value = data.results[0].formatted
        })
    })
}

if (login) {
    login.addEventListener('submit', (e) => {
        e.preventDefault()
        const username = login['username'].value
        const password = login['password'].value
        if (username === '') {
            createMessage("Please input username!", login, 'danger')
        }
        else if (password === '') {
            createMessage("Please input password!", login, 'danger')
        }
        else {
            login.submit()
        }
    })
}

if(loc){
    loc.addEventListener('click', (e)=>{
        getCurrentLocation()
    })
}

if (register) {
    const ret = document.querySelector('#retailer')
    ret.addEventListener('change', (e)=>{
        if(ret.checked){
            e.target.value = 'true'
        }else{
            e.target.value = 'false'
        }
    })
    register.addEventListener('submit', (e) => {
        e.preventDefault()
        const pattern = /[^0-9]/
        const name = register['name'].value
        const email = register['email'].value
        const phone = register['phone'].value
        const address = register['address']
        const password = register['password'].value
        const username = register['username'].value

        if (name.length <= 3) {
            createMessage("Name must have more than 3 characters!", register, 'danger')
            return false
        }
        else if (email.length <= 0) {
            createMessage("Please input your email!", register, 'danger')
            return false
        }
        else if(username.length <= 0){
            createMessage("Please input username!", register, 'danger')
            return false
        }
        else if (phone.match(pattern)) {
            createMessage("Phone number cannot contain alphabetical characters!", register, 'danger')
            return false
        }
        else if (phone.length < 10 || phone.length > 10) {
            createMessage("Phone number must be 10 digits long!", register, 'danger')
            return false
        }
        else if (password.length < 8 || password.length > 15) {
            createMessage("Password length must be between 8 and 15!", register, 'danger')
            return false
        }
        else {
            // if(address && address.value.length <= 0){
            //     createMessage("Please input your address!", register, 'danger')
            //     return false
            // }
            register.submit()
        }
    })
}