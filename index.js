

async function main() {
  const response = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=dd2c9531&s=fast");
  const data = await response.json();
  console.log(data)
}

main();