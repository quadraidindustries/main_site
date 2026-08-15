package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

public class WaterQualityPanelTest extends BaseTest {

    @Test(priority = 1, description = "Verify Water Quality panel header and live badge")
    public void testWaterQualityPanelHeader() {
        ensureAuthenticated();
        navigateTo("nav-water-quality");

        WebElement header = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("panel-header")));
        Assert.assertTrue(header.getText().contains("Water Quality"), "Panel header should contain 'Water Quality'");

        WebElement liveBadge = driver.findElement(By.className("live-status-badge"));
        Assert.assertTrue(liveBadge.isDisplayed(), "Live indicator badge should be visible");
    }

    @Test(priority = 2, description = "Verify that all 8 water quality parameter cards are present")
    public void testParameterCards() {
        ensureAuthenticated();
        navigateTo("nav-water-quality");

        List<WebElement> paramCards = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.className("param-card")));
        Assert.assertTrue(paramCards.size() >= 8, "Expected at least 8 water quality parameter cards");

        // Verify key parameters exist
        String pageSource = driver.getPageSource();
        Assert.assertTrue(pageSource.contains("pH"), "Water quality panel must contain pH parameter");
        Assert.assertTrue(pageSource.contains("TDS"), "Water quality panel must contain TDS parameter");
        Assert.assertTrue(pageSource.contains("Turbidity"), "Water quality panel must contain Turbidity");
        Assert.assertTrue(pageSource.contains("Conductivity"), "Water quality panel must contain Conductivity");
    }
}
