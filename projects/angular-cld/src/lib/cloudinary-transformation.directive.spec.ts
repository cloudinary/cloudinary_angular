import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

@Component({
    template: `
    <cl-transformation effect="art:hokusai"></cl-transformation>
    <cl-transformation format="png" height="95" width="95" crop="thumb" gravity="face" radius="20"></cl-transformation>
    <cl-transformation overlay="text:arial_60:Sea%20Shell" gravity="north" y="20"></cl-transformation>
    <cl-transformation></cl-transformation>
    `
})
class TestComponent { }

describe('CloudinaryTransformationDirective', () => {

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement[];  // the three elements w/ the directive

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [CloudinaryTransformationDirective, TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges(); // initial binding

        // all elements with an attached CloudinaryTransformationDirective
        des = fixture.debugElement.queryAll(By.directive(CloudinaryTransformationDirective));
    });

    it('should have four transformations', () => {
        expect(des.length).toBe(4);
    });

    it('Can get the attributes of the first transformation', () => {
        const dir: CloudinaryTransformationDirective = des[0].injector.get(CloudinaryTransformationDirective);
        const attributes: NamedNodeMap = dir.getAttributes();
        expect(attributes.length).toEqual(1);
        expect(attributes.item(0).name).toEqual('effect');
        expect(attributes.item(0).value).toEqual('art:hokusai');
    });

    it('Can get the attributes of the second transformation', () => {
        const dir: CloudinaryTransformationDirective = des[1].injector.get(CloudinaryTransformationDirective);
        const attributes: NamedNodeMap = dir.getAttributes();
        expect(attributes.length).toEqual(6);
    });

    it('Can get the attributes of the fourth (empty) transformation', () => {
        const dir: CloudinaryTransformationDirective = des[3].injector.get(CloudinaryTransformationDirective);
        const attributes: NamedNodeMap = dir.getAttributes();
        expect(attributes.length).toEqual(0);
    });
});
