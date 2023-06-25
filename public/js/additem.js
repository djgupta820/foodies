const additem = document.querySelector('#additem')

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

additem.addEventListener('submit', (e)=>{
    e.preventDefault()

    const name = additem['name'].value
    const category = additem['category'].value
    const price = additem['price'].value
    const image = additem['image'].value
    const description = additem['description'].value
    console.log(description.length)
    
    if(name.length === 0){
        createMessage('Please insert name of the item!', additem, 'danger')
    }
    else if(category.length === 0){
        createMessage('Please insert category of the item!', additem, 'danger')
    }
    else if(price.length === 0){
        createMessage('Please insert price!', additem, 'danger')
    }
    else if(price <= 0){
        createMessage('Price cannot be less than or equal to 0!', additem, 'danger')
    }
    else if(image.length === 0){
        createMessage('Please select image for the item', additem, 'danger')
    }
    else if(description.length == 0){
        createMessage('Description cannot be empty!', additem, 'danger')
    }
    else{
        additem.submit()
    }
})