package com.quadraid.tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

import java.time.Duration;

public class BaseTest {
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected String baseUrl = System.getProperty("baseUrl", "http://localhost:5173");

    @BeforeClass
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        
        // Headless mode enabled by default for automated CLI execution
        String headless = System.getProperty("headless", "true");
        if ("true".equalsIgnoreCase(headless)) {
            options.addArguments("--headless=new");
        }
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--remote-allow-origins=*");

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterClass(alwaysRun = true)
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    /**
     * Helper to navigate to a specific sidebar section by ID
     */
    protected void navigateTo(String navId) {
        WebElement navItem = wait.until(ExpectedConditions.elementToBeClickable(By.id(navId)));
        navItem.click();
    }

    /**
     * Helper to perform login if auth screen is displayed
     */
    protected void ensureAuthenticated() {
        driver.get(baseUrl);
        try {
            if (driver.findElements(By.className("main-layout")).size() > 0) {
                return;
            }
            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(3));
            if (driver.findElements(By.id("btn-demo-login")).size() > 0) {
                driver.findElement(By.id("btn-demo-login")).click();
            } else if (driver.findElements(By.cssSelector("input[type='email']")).size() > 0) {
                WebElement emailInput = driver.findElement(By.cssSelector("input[type='email']"));
                WebElement passInput = driver.findElement(By.cssSelector("input[type='password']"));
                emailInput.clear();
                emailInput.sendKeys("operator@quadraid.com");
                passInput.clear();
                passInput.sendKeys("password123");
                driver.findElement(By.id("btn-submit")).click();
            }
            shortWait.until(ExpectedConditions.presenceOfElementLocated(By.className("main-layout")));
        } catch (Exception e) {
            wait.until(ExpectedConditions.presenceOfElementLocated(By.className("main-layout")));
        }
    }
}
