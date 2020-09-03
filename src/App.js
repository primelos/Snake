import React, { Component } from 'react';
import Snake from './components/Snake'
import Food from './components/Food'


const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor(Math.random() * (max-min+1) / 2) * 2
  let y = Math.floor(Math.random() * (max-min+1) / 2) * 2
  return [x,y]
}

class App extends Component {
  state = {
    food: getRandomCoordinates(),
    snakeDots: [
      [0,0],
      [2,0]
    ]
  }
  
  render(){
    return (
      <div className='game-area'>
        <Snake snakeDots={this.state.snakeDots}/>
        <Food food={this.state.food}/>
      </div>
    );
  }
}

export default App;





// import React, { useState } from 'react';
// import Snake from './components/Snake'
// import Food from './components/Food'


// function App() {
//   const [snakeDots, setSnakeDots] = useState([
//     [0,0],
//     [2,0]
//   ])

//   const [food, setFood] = useState([
//     [6,8]
//   ])
  
//   return (
//     <div className='game-area'>
//       <Snake snakeDots={snakeDots}/>
//       <Food food={food}/>
//     </div>
//   );
// }

// export default App;
