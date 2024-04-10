export const config = {
  HOST: "127.0.0.1",
  PORT: 54321,
  USER: "user",
  PASSWORD: "password",
  DB: "minitwitter",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
console.log('\x1b[33m%s\x1b[0m', 'process.env.DBNAME --------------------', process.env.DBNAME);
export const dialect = "postgres";
