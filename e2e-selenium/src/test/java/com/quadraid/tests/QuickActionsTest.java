package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

public class QuickActionsTest extends BaseTest {

    @Test(priority = 1, description = "Verify Quick Actions buttons on Dashboard")
    public void testQuickActionButtons() {
        ensureAuthenticated();
        navigateTo("nav-dashboard");

        WebElement quickActionsCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("quick-actions")));
        Assert.assertTrue(quickActionsCard.isDisplayed(), "Quick actions card should be visible");

        WebElement flushBtn = driver.findElement(By.id("btn-flush"));
        WebElement stopBtn = driver.findElement(By.id("btn-stop"));
        WebElement uvBtn = driver.findElement(By.id("btn-uv"));

        Assert.assertTrue(flushBtn.isDisplayed(), "Manual flush button should be visible");
        Assert.assertTrue(stopBtn.isDisplayed(), "System stop button should be visible");
        Assert.assertTrue(uvBtn.isDisplayed(), "UV lamp test button should be visible");
    }
}
