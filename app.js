const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const DB = 'mongodb+srv://Naveen:Naveen@12062002@cluster0.idomi.mongodb.net/NaveenDanceAcademyDatabase?retryWrites=true&w=majority'
const bodyparser = require('body-parser');



const { stringify } = require('querystring');
// mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log("connection failed")
})
const app = express();
const port = process.env.PORT || 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    dob:String,
    address:String
    

  });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const con = ""
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const con = ""
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("This item has been stored to the Database")
    }).catch(()=>{
        res.status(400).send('This item has not been stored to the Database')
    })
    // res.status(200).render('contact.pug');
})

app.get('/about', (req, res)=>{
    const con = ""
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/service', (req, res)=>{
    const con = ""
    const params = {}
    res.status(200).render('service.pug', params);
})

app.get('/classinfo', (req, res)=>{
    const con = ""
    const params = {}
    res.status(200).render('classinfo.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});