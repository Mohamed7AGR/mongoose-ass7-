import mongoose, { Schema } from "mongoose";
let NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v !== v.toUpperCase();
        },
        message: "{VALUE} must not be entirely uppercase",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const NotesModel = mongoose.model("notes", NotesSchema);
