import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().max(1000).allow('').optional(),
    tag: Joi.string().valid(...TAGS),
  }),
};
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100).optional(),
    content: Joi.string().max(1000).allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).min(1),
};
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().trim().allow(''),
    sortBy: Joi.string().valid('_id', 'tag').default('_id'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};
