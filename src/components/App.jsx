import React from "react";
// import { Component } from 'react';
import { useState, useRef } from 'react';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { PixabayAPI } from './FetchPic/FetchPic';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from "./App.module.css";
import { useState } from "react";


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
        this.setState({
          error,
          images: [],
          morePics: false,
        })
      } finally {
        this.setState({ isLoading: false })
      };
    
  }
    
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

export class OldApp extends Component{
  state = {
    keyWord: '',
    error: false,
    images: [],
    page: 1,
    morePics: false,
    showModal: false,
    isLoading: false
  }


  handleSearchImg = searchWord => {
    this.setState({
      keyWord: searchWord,
      page: 1,
    })
  }

  hamdleLoadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }


  componentDidUpdate = async (_, prevState) => {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {

      pixabayAPI.q = keyWord.trim();
      pixabayAPI.page = page;

      try { 
        if (prevState.keyWord !== keyWord) {
          this.setState({
            images: [],
          })
        }
        
        this.setState({
          error: false,
          isLoading: true,
        })

        const { data: { totalHits, hits } } = await pixabayAPI.fetchPhotos()
          if (totalHits > 0) {
            const newHits = hits.map(({ id, webformatURL, largeImageURL }) => ({ id, webformatURL, largeImageURL }))
            this.setState(pverState => ({
              images: [...pverState.images, ...newHits],
            }))

          const totalPage = Math.ceil(totalHits / pixabayAPI.perPage);
          this.setState({morePics: totalPage !== page,})
        }
      }
      catch (error) {
        this.setState({
          error,
          images: [],
          morePics: false,
        })
      } finally {
        this.setState({ isLoading: false })
      };
    }
  }
  
  render() {
    const { images, error, morePics, isLoading} = this.state;
    return (
      <div>
        <Searchbar handleSubmit={this.handleSearchImg} />
        <div className={css.container}>
          {!error && <ImageGallery images={images} />}
          {isLoading && <Loader/>}
          {morePics && <LoadMoreBtn handleClick={this.hamdleLoadMoreButton} />}
        </div>
      </div>
  );
  }
};