import { MangolPage } from './app.po';

describe('mangol App', function() {
  let page: MangolPage;

  beforeEach(() => {
    page = new MangolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
