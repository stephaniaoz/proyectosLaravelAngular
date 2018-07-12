const proxy = [
  {
    context: '/api',
    target: 'http://cursolaravel1.com.devel',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
