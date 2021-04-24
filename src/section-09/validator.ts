import { isBlank, isNumberValue } from "./utils";

interface Validatable {
  value: string;
  required: boolean;
}

interface StringValidatable extends Validatable {
  minLength?: number;
  maxLength?: number;
}

interface NumberValidatable extends Validatable {
  min?: number;
  max?: number;
}

function hasRequiredValue(input: Validatable): boolean {
  return !input.required || (input.required && !isBlank(input.value));
}

function validateString(input: StringValidatable): boolean {
  let isValid = hasRequiredValue(input);
  isValid &&= !("minLength" in input) || ("minLength" in input && input.value.length >= input.minLength!);
  isValid &&= !("maxLength" in input) || ("maxLength" in input && input.value.length <= input.maxLength!);

  return isValid;
}

function validateNumber(input: NumberValidatable): boolean {
  if (!isNumberValue(input.value)) {
    return false;
  }

  let isValid = hasRequiredValue(input);

  const n = input.value.includes(".") ? parseFloat(input.value) : parseInt(input.value, 10);
  isValid &&= !("min" in input) || ("min" in input && n >= input.min!);
  isValid &&= !("max" in input) || ("max" in input && n <= input.max!);

  return isValid;
}

export { validateString, validateNumber, Validatable, StringValidatable, NumberValidatable };
