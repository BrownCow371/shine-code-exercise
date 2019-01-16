import React, { Component } from 'react';
import Log from './Log.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickOrder: [],
      sortedImages: [0, 1, 2, 3, 4, 5, 6, 7],
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

  
  componentDidMount(){
  
    // set clickOrder in State based on SessionStorage.order if set
    let order = [];
    
    if(sessionStorage.order){
      order = sessionStorage.order.split(",").map(element => parseInt(element));
    }

    this.setState((state)=>{
      return {clickOrder: order}
    })

    // console.log("Session on Mount:", sessionStorage.order)

    // set sorted order in state based on ClickOrder and RemainingImages
    let sortedImages = [...order, ...this.remainingImages(order)];
    this.setState({sortedImages: sortedImages})
  }

  remainingImages = (order) => {
    return (
      this.state.images.filter((element) => {
        if (!order.includes(element.id)) {
          return element
        }
      }).map(element => element.id)
    )
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
    // make sure id is not null (clicked on something other than an image) - cannot use id since 0 as a number is false
    // check that id is not already in the clickOrder array
    // add id to array if is is not already there and update SessionStorage
    if(eventId && !this.state.clickOrder.includes(id)){
      this.setState((state) => {
        let order = [...state.clickOrder, id];
        sessionStorage.setItem("order", order);
        return {clickOrder: order}
      })
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

    console.log("Sorted Images:", this.state.sortedImages)

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