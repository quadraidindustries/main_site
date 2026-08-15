package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

public class PerformancePanelTest extends BaseTest {

    @Test(priority = 1, description = "Verify Performance panel metrics and dynamic trend SVG")
    public void testPerformanceMetricsAndTrends() {
        ensureAuthenticated();
        navigateTo("nav-performance");

        WebElement header = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("panel-header")));
        Assert.assertTrue(header.getText().contains("Performance"), "Header should contain 'Performance'");

        List<WebElement> perfCards = driver.findElements(By.className("performance-card"));
        Assert.assertTrue(perfCards.size() >= 4, "Should display at least 4 performance metric cards");

        // Verify SVG performance chart
        WebElement svgChart = driver.findElement(By.className("line-chart-svg"));
        Assert.assertTrue(svgChart.isDisplayed(), "Performance line chart SVG should be visible");

        // Verify summary grid
        WebElement summaryGrid = driver.findElement(By.className("performance-summary-grid"));
        Assert.assertTrue(summaryGrid.isDisplayed(), "Performance summary grid must be visible");
    }
}
