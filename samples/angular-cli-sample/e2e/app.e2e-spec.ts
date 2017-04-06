import { Angular4CliSamplePage } from './app.po';

describe('angular4-cli-sample App', () => {
  let page: Angular4CliSamplePage;

  beforeEach(() => {
    page = new Angular4CliSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
