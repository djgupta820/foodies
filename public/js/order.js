const itemPrice = document.querySelector('#iPrice')
const quantity = document.querySelector('#quantity')
const total = document.querySelector('#total')
const form = document.querySelector('#order')


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    total.value = parseInt(quantity.value) * parseFloat(itemPrice.innerText)
    form.submit()
    alert('your order has been placed')
})