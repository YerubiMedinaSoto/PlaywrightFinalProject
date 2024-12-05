const { test, expect } = require('@playwright/test')

exports.Contact = class Contact {

    constructor(page) {
        this.page = page

        this.contactSection = page.locator('.row.contact')
        this.name = page.locator('[data-testid="ContactName"]')
        this.email = page.locator('[data-testid="ContactEmail"]')
        this.phone = page.locator('[data-testid="ContactPhone"]')
        this.subject = page.locator('[data-testid="ContactSubject"]')
        this.message = page.locator('[data-testid="ContactDescription"]')
        this.btnSubmitContact = page.locator('[id="submitContact"]')
        this.alertErrorMessage = page.locator('.alert.alert-danger')
        this.successMessage = page.locator('.row.contact > div:nth-child(2) > div > h2')
            // 'Thanks for getting in touch '

    }


    async navigateToContact() {
        await expect(this.contactSection).toBeVisible()
    }

    async fillContactForm(contactData) {
        if (contactData.name) {
            await this.name.clear()
            await this.name.fill(contactData.name)
        }

        if (contactData.email) {
            await this.email.clear()
            await this.email.fill(contactData.email)
        }

        if (contactData.phone) {
            await this.phone.clear()
            await this.phone.fill(contactData.phone)
        }

        if (contactData.subject) {
            await this.subject.clear()
            await this.subject.fill(contactData.subject)
        }

        if (contactData.message) {
            await this.message.clear()
            await this.message.fill(contactData.message)
        }

        await this.btnSubmitContact.click()
    }



}