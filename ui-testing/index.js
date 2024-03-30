const puppeteer = require('puppeteer');

async function searchLazada(query) {
  const browser = await puppeteer.launch({ headless: false }); // Launch browser
  const page = await browser.newPage(); // Open new page

  // Navigate to Lazada website
  await page.goto('https://www.lazada.com/');

  // Type the query into the search input field and press Enter
  await page.type('input[type="search"]', query);
  await page.keyboard.press('Enter');

  // Wait for the search results to load
  await page.waitForSelector('.c2prKC');

  // Retrieve search results
  const results = await page.evaluate(() => {
    const items = document.querySelectorAll('.c2prKC'); // Select search result items
    const data = [];

    // Iterate over search result items and extract title and price
    items.forEach(item => {
      const title = item.querySelector('.c16H9d').innerText; // Get title
      const price = item.querySelector('.c13VH6').innerText; // Get price

      data.push({ title, price });
    });

    return data;
  });

  // Output search results
  console.log('Search Results:');
  results.forEach((result, index) => {
    console.log(`${index + 1}. Title: ${result.title}, Price: ${result.price}`);
  });

  await browser.close(); // Close browser
}

// Run the searchLazada function with a query
searchLazada('laptop');
