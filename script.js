// script.js

const API_ENDPOINT = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');
const cryptoTableBody = document.getElementById('cryptoTableBody');


async function fetchData() {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function renderGridView(data) {
  gridView.innerHTML = '';

  data.forEach(crypto => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${crypto.image}" alt="${crypto.name}" class="crypto-image">
      <h3>${crypto.name}</h3>
      <p>Current Price (USD): $${crypto.current_price}</p>
      <p>Market Cap: $${crypto.market_cap}</p>
      <p>Percentage Change (24h): ${crypto.price_change_percentage_24h}%</p>
    `;
    gridView.appendChild(card);
  });
}

function renderListView(data) {
  cryptoTableBody.innerHTML = '';

  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${crypto.image}" alt="${crypto.name}" class="crypto-image">${crypto.name}</td>
      <td>${crypto.symbol.toUpperCase()}</td>
      <td>$${crypto.current_price}</td>
      <td>$${crypto.total_volume}</td>
      <td>$${crypto.market_cap}</td>
      <td>${crypto.price_change_percentage_24h}%</td>
    `;
    cryptoTableBody.appendChild(row);
  });
}

function switchView(view) {
  if (view === 'grid') {
    gridView.style.display = 'grid';
    listView.style.display = 'none';
  } else if (view === 'list') {
    gridView.style.display = 'none';
    listView.style.display = 'table';
  }
}

function searchData() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === '') {
    fetchData().then(data => {
      renderGridView(data);
      renderListView(data);
    });
  } else {
    fetchData().then(data => {
      const filteredData = data.filter(crypto =>
        crypto.name.toLowerCase().includes(searchTerm) ||
        crypto.symbol.toLowerCase().includes(searchTerm)
      );
      renderGridView(filteredData);
      renderListView(filteredData);
    });
  }
}

fetchData().then(data => {
  renderGridView(data);
  renderListView(data);
});
