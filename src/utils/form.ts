export const requiredRule = (text = 'Required') => {
  return (value: unknown) => {
    if (value === null || value === undefined || value === '') return text;
    return true;
  };
};

export const MAX_LENGTH_TEMPLATE_KEY = '{{ MAX_LENGTH }}';
export const maxLengthRule = (
  maxLength: number,
  text = `Shouldn't exceed ${MAX_LENGTH_TEMPLATE_KEY} characters.`,
) => {
  const message = text.replaceAll(MAX_LENGTH_TEMPLATE_KEY, maxLength.toString());
  return (value: string) => {
    if ((value?.length || 0) > maxLength) return message;
    return true;
  };
};

const nameRegex = /^[A-za-z ]+$/;
export const nameRule = (text = `Only letters and spaces are allowed`, regEx = nameRegex) => {
  return (value: string) => {
    if (!regEx.test(value)) return text;
    return true;
  };
};
