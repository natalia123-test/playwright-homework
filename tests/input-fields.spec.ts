import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {

    //change to rabbit
    await page.getByText('Pet Types').click()
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toHaveText('Pet Types');
    await page.getByText('Edit').nth(0).click()
    await expect(page.getByText('Edit Pet Type')).toHaveText('Edit Pet Type');
    await page.getByRole('textbox').clear()
    //wait for API call that loads pet data
    await page.waitForResponse('**/api/pettypes/*');
    await page.getByRole('textbox').fill('rabbit')
    await page.getByText('Update').click()
    await expect(page.locator('[id="0"]')).toHaveValue('rabbit');

    //change again to cat
    await page.getByText('Edit').nth(0).click()
    await page.getByRole('textbox').clear()
    //wait for API call that loads pet data
    await page.waitForResponse('**/api/pettypes/*');
    await page.getByRole('textbox').fill('cat')
    await page.getByText('Update').click()
    await expect(page.locator('[id="0"]')).toHaveValue('cat');

})
