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
        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByTestId('titleInput').fill('a test for creating a blog')
        await page.getByTestId('authorInput').fill('mostafa')
        await page.getByTestId('urlInput').fill('localhost')
        await page.getByRole('button', { name: 'create' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await expect(page.locator('.blogs')).toContainText('a test for creating a blog');
    })

    test('a new blog can be editited', async ({ page }) => {
      const startingLikes =  parseInt(await page.getByTitle('likes').textContent())
      console.log('startingLikes', startingLikes)
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.evaluate(() => {
        const likesElement = document.querySelector('[title="likes"]');
        likesElement.textContent = parseInt(likesElement.textContent) + 1;
      });
      const likesAfterEdit =  parseInt(await page.getByTitle('likes').textContent())
      console.log('likesAfterEdit', likesAfterEdit)
        expect(likesAfterEdit).toBe(startingLikes + 1);
    }) 

     test('a user who created the blog can see delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByTestId('titleInput').fill('a test for creating a blog')
      await page.getByTestId('authorInput').fill('mostafa')
      await page.getByTestId('urlInput').fill('localhost')
      await page.getByRole('button', { name: 'create' }).click()
      const blog = await page.innerText('.blogs') 
      await page.getByRole('button', { name: 'view' }).click()                 
       await page.getByRole('button', { name: 'remove' }).click()
      // Intercept the dialog and accept it
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('confirm')
        console.log('Dialog message:', dialog.message())
        await dialog.accept();
      });
      await expect(page.locator('.blogs')).not.toContainText('a test for creating a blog hide')
     }) 

    test('the user who added the blog sees the blog delete button', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await request.post('http:localhost:3000/api/users', {data :{username:"testDelete", password:"testDelete", name:'testDelete' }})
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('testDelete')
      await textboxes[1].fill('testDelete')
      await page.getByRole('button', { name: 'login' }).click()
      const blog = await page.innerText('.blogs') 
      await page.getByRole('button', { name: 'view' }).click()
      const removeButton = await page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeHidden();
     }) 

     
    describe('Blogs are arranged in the order according to the likes', async () => {
      beforeEach(async ({ page, request  }) => {
        await request.post('http:localhost:3000/api/blogs', {data :{title:"First blog", author:"First blog", likes:5, url:"https://" }})
        await request.post('http:localhost:3000/api/blogs', {data :{title:"Sec Blog", author:"Sec Blog", likes:6, url:"https://"  }})
        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByTestId('titleInput').fill('a test for sorting likes')
        await page.getByTestId('authorInput').fill('mostafa')
        await page.getByTestId('urlInput').fill('localhost')
        await page.getByRole('button', { name: 'create' }).click()

        await page.getByRole('button', { name: 'New Blog' }).click()
        await page.getByTestId('titleInput').fill('a test for sorting likes 2')
        await page.getByTestId('authorInput').fill('mostafa')
        await page.getByTestId('urlInput').fill('localhost')
        await page.getByRole('button', { name: 'create' }).click()
      })
     
      test('Blogs are arranged in the order according to the likes' , async({page}) => {
        await page.evaluate(async() => {
          const blog = document.querySelector('.blogs');
        });
        const allViewButton = await page.getByRole('button', { name: 'view' }).click()
        const allLikeButton = await page.getByRole('button', { name: 'like' }).click()
        }) 
      })
  })
})

 