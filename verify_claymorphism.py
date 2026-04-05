from playwright.sync_api import sync_playwright
import time
import os

def run_cuj(page):
    print("Navigating to /styles/claymorphism...")
    page.goto("http://localhost:3000/styles/claymorphism")
    page.wait_for_timeout(1500)

    print("Taking screenshot of the hero section...")
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    page.screenshot(path="/home/jules/verification/screenshots/hero.png")

    print("Scrolling to features...")
    page.evaluate("window.scrollBy(0, window.innerHeight)")
    page.wait_for_timeout(1000)

    print("Taking screenshot of features...")
    page.screenshot(path="/home/jules/verification/screenshots/features.png")

    print("Testing newsletter submission...")
    page.evaluate("document.querySelector('form').scrollIntoView()")
    page.wait_for_timeout(1000)

    email_input = page.get_by_label("Email address")
    email_input.fill("test@example.com")
    page.wait_for_timeout(500)

    submit_button = page.get_by_role("button", name="Subscribe")
    submit_button.click()

    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/newsletter_loading.png")

    print("Waiting for success message...")
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/newsletter_success.png")

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/screenshots/error.png")
        finally:
            context.close()
            browser.close()