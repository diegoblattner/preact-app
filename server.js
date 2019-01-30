const express = require('express');

const app = express();

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// 'build' was created during the build phase
const staticContent = express.static('build');
app.use(staticContent);
app.use('*', staticContent); // using wild card due to client-side routing

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
