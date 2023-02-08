exports.mysql = {
 // host: process.env.DBHOST,
  port: 3306,
  database: process.env.DBNAME,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  socketPath: process.env.INSTANCE_UNIX_SOCKET
};
