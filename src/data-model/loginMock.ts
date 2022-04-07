// --------------------------------------IMPORTS------------------------------------
// Dependencies
import Joi from 'Joi';
// --------------------------MODEL DATA JOI VALIDATORS-----------------------
export function validateLoginData(data: unknown): Joi.ValidationResult {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
}
// ----------------------------- TS TYPE ---------------------------
export interface ILoginData {
    email: string;
    password: string;
}
