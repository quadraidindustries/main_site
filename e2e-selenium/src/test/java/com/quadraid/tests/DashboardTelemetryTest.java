package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

public class DashboardTelemetryTest extends BaseTest {

    @Test(priority = 1, description = "Verify that the main dashboard layout and sidebar load correctly")
    public void testDashboardLayoutAndSidebar() {
        ensureAuthenticated();

        WebElement sidebar = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("main-nav")));
        Assert.assertTrue(sidebar.isDisplayed(), "Sidebar navigation must be visible");

        // Verify sidebar navigation items
        String[] expectedNavItems = {
            "nav-dashboard", "nav-water-quality", "nav-performance",
            "nav-energy", "nav-alerts", "nav-history", "nav-settings"
        };

        for (String navId : expectedNavItems) {
            WebElement navItem = driver.findElement(By.id(navId));
            Assert.assertTrue(navItem.isDisplayed(), "Nav item " + navId + " should be displayed");
        }
    }

    @Test(priority = 2, description = "Verify System Overview process flow steps and Water Production metrics")
    public void testSystemOverviewAndWaterProduction() {
        ensureAuthenticated();
        navigateTo("nav-dashboard");

        // Verify System Overview Card
        WebElement sysOverview = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("system-overview")));
        Assert.assertTrue(sysOverview.isDisplayed(), "System Overview card should be visible");

        List<WebElement> flowSteps = sysOverview.findElements(By.className("flow-step"));
        Assert.assertEquals(flowSteps.size(), 6, "Should display 6 process flow stages");

        // Verify Water Production Card
        WebElement waterProd = driver.findElement(By.id("water-production"));
        Assert.assertTrue(waterProd.isDisplayed(), "Water Production card should be visible");

        WebElement flowRateValue = waterProd.findElement(By.className("production-value"));
        Assert.assertFalse(flowRateValue.getText().trim().isEmpty(), "Current flow rate value should not be empty");
    }

    @Test(priority = 3, description = "Verify real-time sensor cards for Water Quality, Pressure, and Tank Status")
    public void testTelemetryCards() {
        ensureAuthenticated();
        navigateTo("nav-dashboard");

        // Verify Water Quality summary card
        WebElement waterQualityCard = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("water-quality")));
        Assert.assertTrue(waterQualityCard.isDisplayed(), "Water Quality card should be displayed on dashboard");

        // Verify Pressure & Flow card
        WebElement pressureFlowCard = driver.findElement(By.id("pressure-flow"));
        Assert.assertTrue(pressureFlowCard.isDisplayed(), "Pressure & Flow card should be displayed");

        // Verify Tank Status card
        WebElement tankStatusCard = driver.findElement(By.id("tank-status"));
        Assert.assertTrue(tankStatusCard.isDisplayed(), "Tank Status card should be displayed");
    }
}
