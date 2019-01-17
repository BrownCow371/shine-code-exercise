import React, { Component } from 'react';
import Log from './Log.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortedImages: [],
      images: [
        {
          id: 0,
          source: "https://via.placeholder.com/100?text=image0",
          alt: "Image0",
          clickCount: 0,
        },
        {
          id: 1,
          source: "https://via.placeholder.com/100?text=image1",
          alt: "Image1",
          clickCount: 0,
        },
        {
          id: 2,
          source: "https://via.placeholder.com/100?text=image2",
          alt: "Image2",
          clickCount: 0,
        },
        {
          id: 3,
          source: "https://via.placeholder.com/100?text=image3",
          alt: "Image3",
          clickCount: 0,
        },
        {
          id: 4,
          source: "https://via.placeholder.com/100?text=image4",
          alt: "Image4",
          clickCount: 0,
        },
        {
          id: 5,
          source: "https://via.placeholder.com/100?text=image5",
          alt: "Image5",
          clickCount: 0,
        },
        {
          id: 6,
          source: "https://via.placeholder.com/100?text=image6",
          alt: "Image6",
          clickCount: 0,
        },
        {
          id: 7,
          source: "https://via.placeholder.com/100?text=image7",
          alt: "Image7",
          clickCount: 0,
        }
      ]
    }
  }
  // Need to see if we can cleanup state
  // Also need to persist ClickCounts in SessionStorage for each image and load back into state on mount
  // Make sure all variables are declared with let or const
  // update README with takeaways.
  // Make pretty - can we make images bigger?
  // can we make log cleaner? - use table?

 
  componentDidMount(){
  
    // set orderClicked based on SessionStorage.order, if set
    let orderClicked = [];    
    if(sessionStorage.orderClicked){
      orderClicked = this.splitSessionStorage(sessionStorage.orderClicked);
    }
    // set the sortedImage list in sessionStorage and state
    // allows us to render images in correct order (state) and maintain order for next reload/refresh (sessionStorage)
    let sortedImages = [...orderClicked, ...this.remainingImages(orderClicked)];
    sessionStorage.setItem("sortedImages", sortedImages);
    this.setState((state) => {
      return {sortedImages: sortedImages}
    });

    // set images in state if sessionSorage contains images
    if(sessionStorage.images){
      this.setState((state)=> {
        return {images: JSON.parse(sessionStorage.images)}
      })
    }
   
    // Clear sessionStorage OrderClicked so it is reset and can be rebuilt for next reload
    sessionStorage.removeItem("orderClicked");
  }

  // helper function to split Session data into an array
  splitSessionStorage = (storage) => {
    return storage.split(",").map(element => parseInt(element, 10));
  }
  

  // determine which images have not been clicked in previous page load and set order accordingly
  remainingImages = (order) => {
    // if the images were previously rearrange per image clicking/page reload
    // use that previous order to set the order of the images that were not clicked in the last page load
    if (sessionStorage.sortedImages) {
      let sorted = this.splitSessionStorage(sessionStorage.sortedImages);
      let remaining =  sorted.filter((id) => (!order.includes(id)))
      return remaining;

    // if the images have never been clicked on (no sortedImages stored in SessionStorage) use the default order
    } else {
        return (
          this.state.images.filter((element) => (!order.includes(element.id))).map(element => element.id)
        )
      }
  }

// function to update click count
// Need to update this method to use splice instead of map - may be less costly?
  // upClickCount = (id) => {
  //   this.setState((state) => {
  //     return {
  //        images: state.images.map((image) => {
  //          if(image.id === id){
  //              image.clickCount++;
  //              return image;
  //          } else {
  //            return image;
  //          } 
  //        })
  //       }  
  //    })
  //   }

  // function to update click count and set sessionStorage
  upClickCount = (id) => {
    this.setState((state) => {
      let image = state.images[id];
      image.clickCount++;
      let array = state.images
      array.splice(id, 1, image)
      sessionStorage.setItem("images", JSON.stringify(array))
      return {
         images: array
        }  
     })
    }

  updateClickOrder = (eventId, id) => {
      let orderClicked = [];
      // set orderClicked to sessionStorage.orderClicked if available
      if (sessionStorage.orderClicked){
        orderClicked = this.splitSessionStorage(sessionStorage.orderClicked)
      }
      // if orderClicked does not already include the id of the clicked image, add it to the array
      if(eventId && !orderClicked.includes(id)){
        orderClicked.push(id); 
        sessionStorage.setItem("orderClicked", orderClicked);
      }
    }
  

  handleClick = (event) => {
    // get data-id of event
    let eventId = event.target.getAttribute('data-id')

    // make sure id is set to a number
    let id = parseInt(eventId,10)
    
    // update clickOrder
    this.updateClickOrder(eventId, id);
    
    // up the clickCount on the image in state 
    this.upClickCount(id);
  }


  // Create a Grid-cell component, move onClick to compnent, then don't need eventId above

  render() { 

    return (
      <div className="wrapper">
         <div className="grid-container" onClick={this.handleClick} >
            {this.state.sortedImages.map((id, i) => (
              <div key={i}><img src={this.state.images[id].source} alt={this.state.images[id].alt} data-id={id}/></div>
            ))}
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