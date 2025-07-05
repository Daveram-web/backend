import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db/db.js";

dotenv.config();

export const hashGenerator = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    return console.log("error", error.message);
  }
};

export const hashCompare = async (password, confirmPassword) => {
  try {
    const result = await bcrypt.compare(password, confirmPassword);
    return result;
  } catch (error) {
    return console.log("error", error);
  }
};

export const tokenGenerate = async (userId, email) => {
  try {
    const randomNumber = Math.floor(10000 + Math.random() * 90000).toString();
    const current_device_number = await db.query(
      "UPDATE user SET current_device_id = ? WHERE email = ?",
      [randomNumber,email]
    );
    const token = await jwt.sign(
      { userId, email, randomNumber },
      process.env.SUPER_KEY,
      { expiresIn: "365d" }
    );
    return token;
  } catch (error) {
    return console.log("error", error);
  }
};

export const tokenValidate = async (token) => {
  try {
    const result = jwt.verify(token, process.env.SUPER_KEY);
    return result;
  } catch (error) {
    return console.log("error", error);
  }
};

export const authVerify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(403)
        .json({ message: "Acces Denied: No Token Provided" });
    }
    const token = authHeader.split(" ")[1];
    const valid = await tokenValidate(token);

    if (!valid) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const deviceVerify = jwt.decode(token);


    const [checkDevice] = await db.query(
      `SELECT current_device_id FROM user WHERE id = ?`,
      [deviceVerify.userId]
    );
    console.log('checkDevice', checkDevice)

const dbDeviceId = checkDevice[0].current_device_id;

    console.log('dbDeviceId', dbDeviceId)
    console.log('deviceVerify.randomNumber', deviceVerify.randomNumber)

    if (dbDeviceId !== deviceVerify.randomNumber) {
      return res
        .status(403)
        .json({ message: "This account is logged in on another device" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
