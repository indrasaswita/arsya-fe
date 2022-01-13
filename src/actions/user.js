import api from '../helpers/api';

const getAllPelapor = (keyword, page, perPage, setSource = null) =>
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

export default {
  getAllPelapor
};
