import { initializeApp } from "firebase/app";
import express from "express";
import Joi from "joi";
import firebaseConfig from "./firebaseconfg.json" assert { type: "json" };
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getFirestore,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { name } from "ejs";
const userRouter = express.Router();
const app = initializeApp(firebaseConfig);
const db = getFirestore();

userRouter.post("/login", async (req, res, next) => {
  const inputSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().max(8),
    
    
  });

  const { error, value } = inputSchema.validate(req.body);
  if (error) {
    return res.status(401).json("invalid email or password");
  }
  try {
    const user = await signInWithEmailAndPassword(
      getAuth(),
      req.body.email,
      req.body.password
    );

    // const data=[
    //    user.id,
    //    user.email,
    //    user.refreshToken,
    //    user.accessToken,
    //    user.password];

    
    
    
    res.send(user);
  } 
  catch (err) { 
    
    next(err);
  }
   });

userRouter.post("/register", async (req, res, next) => {
  const inputSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().max(8)
    
  });

  const { error, value } = inputSchema.validate(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (error) {
    return res.status(401).json("invalid email or password");
  }
  
  try {
  const user = await createUserWithEmailAndPassword(getAuth(), email, password);
    await addDoc(collection(db, "users"), {
      //  uid: user.uid,
      authProvider: "local",
      email,
    });
    res.send(user);
  } catch (err) {
    next(err);

  }
});

export default userRouter;
