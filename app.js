
/**
 * Module dependencies.
 */
// console.log(__dirname)
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var appCreator = require('./tools/createApp');
var templateCreator = require('./tools/templateCreator');
var mocker = require('./tools/mocker');
var app = express();

// console.log(process.env)
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
// app.get('/hrlms', routes.hrlms);

//mapping hrlms to web
app.use('/web', express.static('web'));
// app.use('/jquery.js', express.static('jquery.js'));
//added by ccx
var exec = require("child_process").exec;
app.get('/createApp', appCreator.create);



app.get('/createTemplate', templateCreator.create);


app.get("/mock/:appName", mocker.mock);

var appIndex = require('./tools/appIndex');
app.get(/appIndex*/, appIndex.render);


var pageSaver = require('./tools/pageSaver');
// app.post('/savePage', pageSaver.savePage);

var pageController = require('./tools/pageController');
app.get('/newPage', pageController.newPage);
app.post('/savePage', pageController.savePage);

var templateController = require('./tools/templateController');
app.get('/newTemplate', templateController.newTemplate);
app.get('/mergeTemplate', templateController.mergeTemplate);
app.get('/getTemplateList', templateController.getTemplateList);

var pageTemplateAdder = require('./tools/pageTemplateAdder');
app.get('/pageAddTemplate', pageTemplateAdder.add);

var templateDemoViewer = require('./tools/templateDemoViewer');
app.get('/templateDemo', templateDemoViewer.showDemoPage);















http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});

// process.on('exit', function() {
//   setTimeout(function() {
//     console.log('This will not run');
//   }, 0);
//   console.log('About to exit.');
// });


process.on('SIGUSR2', function () {
  console.log("rreeesstarting");   
  // gracefulShutdown(function () {
  //   process.kill(process.pid, 'SIGUSR2'); 
  // })
 process.kill(process.pid, 'SIGUSR2'); 
}); 

process.on('SIGUSR1', function () {
  console.log("rreeesstarting");   
  // gracefulShutdown(function () {
  //   process.kill(process.pid, 'SIGUSR2'); 
  // })
 process.kill(process.pid, 'SIGUSR2'); 
});      

     
// console.log(process)
process.on('SIGINT', function () {
  console.log("rreeesstarting");
  // gracefulShutdown(function () {
  //   process.kill(process.pid, 'SIGUSR2'); 
  // })
}); 


process.on('SIGQUIT', function () {
  console.log("rreeesstarting");
});       
   
process.on('SIGHUP', function () {
  console.log("rreeesstarting");
});  

process.on('SIGTERM', function () {
  console.log("rreeesstarting");
});  
