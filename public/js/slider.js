let img = document.querySelector('#img')
const stext = document.querySelector('#stext')
const slides = ['Briyani1.jpg', 'Briyani2.jpg', 'Burger1.jpg', 'Burger2.jpg', 'Pizza1.jpg', 'Pizza2.jpg']
let start = 0
function slider(){
    if(start < slides.length){
        start += 1
    }else{
        start = 1
    }
    if(start % 2 == 0){
        stext.innerText = 'Healthy'
    }else{
        stext.innerText = 'Tasty'
    }
    img.style.backgroundImage = 'url("../images/' + slides[start-1] + '")'
}

setInterval(slider, 2000)