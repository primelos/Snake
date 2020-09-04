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

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

class App extends Component {
  state = initialState

  
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders()
    this.checkIfCollapse()
    this.checkIfEat()
  }

  onKeyDown = (e) => {
    e = e || window.event
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'})
        break
      case 40:
        this.setState({direction: 'DOWN'})
        break
      case 37:
        this.setState({direction: 'LEFT'})
        break
      case 39:
        this.setState({direction: 'RIGHT'})
        break
      default:
        break
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]
    console.log(head)
    switch (this.state.direction){
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
      case 'UP':
        head = [head[0], head[1] - 2]
        break
      default:
        break
    }
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if( head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIfCollapse(){
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    console.log(snake.pop())
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    let food = this.state.food
    if (head[0] === food[0] && head[1] === food[1]){
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake()
      this.increaseSpeed()
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`)
    this.setState(initialState)
  }

  render(){
    return (
      <div>
        <div style={{paddingTop:'20px'}}>
        <a>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Snake Game In React
        </a>
        </div>
        <div className='game-area'>
          <Snake snakeDots={this.state.snakeDots}/>
          <Food food={this.state.food}/>
          
        </div>
        <p>* Press arrows for controls</p>
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
