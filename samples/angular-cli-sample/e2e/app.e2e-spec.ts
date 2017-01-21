import { AngularCliSamplePage } from './app.po';

describe('angular-cli-sample App', function() {
  let page: AngularCliSamplePage;

  beforeEach(() => {
    page = new AngularCliSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
