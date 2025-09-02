import asyncio
from playwright.async_api import async_playwright, expect
import os
import json

# This data structure must match what the risk-worker expects.
# It needs all the numeric fields and the internet_exposure string.
example_data_json = """
[
    {
        "scenario": "Ransomware encrypts primary file server",
        "min_loss": 50000, "likely_loss": 150000, "max_loss": 500000,
        "min_freq": 0.1, "likely_freq": 0.5, "max_freq": 1,
        "conf_impact": 1, "integ_impact": 2, "avail_impact": 3,
        "internet_exposure": "Limited",
        "applicableControls": ["A.8.7", "A.8.13"]
    },
    {
        "scenario": "Successful phishing of finance executive",
        "min_loss": 25000, "likely_loss": 75000, "max_loss": 200000,
        "min_freq": 0.5, "likely_freq": 2, "max_freq": 5,
        "conf_impact": 3, "integ_impact": 3, "avail_impact": 1,
        "internet_exposure": "High",
        "applicableControls": ["A.6.3"]
    },
    {
        "scenario": "Cloud storage misconfiguration exposes PII",
        "min_loss": 100000, "likely_loss": 500000, "max_loss": 2000000,
        "min_freq": 0.05, "likely_freq": 0.2, "max_freq": 0.5,
        "conf_impact": 3, "integ_impact": 1, "avail_impact": 1,
        "internet_exposure": "Critical",
        "applicableControls": ["A.5.15", "A.8.9"]
    }
]
"""

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}')

        # Force the state by setting localStorage and reloading
        print("Forcing application state via localStorage...")
        escaped_json_string = json.dumps(json.loads(example_data_json))
        await page.evaluate(f"localStorage.setItem('riskCalculatorScenarios', JSON.stringify({escaped_json_string}))")

        await page.reload(wait_until="domcontentloaded")
        print("Page reloaded with forced state.")

        # 1. Verify Dark Mode
        print("Verifying Dark Mode...")
        await page.locator('.theme-toggle').click()
        await expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
        print("Dark Mode enabled.")

        # Open the risk table card and wait for it to be ready
        await page.locator('#risk-table-header').click()
        await expect(page.locator('.clone-btn').first).to_be_visible(timeout=15000) # Increased timeout just in case
        print("Risk table is open and visible.")

        # 2. Verify Scenario Cloning
        print("Verifying Scenario Cloning...")
        initial_row_count = await page.locator('#risk-table-body tr').count()
        await expect(initial_row_count).to_be(3)

        await page.locator('.clone-btn').first.click()

        # After cloning, the app re-renders, so we must wait again
        await expect(page.locator('#risk-table-body tr')).to_have_count(initial_row_count + 1, timeout=10000)
        await expect(page.locator('#risk-table-body tr').nth(1)).to_contain_text('(copy)')
        print("Scenario cloned successfully.")

        # 3. Verify Enhanced Suggestions
        print("Verifying Enhanced Suggestions...")
        # We need to wait for the row to be stable before clicking
        await expect(page.locator('.edit-btn').first).to_be_visible()
        await page.locator('.edit-btn').first.click()

        await expect(page.locator('#avail_impact')).to_be_visible()
        await page.locator('#avail_impact').fill('3')
        await page.locator('#suggest-controls-btn').click()

        # A.8.13 is "Information backup"
        await expect(page.locator(r'#applicable-A\.8\.13')).to_be_checked()
        print("Enhanced suggestions are working.")

        # 4. Take a screenshot
        screenshot_path = 'jules-scratch/verification/verification.png'
        print(f"Taking screenshot to {screenshot_path}...")
        await page.screenshot(path=screenshot_path, full_page=True)
        print("Screenshot saved.")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
