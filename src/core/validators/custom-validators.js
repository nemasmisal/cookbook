import { helpers } from '@vuelidate/validators';
import AuthService from '../services/auth-service';

const isUnique = (params) => async (credentials) => {
  const { isAvailabe } = await AuthService.isAvailable({
    key: params,
    value: credentials,
  });
  return isAvailabe;
};

const isAvailable = (params) =>
  helpers.withMessage(
    ({ $model }) => `${$model} is already in use, please choose better one.`,
    isUnique(params)
  );

const oneWordPattern = helpers.withMessage(
  'Allowed characters: A-Z,0-9',
  (value) => /^[a-zA-Z0-9]+$/.test(value)
);

const twoWordPattern = helpers.withMessage(
  'Allowed charactersL A-Z,0-9,Space',
  (value) => /^[a-zA-Z0-9\s]+$/.test(value)
);

const notEmptyArray = helpers.withMessage(
  'At least 1 ingrediant must be added',
  (array) => array.length
);
export { isAvailable, oneWordPattern, twoWordPattern, notEmptyArray };
