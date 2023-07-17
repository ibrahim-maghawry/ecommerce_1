import Joi from "joi";

const addCategorySchema = Joi.object({
 
  name: Joi.string().min(3).max(30).required(),
});


const getCategoryByIdSchema = Joi.object({
    id:Joi.string().hex().length(24),
})
export {
    addCategorySchema,
    getCategoryByIdSchema
}