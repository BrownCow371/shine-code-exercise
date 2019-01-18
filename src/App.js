import React, { Component } from 'react';
import Log from './Log.js';
import GridCell from './GridCell.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortedImages: [],
      images: {
        0:           
          {
            source: "https://via.placeholder.com/100?text=image0",
            alt: "Image0",
            clickCount: 0,
          },
        1:           
          {
            source: "https://via.placeholder.com/100?text=image1",
            alt: "Image1",
            clickCount: 0,
          }, 
        2:           
          {
            source: "https://via.placeholder.com/100?text=image2",
            alt: "Image2",
            clickCount: 0,
          }, 
        3:           
          {
            source: "https://via.placeholder.com/100?text=image3",
            alt: "Image3",
            clickCount: 0,
          }, 
        4:           
          {
            source: "https://via.placeholder.com/100?text=image4",
            alt: "Image4",
            clickCount: 0,
          }, 
        5:           
          {
            source: "https://via.placeholder.com/100?text=image5",
            alt: "Image5",
            clickCount: 0,
          }, 
        6:           
          {
            source: "https://via.placeholder.com/100?text=image6",
            alt: "Image6",
            clickCount: 0,
          }, 
        7:           
          {
            source: "https://via.placeholder.com/100?text=image7",
            alt: "Image7",
            clickCount: 0,
          }, 
        }
    }
  }
  
  componentDidMount(){  
    // set sortedImages based on SessionStorage.order, if set
    // allows us to render images in correct order (state) and maintain order for next reload/refresh (sessionStorage)
    let orderClicked = [];
    let sortedImages= [];

    if(sessionStorage.orderClicked){
      orderClicked = this.splitSessionStorage(sessionStorage.orderClicked);
     }

    //  reset sort order in state and Session Storage
    sortedImages = [...orderClicked, ...this.remainingImages(orderClicked)];
    sessionStorage.setItem("sortedImages", sortedImages);
    this.setState((state) => {
        return {sortedImages: sortedImages}
      })
    
    // set images in state if sessionSorage contains images
    if(sessionStorage.images){
      this.setState((state)=> {
        return {images: JSON.parse(sessionStorage.images)}
      })
    }
   
    // Clear sessionStorage OrderClicked so it can be rebuilt for next reload
    sessionStorage.removeItem("orderClicked");
  }

  // helper function to split Session data into an array
  splitSessionStorage = (storage) => {
    return storage.split(",").map(element => parseInt(element, 10));
  }
  

  // determine which images have not been clicked in previous page load 
  // and set order accordingly using previous sort order
  remainingImages = (order) => {
    // use the previous order (if set) to set the order of the images that were not clicked in the last page load
    if (sessionStorage.sortedImages) {
      let sorted = this.splitSessionStorage(sessionStorage.sortedImages);
      let remaining =  sorted.filter((id) => (!order.includes(id)));
      return remaining;
    // if there is no prevous order (images have never been clicked) use the default order
    } else {
        return (
          Object.keys(this.state.images)
        )
      }
  }

  // function to update click count and set sessionStorage
  upClickCount = (id) => {
    this.setState((state) => {
      // find correct image and update the clickCount
      let image = state.images[id];
      image.clickCount++;
      // update the object of images with updated image
      let images = state.images;
      images[id] = image;
      // update object of images in sessionStorage and state
      sessionStorage.setItem("images", JSON.stringify(images))
      return {
         images: images
        }  
     })
    }

  // helper function to set clickOrder per page load
  updateClickOrder = (id) => {
    let orderClicked = [];
    // set orderClicked to sessionStorage.orderClicked if available
    if (sessionStorage.orderClicked){
      orderClicked = this.splitSessionStorage(sessionStorage.orderClicked)
    }
    // if orderClicked does not already include the id of the clicked image, add it to the array
    if(!orderClicked.includes(id)){
      orderClicked.push(id); 
      sessionStorage.setItem("orderClicked", orderClicked);
    }
  }
  

  handleClick = (event) => {
    // make sure id is set to a number
    let id = parseInt(event.target.getAttribute('data-id'),10)
    
    // update clickOrder
    this.updateClickOrder(id);

    // up the clickCount on the image in state 
    this.upClickCount(id);
  }


  render() { 

    return (
      <div className="wrapper">
         <div className="grid-container">
            <GridCell
              images={this.state.images}
              handleClick={this.handleClick}
              sortedImages={this.state.sortedImages}
            />
        </div>
        <div>
            <Log
              images={this.state.images}
            />
        </div>
      </div>
    );
  }
}

export default App;