const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page, request  }) => {
    await request.post('http:localhost:3000/api/testing/reset')
    await request.post('http:localhost:3000/api/users', {data :{username:"mostafa", password:"mostafa", name:'Mostafa' }})
    await page.goto('http://localhost:5173')
  })
 

  test('Login form is shown', async ({ page }) => {
    await page.getByText('log in').click()
    await expect(page.getByText('Login', { exact: true })).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByText('log in').click()
      const textboxes =await page.getByRole('textbox').all()
      await textboxes[0].fill('mostafa')
      await textboxes[1].fill('mostafa')
      await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('mostafa logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByText('log in').click()
      const textboxes =await page.getByRole('textbox').all()
      await textboxes[0].fill('mostafa')
      await textboxes[1].fill('somethingwrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong name or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByText('log in').click()
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('mostafa')
        await textboxes[1].fill('mostafa')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('mostafa logged-in')).toBeVisible()
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByTestId('titleInput').fill('a test for creating a blog')
        await page.getByTestId('authorInput').fill('mostafa')
        await page.getByTestId('urlInput').fill('localhost')
        await page.getByRole('button', { name: 'create' }).click()
        await expect(page.locator('.blogs')).toContainText('a test for creating a blog');
         // await page.getByRole('button', { name: 'remove' }).click()
        // page.on('dialog', async dialog => {
        //   expect(dialog.message()).toContain('Remove blog a test for creating a blog by playwright by mostafa');
        //   await dialog.accept();
        // });
       
    })

    test('a new blog can be editited', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      
    }) 

     test('a user who created the blog can see delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByTestId('titleInput').fill('a test for creating a blog')
      await page.getByTestId('authorInput').fill('mostafa')
      await page.getByTestId('urlInput').fill('localhost')
      await page.getByRole('button', { name: 'create' }).click()
      const blog = await page.innerText('.blogs') 
      await page.getByRole('button', { name: 'view' }).click()
      await page.waitForTimeout(500);                 //insert by mxschmitt
      const removeButton = await page.getByRole('button', { name: 'remove' })
      await removeButton.waitFor({ state: 'visible' })
      await removeButton.click()
    
      // Intercept the dialog and accept it
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('confirm')
        console.log('Dialog message:', dialog.message())
        await dialog.accept();
      });
      await expect(page.locator('.blogs')).not.toContainText('a test for creating a blog hide')
  
     }) 
  })

 
})

 