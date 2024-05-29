// Creating our database by assigning the array of objects to a variable
const userData = require("./data.json");

// Declare a function and a paramater
// The parameter is the root person who we are searching
function getMostPopularMovie(personName){
  // Find the user by name
  const person = userData.find((user) => user.name === personName);
  if (!person) return null; // Return null if the person is not found

  // Initialize the visited set, movies map, and stack
  const visited = new Set([person]);
  const movies = new Map();
  const stack = [person];

  // Add the root person's movies to the movies map
  for (const movie of person.movies) {
    movies.set(movie, (movies.get(movie) || 0) + 1);
  }

  // Perform a depth-first search (DFS)
  while (stack.length > 0) {
    const currentPerson = stack.pop();

    // Get the friends of the current person
    const friends = userData.filter((user) => currentPerson.friends.includes(user.id));

    // Iterate through the friends
    for (const friend of friends) {
      if (!visited.has(friend)) {
        visited.add(friend);
        stack.push(friend);

        // Add the friend's movies to the map
        for (const movie of friend.movies) {
          movies.set(movie, (movies.get(movie) || 0) + 1);
        }
      }
    }
  }

  // Find the most popular movie
  let mostPopular = "";
  let maxFreq = 0;

  for (const [movie, freq] of movies) {
    if (freq > maxFreq) {
      maxFreq = freq;
      mostPopular = movie;
    }
  }
  return mostPopular;
}

console.log(getMostPopularMovie("Amber"));
