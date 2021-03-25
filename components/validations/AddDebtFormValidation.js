import React from 'react';
import * as Yup from 'yup';

const AddDebtFormValidation = Yup.object().shape({
  newNameDebt: Yup
    .string()
    .required('Pole jest wymagane')
    .max(25, 'Pole jest za długie, max 25 znaków'),
  newValueDebt: Yup
    .number()
    .required('Pole jest wymagane')
});

export default AddDebtFormValidation;