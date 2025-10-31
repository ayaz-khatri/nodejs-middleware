import express from 'express';    
const app = express();
const myRouter = express.Router();    
import {body, validationResult} from "express-validator";  

app.set("view engine", "ejs");                  // set the view engine to ejs
app.use(express.json());                        // this allows us to send data to server in JSON format
app.use(express.urlencoded({extended: false})); // this allows us to send form-data
app.use(express.static('public'));              // set the default folder for static files to public

var validationRegistration = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({min:3}).withMessage('Username must be 3 chars long')
        .trim()
        .isAlpha().withMessage("Username must contain only letters"),
    
    body('email')
        .notEmpty().withMessage('Username is required')
        .isEmail().withMessage("Provide a valid email address")
        .normalizeEmail(),
    
    body('password')
        .isStrongPassword().withMessage("Password must be strong"),

    body('age')
        .notEmpty().withMessage('Username is required')
        .isNumeric().withMessage("Age must be numeric")
        .isInt({min:18}).withMessage("Age must be at least 18 years"),

    body('city')
        .notEmpty().withMessage('city is required')
        .isIn(['mps', 'hyd', 'khi']).withMessage("City must be in between mps, hyd and khi")

 ];


// app.use((req, res, next) => {
//     const d = new Date();
//     console.log(`Date: ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`);
//     next();
// });

// app.get('/',(req, res) => {
//     res.send("<h1>Main Page</h1>");
// });

// app.get('/about',(req, res) => {
//     res.send("<h1>About Page</h1>");
// });


// const myMiddleware = (req, res, next) => {
//     const d = new Date();
//     console.log(`Date: ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`);
//     next();
// };


// app.get('/',(req, res) => {
//     res.send("<h1>Main Page</h1>");
// });

// app.get('/about', myMiddleware, (req, res) => {
//     res.send("<h1>About Page</h1>");
// });

// myRouter.use((req, res, next) => {
//  console.log("Hello");
//     next();
// });

// myRouter.get('/',(req, res) => {
//     res.send("<h1>Main Page</h1>");
// });

// myRouter.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>");
// });


// app.get('/',(req, res) => {
//     res.send("<h1>Main Page</h1>");
// });

// app.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>");
// });

// // this will automatically be called if there is error in above routes
// app.use((err, req, res, next) => {
//     console.log(err.stack);
//     res.status(500).send("Something Broke");
//     next();
// }); 

// app.use('/test', myRouter);


app.get('/',(req, res) => {
    res.send("<h1>Main Page</h1>");
});

app.get('/myform', (req, res) => {
    // res.render('myform');
    res.render('myform', {errors: 0});

});

app.post('/saveform',validationRegistration, (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        res.send(req.body);
    }
    // res.send(error);
    res.render('myform', {errors: errors.array()});
});

app.listen(3000, () => {   
    console.log('App is up and running on port 3000');
});