const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log( log );
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next();
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance',
//         welcomeMessage: 'Welcome to my website'
//     })
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/', ( req, res )=>{
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Thomas',
    //     likes: [
    //         'Swimmin',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome Home!'
    });
});
app.get('/projects',(req, res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects Page',
        welcomeMessage: 'Hello check out my projects!'
    })
});
app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad',(req, res)=>{
    res.send({
        errorMesssage: 'Unable to handle request'
    })
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});