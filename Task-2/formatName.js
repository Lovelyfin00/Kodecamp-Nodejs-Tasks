const formatName = (name) => {
    let namesTurnedToArrays = name.trim().split(" ");
    const nameFormatted = namesTurnedToArrays.map((name) => {
        const firstStringUppercase = name[0].toUpperCase();
        const otherStrings = name.slice(1, name.length);
        return firstStringUppercase + otherStrings;
    })

    return nameFormatted.join(" ");
}

console.log(formatName("loveth sandra"));