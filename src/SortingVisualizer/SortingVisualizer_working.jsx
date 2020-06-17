import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'

const NB_ELEMENTS_INIT = 200;
const MIN_ELEMENTS = 5;
const MAX_ELEMENTS = 400;
const MIN_ELEMENT_VALUE = 5;
const MAX_ELEMENT_VALUE = 900;

const DEFAULT_SLEEP_TIME = 10;
const MIN_SLEEP_TIME = 1;
const MAX_SLEEP_TIME = 1000;

export class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			sleep: DEFAULT_SLEEP_TIME,
		};
	}

	componentDidMount() {
		this.generateArray(NB_ELEMENTS_INIT);
	}

	generateArray(nbElements) {
		const array = [];
		for (let i = 0; i < nbElements; i++) {
			array.push(randomIntFromInterval(MIN_ELEMENT_VALUE, MAX_ELEMENT_VALUE));
		}
		this.setState({array});
	}

	mergeSort() {
		const [sortedArray, animations] = SortingAlgorithms.getMergeSortEvents(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');

		for (let i = 0; i < animations.length; i++) {
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneId, barTwoId] = animations[i];
				const color = i % 3 === 0 ? 'red': 'lightblue';
				setTimeout(() => {
					// console.log(i);
					arrayBars[barOneId].style.backgroundColor = color;
					arrayBars[barTwoId].style.backgroundColor = color;
				}, i * this.state.sleep);
			} else {
				setTimeout(() => {
					const [barId, value] = animations[i];
					arrayBars[barId].style.height = `${value/2}px`;
				}, i * this.state.sleep);
			}
		}
		 setTimeout(() => {
		 	this.setState({array: sortedArray});
		 }, animations.length * this.state.sleep);
	}
	
	quickSort() {

	}

	heapSort() {

	}

	bubbleSort() {

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
						<input type="radio" name="algorithms" id="merge"></input>
							<label htmlFor="merge" className="algorithm-label algo1">
								<span>Merge Sort</span>
							</label>
						<input type="radio" name="algorithms" id="quick"></input>
							<label htmlFor="quick" className="algorithm-label algo2">
								<span>Quick Sort</span>
							</label>
						<input type="radio" name="algorithms" id="heap"></input>
							<label htmlFor="heap" className="algorithm-label algo3">
								<span>Heap Sort</span>
							</label>
						<input type="radio" name="algorithms" id="bubble"></input>
							<label htmlFor="bubble" className="algorithm-label algo4">
								<span>Bubble Sort</span>
							</label>
					</div>
					<button className="button round-button" onClick={() => this.mergeSort()}>Sort!</button>
				</div>

			</div>
			
			)
	}
}

function randomIntFromInterval (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;