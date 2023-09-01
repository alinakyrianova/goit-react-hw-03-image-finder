import axios from 'axios';

const API_KEY = '39189941-21ab4a7e372e737ebf098c100';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (query, page) => {
  const separated = query.split('/');
  const exstractedQuery = separated[1];
console.log('query:', query);
  console.log('exstractedQuery:', exstractedQuery);

  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: exstractedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });
console.log('response.data.hits:', response.data.hits);


    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};