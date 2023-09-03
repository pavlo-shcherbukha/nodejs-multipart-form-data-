# nodejs-multipart

## Standard Node.js express application with 
- Upload file using [multiparty](https://www.npmjs.com/package/multiparty)
- Upload file using [express-fileupload](https://www.npmjs.com/package/express-fileupload)

## Interesting firures


- winston logger  how to  customize

```
## app.js
var  winston = require('./utils/winston');
app.set('logger', winston);
app.set('upltemp', path.join(__dirname, process.env.UPLOAD_TMP))
app.set('uplstrg', path.join(__dirname, process.env.UPLOAD_STORE))

const applogger = app.get('logger').child({ label: 'app' });
applogger.info("app logger added");

## routers
module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');
    router.post('/', function(req, res, next) {
      //var b = req.body;
      
      log = logger.child({ label: 'uploadermp-post' });
        .
        .
        .
        .
        .
        log.error('-on error: ' + error.message);

```
- .dotenv and global classes

```
# connect
require('dotenv').config()

# how to use

app.set('upltemp', path.join(__dirname, process.env.UPLOAD_TMP))
app.set('uplstrg', path.join(__dirname, process.env.UPLOAD_STORE))

```



## run on your laptop




```
    git clone
    npm install
``````

-  prepare .env file

```
## local config
PORT=8080
UPLOAD_STORE=/public
UPLOAD_TMP=/upltmp
```

- run application

```
    npm start

```

application will be accesset on http:/localhost:8080


