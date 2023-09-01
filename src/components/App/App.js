import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { fetchImages } from 'API';
import { Searchbar } from '../Searchbar/Searchbar';
import { Gallery } from '../ImageGallery/ImageGallery';
import { Pagination } from '../LoadMore/LoadMore';
import { Wrapper } from './App.styled'
import { Loader } from '../Loader/Loader'





export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };


  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1
    });
    
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const prevQuery = prevState.query;
    const searchQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== searchQuery || prevPage !== nextPage) {
      this.loadResult();
    }
  };

  loadResult = async () => {
    const searchQuery = this.state.query;
    const nextPage = this.state.page;

    try {
      this.setState({ loading: true });
      const { images, totalHits } = await fetchImages(searchQuery, nextPage);
      if (images && images.length) {
        this.setState(prevState => ({
          images: nextPage > 1 ? [...prevState.images, ...images] : images,
          totalHits: totalHits,
        }));
        
        this.setState({ loading: false });
      } else {
       
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === '') {
     
      return;
    }
    this.changeQuery(evt.target.elements.query.value);


    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  

  render () {
    const { loading, images, totalHits } = this.state;
    const hasMoreImages = images.length >0 && images.length < totalHits;
    return (
      <Wrapper>
        <Searchbar onSubmit={ this.handleSubmit } />
        { loading && <Loader /> }
        { images.length > 0 && <Gallery imgItems={ images } /> } 
        {hasMoreImages &&(
          <Pagination onClick={this.handleLoadMore}>Load More</Pagination>)}
        <Toaster position="top-right" reverseOrder={true}/>
      </Wrapper>
    )
  }
};
