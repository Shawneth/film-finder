import Express from 'express'
import Bundler from 'parcel-bundler'
import Proxy from 'http-proxy-middleware'

let app = Express();

app.set('port', 80);
app.set('proxyPort', 8080);
app.use(Express.static('./dist'));
app.use('/', Proxy({
    target: `http://localhost:${app.get('proxyPort')}`
}));
let bundler = new Bundler('./index.html');
app.use(bundler.middleware());

app.listen(app.get('port'), () => console.log('Started server on port ' + app.get('port')));