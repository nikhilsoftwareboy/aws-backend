const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://my-load-balancer-1875906113.ap-south-1.elb.amazonaws.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', // This removes the /api prefix when forwarding to your AWS load balancer
      },
    })
  );
};
