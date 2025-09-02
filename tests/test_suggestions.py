import pytest
from playwright.sync_api import sync_playwright, Page, expect
import subprocess
import time
import os

@pytest.fixture(scope="session")
def http_server():
    # Start a simple HTTP server in the root directory of the project
    server_process = subprocess.Popen(["python", "-m", "http.server", "8000"],
                                      stdout=subprocess.PIPE,
                                      stderr=subprocess.PIPE)
    # Wait a bit for the server to start
    time.sleep(2)
    yield "http://localhost:8000"
    # Stop the server
    server_process.terminate()

def test_suggestion_engine(http_server):
    """
    Tests the control suggestion feature.
    1. Navigates to the page.
    2. Implements all controls from the library.
    3. Fills out the form with a specific scenario.
    4. Clicks the 'Suggest Controls' button.
    5. Verifies that a key subset of controls is checked, and frequency controls are not.
    6. Updates the frequency and re-runs suggestions.
    7. Verifies that frequency controls are now suggested.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        errors = []
        page.on("pageerror", lambda error: errors.append(error))

        page.goto(http_server)

        # Check for JS errors
        assert len(errors) == 0, f"JavaScript errors on page: {[e.message for e in errors]}"

        # Open the control library
        page.click("#control-library-header")

        # 1. Implement all controls
        library_checkbox_locator = page.locator('[id^="control-A."]')
        count = library_checkbox_locator.count()
        assert count > 0, "No library controls found"
        for i in range(count):
            library_checkbox_locator.nth(i).check()

        # Wait for the applicable controls to be rendered in the form
        page.wait_for_selector('[id="applicable-A.5.1"]', timeout=5000)

        # 2. Fill out the form with low frequency
        page.fill("#scenario", "A phishing attack leaks PII from our cloud storage.")
        page.fill("#conf_impact", "3")
        page.fill("#integ_impact", "2")
        page.fill("#avail_impact", "1")
        page.fill("#likely_freq", "0.5") # Low frequency

        # 3. Click the suggest button
        page.click("#suggest-controls-btn")

        # 4. Verify a subset of key suggestions
        # A.5.34 should be suggested due to "PII" keyword
        expect(page.locator('[id="applicable-A.5.34"]')).to_be_checked()
        # A.8.7 should be suggested due to "phishing" keyword
        expect(page.locator('[id="applicable-A.8.7"]')).to_be_checked()
        # A.5.37 should be suggested due to integrity impact > 1
        expect(page.locator('[id="applicable-A.5.37"]')).to_be_checked()

        # A.5.5 should NOT be suggested as frequency is low
        expect(page.locator('[id="applicable-A.5.5"]')).not_to_be_checked()

        # 5. Update frequency to be high
        page.fill("#likely_freq", "2") # High frequency

        # 6. Click suggest button again
        page.click("#suggest-controls-btn")

        # 7. Verify that frequency controls are now suggested
        # A.5.5 should now be suggested
        expect(page.locator('[id="applicable-A.5.5"]')).to_be_checked()

        browser.close()
