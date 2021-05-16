const env = require("dotenv");
env.config();
import jwt from "jsonwebtoken";
import { userModel } from "../model/usersSchema";
import bcrypt from "bcrypt";
async function findUserByEmail(email: string, res: any) {
  try {
    let usermail: any = await userModel.findOne({ email });
    if (usermail) return usermail;
    else return true;
  } catch (err) {
    res.send(err.message);
  }
}

async function checkAuthoraiztion(req: any, res: any, next: Function) {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization;
      const decode: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
      const user = await userModel.findById(decode.userId);
      try {
        if (!user) {
          return res.json({
            success: false,
            message: "Unauthorized Access",
          });
        }
        req.user = user;
        next();
      } catch (error) {
        if (error.name === "JsonWebTokenError") {
          return res.json({
            success: false,
            message: "Unauthorized Access",
          });
        }
        if (error.name === "TokenExpiredError") {
          return res.json({
            success: false,
            message: "Session Expired Please Try Sign in Again",
          });
        }
        return res.json({
          success: false,
          message: "Couldnt Sign In Try Again",
        });
      }
    }
  } catch (err) {
    console.log("Error in Authorization ", err.message);
    return res.json({ success: false, message: "Invalid token" });
  }
}

async function registerUser(req: any, res: any) {
  try {
    let addedUser: any;
    let { name, password, email } = req.body;
    if ((await findUserByEmail(email, res)) === true) {
      let newUser = new userModel();
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          console.log(err.message);
          return false;
        }
        password = hash;
        newUser = { name, email, password };
        addedUser = await userModel.create(newUser);
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(addedUser));
      });
    } else {
      res.status(409).end("Failure, email already exists. Try sign in");
    }
  } catch (error) {
    res.status(406).end(error.message);
  }
}

async function loginUser(req: any, res: any) {
  try {
    let { email, password } = req.body;
    let user = await findUserByEmail(email, res);
    if (user) {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { userId: user._id },
          `${process.env.JWT_SECRET}`,
          { expiresIn: "1d" }
        );
        //res.writeHead(200, { "content-type": "application/json" });
        res.status(200).json({"token":token});
      } else {
        res.end("password incorrect");
      }
    } else {
      // res.writeHead(404, { "content-type": "application/json" });
      res.status(404).end("User not not found.Sign up");
    }
  } catch (error) {
    //res.writeHead(404, { "content-type": "application/json" });
    res.status(404).end(error.message);
  }
}

export { registerUser, loginUser, checkAuthoraiztion };
