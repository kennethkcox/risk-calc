import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("file:///app/index.html")
        await page.wait_for_timeout(1000) # Wait for rendering

        # Open the 'People' controls section
        await page.locator("legend", has_text="People Controls").click()

        # Enable a control and set its effectiveness
        await page.locator("#control-A\\.6\\.1").check()
        slider1 = page.locator('[data-testid="slider-A.6.1"]')
        await slider1.evaluate("el => { el.value = 80; el.dispatchEvent(new Event('input')); }")

        await page.wait_for_timeout(500) # Wait for UI to update

        await page.screenshot(path="jules-scratch/verification/ui_verification.png", full_page=True)
        await browser.close()

asyncio.run(main())
