import api from '../helpers/api';

export const getAllAduan = (keyword, page, perPage, setSource = null) =>
  new Promise((resolve, reject) => {
    api
      .get(
        '/api/aduan/all',
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
