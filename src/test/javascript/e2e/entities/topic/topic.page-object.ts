import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TopicUpdatePage from './topic-update.page-object';

const expect = chai.expect;
export class TopicDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('overheardReactApp.topic.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-topic'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TopicComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('topic-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('topic');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTopic() {
    await this.createButton.click();
    return new TopicUpdatePage();
  }

  async deleteTopic() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const topicDeleteDialog = new TopicDeleteDialog();
    await waitUntilDisplayed(topicDeleteDialog.deleteModal);
    expect(await topicDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/overheardReactApp.topic.delete.question/);
    await topicDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(topicDeleteDialog.deleteModal);

    expect(await isVisible(topicDeleteDialog.deleteModal)).to.be.false;
  }
}
