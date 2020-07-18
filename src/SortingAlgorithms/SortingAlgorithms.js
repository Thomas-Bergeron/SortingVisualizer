// calls the mergeSort and returns the animations array
export function getMergeSortEvents(array) {
	const animations = [];
	mergeSort(array.slice(), 0, array.length - 1, animations);
	return [animations];
};

// mergeSort function
function mergeSort(array, startIndex, endIndex, animations) {
	// only one element so no need to sort anymore
	if (startIndex === endIndex) {
		return array;
	} else {
		// finds the middleIndex of the array
		const middleIndex = Math.floor((startIndex + endIndex) / 2);

		//mergeSort the left and right parts of the array
		mergeSort(array, startIndex, middleIndex, animations);
		mergeSort(array, middleIndex + 1, endIndex, animations);

		// return the left and right arrays merged together
		return mergeArrays(array, startIndex, middleIndex, endIndex, animations);
	}
}

// merges two arrays in sorted order
function mergeArrays(array, startIndex, middleIndex, endIndex, animations) {
	let mergedArray = [];
	let i = startIndex;
	let usedLeft = 0;
	let j = middleIndex + 1;

	// not at the end of the left or right part
	while (i <= middleIndex && j <= endIndex) {
		// compare the left and the right indexes value
		animations.push([i + mergedArray.length - usedLeft, j ]);
		animations.push([i + mergedArray.length - usedLeft, j ]);
		if (array[i] <= array[j]) {
			// put i value in the sorted array
			animations.push([i + mergedArray.length - usedLeft++, mergedArray.length + startIndex, array[i]]);
			mergedArray.push(array[i++]);
		} else {
			// put j value in the sorted array
			animations.push([j, mergedArray.length + startIndex, array[j]]);
			mergedArray.push(array[j++]);
		}
	}
	
	while (i <= middleIndex) {
		// put every remaining values from the left side in the sorted array
		animations.push([i + mergedArray.length - usedLeft, i + mergedArray.length - usedLeft]);
		animations.push([i + mergedArray.length - usedLeft, i + mergedArray.length - usedLeft]);
		animations.push([i + mergedArray.length - usedLeft++, mergedArray.length + startIndex, array[i]]);
		mergedArray.push(array[i++]);
	}
	
	while (j <= endIndex) {
		// put every remaining values from the right side in the sorted array
		animations.push([j, j]);
		animations.push([j, j]);
		animations.push([j, mergedArray.length + startIndex, array[j]]);
		mergedArray.push(array[j++]);
	}
	
	// place the sorted elements into the original array
	for (let i = startIndex; i <= endIndex; i++) {
		array[i] = mergedArray[i - startIndex];
	}
	
	return array;
}

// calls the quickSort and returns the animations array
export function getQuickSortEvents(array) {
	const animations = [];
	quickSort(array.slice(), 0, array.length - 1, animations);
	return [animations];
};

// quickSort function
function quickSort(array, startIndex, endIndex, animations) {
	// only one element, already sorted
	if (startIndex >= endIndex) return;

	// partition the entire array
	const p = partition(array, startIndex, endIndex, animations);

	// quicksort left and right part of the partition middle element
	quickSort(array, startIndex, p - 1, animations);
	quickSort(array, p, endIndex, animations);
}

// selects the middle element as a pivot value and puts all higher values to the right and lower values to the left
function partition(array, startIndex, endIndex, animations){
	var i = startIndex;
	var j = endIndex;

	// sets entire array as yellow in animation
	for (let k = startIndex; k <= endIndex; k++) {
		animations.push([1, k]);
	}
	
	// selects the middle element as pivot index
	var pivotIndex = Math.floor((i + j) / 2);
	// sets the index red in the animation
	animations.push([2, pivotIndex])
	// save the pivot value (important when the value changes place,
	// you still need to compare to the same value, not the new one)
	const pivot = array[pivotIndex];

	
	while (i <= j) {
		// set comparing indexes to comparing color
		animations.push([3, i]);
		animations.push([3, j]);

		// find the first element greater than pivot from the left side
		while (array[i] < pivot) {
			// set the index at normal color
			animations.push([0, i]);
			i++;
			// set the comparing color to the new index
			animations.push([3, i])
		}
		
		// find the first element lower than pivot from the right side
		while (array[j] > pivot) {
			// set the index at normal color
			animations.push([0, j]);
			j--;
			// set the comparing color to the new index
			animations.push([3, j]);
		}
		
		// new elements, needs swap
		if (i <= j){
			// set indexes to regular color
			animations.push([0, i]);
			animations.push([0, j]);

			// add animation to swap elements
			animations.push([4, i, j]);
			// swap elements
			swap(array, i, j);
			// increment elements
			i++;
			j--;
		}
	}
	
	if (i < array.length) {
		// return i index to regular color
		animations.push([0, i]);
	}
	
	if (j > 0) {
		// return j index to regular color
		animations.push([0, j]);
	}

	// returns pivot index
	return i;
}


export function getHeapSortEvents(array) {
	const animations = [];
	heapSort(array.slice(), array.length, animations);
	return [animations];
}

function heapSort(array, nbElements, animations) {
	heapify(array, nbElements, animations);

	let end = nbElements - 1;
	while (end > 0) {
		animations.push([2, 0, end]);
		swap(array, end, 0);
		end--;
		siftDown(array, 0, end, animations);
	}
}

function heapify(array, nbElements, animations) {
	let start = indexParentHeap(nbElements - 1);
	while (start >= 0) {
		siftDown(array, start, nbElements - 1, animations);
		start--;
	}
}

function siftDown(array, start, end, animations) {
	let root = start;
	while (indexLeftHeap(root) <= end) {
		let child = indexLeftHeap(root);
		let swapIndex = root;

		animations.push([1, swapIndex]);
		animations.push([1, child]);
		animations.push([0, swapIndex]);
		animations.push([0, child]);
		if (array[swapIndex] < array[child]) {
			swapIndex = child;
		}
		
		
		if (child + 1 <= end && array[swapIndex] < array[child + 1]) {
			animations.push([1, swapIndex]);
			animations.push([1, child + 1]);
			animations.push([0, swapIndex]);
			animations.push([0, child + 1]);
			swapIndex = child + 1;
		}
		
		
		animations.push([1, swapIndex]);
		animations.push([1, root]);
		animations.push([0, swapIndex]);
		animations.push([0, root]);
		if (swapIndex === root) {
			return;
		} else {
			animations.push([2, root, swapIndex]);
			swap(array, root, swapIndex);
			root = swapIndex;
		}
	}
}

function indexParentHeap(element) {
	return Math.floor((element - 1) / 2);
}

function indexLeftHeap(element) {
	return 2 * element + 1;
}

function swap(array, firstIndex, secondIndex) {
	let temp = array[firstIndex];
	array[firstIndex] = array[secondIndex];
	array[secondIndex] = temp;
}

export function getBubbleSortEvents(array) {
	const animations = [];
	bubbleSort(array.slice(), array.length, animations);
	return [animations];
}

function bubbleSort(array, length, animations) {
	let isSorted = true;
	for (let i = 0; i < length - 1; i++) {
		animations.push([1, i, i + 1]);
		animations.push([0, i, i + 1]);
		if (array[i] > array[i + 1]) {
			isSorted = false;
			animations.push([2, i, i + 1]);
			swap(array, i, i + 1);
		}
	}

	if (!isSorted) {
		bubbleSort(array, length, animations);
	}
}