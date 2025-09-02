import asyncio
import re
from playwright.async_api import async_playwright, expect

async def get_ale_from_row(row_locator):
    # The Mean ALE is the 4th cell in the row
    ale_cell = row_locator.locator("td").nth(3)
    ale_text = await ale_cell.inner_text()
    # Remove currency symbols and commas, then parse as a number
    ale_value = float(re.sub(r'[$,]', '', ale_text))
    return ale_value

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # 1. Go to the application page and clear all data.
        await page.goto("file:///app/index.html")
        # Set up listener for the confirmation dialog BEFORE clicking
        page.on("dialog", lambda dialog: dialog.accept())
        await page.get_by_role("button", name="Clear All Data").click()
        # Assert that the table is now empty
        await expect(page.locator("#risk-table-body tr")).to_have_count(0)

        # 2. Go to the Control Library and enable two controls.
        await page.locator("#control-A\\.5\\.1").check()
        await page.locator("#control-A\\.5\\.7").check()

        # Set effectiveness for the first control
        slider_selector = '[data-testid="slider-A.5.1"]'
        await page.evaluate(f"document.querySelector('{slider_selector}').value = 75")
        await page.evaluate(f"document.querySelector('{slider_selector}').dispatchEvent(new Event('input'))")

        # 3. Add a scenario WITHOUT the control.
        await page.get_by_label("Threat Scenario").fill("Test Scenario 1 (No Controls)")
        await page.get_by_label("Minimum Loss ($)").fill("100000")
        await page.get_by_label("Most Likely Loss ($)").fill("200000")
        await page.get_by_label("Maximum Loss ($)").fill("500000")
        await page.get_by_label("Min Events / Year").fill("0.5")
        await page.get_by_label("Most Likely Events / Year").fill("1")
        await page.get_by_label("Max Events / Year").fill("2")
        await page.get_by_role("button", name="Add Risk Scenario").click()

        # 4. Get the ALE for the first scenario.
        row1 = page.locator("#risk-table-body tr").first
        ale1 = await get_ale_from_row(row1)
        print(f"ALE for scenario 1 (no controls): {ale1}")

        # 5. Add the SAME scenario, but WITH the control applied.
        await page.get_by_label("Threat Scenario").fill("Test Scenario 2 (With Controls)")
        await page.get_by_label("Minimum Loss ($)").fill("100000")
        await page.get_by_label("Most Likely Loss ($)").fill("200000")
        await page.get_by_label("Maximum Loss ($)").fill("500000")
        await page.get_by_label("Min Events / Year").fill("0.5")
        await page.get_by_label("Most Likely Events / Year").fill("1")
        await page.get_by_label("Max Events / Year").fill("2")

        # Select the control we enabled
        await page.locator("#applicable-A\\.5\\.1").check()

        await page.get_by_role("button", name="Add Risk Scenario").click()

        # 6. Get the ALE for the second scenario.
        await expect(page.locator("#risk-table-body tr")).to_have_count(2)
        row2 = page.locator("#risk-table-body tr").nth(1)
        ale2 = await get_ale_from_row(row2)
        print(f"ALE for scenario 2 (with controls): {ale2}")

        # 7. Assert that the control reduced the risk.
        assert ale2 < ale1, f"Expected ALE with controls ({ale2}) to be less than ALE without controls ({ale1})"
        print("Assertion passed: Control successfully reduced the calculated risk.")

        # 8. Take a screenshot for final verification.
        await page.screenshot(path="jules-scratch/verification/verification_iso_controls.png", full_page=True)

        await browser.close()

asyncio.run(main())
