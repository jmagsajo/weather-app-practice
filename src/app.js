const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set-up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set-up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
   res.render('index', {
       'title': 'Weather',
       'name': 'Joseph Magsajo'
   })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About',
        'name': 'Joseph Magsajo'
    })
 })

 app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'message': 'This is a help message!',
        'name': 'Joseph Magsajo'
    })
 })

app.get('/weather', (req, res) => {

    let address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(address, (error, {latitude, longtitude, location} = {}) => {
        
        if(error){
            return res.send({
               error
            })
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })
    }) 
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': 'Help - 404',
        'message': 'Help article not found.',
        'name': 'Joseph Magsajo'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'message': 'PAGE NOT FOUND.',
        'name': 'Joseph Magsajo'
    })
});

// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'joseph',
//         age: 99
//     })
// })

// app.get('/help', (req, res) => {
//     res.sendFile(publicDirectoryPath+'/help.html')
// }) 

// app.get('/about', (req, res) => {
//     res.send('About!')
// })

// app.get('/about', (req, res) => {
//     res.sendFile(publicDirectoryPath+'/about.html')
// }) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})