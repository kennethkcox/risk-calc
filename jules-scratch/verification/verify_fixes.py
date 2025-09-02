import asyncio
from playwright.async_api import async_playwright, expect
import os
import json

# This data structure must match what the risk-worker expects.
example_data_json = """
[
    {
        "scenario": "Ransomware encrypts primary file server",
        "min_loss": 50000, "likely_loss": 150000, "max_loss": 500000,
        "min_freq": 0.1, "likely_freq": 0.5, "max_freq": 1,
        "conf_impact": 1, "integ_impact": 2, "avail_impact": 3,
        "internet_exposure": "Limited",
        "applicableControls": ["A.8.7", "A.8.13"]
    }
]
"""

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        file_path = os.path.abspath('index.html')
        await page.goto(f'file://{file_path}')

        # Force the state by passing the data as an argument to page.evaluate
        print("Forcing application state via localStorage...")
        scenarios_data = json.loads(example_data_json)
        await page.evaluate("data => { localStorage.setItem('riskCalculatorScenarios', JSON.stringify(data)); }", scenarios_data)

        await page.reload(wait_until="domcontentloaded")
        print("Page reloaded with forced state.")

        # Switch to Dark Mode
        print("Switching to Dark Mode...")
        await page.locator('.theme-toggle').click()
        await expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
        print("Dark Mode enabled.")

        # Open the risk table and wait for it to be ready
        await page.locator('#risk-table-header').click()
        await expect(page.locator('.details-btn').first).to_be_visible(timeout=15000)
        print("Risk table is open and visible.")

        # Open the Details Modal
        print("Opening details modal...")
        await page.locator('.details-btn').first.click()
        await expect(page.locator('#details-modal')).to_be_visible()
        await expect(page.locator('#histogram-chart')).to_be_visible()
        print("Details modal with histogram is visible.")

        # Give the chart animation time to finish
        await page.wait_for_timeout(1000)

        # Take a screenshot
        screenshot_path = 'jules-scratch/verification/verification_fixes.png'
        print(f"Taking screenshot to {screenshot_path}...")
        await page.screenshot(path=screenshot_path, full_page=True)
        print("Screenshot saved.")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
