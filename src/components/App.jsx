import React from "react";
import { useState, useRef, useEffect} from 'react';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { PixabayAPI } from '../pixabayAPI';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from "./App.module.css";


const pixabayAPI = new PixabayAPI(); 

export const App = () => {
    const previousKeyWordRef = useRef('');
    const [keyWord, setKeyWord] = useState('');
    const [error, setError] = useState(false);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [morePics, setMorePics] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearchImg = searchWord => {
        setKeyWord((searchWord), setPage(1))
    }

    const  hamdleLoadMoreButton = () => {
        setPage(prevState => prevState + 1);
    }

    useEffect(() => {
        if (!keyWord) {
            return
        }

        const fetchPicData = async () => {
        pixabayAPI.q = keyWord.trim();
        pixabayAPI.page = page;

        try {
            if (previousKeyWordRef.current !== keyWord) {
                setImages([])
            }
        
        
            setError(false);
            setIsLoading(true);
    

            const { data: { totalHits, hits } } = await pixabayAPI.fetchPhotos()
            if (totalHits > 0) {
                const newHits = hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }));
                setImages(pverState => [...pverState, ...newHits]);

                const totalPage = Math.ceil(totalHits / pixabayAPI.perPage);
                setMorePics(totalPage !== page);
            }
        }
        catch (error) {
            setError(error);
            setImages([]);
            setMorePics(false);
        } finally {
            setIsLoading(false)
        };
        };
        
        fetchPicData();
        return () => {previousKeyWordRef.current = keyWord}
    }, [keyWord, page]
    );
    
    return (
      <div>
        <Searchbar handleSubmit={handleSearchImg} />
        <div className={css.container}>
          {!error && <ImageGallery images={images} />}
          {isLoading && <Loader/>}
          {morePics && <LoadMoreBtn handleClick={hamdleLoadMoreButton} />}
        </div>
      </div>
  );
}
