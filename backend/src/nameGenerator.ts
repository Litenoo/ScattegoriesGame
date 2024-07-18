const adjectives = ["Lucky", "Lovely", "Crazy", "Clever", "Brave", "Wise", "Swift", "Gentle", "Fierce", "Mighty", "Sneaky", "Happy", "Kind", "Bold", "Curious", "Daring", "Adventurous", "Energetic", "Glamorous", "Radiant", "Vivid", "Vibrant", "Dynamic", "Elegant", "Majestic", "Magnificent", "Fantastic", "Whimsical", "Playful", "Cheerful", "Silly", "Witty", "Charming", "Sassy", "Regal", "Royal"];
const animals = ["Snake", "Hamster", "Racoon", "Owl", "Tiger", "Lion", "Bear", "Wolf", "Fox", "Panther", "Leopard", "Eagle", "Falcon", "Hawk", "Dolphin", "Shark", "Whale", "Octopus", "Elephant", "Giraffe", "Kangaroo", "Panda", "Koala", "Sloth", "Penguin", "Parrot", "Peacock", "Swan", "Hummingbird", "Butterfly", "Dragonfly", "Ladybug", "Bumblebee", "Firefly", "Cricket", "Starfish"];

function randomName() {
    const name = adjectives[Math.floor(Math.random() * adjectives.length)] +
        animals[Math.floor(Math.random() * animals.length)];

    return name;
}

export default randomName;