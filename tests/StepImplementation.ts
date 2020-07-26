import { Step } from 'gauge-ts';
import { equal } from 'assert';
import {
  openBrowser,
  goto,
  setViewPort,
  click,
  write,
  press,
  text,
  dropDown,
  closeBrowser,
  toRightOf,
} from 'taiko';

export default class StepImplementation {
  @Step('Log in with <email> and password <password>.')
  public async login(email: string, password: string) {
    await openBrowser({ headless: false });
    await goto('http://localhost:4200');
    await setViewPort({ width: 1920, height: 1080 });
    await click('Login');
    await write(email);
    await press('Tab');
    await write(password);
    await press('Enter');
  }
  @Step('Log out.')
  public async logOut() {
    await click('Logout');
    await closeBrowser();
  }

  @Step('Navigate to <navBarLinkText> page.')
  public async navigateTo(navBarLinkText: string) {
    await click(navBarLinkText);
  }

  @Step('Text <textToSearch> must be visible.')
  public async isTextVisible(textToSearch: string) {
    equal(await text(textToSearch).exists(), true);
  }

  @Step('Select option <option> from drop-down menu <id>.')
  public async selectDropDownOption(option: string, id: string) {
    await dropDown({ id }).select(option);
  }

  @Step('Click on <textToClick>.')
  public async clickOnText(textToClick: string) {
    await click(textToClick);
  }

  @Step(['Press Tab.', 'Go to next field.'])
  public async pressTabKey() {
    await press('Tab');
  }

  @Step('Write <textToSearch>.')
  public async writeText(textToSearch: string) {
    await write(textToSearch);
  }

  @Step(['Press Enter.', 'Submit.'])
  public async pressEnterKey() {
    await press('Enter');
  }

  @Step('Text <textToSearch> must be visible to the right of <referenceText>.')
  public async isTextVisibleToRightOfReference(
    textToSearch: string,
    referenceText: string
  ) {
    equal(await text(textToSearch, toRightOf(referenceText)).exists(), true);
  }
}
