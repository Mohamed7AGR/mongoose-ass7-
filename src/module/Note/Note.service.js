import mongoose from "mongoose";
import { NotesModel } from "../../db/model/Notes.model.js";

export const createNote = async ({ data }) => {
  return await NotesModel.create(data);
};

export const getNote = async ({ noteId, userId }) => {
  const note = await NotesModel.findById(noteId);
  if (!note) {
    throw new Error("Note not found");
  }
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner");
  }
  return note;
};

export const updateNote = async ({ noteId, userId, data }) => {
  const note = await NotesModel.findById(noteId);
  if (!note) {
    throw new Error("Note not found");
  }
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner");
  }
  return await NotesModel.findByIdAndUpdate(
    noteId,
    { title: data.title, content: data.content },
    { new: true, runValidators: true }
  );
};

export const replaceNote = async ({ noteId, userId, data }) => {
  const note = await NotesModel.findById(noteId);
  if (!note) {
    throw new Error("Note not found");
  }
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner");
  }
  return await NotesModel.findOneAndReplace(
    { _id: noteId },
    { title: data.title, content: data.content, userId: data.userId },
    { new: true, runValidators: true }
  );
};

export const updateTitleByUser = async ({ userId, title }) => {
  const result = await NotesModel.updateMany(
    { userId },
    { title },
    { runValidators: true }
  );
  if (result.matchedCount === 0) {
    throw new Error("No note found");
  }
  return result;
};

export const deleteNote = async ({ noteId, userId }) => {
  const note = await NotesModel.findById(noteId);
  if (!note) {
    throw new Error("Note not found");
  }
  if (note.userId.toString() !== userId) {
    throw new Error("You are not the owner");
  }
  return await NotesModel.findByIdAndDelete(noteId);
};

export const paginateNotes = async ({ userId, page, limit }) => {
  const skip = (Number(page) - 1) * Number(limit);
  return await NotesModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));
};

export const getNoteByContent = async ({ userId, content }) => {
  const note = await NotesModel.findOne({ userId, content });
  if (!note) {
    throw new Error("No note found");
  }
  return note;
};

export const getNotesWithUser = async ({ userId }) => {
  return await NotesModel.find({ userId })
    .select("title userId createdAt")
    .populate({ path: "userId", select: "email -_id" });
};

export const aggregateNotes = async ({ userId, title }) => {
  return await NotesModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        title,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        title: 1,
        userId: 1,
        createdAt: 1,
        user: {
          name: "$user.name",
          email: "$user.email",
        },
      },
    },
  ]);
};

export const deleteNotesByUser = async ({ userId }) => {
  return await NotesModel.deleteMany({ userId });
};
