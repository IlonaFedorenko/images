import axios from 'axios';

export const fetchImages = async (query, page) => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    method: 'get',
    params: {
      key: '31011594-1ff7c9f95cd2b442eeb7c007c',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: page,
    },
  });

  return response.data;
};
