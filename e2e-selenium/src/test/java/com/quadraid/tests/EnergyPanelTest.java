package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

public class EnergyPanelTest extends BaseTest {

    @Test(priority = 1, description = "Verify Energy monitoring panel, donut chart and power breakdown")
    public void testEnergyMonitoringElements() {
        ensureAuthenticated();
        navigateTo("nav-energy");

        WebElement header = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("panel-header")));
        Assert.assertTrue(header.getText().contains("Energy"), "Header should contain 'Energy'");

        // Verify Metric cards
        List<WebElement> cards = driver.findElements(By.className("performance-card"));
        Assert.assertTrue(cards.size() >= 4, "Should display at least 4 energy metric cards");

        // Verify Donut Chart SVG
        WebElement donutSvg = driver.findElement(By.className("donut-svg"));
        Assert.assertTrue(donutSvg.isDisplayed(), "Donut chart SVG should be visible");

        // Verify Hourly bar chart SVG
        WebElement barSvg = driver.findElement(By.className("bar-chart-svg"));
        Assert.assertTrue(barSvg.isDisplayed(), "Bar chart SVG should be visible");
    }
}
