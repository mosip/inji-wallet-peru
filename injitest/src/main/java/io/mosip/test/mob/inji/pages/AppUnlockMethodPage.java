package io.mosip.test.mob.inji.pages;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.iOSXCUITFindBy;
import org.openqa.selenium.WebElement;

public class AppUnlockMethodPage extends BasePage {

    @AndroidFindBy(accessibility = "selectAppUnlockMethod")
    @iOSXCUITFindBy(accessibility = "Select App Unlock Method")
    private WebElement selectAppUnlockMethodText;

    @AndroidFindBy(accessibility = "usePasscode")
    @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeButton[`label == \"Use Passcode\"`]")
    private WebElement usePasscodeButton;

    public AppUnlockMethodPage(AppiumDriver driver) {
        super(driver);
    }

    public boolean isAppUnlockMethodPageLoaded() {
        return this.isElementDisplayed(selectAppUnlockMethodText, "Select app unlock method page");
    }

    public SetPasscode clickOnUsePasscode() {
        this.clickOnElement(usePasscodeButton);
        return new SetPasscode(driver);
    }
}
