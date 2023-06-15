const config = {
  port: process.env.PORT || 8800,
  db: {
    host: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  staticSalt: "$2a$10$KQJMYD/wOfnSXK8hS.WR5e",
  jwtSecret: "y9hKr7f2esCwB89FLg3RjM5DtK6SnpXZ",
};

export default config;
