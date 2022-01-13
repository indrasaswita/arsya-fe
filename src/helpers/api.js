import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const get = async (url, action, setSource = null) =>
  new Promise((resolve, reject) => {
    const source = axios.CancelToken.source();
    if (setSource) setSource(source);

    axios
      .get(`${baseUrl}${url}`, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        params: action.params,
        cancelToken: source.token
      })
      .then((response) => {
        resolve(response);
      })
      .catch((reason) => {
        reject(reason);
      });
  });

export default {
  get
};
