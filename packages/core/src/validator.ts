import Joi, { Schema, ValidationOptions } from '@hapi/joi';
export { Schema as JoiSchema } from '@hapi/joi';

const defaultJoiOptions: ValidationOptions = {
  abortEarly: false,
};

export const validate = (
  schema: Schema,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  options: ValidationOptions = defaultJoiOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const result = schema.validate(data, options);

  if (result.error) {
    throw result.error;
  }

  return result.value;
};

export const validator: Joi = Joi;
