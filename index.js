let myHeaders = new Headers();
myHeaders.append("x-apisports-key", "ff8e0568cb88f231ddc9cf58a935ee24");
const leaguesListEl = document.querySelector('.leagues__list')
const form = document.querySelector(".input__form");
let leagues;
let leagueDisplay;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = e.target.query.value;
  renderLeagues(value);
});


let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

async function getLeagues() {
  const leagues = await fetch("https://v3.football.api-sports.io/leagues", requestOptions);
  const leaguesData = await leagues.json();

  return leaguesData;
}

async function renderLeagues(search){
  if(!leagues){
    return;
  }
  
  leagueDisplay = leagues.response.filter(league =>
    league.league.name.toLowerCase().includes(search.toLowerCase())
  );
  
  leaguesListEl.innerHTML = leagueDisplay.map(
    (league) => postHTML(league)).join('')
}

function filterLeagues(filter) {
  if(filter.target.value === 'A_TO_Z'){
    leagueDisplay.sort((a,b) => a.league.name.localeCompare(b.league.name))
  } else if (filter.target.value === 'Z_TO_A') {
    leagueDisplay.sort((a,b) => b.league.name.localeCompare(a.league.name))
  }
  let leagueDisplay100 = leagueDisplay.slice(0, 100)
  leaguesListEl.innerHTML = leagueDisplay100.map(
    (league) => postHTML(league)).join('')
}

function postHTML(league) {
  return `<div class="league__box">
              <img src="${league.league.logo}" alt="" class="league__logo">
              <div class="league__name">${league.league.name}</div>
          </div>`
}

async function main(){
  leaguesListEl.innerHTML = `<i class="fas fa-spinner leagues__loading--spinner"></i>`
  leaguesListEl.classList += ' leagues__loading'
  leagues = await getLeagues();
  leaguesListEl.classList.remove('leagues__loading')
  leagueDisplay = leagues.response
  let leagueDisplay100 = leagueDisplay.slice(0, 100);
  leaguesListEl.innerHTML = leagueDisplay100.map(
    (league) => postHTML(league)).join('')
}

main();