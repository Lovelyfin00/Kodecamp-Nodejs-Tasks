const formatter = (stringNumber, NoToPutComma, isMillion = false) => {
    const splittedNum = stringNumber.split("");
    splittedNum.splice(splittedNum.length - NoToPutComma, 0, ",");
    if(isMillion){
        splittedNum.splice(splittedNum.length - 7, 0, ",");
    }
    const formattedString = splittedNum.join("");
    return formattedString;
}

const formatThousand = (number) => {
    const convertedNumberToString =  number.toString().trim();
    const lengthOfNumber = convertedNumberToString.length;

    if(lengthOfNumber > 3 && lengthOfNumber < 7){
        return formatter(convertedNumberToString, 3);
    }else if(lengthOfNumber > 6 && lengthOfNumber < 10) {
       return formatter(convertedNumberToString, 3, true);
    }
}

console.log(formatThousand("900000"));;