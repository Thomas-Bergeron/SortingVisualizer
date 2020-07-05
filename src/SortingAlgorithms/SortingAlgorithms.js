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
	quickSort(array, 0, array.length - 1, animations);
	return array;
};

function quickSort(array, startIndex, endIndex, animations) {
	if (startIndex >= endIndex) return;
	const p = partition(array, startIndex, endIndex, animations);
	quickSort(array, startIndex, p - 1, animations);
	quickSort(array, p, endIndex, animations);
}

function partition(array, startIndex, endIndex, animations){
	const pivot = array[Math.floor((startIndex + endIndex) / 2)];
	while (startIndex <= endIndex) {
		while (array[startIndex] < pivot) {
			startIndex++;
		}

		while (array[endIndex] > pivot) {
			endIndex--;
		}

		if (startIndex <= endIndex){
			let temp = array[startIndex];
			array[startIndex++] = array[endIndex];
			array[endIndex--] = temp;
		}
	}
	return startIndex;
}