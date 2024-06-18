const removeDuplicates = (arr) => {
    const uniqueElements = [];
    for (let i = 0; i < arr.length; i++) {
        let isUnique = true;
        for (let j = 0; j < uniqueElements.length; j++) {
            if (arr[i] === uniqueElements[j]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            uniqueElements.push(arr[i]);
        }
    }
    return uniqueElements;
}

const inputArray = [1, 2, 2, 3, 3, 3, 4, 5, 5,6,6,6,6,6];
console.log(removeDuplicates(inputArray));