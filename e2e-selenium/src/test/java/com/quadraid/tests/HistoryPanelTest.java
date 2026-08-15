package com.quadraid.tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

public class HistoryPanelTest extends BaseTest {

    @Test(priority = 1, description = "Verify History panel, parameter filters, dynamic table, and export button")
    public void testHistoryPanelComponents() {
        ensureAuthenticated();
        navigateTo("nav-history");

        WebElement header = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("panel-header")));
        Assert.assertTrue(header.getText().contains("History"), "Header should contain 'History'");

        // Verify select dropdowns
        List<WebElement> selects = driver.findElements(By.className("custom-select"));
        Assert.assertTrue(selects.size() >= 2, "Expected parameter and time filter selects");

        Select paramSelect = new Select(selects.get(0));
        paramSelect.selectByValue("tds");

        // Verify export button
        WebElement exportBtn = driver.findElement(By.className("btn-export"));
        Assert.assertTrue(exportBtn.isDisplayed(), "Export button should be visible");
        Assert.assertTrue(exportBtn.isEnabled(), "Export button should be enabled");

        // Verify dynamic telemetry table
        WebElement summaryTable = driver.findElement(By.className("custom-table"));
        Assert.assertTrue(summaryTable.isDisplayed(), "Telemetry summary table should be visible");

        List<WebElement> rows = summaryTable.findElements(By.cssSelector("tbody tr"));
        Assert.assertTrue(rows.size() >= 4, "Summary table should list all 4 main parameters");
    }
}
