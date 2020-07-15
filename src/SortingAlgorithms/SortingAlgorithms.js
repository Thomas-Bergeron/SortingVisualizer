export function getMergeSortEvents(array) {
	const animations = [];
	mergeSort(array.slice(), 0, array.length - 1, animations);
	return [animations];
};


function mergeSort(array, startIndex, endIndex, animations) {
	if (startIndex === endIndex) {
		return array;
	} else {
		const middleIndex = Math.floor((startIndex + endIndex) / 2);
		mergeSort(array, startIndex, middleIndex, animations);
		mergeSort(array, middleIndex + 1, endIndex, animations);
		return mergeArrays(array, startIndex, middleIndex, endIndex, animations);
	}
}

function mergeArrays(array, startIndex, middleIndex, endIndex, animations) {
	let mergedArray = [];
	let i = startIndex;
	let usedLeft = 0;
	let j = middleIndex + 1;
	while (i <= middleIndex && j <= endIndex) {
		animations.push([i + mergedArray.length - usedLeft, j ]);
		animations.push([i + mergedArray.length - usedLeft, j ]);
		if (array[i] <= array[j]) {
			animations.push([i + mergedArray.length - usedLeft++, mergedArray.length + startIndex, array[i]]);
			mergedArray.push(array[i++]);
		} else {
			animations.push([j, mergedArray.length + startIndex, array[j]]);
			mergedArray.push(array[j++]);
		}
	}
	
	while (i <= middleIndex) {
		animations.push([i + mergedArray.length - usedLeft, i + mergedArray.length - usedLeft]);
		animations.push([i + mergedArray.length - usedLeft, i + mergedArray.length - usedLeft]);
		animations.push([i + mergedArray.length - usedLeft++, mergedArray.length + startIndex, array[i]]);
		mergedArray.push(array[i++]);
	}
	
	while (j <= endIndex) {
		animations.push([j, j]);
		animations.push([j, j]);
		animations.push([j, mergedArray.length + startIndex, array[j]]);
		mergedArray.push(array[j++]);
	}
	
	for (let i = startIndex; i <= endIndex; i++) {
		array[i] = mergedArray[i - startIndex];
	}
	
	return array;
}

export function getQuickSortEvents(array) {
	const animations = [];
	quickSort(array.slice(), 0, array.length - 1, animations);
	return [animations];
};

function quickSort(array, startIndex, endIndex, animations) {
	if (startIndex >= endIndex) return;
	const p = partition(array, startIndex, endIndex, animations);
	quickSort(array, startIndex, p - 1, animations);
	quickSort(array, p, endIndex, animations);
}

function partition(array, startIndex, endIndex, animations){
	var i = startIndex;
	var j = endIndex;

	for (let k = startIndex; k <= endIndex; k++) {
		animations.push([1, k]);
	}
	
	var pivotIndex = Math.floor((i + j) / 2);
	animations.push([2, pivotIndex])
	const pivot = array[pivotIndex];

	animations.push([3, i]);
	animations.push([3, j]);

	while (i <= j) {
		while (array[i] < pivot) {
			animations.push([0, i]);
			i++;
			animations.push([3, i])
		}
		
		while (array[j] > pivot) {
			animations.push([0, j]);
			j--;
			animations.push([3, j]);
		}
		
		if (i <= j){
			animations.push([0, i]);
			animations.push([0, j]);

			animations.push([4, i, j]);
			
			swap(array, i, j);
			i++;
			j--;

			if (i < array.length) {
				animations.push([3, i]);
			}

			if (j > 0) {
				animations.push([3, j]);
			}
		}
	}

	if (i < array.length) {
		animations.push([0, i]);
	}

	if (j > 0) {
		animations.push([0, j]);
	}

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