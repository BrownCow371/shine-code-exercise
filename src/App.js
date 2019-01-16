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

  render() {

    return (
      <div className="wrapper">
         <div className="grid-container" >
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