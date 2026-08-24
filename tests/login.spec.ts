import { test, expect} from '@playwright/test'

test('Signup ', async({page})=> {
    const website = await page.goto('https://sauce-demo.myshopify.com/')
    const signup = page.getByRole('link', {name: 'Sign Up'});
    await signup.click();
    const page_Title = await page.title();
    console.log(page_Title);
})