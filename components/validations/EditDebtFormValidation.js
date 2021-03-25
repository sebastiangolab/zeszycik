import React from 'react';
import * as Yup from 'yup';

const EditDebtFormValidation = Yup.object().shape({
  addValue: Yup
  .number()
  .when('fieldShow', {
    is: 'add',
    then: Yup
    .number()
    .required('Pole jest wymagane'),
  }),
    
  deleteValue: Yup
  .number()
  .when('fieldShow', {
      is: 'delete',
      then: Yup
      .number()
      .required('Pole jest wymagane'),
  }),

  newValueName: Yup
  .string()
  .when('fieldShow', {
    is: 'changeName',
    then: Yup
    .string()
    .required('Pole jest wymagane'),
  }),
    
  description: Yup
  .string()
  .when('fieldShow', {
    is: 'add',
    then: Yup
    .string()
  }),
});

export default EditDebtFormValidation;