# Contributing to Secure Start

First off, thank you for considering contributing to Secure Start! It's people like you that make open source such a great community. We welcome any and all contributions.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and effective contribution process.

## Project Overview

Secure Start is a client-side, "buildless" web application designed to help small and medium-sized companies kickstart their information security management. It provides tools for risk assessment, ISMS management based on ISO 27001, and clear reporting dashboards.

The "buildless" nature of the project is a key feature. It means there is no complex toolchain, no transpilation, and no package management. All code is written in standard HTML, CSS, and JavaScript, and all third-party libraries are loaded via CDN with Subresource Integrity (SRI) checks. This makes the project highly portable and easy to set up.

## Getting Started

Because Secure Start is a buildless application, getting it running on your local machine is very simple:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/secure-start.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd secure-start
    ```
3.  **Open the HTML files in your browser:**
    You can open `index.html`, `dashboard.html`, `isms.html`, etc., directly in your web browser to use the application. No web server is required, though running one locally can be helpful for development.

That's it! You are now ready to start developing.

## Codebase Structure

The repository is organized as follows:

-   `.github/`: Contains GitHub-specific files, such as workflow configurations.
-   `src/`: Contains the core source code for the application.
    -   `css/`: Contains the main stylesheet (`style.css`).
    -   `js/`: Contains the JavaScript files that power the application's logic.
        -   `main.js`: The main script for the Risk Register (`index.html`). It handles form interactions, risk calculations, and rendering the UI.
        -   `dashboard.js`: The script for the main dashboard (`dashboard.html`).
        -   `isms.js`: The script for the ISMS overview page (`isms.html`).
        -   `iso27001.js`: Contains the library of ISO 27001 controls.
        -   `policies.js`: The script for the policies page (`policies.html`).
        -   `policy-viewer.js`: The script for viewing individual policies.
        -   `threats.js`: Contains the library of threats.
        -   `controls.js`: Manages the state of the ISO controls (implemented, effectiveness).
-   `tests/`: Contains tests for the application.
-   `*.html`: The main HTML files for the different pages of the application (`index.html`, `dashboard.html`, etc.).
-   `README.md`: The main documentation for the project.
-   `LICENSE`: The license for the project.
-   `CONTRIBUTING.md`: This file!

## Development Workflow

1.  **Create a new branch:** Before making any changes, create a new branch for your feature or bug fix.
    ```bash
    git checkout -b my-new-feature
    ```
2.  **Make your changes:** Make your changes to the relevant files.
3.  **Test your changes:**
    -   Currently, the project has a small test suite in `tests/`. You can run these tests to ensure you haven't introduced any regressions.
    -   For new features, please consider adding new tests to the test suite.
    -   Manually test your changes in the browser to ensure everything works as expected.
4.  **Format and lint your code:** Ensure your code adheres to the coding standards outlined below.
5.  **Commit your changes:** Write a clear and concise commit message.
    ```bash
    git commit -m "feat: Add new feature"
    ```
6.  **Push your changes:**
    ```bash
    git push origin my-new-feature
    ```
7.  **Create a pull request:** Open a pull request on GitHub and provide a detailed description of your changes.

## Coding Standards

-   **HTML:** Write clean, semantic HTML. Use ARIA attributes where necessary to ensure accessibility.
-   **CSS:** Use the existing stylesheet (`src/css/style.css`) for custom styles. The project primarily uses Tailwind CSS for styling, so prefer using Tailwind utility classes where possible.
-   **JavaScript:**
    -   Write modern, clean JavaScript (ES6+).
    -   Use descriptive variable and function names.
    -   Comment your code where necessary to explain complex logic.
    -   Avoid using `var`. Use `const` by default and `let` only when you need to reassign a variable.
-   **General:**
    -   Keep lines under 100 characters long.
    -   Use 4 spaces for indentation.
    -   Ensure there are no trailing whitespaces.

By following these guidelines, you will help us keep the codebase clean, consistent, and easy to maintain. Thank you for your contribution!
