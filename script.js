const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let checkcnt = 0;
let passwordLength = 10;
handleslider();

function handleslider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleslider();
})
setIndicator("grey");

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (numbersCheck.checked) {
        hasNum = true;
    }
    if (symbolsCheck.checked) {
        hasSym = true;
    }
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("green");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("red");
    }

}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

function generateNumber() {
    return generateRandomInt(0, 9);
}

function generateUppercase() {
    return String.fromCharCode(generateRandomInt(65, 91));

}

function generateLowercase() {
    return String.fromCharCode(generateRandomInt(97, 123));

}

function generateSymbols() {
    let randInt = generateRandomInt(0, symbols.length);
    return symbols.charAt(randInt);
}

function cntCheckBox() {
    checkcnt = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkcnt++;
        }

    })
    if (passwordLength < checkcnt) {
        passwordLength = checkcnt;
        handleslider();
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', cntCheckBox);
})

function shufflePassword(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}



copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
})



generateBtn.addEventListener('click', () => {
    // console.log('start');
    if (checkcnt <= 0) {
        console.log('start');
        return;
    }
    //   console.log('start');
    if (passwordLength < checkcnt) {
        passwordLength = checkcnt;
        handleslider();
    }

    let funcArr = [];
    if (numbersCheck.checked) {
        funcArr.push(generateNumber);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowercase);
    }
    if (uppercaseCheck.checked) {
        funcArr.push(generateUppercase);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbols);
    }
    password = "";
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = generateRandomInt(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    password = shufflePassword(Array.from(password));


    passwordDisplay.value = password;

    calStrength();

})