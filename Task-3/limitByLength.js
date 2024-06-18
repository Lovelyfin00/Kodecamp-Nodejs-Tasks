const limitByLength = (str) => {
    if (str.length > 100) {
        return str.slice(0, 100) + "...";
    }
    return str;
}

const example = "uhdh dhhdhd kskskks ajuuau affaga dhhd dhhd djjkskj sjjsj skkak akkaka shshsj akkak ajjsj ajjajk allka jkjjska a,,ama]]a ajjaj wuuw  lskkks ayyayay ajjajja kdkii rrwyywuw ehjhej qiwuiy wtrwfw.";
console.log(limitByLength(example)); 
