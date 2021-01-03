import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class OverheardCommentUpdatePage {
  pageTitle: ElementFinder = element(by.id('overheardReactApp.overheardComment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contentInput: ElementFinder = element(by.css('input#overheard-comment-content'));
  dateInput: ElementFinder = element(by.css('input#overheard-comment-date'));
  rankingInput: ElementFinder = element(by.css('input#overheard-comment-ranking'));
  userSelect: ElementFinder = element(by.css('select#overheard-comment-user'));
  postSelect: ElementFinder = element(by.css('select#overheard-comment-post'));

  getPageTitle() {
    return this.pageTitle;
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

  async setRankingInput(ranking) {
    await this.rankingInput.sendKeys(ranking);
  }

  async getRankingInput() {
    return this.rankingInput.getAttribute('value');
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

  async postSelectLastOption() {
    await this.postSelect.all(by.tagName('option')).last().click();
  }

  async postSelectOption(option) {
    await this.postSelect.sendKeys(option);
  }

  getPostSelect() {
    return this.postSelect;
  }

  async getPostSelectedOption() {
    return this.postSelect.element(by.css('option:checked')).getText();
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
    await this.setContentInput('content');
    expect(await this.getContentInput()).to.match(/content/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setRankingInput('5');
    expect(await this.getRankingInput()).to.eq('5');
    await this.userSelectLastOption();
    await this.postSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
