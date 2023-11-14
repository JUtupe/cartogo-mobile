export const Validations = {
  required: 'To pole jest wymagane.',
  email: {
    value: /\S+@\S+\.\S+/,
    message: 'Niepoprawny adres email.',
  },
  postalCode: {
    value: /^\d{2}-\d{3}$/,
    message: 'Wymagany format kodu pocztowego: 00-000',
  },
};
