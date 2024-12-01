const fs = require('fs');
const path = require('path');

const { quickSort } = require('../../utils/quicksort');

function processInput() {
    const rawFile = fs.readFileSync(path.join(__dirname, 'input.txt'), {
        encoding: 'utf-8',
    });

    const list1 = [];
    const list2 = [];

    let currentString = '';
    for(let i=0; i<rawFile.length; i++) {
        const char = rawFile[i];

        if(char === '\n') {
            list2.push(Number(currentString));
            currentString = '';
        } else if(char === ' ') {
            if(currentString !== '') {
                list1.push(Number(currentString));
                currentString = '';
            }
        } else {
            currentString += char;
        }
    }

    if(currentString !== '') {
        list2.push(Number(currentString));
    }

    return [list1, list2];
}

function calculateTotalDistance(list1=[], list2=[]) {
    let totalDistance = 0;

    for(let i=0; i<list1.length; i++) {
        const item1 = list1[i];
        const item2 = list2[i];

        totalDistance += Math.abs(item1 - item2);
    }

    return totalDistance;
}

function calculateSimilarityScore(list1=[], list2=[]) {
    // A map to keep track of count of each elements
    // So that looking up will be O(1) for each element
    const count = {};

    for(let i=0; i<list2.length; i++) {
        
        const item = list2[i];
        
        if(count[item] !== undefined) {
            count[item] += 1;
        } else {
            count[item] = 1;
        }
    }

    let similarityScore = 0;

    for(let i=0; i<list1.length; i++) {
        const item = list1[i];
        
        const itemCount = count[item] || 0;
        const similarity = item * itemCount;

        similarityScore += similarity;
    }

    return similarityScore;
}

function main() {
    let [list1, list2] = processInput();

    // In place sort, directly updates 2 list in the memory
    quickSort(list1, 0, list1.length - 1);
    quickSort(list2, 0, list2.length - 1);

    const totalDistance = calculateTotalDistance(list1, list2);
    console.log('Total Distance =>', totalDistance);

    const similarityScore = calculateSimilarityScore(list1, list2);
    console.log('Similarity Score =>', similarityScore);
}

main();