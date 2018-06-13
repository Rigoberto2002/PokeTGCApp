var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

// server.get('/', function(request, response){
//     //response.send('<h1>Message Here</h1>')
//     response.render('home.ejs')
// })

server.get('/about', function(request, response){
    response.render('about.ejs')
})

server.get('/portfolio', function(request, response){
    response.render('portfolio.ejs')
})

server.get('/contact', function(request, response){
    response.render('contact.ejs')
})

server.get('/', function(request, response){
    console.log(request.body)
    var url = 'https://api.pokemontcg.io/v1/cards?name='
    
    axios.get(url)
    .then( res => res.data )
    .then( data => {
        console.log(data)

        response.render('home.ejs', {data: data})
    })  
    .catch( error => console.log(error))   

    
})

server.post('/', function(request, response){
    console.log(request.body)
    var url = 'https://api.pokemontcg.io/v1/cards?name='+request.body.userinput
    
    axios.get(url)
    .then( res => res.data )
    .then( data => {
        console.log(data)

        response.render('results.ejs', {data: data})
    })  
    .catch( error => console.log(error))   

    
})

var port = process.env.PORT

server.listen(port, () => {
    console.log('server running on port: ' +port)
})




