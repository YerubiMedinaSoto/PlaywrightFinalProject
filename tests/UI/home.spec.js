const { test, expect } = require('@playwright/test')

const { Room } = require('../../pages/room')
const { Contact } = require('../../pages/contact')

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv'
dotenv.config()

test.describe('Test Case 1: Validate Room Form', () => {

    test.beforeEach(async({ page }) => {
        await page.goto(process.env.BASEURL)
    })

    test('Login to the website', { tag: ['@ui', '@room'] }, async({ page }) => {
        //await page.goto(process.env.BASEURL)

        const room = new Room(page)

        await test.step('Click on -> Book this room', async() => {
            await room.navigatetoBookRoom()
        })


        await test.step('Fill the room form', async() => {
            const roomData = {
                lblFirstName: faker.person.firstName(),
                lblLastName: faker.person.lastName(),
                lblEmail: faker.internet.email(),
                lblPhone: faker.phone.number()
            }

            await room.BookRoom(roomData)
        })

        await test.step('Fail message booking', async() => {


            await room.verifyErrorMessage()
        })
    })
})


test.describe('Test Case 2: Validate Contact Form', () => {

    test.beforeEach(async({ page }) => {
        await page.goto(process.env.BASEURL)
    })

    test('Contact Form', { tag: ['@ui', '@contact'] }, async({ page }) => {
        const contact = new Contact(page)


        await test.step('Verify Contact Form', async() => {
            const contactData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                message: faker.lorem.paragraph()


            };
            await contact.fillContactForm(contactData)

            await expect(contact.alertErrorMessage).toBeVisible()

            const errors = [
                'Phone may not be blank',
                'Subject must be between 5 and 100 characters.',
                'Phone must be between 11 and 21 characters.',
                'Message must be between 20 and 2000 characters.',
                'must be a well-formed email address',
                'Subject may not be blank'
            ];

            const errorList = await contact.alertErrorMessage.locator('p');
            const errorCount = await errorList.count();

            for (let i = 0; i < errorCount; i++) {
                const error = await errorList.nth(i).textContent();
                await expect(errors).toContain(error);
            }

        })

        await test.step('Fill Contact Form', async() => {

            const contactData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                message: faker.lorem.paragraph(),
                phone: faker.phone.number(),
                subject: faker.lorem.sentence()
            };

            await contact.fillContactForm(contactData)

            await expect(contact.successMessage).toBeVisible()
            await expect(contact.successMessage).toHaveText(`Thanks for getting in touch ${contactData.name}!`)
        })
    })
})