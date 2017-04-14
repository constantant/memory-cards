import { MemoryCardsPage } from './app.po';

describe('memory-cards App', () => {
  let page: MemoryCardsPage;

  beforeEach(() => {
    page = new MemoryCardsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
