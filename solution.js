// Creating our database by assigning the array of objects to a variable
const userData = require("./data.json");

// Declare a function and a paramater
// The parameter is the root person who we are searching
function getMostPopularMovie(personName){

	// Query the database for the user who has the same name as the one that is being searched for
  const person = userData.find((user) => user.name === personName);

  // Create an empty Set and Map Object to store our visited friends and their movies
  const visited = new Set();
  const movies = new Map();

  // Initialize a stack with our root person already within it
  const stack = [person];

  // Add the root person to the visited Set so we don't iterate through them again
  visited.add(person)

  // If there is a person in the stack, execute the code in the while block
  while(stack.length > 0){

    // Pull the last item from the stack and initalize a variable
    const currPerson = stack.pop();

    // Query the database for ALL the friends of the currPerson
    const currFriends = userData.filter((user) => currPerson.friends.includes(user.id))

    // Iterate through all of the friends
    for(const friend of currFriends){

      // Check to see if the visited Set already has the friend
      if(!visited.has(friend)){
        // If it doesn't, add the friend to the visited Set
        visited.add(friend);

        // Query the database for the current Friend
        const friends = userData.find((user) => user.name === friend.name)

        // Iterate through all the movies
        for(const movie of friends.movies){
          // Sets the movie key and then movie value to either 1 or the existing value + 1
          movies.set(movie, (movies.get(movie) || 0) + 1);
        }

        // Push the friend to the stack, go through the same process for the friend
        stack.push(friend);
      }
    }
  }

  // After there is no one to check:
  // Declare two variable to take note of the most popular movie and the movie with the highest value in the Map
  let mostPopular = "";
  let maxFreq = 0;

  // For each movie in the Map, we take the key and the value
  for(const [movie, freq] of movies.entries()){
    // Check to see if the value is greater than the maxFreq
    if(freq > maxFreq) {
      // If it is:
      // Set the maxFreq to the value
      maxFreq = freq;
      // Set the most popular movie to the key
      mostPopular = movie;
    }
  }

  // At the end, we return the most popular movie
  return mostPopular;
}

console.log(getMostPopularMovie("Amber"));
