import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PostUpdatePage {
  pageTitle: ElementFinder = element(by.id('overheardReactApp.post.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#post-title'));
  contentInput: ElementFinder = element(by.css('input#post-content'));
  dateInput: ElementFinder = element(by.css('input#post-date'));
  rankOneInput: ElementFinder = element(by.css('input#post-rankOne'));
  rankTwoInput: ElementFinder = element(by.css('input#post-rankTwo'));
  rankThreeInput: ElementFinder = element(by.css('input#post-rankThree'));
  rankFourInput: ElementFinder = element(by.css('input#post-rankFour'));
  rankFiveInput: ElementFinder = element(by.css('input#post-rankFive'));
  rankSixInput: ElementFinder = element(by.css('input#post-rankSix'));
  rankSevenInput: ElementFinder = element(by.css('input#post-rankSeven'));
  userSelect: ElementFinder = element(by.css('select#post-user'));
  topicSelect: ElementFinder = element(by.css('select#post-topic'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setRankOneInput(rankOne) {
    await this.rankOneInput.sendKeys(rankOne);
  }

  async getRankOneInput() {
    return this.rankOneInput.getAttribute('value');
  }

  async setRankTwoInput(rankTwo) {
    await this.rankTwoInput.sendKeys(rankTwo);
  }

  async getRankTwoInput() {
    return this.rankTwoInput.getAttribute('value');
  }

  async setRankThreeInput(rankThree) {
    await this.rankThreeInput.sendKeys(rankThree);
  }

  async getRankThreeInput() {
    return this.rankThreeInput.getAttribute('value');
  }

  async setRankFourInput(rankFour) {
    await this.rankFourInput.sendKeys(rankFour);
  }

  async getRankFourInput() {
    return this.rankFourInput.getAttribute('value');
  }

  async setRankFiveInput(rankFive) {
    await this.rankFiveInput.sendKeys(rankFive);
  }

  async getRankFiveInput() {
    return this.rankFiveInput.getAttribute('value');
  }

  async setRankSixInput(rankSix) {
    await this.rankSixInput.sendKeys(rankSix);
  }

  async getRankSixInput() {
    return this.rankSixInput.getAttribute('value');
  }

  async setRankSevenInput(rankSeven) {
    await this.rankSevenInput.sendKeys(rankSeven);
  }

  async getRankSevenInput() {
    return this.rankSevenInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async topicSelectLastOption() {
    await this.topicSelect.all(by.tagName('option')).last().click();
  }

  async topicSelectOption(option) {
    await this.topicSelect.sendKeys(option);
  }

  getTopicSelect() {
    return this.topicSelect;
  }

  async getTopicSelectedOption() {
    return this.topicSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setTitleInput('title');
    expect(await this.getTitleInput()).to.match(/title/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContentInput('content');
    expect(await this.getContentInput()).to.match(/content/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankOneInput('5');
    expect(await this.getRankOneInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankTwoInput('5');
    expect(await this.getRankTwoInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankThreeInput('5');
    expect(await this.getRankThreeInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankFourInput('5');
    expect(await this.getRankFourInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankFiveInput('5');
    expect(await this.getRankFiveInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankSixInput('5');
    expect(await this.getRankSixInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankSevenInput('5');
    expect(await this.getRankSevenInput()).to.eq('5');
    await this.userSelectLastOption();
    await this.topicSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
