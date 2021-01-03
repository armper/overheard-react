import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TopicComponentsPage from './topic.page-object';
import TopicUpdatePage from './topic-update.page-object';
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

describe('Topic e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let topicComponentsPage: TopicComponentsPage;
  let topicUpdatePage: TopicUpdatePage;

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
    topicComponentsPage = new TopicComponentsPage();
    topicComponentsPage = await topicComponentsPage.goToPage(navBarPage);
  });

  it('should load Topics', async () => {
    expect(await topicComponentsPage.title.getText()).to.match(/Topics/);
    expect(await topicComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Topics', async () => {
        const beforeRecordsCount = await isVisible(topicComponentsPage.noRecords) ? 0 : await getRecordsCount(topicComponentsPage.table);
        topicUpdatePage = await topicComponentsPage.goToCreateTopic();
        await topicUpdatePage.enterData();

        expect(await topicComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(topicComponentsPage.table);
        await waitUntilCount(topicComponentsPage.records, beforeRecordsCount + 1);
        expect(await topicComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await topicComponentsPage.deleteTopic();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(topicComponentsPage.records, beforeRecordsCount);
          expect(await topicComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(topicComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
