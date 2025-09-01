# Quantitative Cyber Risk Calculator

This is a sophisticated, browser-based tool for performing quantitative cyber risk analysis. It is designed to help security professionals and decision-makers quantify cyber risk in financial terms, enabling better-informed security investments and risk management strategies. The calculator is inspired by the principles of the FAIR™ (Factor Analysis of Information Risk) framework.

## Features

*   **FAIR-Inspired Methodology**: The calculations are based on a simplified but powerful model inspired by the FAIR™ framework, focusing on Loss Event Frequency and Loss Magnitude.
*   **Detailed Risk Scenarios**: Add and manage multiple risk scenarios, each with its own detailed parameters.
*   **PERT Distribution for Uncertainty**: Uses a PERT (Program Evaluation and Review Technique) distribution to model financial loss and event frequency, providing a more realistic, weighted average for SLE and ARO.
*   **Control Strength Analysis**: Factor in the effectiveness of your security controls to see their impact on reducing risk.
*   **Live Risk Preview**: See the calculated SLE, ARO, and ALE update in real-time as you input data.
*   **Customizable Risk Thresholds**: Define your own financial thresholds for Low, Medium, High, and Critical risk levels.
*   **Clean, Responsive Interface**: Built with Tailwind CSS for a modern, easy-to-use experience on any device.

## Project Philosophy: Simplicity and Portability

This project is intentionally designed to be **buildless**. It runs directly in any modern web browser without requiring any installation, dependencies, or build steps. This is achieved by:

*   Using the **Tailwind CSS CDN**, which provides the full power of the framework without the need for a local build process.
*   Writing clean, vanilla JavaScript that is well-organized and easy to understand.

This approach makes the tool extremely portable, easy to deploy (just host the static files), and simple for anyone to inspect and modify, regardless of their development environment.

## How to Use

1.  Clone or download this repository.
2.  Open the `index.html` file in your web browser.

That's it! The application is entirely self-contained.

## How It Works

The calculator uses the following key metrics:

*   **SLE (Single Loss Expectancy)**: The expected financial loss from a single adverse event. This is calculated using a PERT-weighted average of the Minimum, Most Likely, and Maximum Loss values you provide.
*   **ARO (Annualized Rate of Occurrence)**: The expected number of times an adverse event will occur in a year. This is calculated using a PERT-weighted average of the Minimum, Most Likely, and Maximum Frequency values.
*   **ALE (Annualized Loss Expectancy)**: The total expected financial loss per year. It is calculated as `ALE = SLE * ARO`.

The tool then adjusts these "inherent" risk values based on the strength of your security controls to produce a "residual" risk score, which is what is displayed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
