const userData = require("./data.json");

// Returns the most popular movie of a person in their friend's network.
// Network => Friends of Friends
function getMostPopularMovie(personName){

  const person = userData.find((user) => user.name === personName);
  const visited = new Set();
  const movies = new Map();
  const stack = [person];

  visited.add(person)

  while(stack.length > 0){
    const currPerson = stack.pop();
    const currFriends = userData.filter((user) => currPerson.friends.includes(user.id))

    for(const friend of currFriends){
      if(!visited.has(friend)){
        visited.add(friend);
        const friends = userData.find((user) => user.name === friend.name)
        for(const movie of friends.movies){
          movies.set(movie, (movies.get(movie) || 0) + 1);
        }
        stack.push(friend);
      }
    }
  }

  let mostPopular = "";
  let maxFreq = 0;
  for(const [movie, freq] of movies.entries()){
    if(freq > maxFreq) {
      maxFreq = freq;
      mostPopular = movie;
    }
  }

  return mostPopular;
}

console.log(getMostPopularMovie("Amber"));
