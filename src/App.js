import React, { Component } from 'react';
import Log from './Log.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickOrder: [],
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

  splitSessionStorage = (storage) => {
    return storage.split(",").map(element => parseInt(element, 10))
  }
  
  componentDidMount(){
  
    // set orderClicked based on SessionStorage.order, if set
    let orderClicked = [];
    
    if(sessionStorage.orderClicked){
      orderClicked = this.splitSessionStorage(sessionStorage.orderClicked);
    }

    let sortedImages = [...orderClicked, ...this.remainingImages(orderClicked)];
    
    sessionStorage.setItem("sortedImages", sortedImages);
    sessionStorage.removeItem("orderClicked");

    this.setState((state) => {
      return {sortedImages: sortedImages}
    })
  }

  remainingImages = (order) => {
    if (sessionStorage.sortedImages) {
      let sorted = this.splitSessionStorage(sessionStorage.sortedImages);
      let remaining =  sorted.filter((id) => (!order.includes(id)))
      return remaining;
    } else {
        return (
          this.state.images.filter((element) => (!order.includes(element.id))).map(element => element.id)
        )
      }
  }


  upClickCount = (id) => {
    this.setState((state) => {
      return {
         images: state.images.map((image) => {
           if(image.id === id){
               image.clickCount++;
               return image;
           } else {
             return image;
           } 
         })
       } 
     })
  }

  updateClickOrder = (eventId, id) => {
      let orderClicked = [];

      if (sessionStorage.orderClicked){
        orderClicked = this.splitSessionStorage(sessionStorage.orderClicked)
      }

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