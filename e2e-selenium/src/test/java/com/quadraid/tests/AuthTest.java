package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AuthTest extends BaseTest {

    @Test(priority = 1, description = "Verify that the Authentication page loads with branding and form elements")
    public void testAuthPageElements() {
        driver.get(baseUrl);
        
        WebElement card = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.cssSelector(".premium-auth-card, .main-layout")
        ));
        Assert.assertNotNull(card, "Application container should be loaded");

        if (driver.findElements(By.className("premium-auth-card")).size() > 0) {
            WebElement visualSide = driver.findElement(By.className("auth-visual-side"));
            Assert.assertTrue(visualSide.getText().toUpperCase().contains("QUADRAID") || driver.getPageSource().contains("QUADRAID"), "Branding should contain QUADRAID");

            WebElement emailInput = driver.findElement(By.cssSelector("input[type='email']"));
            WebElement passwordInput = driver.findElement(By.cssSelector("input[type='password']"));
            WebElement submitBtn = driver.findElement(By.id("btn-submit"));

            Assert.assertTrue(emailInput.isDisplayed(), "Email input should be visible");
            Assert.assertTrue(passwordInput.isDisplayed(), "Password input should be visible");
            Assert.assertTrue(submitBtn.isDisplayed(), "Sign In button should be visible");
        }
    }
}
