# Quantitative Cyber Risk Calculator

This is a sophisticated, browser-based tool for performing quantitative cyber risk analysis. It is designed to help security professionals and decision-makers quantify cyber risk in financial terms, enabling better-informed security investments and risk management strategies. The calculator is inspired by the principles of the FAIR™ (Factor Analysis of Information Risk) framework.

## Features

*   **FAIR-Inspired Methodology**: The calculations are based on a simplified but powerful model inspired by the FAIR™ framework, focusing on Loss Event Frequency and Loss Magnitude.
*   **Detailed Risk Scenarios**: Add and manage multiple risk scenarios, each with its own detailed parameters.
*   **PERT Distribution for Uncertainty**: Uses a PERT (Program Evaluation and Review Technique) distribution to model financial loss and event frequency, providing a more realistic, weighted average for SLE and ARO.
*   **Monte Carlo Simulation**: Runs a lightweight Monte Carlo simulation in the browser to generate a distribution of potential annual losses, providing not just a mean ALE but also a 90th percentile value for more conservative planning.
*   **ISO 27001:2022 Control Library**: Includes a comprehensive, categorized library of ISO 27001:2022 controls. You can mark controls as "implemented" and set their effectiveness to see a direct impact on risk calculations.
*   **Intelligent Control Suggestions**: Recommends applicable ISO controls based on the scenario's description and its confidentiality, integrity, and availability impact profile.
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

The calculator provides a robust, simulation-based approach to quantifying cyber risk. Here’s a breakdown of the methodology:

### 1. Modeling Uncertainty with PERT

For each risk scenario, you provide a **Minimum**, **Most Likely**, and **Maximum** estimate for both **Financial Loss** (the impact of a single event) and **Annual Frequency** (how often the event might occur). The tool uses these three points to create a [PERT distribution](https://en.wikipedia.org/wiki/PERT_distribution), which is a continuous probability distribution that provides a more realistic, weighted-average model for uncertain variables compared to a simple average.

### 2. Monte Carlo Simulation

Instead of calculating a single, static outcome, the tool runs a **Monte Carlo simulation** with 10,000 trials for each scenario directly in your browser. In each trial, it:
1.  Picks a random **Single Loss Expectancy (SLE)** value from the Financial Loss PERT distribution.
2.  Picks a random **Annualized Rate of Occurrence (ARO)** value from the Annual Frequency PERT distribution.
3.  Calculates the **Annualized Loss Expectancy (ALE)** for that trial as `ALE = SLE * ARO`.

This process generates a distribution of 10,000 possible ALE outcomes for the scenario.

### 3. Calculating Residual Risk with Controls

Security controls reduce the likelihood or impact of a threat. The tool models this by applying a **Residual Risk Modifier** based on the controls you've marked as "implemented" from the ISO 27001 library.

*   Each implemented control has an **Effectiveness** rating (0-100%).
*   This is converted into a risk reduction factor (e.g., 75% effectiveness means a `0.25` modifier).
*   The tool multiplies the factors of all applicable controls to get a `combinedModifier`.
*   This modifier is then applied to both the SLE and ARO values in the simulation, reducing the "inherent" risk to a "residual" risk.

The final results displayed in the table—**Mean SLE, Mean ARO, Mean ALE, and 90th %ile ALE**—are all calculated from the distribution of these final, residual risk values.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
