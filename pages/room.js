const { test, expect } = require('@playwright/test')





exports.Room = class Room {
    constructor(page) {
        this.page = page

        this.btnBookRoom = page.locator('.btn.btn-outline-primary.float-right.openBooking').first()
        this.lblFirstName = page.getByRole('textbox', { name: 'Firstname' })
        this.lblLastName = page.getByRole('textbox', { name: 'Lastname' })
        this.lblEmail = page.locator('.form-control.room-email') //page.getByRole('textbox', { name: 'Email' })
        this.lblPhone = page.locator('.form-control.room-phone')
        this.btnSaveBookRoom = page.locator('.btn.btn-outline-primary.float-right.book-room')
        this.alertText = page.locator('.alert.alert-danger')
    }




    async navigatetoBookRoom() {
        await expect(this.btnBookRoom).toBeVisible()
        await this.btnBookRoom.click()
    }

    async BookRoom(roomData) {
        await expect(this.lblFirstName).toBeVisible()
        await this.lblFirstName.fill(roomData.lblFirstName)
        await this.lblLastName.fill(roomData.lblLastName)
        await this.lblEmail.fill(roomData.lblEmail)
        await this.lblPhone.fill(roomData.lblPhone)

        await this.btnSaveBookRoom.click()

    }

    async verifyErrorMessage() {
        await expect(this.alertText).toBeVisible()
        await expect(this.alertText).toHaveText('must not be nullmust not be null')
    }
}