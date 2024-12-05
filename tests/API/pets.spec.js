const { test, expect } = require('@playwright/test')

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv'
dotenv.config()

test.describe('Test Case 1: PetStore API', () => {
    test('Create a Pet', { tag: ['@api', '@pet'] }, async({ request }) => {
        await test.step('Create a Pet', async() => {
            const response = await request.post(`${process.env.API_URL}v2/pet`, {
                headers: {
                    "api_key": process.env.API_TOKEN
                },
                data: {
                    id: 0,
                    category: {
                        id: 0,
                        name: "string"
                    },
                    name: faker.animal.petName(),
                    photoUrls: [
                        "string"
                    ],
                    tags: [{
                        id: 0,
                        name: "string"
                    }],
                    status: "available"
                }
            });

            await expect(response.status()).toBe(200);
            await expect(response.ok()).toBeTruthy();

            const bodyData = await response.body();
            const bodyString = bodyData.toString();
            const bodyJson = JSON.parse(bodyString);

            await expect(bodyJson.id).not.toBeUndefined();
            await expect(bodyJson.category.id).not.toBeUndefined();
            await expect(bodyJson.category.name).not.toBeUndefined();
            await expect(bodyJson.name).not.toBeUndefined();
            await expect(bodyJson.photoUrls).not.toBeUndefined();
            await expect(bodyJson.tags).not.toBeUndefined();
            await expect(bodyJson.tags[0].id).not.toBeUndefined();
            await expect(bodyJson.tags[0].name).not.toBeUndefined();
            await expect(bodyJson.status).not.toBeUndefined();
        })
    })

    test('Test Case 2: Get Store Inventory', { tag: ['@api', '@inventory'] }, async({ request }) => {
        await test.step('Get Store Inventory', async() => {
            const response = await request.get(`${process.env.API_URL}v2/store/inventory`, {
                headers: {
                    "api_key": process.env.API_TOKEN
                }
            });

            await expect(response.status()).toBe(200);
            await expect(response.ok()).toBeTruthy();

            const bodyData = await response.body();
            const bodyString = bodyData.toString();
            const bodyJson = JSON.parse(bodyString);


            await expect(bodyJson.sold).not.toBeUndefined();
            await expect(bodyJson.string).not.toBeUndefined();
            await expect(bodyJson.alive).not.toBeUndefined();
            await expect(bodyJson.Avaliable).not.toBeUndefined();
            await expect(bodyJson.pending).not.toBeUndefined();
            await expect(bodyJson.available).not.toBeUndefined();
            await expect(bodyJson.hatching).not.toBeUndefined();
            await expect(bodyJson.bored).not.toBeUndefined();




        })
    })
})