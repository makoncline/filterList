const dataUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = [];

fetch(dataUrl)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function search(searchInput, dataSet) {
  if (!searchInput.length) return [];
  const search = new RegExp(searchInput, 'gi');
  const matches = dataSet.filter(data => data.city.match(search) || data.state.match(search));
  return matches;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function handleUpdate() {
  const matches = search(this.value, cities);
  const reg = new RegExp(this.value, 'gi');
  const result = matches.map(match =>
    `
    <li>
      <span>${match.city.replace(reg, `<span class='hl'>$&</span>`)}, ${match.state.replace(reg, `<span class='hl'>$&</span>`)}</span>
      <span>${numberWithCommas(match.population)}</span>
    </li>
    `
  ).join('');
  resultList.innerHTML = result;
}

const input = document.querySelector('.input');
input.addEventListener('change', handleUpdate);
input.addEventListener('keyup', handleUpdate);

const resultList = document.querySelector('.matches');