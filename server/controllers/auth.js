import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length) return res.status(409).json("User already exists");

    const password = req.body.password;
    const dynamicSalt = bcrypt.genSaltSync(10);
    const combinedSalt = config.staticSalt + dynamicSalt;

    bcrypt.hash(password, combinedSalt, function (err, hash) {
      if (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
      }

      const serializedHash = `${config.staticSalt}:${dynamicSalt}:${hash}`;

      const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, serializedHash];

      db.query(q, [values], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json("Internal Server Error");
        }
        return res.status(200).json("User has been created.");
      });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length === 0) return res.status(404).json("User not found");

    const serializedHash = data[0].password;
    const [staticSalt, dynamicSalt, hash] = serializedHash.split(":");

    const combinedSalt = staticSalt + dynamicSalt;

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      hash,
      combinedSalt
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, config.jwtSecret);
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, config.jwtSecret, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    } else {
      req.userId = userInfo.id;
      next();
    }
  });
};
