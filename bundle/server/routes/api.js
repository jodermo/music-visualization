const jsonServer = require('json-server');
const apiServer = jsonServer.create();
const router = jsonServer.router('settings.json');
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
apiServer.use(router);
apiServer.get('/', (req, res) => {
  res.send('api works');
});
module.exports = apiServer;
