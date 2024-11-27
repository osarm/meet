import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.eventDetails');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.waitForSelector('.show-details-btn');
    await page.click('.show-details-btn');
    const eventDetails = await page.$('.eventDetails');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.waitForSelector('.show-details-btn');
    await page.click('.show-details-btn');
    const eventDetails = await page.$('.eventDetails');
    expect(eventDetails).toBeNull();
  });
});

describe('Filter Events by City', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('User sees all events by default', async () => {
    const eventCount = await page.$$eval('.event', events => events.length);
    expect(eventCount).toBeGreaterThan(0);
  });

  test('User can filter events by city', async () => {
    // Wait for the city input field to be available
    await page.waitForSelector('#city-search', { visible: true });

    // Type in a city name
    await page.type('#city-search', 'Berlin');
    await page.keyboard.press('Enter');

    // Wait for filtered results to load
    await page.waitForTimeout(1000);

    const eventLocations = await page.$$eval('.event .location', locations =>
      locations.map(location => location.textContent)
    );

    eventLocations.forEach(location => {
      expect(location).toContain('Berlin');
    });
  });

  test('User can reset the filter to see all events again', async () => {
    await page.waitForSelector('#city-search', { visible: true });

    // Clear the city input and reset the filter
    await page.click('#city-search', { clickCount: 3 }); // Highlight all text
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Enter');

    // Wait for all events to reload
    await page.waitForTimeout(1000);

    const eventCount = await page.$$eval('.event', events => events.length);
    expect(eventCount).toBeGreaterThan(0);
  });
});
