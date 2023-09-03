# nodejs-multipart

## Applications

### /server - Backend

The standard Node.js express application which uploads files using html forms and using 2 libraries.

- path **/uploadermp**   uploads file using [multiparty](https://www.npmjs.com/package/multiparty)
Router is in /routes/uploader_mp.js.

- path **/uploadersmpl** upload file using [express-fileupload](https://www.npmjs.com/package/express-fileupload)
Router is  in /routes/uploader_smpl.js.

For both routes method **get**  returns the html form for file upload. Method **post** processing file uploading.
Method **delete** is not  implemented yet.
#### Interesting firures


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



#### run on your laptop


```
    git clone
    cd /server
    npm install
``````

-  prepare server/.env file

```
## local config
PORT=8080
UPLOAD_STORE=/public
UPLOAD_TMP=/upltmp
```

- run application

```
    cd /server
    npm start

```

application will be accesset on http:/localhost:8080


### /worker -  builds multypart/form-data programatically

This is  Node.js express server whith example how to build ultypart/form-data programatically using library [axios](https://www.npmjs.com/package/axios) and [form-data](https://www.npmjs.com/package/form-data). It invokes methods  **post** developed for **/server** app






