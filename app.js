const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

//log4js 日志配置
var log4js = require('log4js');
log4js.configure('./config/log4js.json');

// log request URL:
app.use(async (ctx, next) => {
      //添加允许请求头
      ctx.append('Access-Control-Allow-Origin', '*')
      ctx.append('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
      // ctx.append('Content-Type', 'application/json;charset=utf-8')
      ctx.append('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH')
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    //http 预请求处理(post/put/delete 请求在正式请求之前会先发送一个OPTIONS的预请求，只需要把这个OPTIONS的预请求正常返回，后续的请求就会正常执行)
    if (ctx.request.method === 'OPTIONS') {
        ctx.body="OK"
    } else {  
        //继续执行api请求
        await next();
    }

});

// parse request body:
app.use(bodyParser());

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');