const isPalindrome = (word) => {
    const normalWord = word.toLowerCase();
    const reversedWord = normalWord.split('').reverse().join('');

    return normalWord === reversedWord;
}
const word1 = "level";
console.log(`${isPalindrome(word1)}`);