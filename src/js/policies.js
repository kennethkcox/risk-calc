const policies = [
    {
        title: "Acceptable Use Policy (AUP)",
        description: "Outlines the acceptable use of company equipment, network, and internet resources to protect both employees and the company. It specifies what constitutes permissible and impermissible use of IT assets.",
        category: "General"
    },
    {
        title: "Information Security Policy (ISP)",
        description: "A high-level policy that establishes the foundation for the organization's security program. It defines the goals, framework, and responsibilities for information security management.",
        category: "General"
    },
    {
        title: "Data Classification Policy",
        description: "Defines different levels of data sensitivity (e.g., Public, Internal, Confidential, Restricted) and provides clear guidelines on how to handle, store, and transmit data in each category.",
        category: "Data Management"
    },
    {
        title: "Data Backup Policy",
        description: "Details the requirements for backing up company data, including backup frequency, storage locations (on-site and off-site), retention periods, and procedures for data restoration to prevent data loss.",
        category: "Data Management"
    },
    {
        title: "Password and Credential Management Policy",
        description: "Establishes strong password requirements, such as complexity, length, and history. Covers the secure storage and transmission of credentials and defines password reset procedures.",
        category: "Access Control"
    },
    {
        title: "Acceptable Encryption and Key Management Policy",
        description: "Defines the standards for using encryption to protect sensitive data at rest and in transit. It specifies approved encryption algorithms and protocols, and how cryptographic keys must be generated, stored, and managed.",
        category: "Technical"
    },
    {
        title: "User Identification, Authentication, and Authorization Policy",
        description: "Outlines procedures for identifying, authenticating, and authorizing users for access to company resources. Enforces principles like least privilege and separation of duties.",
        category: "Access Control"
    },
    {
        title: "Remote Access Policy",
        description: "Defines the rules and security requirements for connecting to the company's network from remote locations, including the use of VPNs, multi-factor authentication, and secure device configurations.",
        category: "Access Control"
    },
    {
        title: "Change Management Policy",
        description: "Establishes a standardized process for managing changes to IT systems, applications, and infrastructure to minimize the risk of disruptions, security flaws, and other unintended consequences.",
        category: "Technical"
    },
    {
        title: "Network Security Policy",
        description: "Governs the security of the network infrastructure. It includes rules for firewall configurations, intrusion detection/prevention systems, network segmentation, and wireless network security.",
        category: "Technical"
    },
    {
        title: "Personnel Security Policy",
        description: "Addresses the security aspects of human resources, including employee background screening, security awareness training, confidentiality agreements, and secure termination procedures.",
        category: "People"
    },
    {
        title: "Security Awareness and Training Policy",
        description: "Mandates regular security awareness training for all employees to educate them about current threats (e.g., phishing, social engineering) and their responsibilities in protecting company information.",
        category: "People"
    },
    {
        title: "Clean Desk and Clear Screen Policy",
        description: "Specifies how employees should maintain their physical and digital workspace to prevent unauthorized access to sensitive information. This includes locking computers and securing printed documents.",
        category: "People"
    },
    {
        title: "Incident Response Policy",
        description: "Provides a framework for responding to security incidents like data breaches or cyber-attacks. It defines roles, responsibilities, communication plans, and the phases of incident handling (detection, containment, eradication, recovery).",
        category: "Response & Recovery"
    },
    {
        title: "Data Breach Notification Policy",
        description: "A specific subset of Incident Response, this policy details the procedures for notifying affected individuals, regulatory bodies, and other stakeholders in the event of a data breach, in compliance with legal requirements.",
        category: "Response & Recovery"
    },
    {
        title: "Disaster Recovery (DR) Policy",
        description: "Outlines the procedures for recovering IT infrastructure, systems, and data in the event of a major disaster. It focuses on the technical aspects of restoration to meet Recovery Time Objectives (RTOs).",
        category: "Response & Recovery"
    },
    {
        title: "Business Continuity Plan (BCP)",
        description: "A comprehensive plan that outlines how the business will continue to operate during and after a disruption. It covers all essential business functions, not just IT, to ensure organizational resilience.",
        category: "Response & Recovery"
    },
    {
        title: "Third-Party Vendor Management Policy",
        description: "Defines the process for assessing and managing the security risks associated with third-party vendors, suppliers, and partners who have access to company data or systems. Includes due diligence and contract requirements.",
        category: "Third Party"
    },
    {
        title: "Physical Security Policy",
        description: "Establishes guidelines for securing company facilities, equipment, and other physical assets. It covers access control to buildings, visitor management, and surveillance.",
        category: "Physical Security"
    },
    {
        title: "Software Development Lifecycle (SDLC) Security Policy",
        description: "Integrates security practices into every phase of the software development lifecycle, from design and coding to testing and deployment, to build more secure applications.",
        category: "Technical"
    }
];
