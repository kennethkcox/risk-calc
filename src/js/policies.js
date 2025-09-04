const policies = [
    {
        title: "Acceptable Use Policy (AUP)",
        description: "Outlines the acceptable use of company equipment, network, and internet resources to protect both employees and the company. It specifies what constitutes permissible and impermissible use of IT assets.",
        category: "General",
        content: `
            <h3>1. Overview</h3>
            <p>Data, electronic file content, information systems, and computer systems at [Company Name] must be managed as valuable organization resources. Information Technology’s (IT) intentions are not to impose restrictions that are contrary to [Company Name]’s established culture of openness, trust, and integrity. IT is committed to protecting [Company Name]’s authorized users, partners, and the company from illegal or damaging actions by individuals either knowingly or unknowingly.</p>
            <p>Internet/Intranet/Extranet-related systems, including, but not limited to, computer equipment, software, operating systems, storage media, network accounts providing electronic mail, WWW browsing, and File Transfer Protocol (FTP) are the property of [Company Name]. These systems are to be used for business purposes in serving the interests of [Company Name] and of its clients and members during normal operations.</p>

            <h3>2. Purpose</h3>
            <p>The purpose of this policy is to outline the acceptable use of computer equipment at [Company Name]. These rules are in place to protect the authorized user and [Company Name]. Inappropriate use exposes [Company Name] to risks including virus attacks, compromise of network systems and services, and legal issues.</p>

            <h3>3. Scope</h3>
            <p>This policy applies to the use of information, electronic and computing devices, and network resources to conduct [Company Name] business or interacts with internal networks and business systems, whether owned or leased by [Company Name], the employee, or a third party. All employees, contractors, consultants, and other workers at [Company Name] are responsible for exercising good judgment regarding appropriate use of information, electronic devices, and network resources in accordance with [Company Name] policies and standards, local laws, and regulations.</p>

            <h3>4. Unacceptable Use</h3>
            <p>The following activities are prohibited by users, with no exceptions:</p>
            <ul>
                <li>Violations of the rights of any person or company protected by copyright, trade secret, patent, or other intellectual property, or similar laws or regulations.</li>
                <li>Introduction of malicious programs into the network or server (e.g., viruses, worms, Trojan horses, e-mail bombs, etc.).</li>
                <li>Revealing your account password to others or allowing use of your account by others.</li>
                <li>Using a [Company Name] computing asset to actively engage in procuring or transmitting material that is in violation of sexual harassment or hostile workplace laws.</li>
                <li>Attempting to access any data, electronic content, or programs contained on [Company Name] systems for which they do not have authorization.</li>
                <li>Downloading, installing, or running security programs or utilities that reveal passwords, private information, or exploit weaknesses in the security of a system.</li>
            </ul>

            <h3>5. Incidental Use</h3>
            <p>As a convenience to the [Company Name] user community, incidental use of information systems is permitted. The following restrictions apply:</p>
            <ul>
                <li>Incidental personal use must not result in direct costs to [Company Name].</li>
                <li>Incidental use must not interfere with the normal performance of an employee’s work duties.</li>
                <li>No files or documents may be sent or received that may cause legal action against, or embarrassment to, [Company Name].</li>
                <li>Storage of personal email messages, voice messages, files, and documents within [Company Name]’s information systems must be nominal.</li>
            </ul>
        `
    },
    {
        title: "Information Security Policy (ISP)",
        description: "A high-level policy that establishes the foundation for the organization's security program. It defines the goals, framework, and responsibilities for information security management.",
        category: "General",
        content: `
            <h3>1. Introduction</h3>
            <p>[Company Name] has recognized that our business information is a critical asset. As such, our ability to manage, control, and protect this asset will have a direct and significant impact on our future success. This document establishes the framework from which other information security policies may be developed to ensure that the enterprise can efficiently and effectively manage, control, and protect its business information assets.</p>
            <p>The goal of the [Company Name] Information Security Program is to protect the <strong>confidentiality</strong>, <strong>integrity</strong>, and <strong>availability</strong> of the data employed within the organization.</p>

            <h3>2. Purpose</h3>
            <p>The purpose of the [Company Name] Information Security Policy is to describe the actions and behaviors required to ensure that due care is taken to avoid inappropriate risks to [Company Name], its business partners, and its stakeholders.</p>

            <h3>3. Audience</h3>
            <p>The [Company Name] Information Security Policy applies equally to any individual, entity, or process that interacts with any [Company Name] Information Resource.</p>

            <h3>4. Responsibilities</h3>
            <h4>4.1 Executive Management</h4>
            <ul>
                <li>Ensure that an appropriate risk-based Information Security Program is implemented.</li>
                <li>Ensure adequate information security financial and personnel resources are included in the budgeting process.</li>
                <li>Designate an Information Security Officer and delegate authority to that individual.</li>
            </ul>
            <h4>4.2 Information Security Officer</h4>
            <ul>
                <li>Manage compliance with all relevant statutory, regulatory, and contractual requirements.</li>
                <li>Assess risks to the confidentiality, integrity, and availability of all Information Resources.</li>
                <li>Ensure that appropriate information security awareness training is provided to company personnel.</li>
                <li>Develop and implement procedures for testing and evaluating the effectiveness of the Information Security Program.</li>
            </ul>
            <h4>4.3 All Employees, Contractors, and Other Third-Party Personnel</h4>
            <ul>
                <li>Understand their responsibilities for complying with the [Company Name] Information Security Program.</li>
                <li>Use [Company Name] Information Resources in compliance with all [Company Name] Information Security Policies.</li>
                <li>Seek guidance from the Information Security Team for questions or issues related to information security.</li>
            </ul>

            <h3>5. Policy</h3>
            <p>[Company Name] maintains and communicates an Information Security Program consisting of topic-specific policies, standards, procedures and guidelines that:</p>
            <ul>
                <li>Serve to protect the Confidentiality, Integrity, and Availability of the Information Resources.</li>
                <li>Provide value to the way we conduct business and support institutional objectives.</li>
                <li>Comply with all regulatory and legal requirements.</li>
                <li>The information security program is reviewed no less than annually or upon significant changes to the information security environment.</li>
            </ul>
        `
    },
    {
        title: "Data Classification Policy",
        description: "Defines different levels of data sensitivity (e.g., Public, Internal, Confidential, Restricted) and provides clear guidelines on how to handle, store, and transmit data in each category.",
        category: "Data Management",
        content: `
            <h3>1. Purpose</h3>
            <p>The purpose of the [Company Name] Information Classification and Management Policy is to provide a system for classifying and managing Information Resources according to the risks associated with its storage, processing, transmission, and destruction.</p>

            <h3>2. Audience</h3>
            <p>The [Company Name] Information Classification and Management Policy applies to any individual, entity, or process that interacts with any [Company Name] Information Resource.</p>

            <h3>3. Information Classification Levels</h3>
            <p>Information owned, used, created or maintained by [Company Name] should be classified into one of the following three categories:</p>
            <ul>
                <li><strong>Public:</strong> Information that may or must be open to the general public. It has no existing legal restrictions on access or usage.</li>
                <li><strong>Internal:</strong> Information that must be guarded due to proprietary, ethical, or privacy considerations. It is restricted to personnel designated by [Company Name] who have a legitimate business purpose for accessing such Information. This is the default classification.</li>
                <li><strong>Confidential:</strong> Information protected by statutes, regulations, [Company Name] policies or contractual language. Access is restricted and disclosure is limited to individuals on a “need-to-know” basis only.</li>
            </ul>

            <h3>4. Examples</h3>
            <p><strong>Public:</strong> Publicly posted press releases, publicly available marketing materials, publicly posted job announcements.</p>
            <p><strong>Internal:</strong> Employment Information, business partner information, internal directories and organization charts, planning documents.</p>
            <p><strong>Confidential:</strong> Customer data, financial information (credit card and account numbers), Social Security Numbers, personnel and/or payroll records, patent information.</p>

            <h3>5. Information Handling</h3>
            <h4>5.1 Internal Information</h4>
            <ul>
                <li>Must be protected to prevent loss, theft, unauthorized access, and/or unauthorized disclosure.</li>
                <li>Must be stored in a closed container (i.e. file cabinet, closed office, or department where physical controls are in place to prevent disclosure) when not in use.</li>
            </ul>
            <h4>5.2 Confidential Information</h4>
            <ul>
                <li>When stored in an electronic format must be protected with strong passwords.</li>
                <li>When stored on mobile devices and media, must be encrypted.</li>
                <li>Must be encrypted at rest.</li>
                <li>Must be stored in a locked drawer, room, or area with sufficient physical access control measures.</li>
                <li>Must not be transferred via unsecure communication channels (unencrypted email, text messaging, etc.).</li>
                <li>Management must be notified in a timely manner if Information classified as Confidential has been or is suspected of being lost or disclosed.</li>
            </ul>
        `
    },
    {
        title: "Data Backup Policy",
        description: "Details the requirements for backing up company data, including backup frequency, storage locations (on-site and off-site), retention periods, and procedures for data restoration to prevent data loss.",
        category: "Data Management",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy defines the requirements for backing up [Company Name]'s critical data to ensure its protection and availability in the event of a system failure, data corruption, or disaster. The objective is to minimize the risk of data loss and to provide a mechanism for timely and reliable data recovery.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all critical [Company Name] data, whether stored on-premises, in the cloud, or on company-issued devices. This includes databases, application data, file servers, and user-generated content essential for business operations.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Backup Frequency</h4>
            <ul>
                <li><strong>Critical Systems (e.g., production databases, core applications):</strong> Full backups will be performed weekly, with incremental backups performed daily.</li>
                <li><strong>Business Data (e.g., file servers, departmental shares):</strong> Full backups will be performed weekly, with differential backups performed every two days.</li>
                <li><strong>User Endpoints (e.g., laptops):</strong> Key user data (e.g., 'My Documents' folder) will be backed up weekly.</li>
            </ul>

            <h4>3.2 Backup Storage and Retention</h4>
            <ul>
                <li>A minimum of two backup copies will be maintained.</li>
                <li>At least one backup copy must be stored in a secure, off-site location (e.g., a cloud storage provider or a secondary data center) to protect against a site-wide disaster.</li>
                <li>On-site backups will be retained for 30 days.</li>
                <li>Off-site backups will be retained for 90 days.</li>
                <li>Annual backups of critical data will be archived for a period of 7 years to meet legal and regulatory requirements.</li>
            </ul>

            <h4>3.3 Backup Encryption</h4>
            <p>All backup data must be encrypted both in transit and at rest to protect against unauthorized access. Strong, industry-standard encryption algorithms must be used.</p>

            <h4>3.4 Backup Testing</h4>
            <ul>
                <li>Backup integrity checks will be performed weekly to ensure that backups are not corrupted.</li>
                <li>Full data restoration tests will be conducted on a quarterly basis to verify that data can be successfully recovered in a timely manner. The results of these tests will be documented.</li>
            </ul>

            <h4>3.5 Responsibilities</h4>
            <ul>
                <li>The <strong>IT Department</strong> is responsible for implementing and managing the backup and recovery process, including performing backups, monitoring their status, and conducting restoration tests.</li>
                <li><strong>Data Owners</strong> are responsible for identifying critical data that needs to be backed up.</li>
                <li>All <strong>Employees</strong> are responsible for storing their work-related data in the designated locations so that it can be included in the regular backup schedule.</li>
            </ul>
        `
    },
    {
        title: "Password and Credential Management Policy",
        description: "Establishes strong password requirements, such as complexity, length, and history. Covers the secure storage and transmission of credentials and defines password reset procedures.",
        category: "Access Control",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes the requirements for creating, managing, and protecting passwords and other credentials to safeguard [Company Name]'s information resources from unauthorized access.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all employees, contractors, and other third parties who use [Company Name]'s information systems and have been issued credentials for authentication.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Password Complexity</h4>
            <ul>
                <li>Passwords must be a minimum of 12 characters in length.</li>
                <li>Passwords must contain characters from at least three of the following four categories:
                    <ul>
                        <li>Uppercase letters (A-Z)</li>
                        <li>Lowercase letters (a-z)</li>
                        <li>Numbers (0-9)</li>
                        <li>Special characters (e.g., !@#$%^&*)</li>
                    </ul>
                </li>
                <li>Passwords must not contain easily guessable information, such as usernames, company name, or common dictionary words.</li>
            </ul>

            <h4>3.2 Password Rotation</h4>
            <ul>
                <li>Passwords must be changed every 90 days.</li>
                <li>The last 5 passwords cannot be reused.</li>
            </ul>

            <h4>3.3 Password Protection</h4>
            <ul>
                <li>Passwords must not be written down or stored in an unencrypted format.</li>
                <li>Passwords must not be shared with anyone, including IT support staff.</li>
                <li>Users must lock their workstations when leaving them unattended.</li>
                <li>Suspected password compromise must be reported to the IT Department immediately.</li>
            </ul>
        `
    },
    {
        title: "Acceptable Encryption and Key Management Policy",
        description: "Defines the standards for using encryption to protect sensitive data at rest and in transit. It specifies approved encryption algorithms and protocols, and how cryptographic keys must be generated, stored, and managed.",
        category: "Technical",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy defines the requirements for using encryption to protect [Company Name]'s sensitive data and for managing the cryptographic keys used for that encryption.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all sensitive [Company Name] data, especially data classified as Confidential. It covers data at rest (on servers, laptops, and storage media) and in transit (across public or untrusted networks).</p>

            <h3>3. Policy</h3>
            <h4>3.1 Data Encryption</h4>
            <ul>
                <li>All laptops and mobile devices used for company business must have full-disk encryption enabled.</li>
                <li>All sensitive data stored in the cloud must be encrypted at rest.</li>
                <li>All sensitive data transmitted over public networks (e.g., the internet) must be encrypted in transit using strong, industry-standard protocols (e.g., TLS 1.2 or higher).</li>
            </ul>

            <h4>3.2 Key Management</h4>
            <ul>
                <li>Cryptographic keys must be securely generated, stored, and managed to prevent loss or unauthorized access.</li>
                <li>Access to cryptographic keys must be restricted to a minimum number of authorized personnel.</li>
                <li>Keys must be rotated or replaced periodically, in line with industry best practices.</li>
                <li>In the event of a key compromise, the key must be revoked immediately and replaced.</li>
            </ul>
        `
    },
    {
        title: "User Identification, Authentication, and Authorization Policy",
        description: "Outlines procedures for identifying, authenticating, and authorizing users for access to company resources. Enforces principles like least privilege and separation of duties.",
        category: "Access Control",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes the framework for granting and managing user access to [Company Name]'s information systems. The goal is to ensure that only authorized individuals have access to the resources they need to perform their job duties.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all users of [Company Name]'s information systems, including employees, contractors, and third-party vendors.</p>

            <h3>3. Policy</h3>
            <h4>3.1 User Identification and Authentication</h4>
            <ul>
                <li>Each user must be uniquely identified. The use of shared or generic accounts is prohibited.</li>
                <li>Authentication to sensitive systems must require multi-factor authentication (MFA).</li>
            </ul>

            <h4>3.2 Authorization and Access Control</h4>
            <ul>
                <li>Access to information systems will be granted based on the principle of least privilege, meaning users will only be given the minimum level of access necessary to perform their job functions.</li>
                <li>User access rights must be reviewed on a quarterly basis to ensure they are still appropriate.</li>
                <li>When an employee leaves the company, their access to all systems must be revoked in a timely manner.</li>
            </ul>
        `
    },
    {
        title: "Remote Access Policy",
        description: "Defines the rules and security requirements for connecting to the company's network from remote locations, including the use of VPNs, multi-factor authentication, and secure device configurations.",
        category: "Access Control",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy defines the security requirements for connecting to [Company Name]'s internal network from a remote location. The goal is to protect the company's information resources from the risks associated with remote access.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all employees, contractors, and other authorized users who access [Company Name]'s network from outside of the company's physical offices.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Secure Connection</h4>
            <ul>
                <li>All remote access to the internal network must be done through a company-approved Virtual Private Network (VPN).</li>
                <li>The VPN must be configured to use strong encryption and authentication.</li>
            </ul>

            <h4>3.2 Device Security</h4>
            <ul>
                <li>The device used for remote access (whether company-owned or personal) must have up-to-date antivirus software and all security patches installed.</li>
                <li>The device must have a firewall enabled.</li>
            </ul>

            <h4>3.3 User Responsibilities</h4>
            <ul>
                <li>Users are responsible for ensuring the physical security of their remote access device.</li>
                <li>Users must not access sensitive company data on public or untrusted Wi-Fi networks.</li>
            </ul>
        `
    },
    {
        title: "Change Management Policy",
        description: "Establishes a standardized process for managing changes to IT systems, applications, and infrastructure to minimize the risk of disruptions, security flaws, and other unintended consequences.",
        category: "Technical",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes a standardized process for managing changes to IT systems, applications, and infrastructure. The goal is to minimize the risk of disruptions, security flaws, and other unintended consequences that can result from changes.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all changes made to production IT systems, including hardware, software, network devices, and configurations.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Change Request Process</h4>
            <ul>
                <li>All changes must be formally requested and documented in a change request ticket.</li>
                <li>The change request must include a description of the change, the reason for the change, a risk assessment, a rollback plan, and the expected impact.</li>
                <li>All change requests must be reviewed and approved by the Change Advisory Board (CAB) before implementation.</li>
            </ul>

            <h4>3.2 Change Implementation</h4>
            <ul>
                <li>Changes should be scheduled to minimize disruption to business operations.</li>
                <li>All changes must be tested in a non-production environment before being deployed to production.</li>
                <li>The implementation of the change must be documented, and the change request ticket must be updated with the results.</li>
            </ul>
        `
    },
    {
        title: "Network Security Policy",
        description: "Governs the security of the network infrastructure. It includes rules for firewall configurations, intrusion detection/prevention systems, network segmentation, and wireless network security.",
        category: "Technical",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy defines the requirements for securing [Company Name]'s network infrastructure to protect against unauthorized access, misuse, and other security threats.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all network infrastructure components, including routers, switches, firewalls, wireless access points, and other network devices.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Firewalls</h4>
            <ul>
                <li>Firewalls must be in place to protect the perimeter of the company network.</li>
                <li>Firewall rules must be configured to deny all traffic by default and only allow traffic that is explicitly authorized.</li>
                <li>Firewall rules must be reviewed on a semi-annual basis.</li>
            </ul>

            <h4>3.2 Network Segmentation</h4>
            <ul>
                <li>The company network must be segmented into different security zones (e.g., DMZ, internal network, guest network) to isolate critical systems.</li>
                <li>Access between security zones must be restricted based on the principle of least privilege.</li>
            </ul>

            <h4>3.3 Wireless Security</h4>
            <ul>
                <li>All company wireless networks must be secured with strong encryption (WPA2 or better).</li>
                <li>A separate, isolated guest network must be provided for visitors. The guest network must not have access to the internal company network.</li>
            </ul>
        `
    },
    {
        title: "Personnel Security Policy",
        description: "Addresses the security aspects of human resources, including employee background screening, security awareness training, confidentiality agreements, and secure termination procedures.",
        category: "People",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy addresses the security aspects of human resources throughout the entire employee lifecycle, from hiring to termination. The goal is to reduce the risk of theft, fraud, and misuse of company resources.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all [Company Name] employees, contractors, and other personnel.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Before Employment</h4>
            <ul>
                <li>Background verification checks must be conducted for all candidates being considered for employment, in accordance with local laws and regulations.</li>
            </ul>

            <h4>3.2 During Employment</h4>
            <ul>
                <li>All employees must sign a confidentiality agreement as a condition of their employment.</li>
                <li>All employees must complete security awareness training upon hiring and on an annual basis thereafter.</li>
            </ul>

            <h4>3.3 Termination</h4>
            <ul>
                <li>When an employee is terminated, all of their access to company systems and facilities must be revoked immediately.</li>
                <li>All company assets (e.g., laptop, mobile phone) must be returned on the employee's last day.</li>
            </ul>
        `
    },
    {
        title: "Security Awareness and Training Policy",
        description: "Mandates regular security awareness training for all employees to educate them about current threats (e.g., phishing, social engineering) and their responsibilities in protecting company information.",
        category: "People",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes the requirement for a security awareness and training program to ensure that all [Company Name] personnel are aware of their security responsibilities and are equipped to identify and respond to security threats.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all [Company Name] employees, contractors, and other personnel who have access to company information and systems.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Training Program</h4>
            <ul>
                <li>All new hires must complete a security awareness training session as part of their onboarding process.</li>
                <li>All personnel must complete an annual security awareness training refresher course.</li>
                <li>The training program will cover topics such as:
                    <ul>
                        <li>Phishing and social engineering</li>
                        <li>Password security</li>
                        <li>Data privacy and protection</li>
                        <li>Acceptable use of company resources</li>
                    </ul>
                </li>
            </ul>

            <h4>3.2 Phishing Simulations</h4>
            <ul>
                <li>The company will conduct periodic phishing simulations to test the effectiveness of the training and to identify areas for improvement.</li>
                <li>Employees who fall for the phishing simulations will be provided with additional, targeted training.</li>
            </ul>
        `
    },
    {
        title: "Clean Desk and Clear Screen Policy",
        description: "Specifies how employees should maintain their physical and digital workspace to prevent unauthorized access to sensitive information. This includes locking computers and securing printed documents.",
        category: "People",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy is designed to reduce the risk of unauthorized access to sensitive information by ensuring that all employees maintain a clean and secure workspace, both physically and digitally.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all employees and contractors at [Company Name] who work in the office or remotely.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Clean Desk</h4>
            <ul>
                <li>Employees must clear their desks of all sensitive documents, such as printouts, notes, and company-owned removable media, at the end of the workday.</li>
                <li>Sensitive documents must be stored in a locked cabinet or drawer when not in use.</li>
                <li>Printers and fax machines should be cleared of sensitive documents as soon as they are printed.</li>
            </ul>

            <h4>3.2 Clear Screen</h4>
            <ul>
                <li>Employees must lock their computers (e.g., by pressing Ctrl+Alt+Delete or Cmd+Ctrl+Q) when they leave their desk for any reason.</li>
                <li>Computers should be configured to automatically lock after 10 minutes of inactivity.</li>
                <li>Employees must log off or shut down their computers at the end of the workday.</li>
            </ul>
        `
    },
    {
        title: "Incident Response Policy",
        description: "Provides a framework for responding to security incidents like data breaches or cyber-attacks. It defines roles, responsibilities, communication plans, and the phases of incident handling (detection, containment, eradication, recovery).",
        category: "Response & Recovery",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes a framework for responding to security incidents in a coordinated and effective manner. The goal is to minimize the impact of security incidents, protect company assets, and preserve evidence for potential investigation.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all security incidents, including but not limited to data breaches, malware infections, denial-of-service attacks, and unauthorized access to company systems.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Incident Response Team (IRT)</h4>
            <ul>
                <li>A dedicated Incident Response Team (IRT) will be established, with clear roles and responsibilities.</li>
                <li>The IRT will be responsible for managing the entire incident response lifecycle.</li>
            </ul>

            <h4>3.2 Incident Response Lifecycle</h4>
            <ol>
                <li><strong>Preparation:</strong> Maintaining the necessary tools, training, and documentation to respond to incidents.</li>
                <li><strong>Identification:</strong> Detecting and identifying security incidents.</li>
                <li><strong>Containment:</strong> Taking immediate steps to limit the scope and impact of the incident.</li>
                <li><strong>Eradication:</strong> Removing the root cause of the incident.</li>
                <li><strong>Recovery:</strong> Restoring systems to normal operation.</li>
                <li><strong>Lessons Learned:</strong> Analyzing the incident to identify areas for improvement in security controls and the incident response process.</li>
            </ol>
        `
    },
    {
        title: "Data Breach Notification Policy",
        description: "A specific subset of Incident Response, this policy details the procedures for notifying affected individuals, regulatory bodies, and other stakeholders in the event of a data breach, in compliance with legal requirements.",
        category: "Response & Recovery",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy defines the procedures for notifying affected individuals, regulatory bodies, and other stakeholders in the event of a data breach. The goal is to ensure timely and compliant communication to mitigate the impact of a breach.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to any data breach involving the unauthorized access or disclosure of personally identifiable information (PII) or other sensitive data.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Notification Timelines</h4>
            <ul>
                <li>In the event of a data breach, [Company Name] will notify affected individuals and regulatory bodies without undue delay, in accordance with applicable laws and regulations (e.g., GDPR, CCPA).</li>
            </ul>

            <h4>3.2 Notification Content</h4>
            <ul>
                <li>The notification will include a description of the nature of the breach, the types of data involved, the potential consequences, and the steps being taken to address the breach and mitigate its effects.</li>
                <li>The notification will also include contact information for a designated point of contact who can provide further information.</li>
            </ul>
        `
    },
    {
        title: "Disaster Recovery (DR) Policy",
        description: "Outlines the procedures for recovering IT infrastructure, systems, and data in the event of a major disaster. It focuses on the technical aspects of restoration to meet Recovery Time Objectives (RTOs).",
        category: "Response & Recovery",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes the framework for recovering IT infrastructure, systems, and data in the event of a major disaster. The goal is to ensure that critical business functions can be restored within a defined timeframe.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all critical IT systems and infrastructure required to support essential business operations.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Recovery Time Objective (RTO) and Recovery Point Objective (RPO)</h4>
            <ul>
                <li><strong>RTO:</strong> The maximum acceptable downtime for a critical system after a disaster. [Company Name] has defined an RTO of 24 hours for all critical systems.</li>
                <li><strong>RPO:</strong> The maximum acceptable amount of data loss, measured in time. [Company Name] has defined an RPO of 4 hours for all critical systems.</li>
            </ul>

            <h4>3.2 Disaster Recovery Plan</h4>
            <ul>
                <li>A detailed Disaster Recovery Plan (DRP) will be developed and maintained.</li>
                <li>The DRP will include procedures for failing over to a secondary site, recovering data from backups, and restoring services.</li>
                <li>The DRP will be tested on an annual basis to ensure its effectiveness.</li>
            </ul>
        `
    },
    {
        title: "Business Continuity Plan (BCP)",
        description: "A comprehensive plan that outlines how the business will continue to operate during and after a disruption. It covers all essential business functions, not just IT, to ensure organizational resilience.",
        category: "Response & Recovery",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes the framework for ensuring that [Company Name] can continue to operate its critical business functions in the event of a significant disruption. The goal is to ensure the resilience of the organization and to minimize the impact of a disruption on our customers and stakeholders.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all essential business functions and the resources required to support them, including personnel, facilities, technology, and suppliers.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Business Impact Analysis (BIA)</h4>
            <ul>
                <li>A Business Impact Analysis (BIA) will be conducted annually to identify critical business functions and the resources required to support them.</li>
                <li>The BIA will be used to determine the recovery priorities for business functions and to establish Recovery Time Objectives (RTOs).</li>
            </ul>

            <h4>3.2 Business Continuity Plan (BCP)</h4>
            <ul>
                <li>A detailed Business Continuity Plan (BCP) will be developed and maintained.</li>
                <li>The BCP will include procedures for relocating to an alternate work site, recovering critical business functions, and communicating with employees, customers, and other stakeholders.</li>
                <li>The BCP will be tested on an annual basis through a tabletop exercise or a full-scale simulation.</li>
            </ul>
        `
    },
    {
        title: "Third-Party Vendor Management Policy",
        description: "Defines the process for assessing and managing the security risks associated with third-party vendors, suppliers, and partners who have access to company data or systems. Includes due diligence and contract requirements.",
        category: "Third Party",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy defines the process for assessing and managing the security risks associated with third-party vendors, suppliers, and partners who have access to [Company Name] data or systems. The goal is to ensure that our vendors meet our security standards.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all third-party vendors who handle sensitive company data or have access to our internal network.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Vendor Due Diligence</h4>
            <ul>
                <li>Before engaging a new vendor, a security risk assessment must be conducted to evaluate the vendor's security posture.</li>
                <li>The risk assessment will include a review of the vendor's security policies, procedures, and controls.</li>
            </ul>

            <h4>3.2 Vendor Contracts</h4>
            <ul>
                <li>All vendor contracts must include a security addendum that outlines the vendor's security responsibilities and our right to audit their compliance.</li>
            </ul>

            <h4>3.3 Ongoing Monitoring</h4>
            <ul>
                <li>The security of our vendors will be monitored on an ongoing basis.</li>
                <li>Vendors will be required to notify us of any security incidents that may affect our data.</li>
            </ul>
        `
    },
    {
        title: "Physical Security Policy",
        description: "Establishes guidelines for securing company facilities, equipment, and other physical assets. It covers access control to buildings, visitor management, and surveillance.",
        category: "Physical Security",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy establishes guidelines for securing [Company Name]'s facilities, equipment, and other physical assets from physical threats, such as theft, vandalism, and unauthorized access.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all [Company Name] facilities, including offices, data centers, and other work areas.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Access Control</h4>
            <ul>
                <li>Access to company facilities will be restricted to authorized personnel only.</li>
                <li>All employees will be issued an access card, and access will be granted based on the principle of least privilege.</li>
                <li>Visitors must sign in and be escorted by an employee at all times.</li>
            </ul>

            <h4>3.2 Surveillance</h4>
            <ul>
                <li>Surveillance cameras will be used to monitor sensitive areas, such as entrances, exits, and server rooms.</li>
                <li>Surveillance footage will be retained for a minimum of 30 days.</li>
            </ul>

            <h4>3.3 Equipment Security</h4>
            <ul>
                <li>All company-owned equipment, such as laptops and servers, must be physically secured.</li>
                <li>Sensitive equipment must be located in a locked room with restricted access.</li>
            </ul>
        `
    },
    {
        title: "Software Development Lifecycle (SDLC) Security Policy",
        description: "Integrates security practices into every phase of the software development lifecycle, from design and coding to testing and deployment, to build more secure applications.",
        category: "Technical",
        content: `
            <h3>1. Purpose</h3>
            <p>This policy integrates security practices into every phase of the software development lifecycle (SDLC). The goal is to build more secure applications and to reduce the number of vulnerabilities in our software.</p>

            <h3>2. Scope</h3>
            <p>This policy applies to all software development projects at [Company Name], whether developed in-house or by a third party.</p>

            <h3>3. Policy</h3>
            <h4>3.1 Secure Coding Standards</h4>
            <ul>
                <li>All developers must follow secure coding standards, such as the OWASP Top 10, to prevent common vulnerabilities.</li>
                <li>All code must be reviewed for security vulnerabilities before it is deployed to production.</li>
            </ul>

            <h4>3.2 Security Testing</h4>
            <ul>
                <li>Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) tools will be used to scan for vulnerabilities throughout the SDLC.</li>
                <li>Penetration testing will be conducted on all high-risk applications on an annual basis.</li>
            </ul>

            <h4>3.3 Third-Party Libraries</h4>
            <ul>
                <li>All third-party libraries and components must be approved by the security team before they are used in our software.</li>
                <li>All third-party libraries must be regularly updated to patch known vulnerabilities.</li>
            </ul>
        `
    }
];
