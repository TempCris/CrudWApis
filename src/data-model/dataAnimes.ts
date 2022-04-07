// --------------------------------------IMPORTS------------------------------------
// Dependencies
import Joi from 'joi';
// --------------------------MODEL DATA JOI VALIDATORS-----------------------
export function validateAddData(data: unknown): Joi.ValidationResult {
    const schema = Joi.object({
    id:Joi.number().required(),
    nombre: Joi.string().required(),
    genero: Joi.string().required(),
    numCap: Joi.string().required(),
    prota: Joi.string().required(),
    });
    return schema.validate(data);
}
//-------------------------- TS TYPE----------------------
export interface Animes{
    id:number,
    nombre:string;
    genero:string;
    numCap:string;
    prota:string;
}