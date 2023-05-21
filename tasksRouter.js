import { initializeApp } from "firebase/app";
import Joi from "joi";
import firebaseConfig from "./firebaseconfg.json" assert { type: "json" };
import express from "express";
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

const firebase = import("firebase/firestore");
const tasksRouter = express.Router();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION_NAME = "tasks";

tasksRouter.get("/", async (req, res, next) => {
  try {
    const tasksCol = collection(db, COLLECTION_NAME);
    const taskSnapshot = await getDocs(tasksCol);

    const taskList = taskSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    res.send(taskList);
  } catch (error) {
    next(error);
  }
});

tasksRouter.post("/", async (req, res) => {
  const inputSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(100),
    dueDate: Joi.date().iso(),
  });

  const { error, value } = inputSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  const title = req.body.title;
  const description = req.body.description ?? null;
  const dueDate = req.body.dueDate ?? null;

  const docRef = await addDoc(collection(db, "tasks"), {
    title: title,
    description: description,
    dueDate: dueDate,
  });

  res.send(docRef.id);
});

tasksRouter.delete("/:id", async (req, res) => {
  try {
    await deleteDoc(doc(db, "tasks", req.params.id));

    res.send(200);
  } catch {
    res.send(500);
  }
});

tasksRouter.put("/:id", async (req, res) => {
  const inputSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(100),
    dueDate: Joi.date().iso(),
  });

  const { error, value } = inputSchema.validate(req.body);

  const title = req.body.title;
  const description = req.body.description ?? null;
  const dueDate = req.body.dueDate ?? null;

  if (error) {
    return res.status(400).json(error);
  }

  await updateDoc(doc(db, "tasks", req.params.id), {
    title: title,
    description: description,
    dueDate: dueDate,
  });

  res.send(req.params.id);
});

export default tasksRouter;
