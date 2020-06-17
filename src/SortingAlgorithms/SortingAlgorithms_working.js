export function getMergeSortEvents(array) {
	const animations = [];
	const sortedArray = mergeSort(array.slice(), 0, array.length - 1, animations);
	return [sortedArray, animations];
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
	let j = middleIndex + 1;
	while (i <= middleIndex && j <= endIndex) {
		animations.push([i, j]);
		animations.push([i, j]);
		if (array[i] <= array[j]) {
			animations.push([mergedArray.length + startIndex, array[i]]);
			mergedArray.push(array[i++]);
		} else {
			animations.push([mergedArray.length + startIndex, array[j]]);
			mergedArray.push(array[j++]);
		}
	}
	
	while (i <= middleIndex) {
		animations.push([i, i]);
		animations.push([i, i]);
		animations.push([mergedArray.length + startIndex, array[i]]);
		mergedArray.push(array[i++]);
	}
	
	while (j <= endIndex) {
		animations.push([j, j]);
		animations.push([j, j]);
		animations.push([mergedArray.length + startIndex, array[j]]);
		mergedArray.push(array[j++]);
	}

	for (let i = startIndex; i <= endIndex; i++) {
		array[i] = mergedArray[i - startIndex];
	}

	return array;
}