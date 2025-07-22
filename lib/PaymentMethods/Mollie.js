//Core
import React, { useState, useEffect } from 'react';
//Helpers
import axios from 'axios';

const createPayment = (order) => {
  axios({
    method: 'post',
    url: '/api/payments/mollie/create',
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export { createPayment };
