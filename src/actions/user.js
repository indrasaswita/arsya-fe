import api from '../helpers/api';

export const getAllPelapor = (keyword, page, perPage, setSource = null) =>
  new Promise((resolve, reject) => {
    api
      .get(
        '/api/users/pelapor',
        {
          params: {
            keyword,
            page,
            per_page: perPage
          }
        },
        setSource
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });

export const getAllLembaga = (keyword, page, perPage, orderBy, order, setSource = null) =>
  new Promise((resolve, reject) => {
    api
      .get(
        '/api/users/lembaga',
        {
          params: {
            keyword,
            page,
            per_page: perPage,
            order_by: orderBy,
            order
          }
        },
        setSource
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
