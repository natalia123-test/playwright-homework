import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {
    //change to rabbit
    await page.getByText('Pet Types').click()
    await expect(page.getByRole('heading')).toHaveText('Pet Types');
    await page.getByRole('row', { name: 'cat' }).getByRole('button', { name: 'Edit' }).click()
    await expect(page.getByRole('heading')).toHaveText('Edit Pet Type')
    await expect(page.getByRole('textbox')).toHaveValue('cat')
    await page.getByRole('textbox').fill('rabbit')
    await page.getByText('Update').click()
    //change again to cat
    await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name: 'Edit' }).click()
    await expect(page.getByRole('textbox')).toHaveValue('rabbit')
    await page.getByRole('textbox').fill('cat')
    await page.getByText('Update').click()
    await expect(page.getByRole('row', { name: 'cat' })).toBeVisible()
})
