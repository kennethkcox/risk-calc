import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("file:///app/index.html")
        await page.wait_for_timeout(2000) # Wait for animations/rendering
        await page.screenshot(path="jules-scratch/verification/current_state.png", full_page=True)
        await browser.close()

asyncio.run(main())
