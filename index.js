const fs = require('fs');
const active = require('active');
const http = require('http');

const app = active();
const configs = JSON.parse(fs.readFileSync('config.json', 'utf8'));

http.createServer(app).listen(configs.listenPort, configs.hostName);
app.tune({
    strictRouting: configs.useStrictRouting,
    cors: configs.useCors,
    debug: configs.useDebug
});

app.addRoute({
    method: 'GET',
    url: '/hello/{debug}',
    match: {
        debug: '[a-z0-9]{3,50}'
    }
    //query: Object
}, (req, res) => {
    res.json(200, "hello " + req.params.debug);
});
