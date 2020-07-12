import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'

const NB_ELEMENTS_INIT = 50;
const MIN_ELEMENTS = 5;
const MAX_ELEMENTS = 100;
const MIN_ELEMENT_VALUE = 5;
const MAX_ELEMENT_VALUE = 900;

const DEFAULT_SLEEP_TIME = 10;
const MIN_SLEEP_TIME = 1;
const MAX_SLEEP_TIME = 1000;

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
			animation: false,
			algorithm: algorithms.MERGE,
		};
	}

	componentDidMount() {
		this.generateArray(NB_ELEMENTS_INIT);
	}

	generateArray(nbElements) {
		if (!this.state.animation) {
			const array = [];
			for (let i = 0; i < nbElements; i++) {
				array.push(randomIntFromInterval(MIN_ELEMENT_VALUE, MAX_ELEMENT_VALUE));
			}
		this.setState({array});
		}
	}
	
	async mergeSort() {
		const [animations] = SortingAlgorithms.getMergeSortEvents(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		
		this.setState({animation: true});
		for (let i = 0; i < animations.length; i++) {
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneId, barTwoId] = animations[i];
				const color = i % 3 === 0 ? 'red': 'lightblue';
				// if (this.state.sleep > 0){
					// setTimeout(() => {
						arrayBars[barOneId].style.backgroundColor = color;
						arrayBars[barTwoId].style.backgroundColor = color;
						await delay(this.state.sleep);
						// }, i * this.state.sleep);
				// }
			} else {
				// setTimeout(() => {
					const [removeIndex, addIndex, value] = animations[i];
					const tempArray = this.state.array.slice();
					tempArray.splice(removeIndex, 1);
					tempArray.splice(addIndex, 0, value);
					this.setState({array: tempArray});
					await delay(this.state.sleep);
					// }, i * this.state.sleep);
				}
			}
			this.setState({animation: false});
	}
	
	async quickSort() {
		const [animations] = SortingAlgorithms.getQuickSortEvents(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
		
		this.setState({animation: true});
		for (let i = 0; i < animations.length; i++) {
			const [animation, barOneId, barTwoId] = animations[i];
			if (animation === 4) {
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
				let color = animation === 1 ? 'yellow' : animation === 2 ? 'red' : animation === 3 ? 'blue' : animation === 5 ? 'orange' : 'lightblue';
				arrayBars[barOneId].style.backgroundColor = color;
				if (color === 'blue') {
					await delay(this.state.sleep);
				}
			}
		}
		this.setState({animation: false});
	}
	
	async heapSort() {
		// const tempArray = SortingAlgorithms.getHeapSortEvents(this.state.array);
		// this.setState({array: tempArray});
		const [animations] = SortingAlgorithms.getHeapSortEvents(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');

		this.setState({animation: true});
		console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const [animation, barOneId, barTwoId] = animations[i];
			if (animation === 2) {
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
				let color = animation === 1 ? 'red' : 'lightblue';
				arrayBars[barOneId].style.backgroundColor = color;
				if (color === 'red') {
					await delay(this.state.sleep);
				}
			}
		}
		this.setState({animation: false});
	}

	bubbleSort() {

	}

	sort() {
		if (!this.state.animation) {
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
	}

	handleRadioEvent(event){
		if (!this.state.animation) {
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
	}

	render() {
		const {array, sleep} = this.state;
		
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

				{/* <div className="footer-top"></div> */}
				
				<div className="footer">
					<button className="button text-button" onClick={() => this.generateArray(this.state.array.length)}>Generate New Array</button>

					<div className="option-container">
						<div>
							<div className="slider-container">
								<label>Array Size</label>
								<label>{array.length}</label>
								<input
									type="range"
									id="sliderElements"
									className="slider"
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
								<label>{sleep}</label>
								<input
									type="range"
									id="slider2"
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
																		onChange={(event) => {this.handleRadioEvent(event)}}></input>
																		{/* //onChange={event => this.setState({algorithm: algorithms.MERGE})}></input> */}
							<label htmlFor="merge" className="algorithm-label algo1">
								<span>Merge Sort</span>
							</label>
						<input type="radio" name="algorithms" id="quick" checked={this.state.algorithm === algorithms.QUICK}
																		onChange={(event) => {this.handleRadioEvent(event)}}></input>
																		{/* //onChange={event => this.setState({algorithm: algorithms.QUICK})}></input> */}
							<label htmlFor="quick" className="algorithm-label algo2">
								<span>Quick Sort</span>
							</label>
						<input type="radio" name="algorithms" id="heap" checked={this.state.algorithm === algorithms.HEAP}
																		onChange={(event) => {this.handleRadioEvent(event)}}></input>
																		{/* onChange={event => this.setState({algorithm: algorithms.HEAP})}></input> */}
							<label htmlFor="heap" className="algorithm-label algo3">
								<span>Heap Sort</span>
							</label>
						<input type="radio" name="algorithms" id="bubble" checked={this.state.algorithm === algorithms.BUBBLE}
																		onChange={(event) => {this.handleRadioEvent(event)}}></input>
																		{/* onChange={event => this.setState({algorithm: algorithms.BUBBLE})}></input> */}
							<label htmlFor="bubble" className="algorithm-label algo4">
								<span>Bubble Sort</span>
							</label>
					</div>
					<button className="button round-button" onClick={() => this.sort()}>Sort!</button>
				</div>

			</div>
			
			)
	}
}

function randomIntFromInterval (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function delay(ms) {
	return new Promise(res => setTimeout(res, ms));
}

export default SortingVisualizer;