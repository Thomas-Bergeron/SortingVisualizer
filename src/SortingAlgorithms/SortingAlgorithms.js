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
			
			let temp = array[i];
			array[i++] = array[j];
			array[j--] = temp;

			if (i - 1 === pivotIndex) {
				pivotIndex = j + 1;
				animations.push([2, pivotIndex]);
			} else if (j + 1 === pivotIndex) {
				pivotIndex = i - 1;
				animations.push([2, pivotIndex]);
			}

			if (i < array.length) {
				animations.push([3, i]);
			}

			if (j > 0) {
				animations.push([3, j]);
			}
		}
	}
	animations.push([0, pivotIndex]);

	if (i < array.length) {
		animations.push([0, i]);
	}

	if (j > 0) {
		animations.push([0, j]);
	}

	
	return i;
}