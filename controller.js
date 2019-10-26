const fs = require('fs');

// add url-route in /controllers:

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
           // console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
           // console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
          //  console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dirs) {
    for(let i=0;i<dirs.length;i++){
        fs.readdirSync(__dirname + '/' + dirs[i]).filter((f) => {
            return f.endsWith('.js');
        }).forEach((f) => {
          //  console.log(`process controller: ${f}...`);
            let mapping = require(__dirname + '/' + dirs[i] + '/' + f);
            addMapping(router, mapping);
        });
    }
  
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
        debugger
        let controllers=['controllers','controllers/admin']
    addControllers(router, controllers);
   // addControllers(router, 'controllers/admin');
    return router.routes();
};


// function addControllers(router, dir) {
//     fs.readdirSync(__dirname + '/' + dir).filter((f) => {
//         return f.endsWith('.js');
//     }).forEach((f) => {
//         console.log(`process controller: ${f}...`);
//         let mapping = require(__dirname + '/' + dir + '/' + f);
//         addMapping(router, mapping);
//     });
// }

// module.exports = function (dir) {
//     let
//         controllers_dir = dir || 'controllers',
//         router = require('koa-router')();
//         debugger
//     addControllers(router, controllers_dir);
//    // addControllers(router, 'controllers/admin');
//     return router.routes();
// };