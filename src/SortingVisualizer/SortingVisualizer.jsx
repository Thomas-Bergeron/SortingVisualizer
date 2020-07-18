import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'


// Constants related to array elements
const NB_ELEMENTS_INIT = 50;
const MIN_ELEMENTS = 5;
const MAX_ELEMENTS = 100;
const MIN_ELEMENT_VALUE = 5;
const MAX_ELEMENT_VALUE = 900;

// Constants related to sleep
const DEFAULT_SLEEP_TIME = 10;
const MIN_SLEEP_TIME = 0;
const MAX_SLEEP_TIME = 500;

// Enum of all possible algorithms
const algorithms = {
	MERGE: 0,
	QUICK: 1,
	HEAP: 2,
	BUBBLE: 3,
}

export class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			sleep: DEFAULT_SLEEP_TIME,
			isAnimated: false,
			algorithm: algorithms.MERGE,
		};
	}

	componentDidMount() {
		// Generate first array
		this.generateArray(NB_ELEMENTS_INIT);
	}

	// Generates an array of nbElements with values between MIN_ELEMENT_VALUE and MAX_ELEMENT_VALUE
	generateArray(nbElements) {
		const array = [];
		// Loop through all elements
		for (let i = 0; i < nbElements; i++) {
			// Sets the element to a random value
			array.push(randomIntFromInterval(MIN_ELEMENT_VALUE, MAX_ELEMENT_VALUE));
		}
		this.setState({array});
	}
	
	// handles mergeSort animation
	async mergeSort() {
		// array containing other arrays that each represent an animation
		const [animations] = SortingAlgorithms.getMergeSortEvents(this.state.array);
		// to manipulate bars
		const arrayBars = document.getElementsByClassName('array-bar');
		
		// start the animation
		this.setState({isAnimated: true});

		// loop through all animations
		for (let i = 0; i < animations.length; i++) {
			// first two animations are color change and the third is a swap
			const isColorChange = i % 3 !== 2;

			if (isColorChange) {
				// get the bar IDs from an array in animation
				const [barOneId, barTwoId] = animations[i];
				// first color change is red, second is lightblue
				const color = i % 3 === 0 ? 'red': 'lightblue';
				// change bar color
				arrayBars[barOneId].style.backgroundColor = color;
				arrayBars[barTwoId].style.backgroundColor = color;
				// delay of the current sleep time
				await delay(this.state.sleep);
			} else {
				// get the information from the animation array
				const [removeIndex, addIndex, value] = animations[i];
				
				// change the element position
				const tempArray = this.state.array.slice();
				tempArray.splice(removeIndex, 1);
				tempArray.splice(addIndex, 0, value);
				this.setState({array: tempArray});

				// delay of the current sleep time
				await delay(this.state.sleep);
			}
		}
		// end the animation
		this.setState({isAnimated: false});
	}
	
	// handles quickSort animatoin
	async quickSort() {
		// array containing other arrays that each represent an animation
		const [animations] = SortingAlgorithms.getQuickSortEvents(this.state.array);
		// to manipulate bars
		const arrayBars = document.getElementsByClassName('array-bar');
		
		// start the animation
		this.setState({isAnimated: true});

		// loop through all the animations
		for (let i = 0; i < animations.length; i++) {
			// get information from the animation array
			const [animation, barOneId, barTwoId] = animations[i];
			
			// animation is a swap
			if (animation === 4) {
				// swap the elements
				let tempArray = this.state.array.slice();
				let value1 = tempArray[barOneId];
				let value2 = tempArray[barTwoId];
				tempArray.splice(barOneId, 1);
				tempArray.splice(barOneId, 0, value2);
				tempArray.splice(barTwoId, 1);
				tempArray.splice(barTwoId, 0, value1);
				this.setState({array: tempArray});
				
				// delay of the current sleep time
				await delay(this.state.sleep);
			} else {
				// select color to use
				let color = animation === 1 ? 'yellow' : animation === 2 ? 'red' : animation === 3 ? 'blue' : animation === 5 ? 'orange' : 'lightblue';
				
				// change bar color
				arrayBars[barOneId].style.backgroundColor = color;
				
				// delay of the current sleep time if the color is blue
				if (color === 'blue') {
					await delay(this.state.sleep);
				}
			}
		}
		// end of animation
		this.setState({isAnimated: false});
	}
	
	// handles heapSort animation
	async heapSort() {
		// array containing other arrays that each represent an animation
		const [animations] = SortingAlgorithms.getHeapSortEvents(this.state.array);
		// to manipulate bars
		const arrayBars = document.getElementsByClassName('array-bar');

		// start of animation
		this.setState({isAnimated: true});

		// loop through all the animations
		for (let i = 0; i < animations.length; i++) {
			// get information from animation array
			const [animation, barOneId, barTwoId] = animations[i];

			// animation is a swap
			if (animation === 2) {
				// swap elements
				let tempArray = this.state.array.slice();
				let value1 = tempArray[barOneId];
				let value2 = tempArray[barTwoId];
				tempArray.splice(barOneId, 1);
				tempArray.splice(barOneId, 0, value2);
				tempArray.splice(barTwoId, 1);
				tempArray.splice(barTwoId, 0, value1);
				this.setState({array: tempArray});
				await delay(this.state.sleep);
			} else {
				// select color to use
				let color = animation === 1 ? 'red' : 'lightblue';

				// change bar color
				arrayBars[barOneId].style.backgroundColor = color;

				// delay of the current sleep time if the color is red
				if (color === 'red') {
					await delay(this.state.sleep);
				}
			}
		}
		// end of animation
		this.setState({isAnimated: false});
	}

	async bubbleSort() {
		// array containing other arrays that each represent an animation
		const [animations] = SortingAlgorithms.getBubbleSortEvents(this.state.array);
		// to manipulate bars
		const arrayBars = document.getElementsByClassName('array-bar');

		// start of animation
		this.setState({isAnimated: true});

		// loop through all animations
		for (let i = 0; i < animations.length; i++) {
			// get information from animation array
			const [animation, barOneId, barTwoId] = animations[i];

			// animation is a swap
			if (animation === 2) {
				// swap the elements
				let tempArray = this.state.array.slice();
				let value1 = tempArray[barOneId];
				let value2 = tempArray[barTwoId];
				tempArray.splice(barOneId, 1);
				tempArray.splice(barOneId, 0, value2);
				tempArray.splice(barTwoId, 1);
				tempArray.splice(barTwoId, 0, value1);
				this.setState({array: tempArray});

				// delay of the current sleep time
				await delay(this.state.sleep);
			} else {
				// select color to use
				let color = animation === 1 ? 'red' : 'lightblue';

				// change bar color
				arrayBars[barOneId].style.backgroundColor = color;
				arrayBars[barTwoId].style.backgroundColor = color;

				// delay of current sleep time if color is red
				if (color === 'red') {
					await delay(this.state.sleep);
				}
			}
		}
		// end of animation
		this.setState({isAnimated: false});
	}

	// selects the current sorting algorithm and calls the correct method to animate
	sort() {
		switch (this.state.algorithm) {
			case algorithms.MERGE:
				this.mergeSort();
				break;
			case algorithms.QUICK:
				this.quickSort();
				break;
			case algorithms.HEAP:
				this.heapSort();
				break;
			case algorithms.BUBBLE:
				this.bubbleSort();
				break;
			default:
				break;
		}
	}

	// allows to change the selected algorithm and radio button
	handleRadioEvent(event){
		switch (event.target.id){
			case "merge":
				this.setState({algorithm: algorithms.MERGE});
				break;
			case "quick":
				this.setState({algorithm: algorithms.QUICK});
				break;
			case "heap":
				this.setState({algorithm: algorithms.HEAP});
				break;
			case "bubble":
				this.setState({algorithm: algorithms.BUBBLE});
				break;
			default:
				break;	
		}
	}

	render() {
		const {array, sleep, isAnimated} = this.state;
		
		return (
			<div className="whole-page">
				<div className="array-container">
				{array.map((value, index) => (
					<div
					className="array-bar"
					key={index}
					style={{
						height: `${value/2}px`,
						backgroundColor: 'lightblue',
					}}></div>
					))}
				</div>
				
				<div className="footer">
					<button className="button text-button" onClick={() => this.generateArray(this.state.array.length)} disabled={isAnimated}>Generate New Array</button>

					<div className="option-container">
						<div>
							<div className="slider-container">
								<label>Array Size</label>
								<label>{array.length}</label>
								<input
									type="range"
									id="sliderElements"
									className="slider"
									disabled={isAnimated}
									min={MIN_ELEMENTS}
									max={MAX_ELEMENTS}
									defaultValue={NB_ELEMENTS_INIT}
									onInput={event => this.generateArray(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<div className="slider-container">
								<label>Sorting Speed</label>
								<label>{parseFloat(((MAX_SLEEP_TIME - MIN_SLEEP_TIME - sleep) / (MAX_SLEEP_TIME - MIN_SLEEP_TIME) * 100).toFixed(1))} %</label>
								<input
									type="range"
									id="sliderSleep"
									className="slider"
									min={MIN_SLEEP_TIME}
									max={MAX_SLEEP_TIME}
									defaultValue={MAX_SLEEP_TIME - DEFAULT_SLEEP_TIME + MIN_SLEEP_TIME}
									onInput={event => this.setState({sleep: MAX_SLEEP_TIME - event.target.value + MIN_SLEEP_TIME})}
								/>
							</div>
						</div>
					</div>

					<div className="algorithm-container">
						<input type="radio" name="algorithms" id="merge" checked={this.state.algorithm === algorithms.MERGE}
																		onChange={(event) => {this.handleRadioEvent(event)}}
																		disabled={isAnimated}></input>
							<label htmlFor="merge" className="algorithm-label algo1">
								<span>Merge Sort</span>
							</label>
						<input type="radio" name="algorithms" id="quick" checked={this.state.algorithm === algorithms.QUICK}
																		onChange={(event) => {this.handleRadioEvent(event)}}
																		disabled={isAnimated}></input>
							<label htmlFor="quick" className="algorithm-label algo2">
								<span>Quick Sort</span>
							</label>
						<input type="radio" name="algorithms" id="heap" checked={this.state.algorithm === algorithms.HEAP}
																		onChange={(event) => {this.handleRadioEvent(event)}}
																		disabled={isAnimated}></input>
							<label htmlFor="heap" className="algorithm-label algo3">
								<span>Heap Sort</span>
							</label>
						<input type="radio" name="algorithms" id="bubble" checked={this.state.algorithm === algorithms.BUBBLE}
																		onChange={(event) => {this.handleRadioEvent(event)}}
																		disabled={isAnimated}></input>
							<label htmlFor="bubble" className="algorithm-label algo4">
								<span>Bubble Sort</span>
							</label>
					</div>
					<button className="button round-button" onClick={() => this.sort()} disabled={isAnimated}>Sort!</button>
				</div>

			</div>
			
			)
	}
}

// returns an int between the two provided values
function randomIntFromInterval (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// delay the number of ms provided and returns when it's done
function delay(ms) {
	return new Promise(res => setTimeout(res, ms));
}

export default SortingVisualizer;