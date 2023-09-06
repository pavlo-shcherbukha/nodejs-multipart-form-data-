# nodejs-multipart

## Applications

### /servermp - Backend

The standard Node.js express application which  parse multipart/form=data,  uploads files using html forms and using  library [multiparty](https://www.npmjs.com/package/multiparty).

- path **/uploader**   uploads file.
Router is in /routes/uploader_mp.js.


- path **/uploadermu**   uploads number of file. Request is making from **worker** service
Router is in /routes/uploader_mu.js.

Accessed on http://localhost:8080


The structure of parsed data:

```json
{
  fieldName: "file",
  originalFilename: "openapi.json",
  path: "....\\servermp\\upltmp\\CPHI0cL0Kv_VIhRA0HmoBvro.json",
  headers: {
    "content-disposition": "form-data; name=\"file\"; filename=\"openapi.json\"",
    "content-type": "application/json",
  },
  size: 19251,
}
```


### /servereu - Backend
The standard Node.js express application which uploads files using html forms and using  library [express-fileupload](https://www.npmjs.com/package/express-fileupload)

- path **/uploader**   uploads file.
Router is in /routes/uploader_smpl.js.

- path **/uploadermu**   uploads number of file. Request is making from **worker** service
Router is in /routes/uploader_multi.js.


Accessed on http://localhost:8081

The structure of parsed data:

```json
{
  file: [
    {
      name: "cpic-1.jpg",
      data: new Uint8Array([]),
      size: 47626,
      encoding: "7bit",
      tempFilePath: "C:\..........\servereu\\upltmp\\tmp-1-1693987901679",
      truncated: false,
      mimetype: "image/jpeg",
      md5: "c14a1d0c059fa8e66aadfdfd4127905c",
    },
    {
      name: "cpic-2.jpg",
      data: new Uint8Array([]),
      size: 91460,
      encoding: "7bit",
      tempFilePath: "C:\.......\\servereu\\upltmp\\tmp-2-1693987901687",
      truncated: false,
      mimetype: "image/jpeg",
      md5: "bbd510405d7b3316292ee4656faf4550",
    },
  ],
}
```

### /worker - service  which makes multipart/form-data programmatically and  invoke  servermp ot servereu depends on ${BEURL} in .env file

- configuration file  .env
```bash
## local config
# port
PORT=8082
# URL for RSS uploading
#RSSURL="https://static.censor.net/censornet/rss/rss_uk_news.xml"
RSSURL="http://feeds.bbci.co.uk/news/rss.xml"

## configuration axisos timeout 60 sec 
AXIOSTIMEOUT=60000
## URL back END servermp
BEURL="http://localhost:8080"
## URL back END servereu
##BEURL="http://localhost:8081"

```

- path /loadrss routes/loadrss.js

Method http=get

Getting rss feed from ${RSSURL} of .env, making multipart/form-data programmatically and send  form using axios to ${BEURL} of .env.


- path /loadmulti routes/loadmulti.js

Method http=get

uploads two files from "/public" folder, making multipart/form-data programmatically and send files form using axios to ${BEURL} of .env.

Accessed on http://localhost:8082

### Important thing

For both routes method **get**  returns the html form for file upload. Method **post** processing file uploading.


You cannot use both libraries in one server because in some conditions "express-fileupload" lib influence  on the multiparty  library in case of "useTempFiles" is true. So that is a reason to split servers.

As for me, "multiparty" library is more universal and more flexible. In addition it is event based and could parse files and fils also can parse partitions. It sore files in  temporary directory.
The "express-fileupload" library is simpliers and is native for express application. It use the express middleware and it means that it could influence on the other libraries

### Additional interesting features from my point  of view


```
## app.js

## winston logger  how to  customize
var  winston = require('./utils/winston');

## how to set singleton in app and use it in differen modules (aa.set, app.get)
app.set('logger', winston);
app.set('upltemp', path.join(__dirname, process.env.UPLOAD_TMP))
app.set('uplstrg', path.join(__dirname, process.env.UPLOAD_STORE))

## winson child loggers. gives you possibility to use different  labels for different modules, functions etc.
const applogger = app.get('logger').child({ label: 'app' });
applogger.info("app logger added");

## routers
module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');
    router.post('/', function(req, res, next) {
      //var b = req.body;
      ## winson child loggers in router.
      log = logger.child({ label: 'uploadermp-post' });
        .
        .
        .
        .
        .
        log.error('-on error: ' + error.message);

## .dotenv and global classes
## connect
require('dotenv').config()

## how to use and set path in application laves and then access it using app.get('upltemp')

app.set('upltemp', path.join(__dirname, process.env.UPLOAD_TMP))
app.set('uplstrg', path.join(__dirname, process.env.UPLOAD_STORE))

```

#### run on your laptop

run git clone

```
  git clone
``` 
  

##### servermp
```
  
    cd /servermp
    npm install
``````

-  prepare servermp/.env file

```
PORT=8080
UPLOAD_STORE=/public
UPLOAD_TMP=/upltmp
```

- run application

```
    cd /servermp
    npm start

```

application will be accesset on http:/localhost:8080


##### servereu

```
  
    cd /servereu
    npm install
``````

-  prepare servereu/.env file

```
PORT=8081
UPLOAD_STORE=/public
UPLOAD_TMP=/upltmp
```

- run application

```
    cd /servereu
    npm start

```

application will be accesset on http:/localhost:8081


##### worker

```
  
    cd /worker
    npm install
``````

-  prepare servereu/.env file

```
# port
PORT=8082
# URL for RSS uploading
#RSSURL="https://static.censor.net/censornet/rss/rss_uk_news.xml"
RSSURL="http://feeds.bbci.co.uk/news/rss.xml"

## configuration axisos timeout 60 sec 
AXIOSTIMEOUT=60000
## route req to servermp
BEURL="http://localhost:8080"

## route req to servereu
## BEURL="http://localhost:8081"


```

- run application

```
    cd /worker
    npm start

```


### /worker -  builds multypart/form-data programatically

This is  Node.js express server whith example how to build ultypart/form-data programatically using library [axios](https://www.npmjs.com/package/axios) and [form-data](https://www.npmjs.com/package/form-data). It invokes methods  **post** developed for **/server** app



https://axios-http.com/docs/multipart
https://maximorlov.com/send-a-file-with-axios-in-nodejs/
https://www.npmjs.com/package//axios?activeTab=readme





