import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import checkEmailPass from "../helpers/checkEmailPass.js";
import { USERS } from "../data/usersDB.js";

const authTokenRoute = Router();

//login con email y password
authTokenRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  try {
    const { _id } = checkEmailPass(email, password);

    //generar token
    const jwtConstructor = new SignJWT({ _id });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (err) {
    return res.sendStatus(401);
  }
});

//solicitud autenticado con token
authTokenRoute.get("/profile", async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    //console.log(jwtData) jwData contiene payload

    const user = USERS.find((user) => user._id === payload._id);
    if (!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
  } catch (err) {
    return res.sendStatus(err.message);
  }
});

export default authTokenRoute;
