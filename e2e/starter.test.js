import {by, device, element, expect} from 'detox';

describe('Privacy policy', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have privacy policy text', async () => {
    await expect(element(by.id('privacy-button'))).toBeVisible();
  });

  it('should show privacy policy after tap', async () => {
    await element(by.id('privacy-button')).tap();
    await expect(element(by.text('Polityka prywatności'))).toBeVisible();
  });
});
