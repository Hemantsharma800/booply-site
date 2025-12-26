// 🌍 BOOPLY GEOGRAPHICAL INTELLIGENCE ENGINE
export const GEO_AI_DATA = [
    {
        country: "India",
        capital: "New Delhi",
        population: "1.4 Billion",
        fact: "India is the birthplace of chess and the world's largest democracy.",
        theme: "#ff9933"
    },
    {
        country: "United States",
        capital: "Washington, D.C.",
        population: "331 Million",
        fact: "The US has the world's largest economy and invented the internet.",
        theme: "#3c3b6e"
    },
    {
        country: "Japan",
        capital: "Tokyo",
        population: "125 Million",
        fact: "Japan has the world's most sophisticated high-speed rail network.",
        theme: "#bc002d"
    },
    {
        country: "Brazil",
        capital: "Brasília",
        population: "214 Million",
        fact: "Brazil is home to the Amazon, the world's largest tropical rainforest.",
        theme: "#009739"
    }
];

export const mockAiLookup = () => {
    return GEO_AI_DATA[Math.floor(Math.random() * GEO_AI_DATA.length)];
};