# Secure Start

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Buildless](https://img.shields.io/badge/status-buildless-green.svg)](https://github.com/buildless/buildless)

**A browser-based tool to help small and medium companies start their security journey.**

Secure Start provides an out-of-the-box ISMS tool with policies and standards, a powerful risk register, a self-assessment based upon ISO 27001, and clear dashboards to track progress.

---

## Table of Contents

- [Core Modules](#core-modules)
- [Key Features](#key-features)
- [Enterprise-Grade Security](#enterprise-grade-security)
- [Technology Stack](#technology-stack)
- [How to Use](#how-to-use)
- [Risk Calculation Methodology](#risk-calculation-methodology)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Core Modules

Secure Start is organized into several interconnected modules, each accessible via the main navigation:

-   **Dashboard (`dashboard.html`)**: Provides a high-level overview of the security posture, including risk distribution and control implementation status.
-   **Risk Register (`index.html`)**: The core of the application. Here, you can define, analyze, and track risk scenarios using a simple but effective methodology.
-   **ISMS Overview (`isms.html`)**: Manage your Information Security Management System. Track the implementation status, justification, and audit notes for each ISO 27001:2022 control.
-   **Assessment (`assessment.html`)**: Conduct a self-assessment against the ISO 27001 standard to identify gaps and prioritize improvements.
-   **Policies (`policies.html`)**: A library of starter security policies that can be adapted for your organization.

## Key Features

-   **Simplified Risk Analysis**: Instead of complex frameworks, Secure Start uses a straightforward `Likelihood * Impact` model to calculate a risk score, which is then modified by the effectiveness of implemented controls.
-   **ISO 27001:2022 Control Library**: A comprehensive and categorized library of ISO 27001:2022 controls. You can mark controls as implemented and set their effectiveness to see a direct impact on risk calculations.
-   **Threat Modeling Library**: Includes a library of common threats based on the STRIDE framework to help you identify relevant risks for your scenarios.
-   **Intelligent Control Suggestions**: Recommends applicable ISO controls based on the scenario's description and its confidentiality, integrity, and availability impact profile.
-   **Data Management**:
    -   **Import/Export**: Save your entire risk register (scenarios and control states) to a JSON file for backup or sharing.
    -   **Load Examples**: Instantly load a set of pre-defined example scenarios to see how the tool works.
    -   **Clone Scenarios**: Quickly duplicate an existing risk scenario to use it as a template for a new one.
    -   **Client-Side Storage**: All data is stored locally in your browser's `localStorage`, meaning no data is sent to any server.
-   **Dynamic UI**:
    -   **Live Risk Preview**: See the calculated risk level update in real-time as you input data.
    -   **Interactive Charts**: The risk portfolio and dashboard are visualized with interactive charts powered by Chart.js.
    -   **Dark Mode**: Switch between light and dark themes for comfortable viewing in any environment.
    -   **Collapsible Sections**: A clean, organized interface where sections can be expanded or collapsed as needed.

## Enterprise-Grade Security

This project is designed with security as a priority. While maintaining its simplicity and portability as a **buildless** application, it incorporates modern security features to protect against common web vulnerabilities.

-   **Content Security Policy (CSP)**: The application uses a strict CSP to prevent a wide range of attacks, including Cross-Site Scripting (XSS).
-   **Subresource Integrity (SRI)**: All third-party resources (like Tailwind CSS and Chart.js) are loaded with an integrity hash to ensure they have not been tampered with.

## Technology Stack

-   **HTML5**
-   **CSS3** with **Tailwind CSS**
-   **Vanilla JavaScript (ES6+)**
-   **Chart.js** for data visualization

## How to Use

Getting started with Secure Start is incredibly simple:

1.  Clone or download this repository.
2.  Open any of the `*.html` files (e.g., `index.html`) in your web browser.

That's it! There are no build steps or dependencies to install.

## Risk Calculation Methodology

The risk calculation is designed to be simple yet effective.

1.  **Inherent Risk Score**: For each scenario, an inherent risk score is calculated:
    `Inherent Risk Score = Likelihood * Impact`
    -   **Likelihood**: A rating from 1 (Low) to 4 (Very High).
    -   **Impact**: A rating from 1 (Low) to 4 (Very High).

2.  **Control Effectiveness**: The effectiveness of applicable ISO 27001 controls reduces the likelihood of the risk.
    -   The average effectiveness of all selected controls is calculated (0-100%).
    -   This is converted into a `likelihoodModifier`. A 100% effective control set reduces the likelihood by a factor of 0.5.

3.  **Residual Risk Score**: The final score is calculated by applying the modifier:
    `Residual Risk Score = (Likelihood * likelihoodModifier) * Impact`

This residual score is then mapped to a risk level (Low, Medium, High, Critical) to determine its priority.

## Screenshots

*(To be added: Add screenshots of the dashboard, risk register, and ISMS module here.)*

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please see our [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
