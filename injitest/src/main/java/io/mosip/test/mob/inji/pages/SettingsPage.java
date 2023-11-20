package io.mosip.test.mob.inji.pages;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.iOSXCUITFindBy;
import org.openqa.selenium.WebElement;

public class SettingsPage extends BasePage {

    @AndroidFindBy(accessibility = "settingsScreen")
    @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeStaticText[`label == \"Settings\"`]")
    private WebElement settingsTittle;

    @AndroidFindBy(accessibility = "logout")
    @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeStaticText[`label == \"Logout\"`]")
    private WebElement logoutButton;

    @AndroidFindBy(xpath = "//*[contains(@text,'Language')]")
    @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeOther[`label == \"Language\"`]")
    private WebElement languageButton;

    @AndroidFindBy(xpath = "//*[contains(@text,'Filipino')]")
    @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeStaticText[`label == \"Filipino\"`]")
    private WebElement filipinoLanguageButton;

    @AndroidFindBy(xpath = "//*[contains(@text,'Wika')]")
    @iOSXCUITFindBy(iOSClassChain = "**/XCUIElementTypeStaticText[`label == \"Wika\"`]")
    private WebElement wikaButton;
    
    @AndroidFindBy(xpath = "//*[contains(@text,'Inji Tour Guide')]")
    public WebElement injiTourGuide;
    
    @AndroidFindBy(xpath = "//*[contains(@text,'Credential Registry')]")
    public WebElement clickOnCredentialRegistry;
    
    @AndroidFindBy(xpath = "//*[contains(@text,'Receive Card')]")
    public WebElement clickOnReceiveCard;
    
    @AndroidFindBy(xpath = "//*[contains(@text,'Tumanggap ng Card')]")
    public WebElement clickOnReceiveCardInfilipinoLanguage;
    
    @AndroidFindBy(uiAutomator = "new UiSelector().textContains(\"About Inji\")")
    private WebElement aboutInji;
    
    @AndroidFindBy(xpath = "(//*[@resource-id=\"padView\"])[3]")
    private WebElement arabicLanguageButton;
    
    @AndroidFindBy(uiAutomator = "new UiSelector().textContains(\"فتح التطبيق\")")
    private WebElement chooseLanguageInArabic;
    
    public SettingsPage(AppiumDriver driver) {
        super(driver);
    }

    public boolean isSettingPageLoaded() {
        return this.isElementDisplayed(settingsTittle, "Setting page");
    }

    public UnlockApplicationPage clickOnLogoutButton() {
        clickOnElement(logoutButton);
        return new UnlockApplicationPage(driver);
    }

    public SettingsPage clickOnLanguage() {
        clickOnElement(languageButton);
        return this;
    }

    public void clickOnFilipinoLanguage() {
        clickOnElement(filipinoLanguageButton);
    }

    public boolean verifyFilipinoLanguage() {
        return this.isElementDisplayed(wikaButton, "Filipino language");
    }
    
    public boolean verifyArabicLanguage() {
        return this.isElementDisplayed(chooseLanguageInArabic, "فتح التطبيق");
    }
    
    public SettingsPage clickOnInjiTourGuide() {
        clickOnElement(injiTourGuide);
        return this;
    }
    
    public CredentialRegistryPage clickOnCredentialRegistry() {
        clickOnElement(clickOnCredentialRegistry);
        return new CredentialRegistryPage(driver);
    }
    
    public ReceiveCardPage clickOnReceiveCard() {
        clickOnElement(clickOnReceiveCard);
        return new ReceiveCardPage(driver);
    }
    
    public ReceiveCardPage clickOnReceiveCardFilipinoLanguage() {
        clickOnElement(clickOnReceiveCardInfilipinoLanguage);
        return new ReceiveCardPage(driver);
    }
    
    public AboutInjiPage clickOnAbouInji() {
        clickOnElement(aboutInji);
        return new AboutInjiPage(driver);
    }
    
    public void clickOnArabicLanguageButton() {
        clickOnElement(arabicLanguageButton);
    }
    
}
