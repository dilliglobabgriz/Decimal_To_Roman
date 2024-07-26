const number = document.getElementById('number');
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");


// Dictionary to convert decimal to roman
const decimalToRoman = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
}

// Dictionary to convert roman strings that have not dealt with 4s and 9s
const romanToRomanFormatted = {
    'IIII': 'IV',
    'VIV': 'IX',
    'XXXX': 'XL',
    'LXL': 'XC',
    'CCCC': 'CD',
    'DCD': 'CM',
}

// Save the keys from D2R in an array in desceding order
const decimalKeys = Object.keys(decimalToRoman);
// Save roman formatted keys to array
const romanKeys = Object.keys(romanToRomanFormatted);

// Takes integer input and returns a string containing the roman conversion
const convertToRoman = (integerNumber) => {
    console.log(integerNumber);
    let romanString = '';

    while (integerNumber > 0) {
        decimalKeys.forEach(val => {
            if (integerNumber >= val) {
                romanString += decimalToRoman[val];
                integerNumber -= val;
            }
        })
    }
    return romanString;   
}

// Takes an integer and returns a string of roman numerals
// 4s and 9s still need to be handled
function convertToRomanRecursive (integerNumber) {
    if (integerNumber === 0) {
        return '';
    } else {
        let curMaxKey = findMaxKey(integerNumber);
        return decimalToRoman[curMaxKey] + convertToRomanRecursive(integerNumber - curMaxKey);
    }
}

// Takes an int and returns the largest decimal equivalent of a roman digit
const findMaxKey = (integerNumber) => {
    let maxKey = 0;
    for (const key of decimalKeys) {
        if (integerNumber >= key) {
            maxKey = key;
        }
    }
    return maxKey;
}

// Takes a string of valid roman integers and replaces instances of 4 consecutive digits with proper syntax
// ex. takes input 'XIIII' and returns 'XIV'
const formatRoman = (romanString) => {
    let returnString = romanString;
    for (const key of romanKeys) {
        returnString = returnString.replace(key, romanToRomanFormatted[key])
    }

    return returnString;
}

const displayOutput = () => {
    // Convert input to int and strip non int values
    const intNumber = parseInt(number.value);
    
    // Check for no value inputted
    if (number.value === '') {
        output.innerText = 'Please enter a valid number'
        return;
    }
    // Check for numbers < 0
    if (intNumber < 0) {
        output.innerText = 'Please enter a number greater than or equal to 1';
        return;
    }
    // Check for input > 3999
    if (intNumber > 3999) {
        output.innerText = 'Please enter a number less than or equal to 3999';
        return
    }

    let unformattedRoman = convertToRomanRecursive(intNumber);
    output.innerText = formatRoman(unformattedRoman);
    return;
}

convertBtn.addEventListener('click', displayOutput);

number.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        displayOutput();
    }
})

