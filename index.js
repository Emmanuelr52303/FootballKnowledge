let myHeaders = new Headers();
myHeaders.append("x-apisports-key", "ff8e0568cb88f231ddc9cf58a935ee24");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

/*fetch("https://v3.football.api-sports.io/leagues", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));*/

const leaguesListEl = document.querySelector('.leagues__list')