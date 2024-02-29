import { expect, test } from "@playwright/test";
import exp from "constants";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test.beforeEach(async ({ page }) => {
    // Login:
    await page.goto('http://localhost:8000/');
    if (await page.getByLabel('Login').isVisible()) {
      await page.getByLabel('Login').click();
    }
  })

// User story 1:
test('mode switches between brief and verbose', async ({ page }) => {
  await page.getByLabel('Command input').fill('mode');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()

  await expect(page.getByText('Mode Switched!')).toBeVisible();

  await page.getByLabel('Command input').fill('mode verbose');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()
  
  await expect(page.getByText('Command: mode')).toBeVisible();
})

// User story 2:
test('csv is loaded using load_csv command', async ({ page }) => {
  await page.getByLabel('Command input').fill('load_csv+fruitCSV');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await expect(page.getByText('Success!')).toBeVisible();
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()
  await expect(page.getByText('Apple')).toBeVisible();
  await expect(page.getByText('Banana')).toBeVisible();
  await expect(page.getByText('Peach')).toBeVisible();
})

test('at most one CSV dataset is loaded at any given time', async ({ page }) => {
  // switch between datasets
  await page.getByLabel('Command input').fill('load_csv+fruitCSV');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await expect(page.getByText('Success!')).toBeVisible();
  
  await page.getByLabel('Command input').fill('load_csv+drinksCSV');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click()

  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 2 times'}).click()
  await expect(page.getByText('Water')).toBeVisible();
  await expect(page.getByText('Coca Cola')).toBeVisible();
  await expect(page.getByText('Juice')).toBeVisible();
  await expect(page.getByText('Apple')).toBeHidden();
})

// User story 3:
test('cannot view without loading file', async ({ page }) => {
  await page.getByLabel('Command input').fill('view');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await expect(page.getByText('Failure: View Without Load')).toBeVisible();
})

// User story 4:
test('cannot search without loading file', async ({ page }) => {
  await page.getByLabel('Command input').fill('search+fruitCSV+Name');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click();
  await expect(page.getByText('Failure: Search Without Load')).toBeVisible();
})

test('I can search in CSV by column name', async ({ page }) => {
  await page.getByLabel('Command input').fill('load_csv+fruitCSV');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click();
  await expect(page.getByText('Success!')).toBeVisible();

  await page.getByLabel('Command input').fill('search+fruitCSV+Name+Apple');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click();
})

test('cannot search with less than 3 overal arguments', async ({ page }) => {
  await page.getByLabel('Command input').fill('load_csv+fruitCSV');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click();
  await expect(page.getByText('Success!')).toBeVisible();

  await page.getByLabel('Command input').fill('search+fruitCSV+Name');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click();
  await expect(page.getByText('Failure: Incorrect Number of Arguments')).toBeVisible();
})

test('cannot search with more than 3 overal arguments', async ({ page }) => {
  await page.getByLabel('Command input').fill('load_csv+fruitCSV');
  await page.getByRole('button', {name: 'Submitted 0 times'}).click();
  await expect(page.getByText('Success!')).toBeVisible();

  await page.getByLabel('Command input').fill('search+fruitCSV+Name+Apple+Extra');
  await page.getByRole('button', {name: 'Submitted 1 times'}).click();
  await expect(page.getByText('Failure: Incorrect Number of Arguments')).toBeVisible();
})

// User story 5:
test('on page load, i see a login button', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

// General tests:
test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('on page load, i see a button', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
});

test('after I click the button, its label increments', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
  await page.getByRole('button', {name: 'Submitted 0 times'}).click()
  await expect(page.getByRole('button', {name: 'Submitted 1 times'})).toBeVisible()
});

// test('after I click the button, my command gets pushed', async ({ page }) => {
//   // CHANGED
//   await page.goto('http://localhost:8000/');
//   await page.getByLabel('Login').click();
//   await page.getByLabel('Command input').fill('Awesome command');
//   await page.getByRole('button', {name: 'Submitted 0 times'}).click()

//   // you can use page.evaulate to grab variable content from the page for more complex assertions
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector('.repl-history');
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual("Awesome command");
// });