import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import Bubble_Sort from '../sortingAlgorithms/Bubble/bubble';
import Insertion_Sort from '../sortingAlgorithms/InsertionSort/insertio';
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 400;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({array});
  }

  mergeSort() {
  
    
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    console.log(arrayBars);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
  
  }
  insertionSort() {
      const ani = Insertion_Sort(this.state.array);
      const bar = document.getElementsByClassName('array-bar');
      console.log('aaa', ani);
      for(let i = 0;i<ani.length;i++) {
        var z = ani[i];
        if(z[1]===-1) {
          const [x,y] = ani[i];
          const barColor = bar[x].style;
          setTimeout(()=>{
            barColor.backgroundColor = SECONDARY_COLOR;
          },i*40);
        } else{
          
          setTimeout(()=>{
          const[x,y] = ani[i];
          const barColor = bar[x].style;
          const barHeight = bar[x].style;
          const height = y;
            barColor.backgroundColor = SECONDARY_COLOR;
            barHeight.height = `${height}px`;
          },i*40)
        }
      }
      
      
      
  }
  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    const bar = document.getElementsByClassName('array-bar');
    const animation = Bubble_Sort(this.state.array);
    console.log(animation,'ss');
    console.log(bar,'..');
    
    for(let i = 1 ; i<animation.length;i++) {
        if(i%2 !== 0) {
         const [x,y] = animation[i];
         const ani1 = bar[x].style;
         const ani2 = bar[y].style;
         setTimeout(()=>{
           ani1.backgroundColor = 'red';
           ani2.backgroundColor = 'blue';

         },i*10)
         
         
        }else{
          const [x,y] = animation[i];
          const[x1,y1] = animation[i-1];
          const ani1 = bar[x1].style;
          const ani2 = bar[y1].style;
          setTimeout(() => {
            ani1.height = `${y}px`;
            ani2.height = `${x}px`;
          }, i*10);


        }
        
      
     
     /// console.log(x,'....');
      
    }
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
  }}></div>
        ))}
        <div>
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion_Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
