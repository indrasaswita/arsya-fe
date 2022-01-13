import api from '../helpers/api';

export const getAllRoles = () =>
  new Promise((resolve, reject) => {
    api
      .get('/api/roles/all', {})
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
