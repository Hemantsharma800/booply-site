export const GEO_AI_DATA = {
    'usa': {
        country: "United States of America",
        capital: "Washington, D.C.",
        population: "331 Million",
        cities: ["New York City", "Los Angeles", "Chicago"],
        landmarks: [
            { name: "Statue of Liberty", img: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=400" },
            { name: "Grand Canyon", img: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400" }
        ],
        fact: "The United States is home to the world's largest economy and the iconic Silicon Valley."
    },
    'india': {
        country: "India",
        capital: "New Delhi",
        population: "1.4 Billion",
        cities: ["Mumbai", "Bangalore", "Hyderabad"],
        landmarks: [
            { name: "Taj Mahal", img: "https://images.unsplash.com/photo-1564507592033-0841b68d5909?w=400" },
            { name: "Amber Fort", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400" }
        ],
        fact: "India is the world's largest democracy and the birthplace of yoga."
    },
    'france': {
        country: "France",
        capital: "Paris",
        population: "67 Million",
        cities: ["Lyon", "Marseille", "Bordeaux"],
        landmarks: [
            { name: "Eiffel Tower", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400" },
            { name: "Louvre Museum", img: "https://images.unsplash.com/photo-1597923896141-d4de3119853c?w=400" }
        ],
        fact: "France is the most visited country in the world."
    }
};

export const getMockAiResponse = () => {
    const keys = Object.keys(GEO_AI_DATA);
    return GEO_AI_DATA[keys[Math.floor(Math.random() * keys.length)]];
};