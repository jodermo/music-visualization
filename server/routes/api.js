const jsonServer = require('json-server');
const apiServer = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
apiServer.use(router);
apiServer.get('/', (req, res) => {
  res.send('api works');
});
apiServer.listen(8080, () => {
  console.log('JSON Server is running')
});
module.exports = apiServer;
