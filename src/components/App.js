import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './ImageGallery/Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { fetchImages } from '../services/fetchImages';

export default function App() {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    const updateImages = (searchRequest, galleryPage) => {
      setIsLoading(true);

        try {
          fetchImages(searchRequest, galleryPage).then(data => {
            if (!data.data.hits.length) {
              return toast.error(
                'There is no images found with that search request'
              );
            }
            const mappedImages = data.data.hits.map(
              ({ id, webformatURL, tags, largeImageURL }) => ({
                id,
                webformatURL,
                tags,
                largeImageURL,
              })
            );
            setImages(image => [...image, ...mappedImages]);
          });
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
    };
    if (searchRequest !== '' || galleryPage !== 1) {
      updateImages(searchRequest, galleryPage);
    }
  }, [searchRequest, galleryPage]);


  const handleSearchSubmit = value => {
    if (value !== searchRequest) {
      setSearchRequest(value);
      setImages([])
      setGalleryPage(1);
      return;
    }
  };

  const loadMore = () => {
    setGalleryPage(galleryPage + 1)
  };

  const showModalImage = id => {
    const image = images.find(image => image.id === id);
    setShowModal({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  const closeModalImage = () => {
    setShowModal(null);
  };

  const btnDisable = images.length / galleryPage === 12;

    return (
      <>
        <Searchbar onSearch={handleSearchSubmit} />
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
        {isLoading && <Loader color={'#3f51b5'} size={32} />}
        {images.length > 0 && <ImageGallery images={images} handlePreview={showModalImage} />}
        {btnDisable && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal
            lgImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={closeModalImage}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
