/* eslint-disable prettier/prettier */
process.env.NODE_ENV = 'development'
// process.env.NODE_ENV = 'production'
const devMode = process.env.NODE_ENV === 'development';

const config = {
  PORT: 1104, // 启动端口
  APP_URL : 'http://localhost:1104/',//路径
  TOKEN: {
    secret: 'secret', // secret is very important!
    expiresIn: '86400s', // token有效期24小时
  },
  DATABASE: {
    database: 'test',
    user: 'root',
    password: '123456',
  },
};

// 部署的环境变量设置
if (!devMode) {
  console.log('env production....');

  // ==== 配置数据库
  config.DATABASE = {
    ...config.DATABASE,
    database: 'nest_test', // 数据库名
    user: 'nest_test', // 账号
    password: 'nest_test', // 密码
  };

  // ==== 配置 token 密钥
  config.TOKEN.secret = 'secret';
  // ==== 配置 路径
  config.APP_URL = 'http://8.130.31.13:1104/';

}

export default config;
