import express from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById} from '../controller/note.js';

export const noteRouter = express.Router();

noteRouter.route('/').post(createNote).get(getAllNotes);
// noteRouter.route('/:noteid').get(getNoteById);
// noteRouter.route('/user/:userid').get(getNoteByUserId);
noteRouter.route('/:id').get(getNoteById).delete(deleteNote);