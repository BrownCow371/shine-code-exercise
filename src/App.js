import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clickOrder: [],
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
  
    console.log("SessionStorage at Mount", sessionStorage.order);
    // set clickOrder in State based on SessionStorage.order if set

    let order = []

    if(sessionStorage.order){
      order = sessionStorage.order.split(",").map(element => parseInt(element));

      this.setState((state)=>{
        return {clickOrder: order}
      })
    } else {
      this.setState((state)=> {
        return {clickOrder: order}
      })
    }
    console.log("State on Mount", this.state.clickOrder);
  }

  handleClick = (event) => {
    console.log("1) Check Session Order before handle click:", sessionStorage.order)

    // get data-id of event
    let eventId = event.target.getAttribute('data-id')
    console.log("2) EventId:", eventId);

    // make sure id is set to a number
    let id = parseInt(eventId,10)
    
    // make sure id is not null (clicked on something other than an image) - cannot use id since 0 as a number is false
    // check that id is not already in the clickOrder array
    // add id to array if is is not already there and update SessionStorage
    console.log("3) clickOrder Includes ID?:", this.state.clickOrder.includes(id));

    if(eventId && !this.state.clickOrder.includes(id)){
      this.setState((state) => {
        let order = [...state.clickOrder, id];
        sessionStorage.setItem("order", order);
        console.log("4) Storage inside Handle Click If statement", sessionStorage.order);
        return {clickOrder: order}
      })
   
    }
    // up the clickCount on the image in state 
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
  
    console.log("5) clickOrder", this.state.clickOrder)
    console.log("6) images", this.state.images)
  }


  render() {
    console.log("State on Render", this.state.clickOrder);
    console.log("Storage on Render", sessionStorage.order);


    let arrayOfCounts = this.state.images.map((image) => (
      {id: image.id, count: image.clickCount}
    )).sort((imageA, imageB) => (imageA.count - imageB.count))

    return (
      <div className="wrapper">
         <div className="grid-container" onClick={this.handleClick} >
            {this.state.images.map((image, i) => (
              <div key={i}><img src={image.source} alt={image.alt} data-id={image.id}/></div>
            ))}
        </div>
        <div>
            
        </div>
      </div>
    );
  }
}

export default App;