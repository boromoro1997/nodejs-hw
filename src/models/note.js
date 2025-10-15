import { Schema } from 'mongoose';
import { model } from 'mongoose';
const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      trim: true,
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
    },
  },
  { timestamps: true, versionKey: false },
);
NoteSchema.index(
  { title: 'text', content: 'text' },
  { weights: { title: 10, content: 2 } },
);
export const Note = model('Note', NoteSchema);
