const path = require('path');

import { browser, element, by } from 'protractor';

// Using require instead of import until clodinary-core has typings and can be loaded by tsc
// Assumes CLOUDINARY_URL environment variable is set, see https://github.com/cloudinary/cloudinary_npm
const cloudinary = require('cloudinary');

describe('Sample photo upload E2E Tests', function () {

    let expectedMsg: RegExp = /Add photo/i;
    let tag: string = 'angular2-sdk-e2e-' + Math.ceil(Math.random() * 10000000);
    let deleteByTag: boolean;

    beforeEach(() => {
        deleteByTag = false;
        browser.get('');
    });

    afterEach((done) => {
        if (deleteByTag) {
            // Delete the image uploaded to the sample by this test
            cloudinary.v2.api.delete_resources_by_tag(tag,
                function (result) {
                    if (result && result.error) {
                        done.fail(`Deletion failed with ${result.error}`);
                    } else {
                        console.log(`Deleted resource with tag ${tag}`);
                        done();
                    }
                });
        } else {
            // Nothing to see here :)
            done();
        }
    });

    it(`should display "Add photo" on the upload button`, () => {
        expect(element(by.css('.upload_link')).getText()).toMatch(expectedMsg);
    });

    it(`should upload a new image successfully`, () => {
        element(by.className('upload_link')).click();

        expect(element(by.className('upload_button')).getText()).toEqual('Upload');

        // Set properties of file to upload
        element(by.className('form-control')).sendKeys(tag);
        // Change focus
        // https://github.com/SeleniumHQ/selenium/wiki/Frequently-Asked-Questions#q-the-onchange-event-doesnt-fire-after-a-call-sendkeys
        element(by.xpath('//*[@path="title"]')).click();

        // Upload file
        element(by.id('fileupload')).sendKeys(path.resolve(process.cwd(), 'e2e', 'cloudinary_logo.png'));

        // Wait for upload to complete
        expect(element(by.className('status-code')).getText()).toMatch(/Completed with status code 200/i);

        browser.controlFlow().execute(function () {
            // Add this command to the test's control flow so the value changes only after the previous command completes successfully
            deleteByTag = true;
        });

        // Verify the new image exists in the photo list
        element(by.className('back_link')).click();
        expect(element(by.xpath(`//h2[text()="${tag}"]`)).isDisplayed()).toBeTruthy();
    });

});
