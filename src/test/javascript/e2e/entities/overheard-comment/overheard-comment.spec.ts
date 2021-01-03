import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OverheardCommentComponentsPage from './overheard-comment.page-object';
import OverheardCommentUpdatePage from './overheard-comment-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('OverheardComment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let overheardCommentComponentsPage: OverheardCommentComponentsPage;
  let overheardCommentUpdatePage: OverheardCommentUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    overheardCommentComponentsPage = new OverheardCommentComponentsPage();
    overheardCommentComponentsPage = await overheardCommentComponentsPage.goToPage(navBarPage);
  });

  it('should load OverheardComments', async () => {
    expect(await overheardCommentComponentsPage.title.getText()).to.match(/Overheard Comments/);
    expect(await overheardCommentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete OverheardComments', async () => {
        const beforeRecordsCount = await isVisible(overheardCommentComponentsPage.noRecords) ? 0 : await getRecordsCount(overheardCommentComponentsPage.table);
        overheardCommentUpdatePage = await overheardCommentComponentsPage.goToCreateOverheardComment();
        await overheardCommentUpdatePage.enterData();

        expect(await overheardCommentComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(overheardCommentComponentsPage.table);
        await waitUntilCount(overheardCommentComponentsPage.records, beforeRecordsCount + 1);
        expect(await overheardCommentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await overheardCommentComponentsPage.deleteOverheardComment();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(overheardCommentComponentsPage.records, beforeRecordsCount);
          expect(await overheardCommentComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(overheardCommentComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
