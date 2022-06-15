import { http } from './api';


export const fetchImages = (name, galleryPage) => {
  return http.get(
    `https://pixabay.com/api/?key=26416863-6640e7be91d4da8171d054008&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${galleryPage}&&per_page=12`
  );
};
