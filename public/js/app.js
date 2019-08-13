// console.log("test");

/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

/* fetch('/weather?address=Manila').then((response) => {
    response.json().then((data) => {
        if(data.error){
            return console.log(data.error)
        }
        console.log(data.location, data.forecast)
    })
}) */


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const location = search.value
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // return console.log(data.error)
                messageOne.textContent = data.error
                return false
            }
            // console.log(data.location, data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})