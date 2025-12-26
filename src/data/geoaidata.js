// 🌍 BOOPLY GLOBAL INTELLIGENCE DATABASE
export const GEO_AI_DATA = [
    { country: "India", capital: "New Delhi", population: "1.4 Billion", theme: "#ff9933", fact: "India is the world's largest democracy and the birthplace of chess." },
    { country: "United States", capital: "Washington, D.C.", population: "331 Million", theme: "#3c3b6e", fact: "The US has the world's largest economy and invented the internet." },
    { country: "Japan", capital: "Tokyo", population: "125 Million", theme: "#bc002d", fact: "Japan consists of 6,852 islands and has the world's highest life expectancy." },
    { country: "Brazil", capital: "Brasília", population: "214 Million", theme: "#009739", fact: "Brazil is home to the Amazon, the world's largest tropical rainforest." },
    { country: "United Kingdom", capital: "London", population: "67 Million", theme: "#00247d", fact: "The UK's British Library is the largest library in the world by number of items." },
    { country: "China", capital: "Beijing", population: "1.41 Billion", theme: "#ee1c25", fact: "China's Great Wall is the longest man-made structure on Earth." },
    { country: "Australia", capital: "Canberra", population: "26 Million", theme: "#00008b", fact: "Australia is home to 10 of the world's 11 most venomous snakes." },
    { country: "France", capital: "Paris", population: "68 Million", theme: "#002395", fact: "France is the most visited country in the world." },
    { country: "Germany", capital: "Berlin", population: "83 Million", theme: "#000000", fact: "Germany was the first country in the world to adopt Daylight Saving Time." },
    { country: "Canada", capital: "Ottawa", population: "38 Million", theme: "#ff0000", fact: "Canada has more lakes than all other countries combined." }
];

export const getRandomCountry = (currentIndex) => {
    // 🛡️ ANTI-REPEAT LOGIC: Prevents the "Japan-only" stickiness
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * GEO_AI_DATA.length);
    } while (nextIndex === currentIndex);

    return { data: GEO_AI_DATA[nextIndex], index: nextIndex };
};