const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { dirname } = require('path');
const app = express();
const port = 3000;
const route = require('./routes/index');
const connect = require('./config/db/Book_stores_db');
var methodOverride = require('method-override');

//connect to db
connect();

//midleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//static file
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//method override
app.use(methodOverride('_method'));

//view engine (handlebars templete)
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/resource/views'));

//route
route(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
