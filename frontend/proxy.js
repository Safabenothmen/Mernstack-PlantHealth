const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    
    app.use(createProxyMiddleware('/', { target: 'http://localhost:5000/', changeOrigin: true,} ));
    app.use('/predict', createProxyMiddleware({ target: 'http://localhost:8000/', changeOrigin: true, }));
  };
  