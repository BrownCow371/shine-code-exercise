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
      // sessionStorage.clear();
      console.log("orderClicked inside Mount:", orderClicked)
    }

    // this.setState((state)=>{
    //   sessionStorage.clear();
    //   return {clickOrder: order}
    // })

    // console.log("Session on Mount:", sessionStorage.order)

    // set sorted order in state based on ClickOrder and RemainingImages 
    // and store sortedImages in sessionStorage
    console.log("session sorted before set in mount:", sessionStorage.sortedImages)

    let sortedImages = [...orderClicked, ...this.remainingImages(orderClicked)];
    
    sessionStorage.setItem("sortedImages", sortedImages);
    sessionStorage.removeItem("orderClicked");

    this.setState((state) => {
      return {sortedImages: sortedImages}
    })
    console.log("SortedImages inside Mount:", sortedImages)
  }

  // remainingImages = (order) => {
  //   return (
  //     this.state.images.filter((element) => {
  //       if (!order.includes(element.id)) {
  //         return element
  //       }
  //     }).map(element => element.id)
  //   )
  // }

  // this is not working - need to modify so that non-clicked image order is maintained on Reload
  remainingImages = (order) => {
    if (sessionStorage.sortedImages) {
      let sorted = this.splitSessionStorage(sessionStorage.sortedImages);
      console.log("where is my zero in remaining:", sorted);
      console.log("Order inside Remaining:", order);
      let remaining =  sorted.filter((id) => (!order.includes(id)))
        //   if (!order.includes(id)) {
        //     console.log("Inside filter:", id, !order.includes(id))
        //     return id;
        //   }
        // })
        console.log("remaining:", remaining)
        return remaining;
    } else {
    return (
      this.state.images.filter((element) => (!order.includes(element.id))).map(element => element.id)

    )}
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

  // updateClickOrder = (eventId, id) => {
  //   // make sure id is not null (clicked on something other than an image) - cannot use id since 0 as a number is false
  //   // check that id is not already in the clickOrder array
  //   // add id to array if is is not already there and update SessionStorage
  //   if(eventId && !this.state.clickOrder.includes(id)){
  //     this.setState((state) => {
  //       let order = [...state.clickOrder, id];
  //       sessionStorage.setItem("order", order);
  //       console.log("Order:", order);
  //       return {clickOrder: order}
  //     })
  //   }
  // }

  updateClickOrder = (eventId, id) => {
      let orderClicked = [];

      if (sessionStorage.orderClicked){
        orderClicked = this.splitSessionStorage(sessionStorage.orderClicked)
      }

      if(eventId && !orderClicked.includes(id)){
        orderClicked.push(id); 
        sessionStorage.setItem("orderClicked", orderClicked);
        console.log("Order:", orderClicked);
        // return {clickOrder: order}
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