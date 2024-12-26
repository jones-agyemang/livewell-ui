//@ts-check

import { test, expect } from '@playwright/test';

test('submits the resident form successfully', async ({ page }) => {
  // Intercept and mock the POST request
  await page.route('http://localhost:4000/api/v1/residents', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Resident details saved successfully.',
      }),
    });
  });
  
  // Navigate to the application
  await page.goto('http://localhost:3000/');

  // Fill in personal information
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="middleName"]', 'Michael');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="dateOfBirth"]', '1995-05-15');

  // Wait for the dropdown button to be visible and click it to open the menu
  await page.fill('input[name="gender"]', "male");

  // Fill in contact details
  await page.fill('input[name="email"]', 'john.doe@example.com');
  await page.fill('input[name="phone"]', '1234567890');

  // Fill in emergency contact
  await page.fill('input[name="emergencyContactName"]', 'Jane Doe');
  await page.fill('input[name="emergencyContactRelationship"]', 'Sister');
  await page.fill('input[name="emergencyContactPhone"]', '0987654321');

  // Fill in accommodation details
  await page.fill('input[name="moveInDate"]', '2024-01-01');
  await page.fill('input[name="durationOfStay"]', 'full-year');
  await page.fill('textarea[name="specialRequirements"]', 'No special requirements.');

  // Fill in payment information
  await page.fill('input[name="paymentAmount"]', '1200.50');
  await page.fill('input[name="paymentMethod"]', 'bank-transfer');
  await page.fill('input[name="transactionId"]', 'TXN123456');
  await page.fill('input[name="transactionDate"]', '2023-12-20');

  // Add additional comments
  await page.fill('textarea[name="comments"]', 'Looking forward to my stay.');

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the success notification
  const notification = page.locator('.notification');

  await expect(page.locator('.notification')).toHaveText(
    'Thank you John Michael Doe. Your resident details have been saved!'
  );

  await page.click('[data-id="close-notifier"]');

  await expect(notification).not.toBeVisible();
});
