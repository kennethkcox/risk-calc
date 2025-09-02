const ISO_27001_CONTROLS = [
    // --- Organizational Controls ---
    {
        id: 'A.5.1',
        name: 'Policies for information security',
        category: 'Organizational',
        description: 'Define and document the organization\'s stance and rules for information security.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.5.2',
        name: 'Information security roles and responsibilities',
        category: 'Organizational',
        description: 'Assign and communicate clear roles for managing and overseeing information security.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.5.3',
        name: 'Segregation of duties',
        category: 'Organizational',
        description: 'Separate conflicting duties to reduce the risk of unauthorized or unintentional modification or misuse of assets.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.4',
        name: 'Management responsibilities',
        category: 'Organizational',
        description: 'Ensure management actively supports and requires information security within the organization.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.5.5',
        name: 'Contact with authorities',
        category: 'Organizational',
        description: 'Maintain contact with relevant authorities (e.g., law enforcement, regulatory bodies).',
        riskMappings: ['frequency']
    },
    {
        id: 'A.5.6',
        name: 'Contact with special interest groups',
        category: 'Organizational',
        description: 'Maintain contact with security forums and professional associations to stay updated on threats and best practices.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.5.7',
        name: 'Threat intelligence',
        category: 'Organizational',
        description: 'Collect and analyze information about emerging threats to inform defensive strategies.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.5.8',
        name: 'Information security in project management',
        category: 'Organizational',
        description: 'Integrate information security requirements and activities into all project lifecycles.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.9',
        name: 'Inventory of information and other associated assets',
        category: 'Organizational',
        description: 'Identify and maintain an inventory of all critical information and assets.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.10',
        name: 'Acceptable use of information and other associated assets',
        category: 'Organizational',
        description: 'Define and enforce rules for the appropriate use of information and assets.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.11',
        name: 'Return of assets',
        category: 'Organizational',
        description: 'Establish a process to ensure all assets are returned upon termination of employment or contract.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.12',
        name: 'Classification of information',
        category: 'Organizational',
        description: 'Classify information based on its sensitivity, criticality, and legal requirements.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.13',
        name: 'Labelling of information',
        category: 'Organizational',
        description: 'Apply appropriate labels to information to indicate its classification.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.5.14',
        name: 'Information transfer',
        category: 'Organizational',
        description: 'Establish rules and security measures for transferring information, both physically and electronically.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.15',
        name: 'Access control',
        category: 'Organizational',
        description: 'Establish a formal policy for controlling access to information and systems.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.16',
        name: 'Identity management',
        category: 'Organizational',
        description: 'Manage the full lifecycle of user identities, from creation to deletion.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.17',
        name: 'Authentication information',
        category: 'Organizational',
        description: 'Protect authentication credentials (like passwords, tokens) from misuse or compromise.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.18',
        name: 'Access rights',
        category: 'Organizational',
        description: 'Implement processes to grant, review, and revoke access rights based on the principle of least privilege.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.19',
        name: 'Information security in supplier relationships',
        category: 'Organizational',
        description: 'Manage information security risks associated with suppliers and third parties.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.5.20',
        name: 'Addressing information security within supplier agreements',
        category: 'Organizational',
        description: 'Include information security requirements in all supplier contracts and agreements.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.21',
        name: 'Managing information security in the ICT supply chain',
        category: 'Organizational',
        description: 'Protect against vulnerabilities and ensure integrity throughout the technology supply chain.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.5.22',
        name: 'Monitoring, review and change management of supplier services',
        category: 'Organizational',
        description: 'Regularly monitor and review supplier performance and manage changes to their services.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.23',
        name: 'Information security for use of cloud services',
        category: 'Organizational',
        description: 'Establish policies for the secure adoption and use of cloud services.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.24',
        name: 'Information security incident management planning and preparation',
        category: 'Organizational',
        description: 'Develop and maintain a plan for responding to security incidents effectively.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.5.25',
        name: 'Assessment and decision on information security events',
        category: 'Organizational',
        description: 'Establish a process for assessing security events to determine if they are incidents.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.5.26',
        name: 'Response to information security incidents',
        category: 'Organizational',
        description: 'Execute the incident response plan to contain, eradicate, and recover from incidents.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.27',
        name: 'Learning from information security incidents',
        category: 'Organizational',
        description: 'Analyze incidents to identify root causes and improve security controls.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.5.28',
        name: 'Collection of evidence',
        category: 'Organizational',
        description: 'Follow forensic procedures to collect and preserve evidence from security incidents.',
        riskMappings: ['integrity']
    },
    {
        id: 'A.5.29',
        name: 'Information security during disruption',
        category: 'Organizational',
        description: 'Maintain information security controls and continuity during a business disruption.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.30',
        name: 'ICT readiness for business continuity',
        category: 'Organizational',
        description: 'Ensure that IT systems are resilient and can be recovered to meet business continuity objectives.',
        riskMappings: ['availability']
    },
    {
        id: 'A.5.31',
        name: 'Identification of legal, statutory, regulatory and contractual requirements',
        category: 'Organizational',
        description: 'Identify and document all applicable legal, regulatory, and contractual requirements related to information security.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.32',
        name: 'Intellectual property rights',
        category: 'Organizational',
        description: 'Implement procedures to protect intellectual property rights.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.5.33',
        name: 'Protection of records',
        category: 'Organizational',
        description: 'Protect organizational records from loss, destruction, falsification, and unauthorized access.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.34',
        name: 'Privacy and protection of PII',
        category: 'Organizational',
        description: 'Protect Personally Identifiable Information (PII) in accordance with legal and regulatory requirements.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.5.35',
        name: 'Independent review of information security',
        category: 'Organizational',
        description: 'Conduct independent reviews or audits of the information security program to ensure its effectiveness.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.5.36',
        name: 'Compliance with policies and standards for information security',
        category: 'Organizational',
        description: 'Regularly verify that all security activities comply with established policies and standards.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.5.37',
        name: 'Documented operating procedures',
        category: 'Organizational',
        description: 'Maintain documented procedures for operating information systems securely.',
        riskMappings: ['integrity', 'availability']
    },

    // --- People Controls ---
    {
        id: 'A.6.1',
        name: 'Screening',
        category: 'People',
        description: 'Conduct background verification checks on candidates for employment.',
        riskMappings: ['confidentiality', 'integrity', 'frequency']
    },
    {
        id: 'A.6.2',
        name: 'Terms and conditions of employment',
        category: 'People',
        description: 'Ensure employment agreements include responsibilities for information security.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.6.3',
        name: 'Information security awareness, education and training',
        category: 'People',
        description: 'Provide regular training to all employees on information security policies and procedures.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.6.4',
        name: 'Disciplinary process',
        category: 'People',
        description: 'Establish a formal disciplinary process for employees who have committed a security violation.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.6.5',
        name: 'Responsibilities after termination or change of employment',
        category: 'People',
        description: 'Manage the return of assets and removal of access rights when employment ends or changes.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.6.6',
        name: 'Confidentiality or non-disclosure agreements',
        category: 'People',
        description: 'Use confidentiality or non-disclosure agreements to protect sensitive information.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.6.7',
        name: 'Remote working',
        category: 'People',
        description: 'Implement security measures to protect information accessed, processed, or stored when working remotely.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.6.8',
        name: 'Information security event reporting',
        category: 'People',
        description: 'Encourage and enable employees to report observed or suspected security events and weaknesses.',
        riskMappings: ['frequency']
    },

    // --- Physical Controls ---
    {
        id: 'A.7.1',
        name: 'Physical security perimeter',
        category: 'Physical',
        description: 'Use physical barriers (e.g., walls, fences, gates) to protect areas that contain information and information processing facilities.',
        riskMappings: ['availability', 'integrity', 'confidentiality']
    },
    {
        id: 'A.7.2',
        name: 'Physical entry controls',
        category: 'Physical',
        description: 'Secure and control all entry points to prevent unauthorized physical access.',
        riskMappings: ['availability', 'integrity', 'confidentiality']
    },
    {
        id: 'A.7.3',
        name: 'Securing offices, rooms and facilities',
        category: 'Physical',
        description: 'Design and apply physical security measures for offices, rooms, and facilities.',
        riskMappings: ['availability', 'integrity', 'confidentiality']
    },
    {
        id: 'A.7.4',
        name: 'Physical security monitoring',
        category: 'Physical',
        description: 'Use surveillance systems (e.g., CCTV) to monitor premises for unauthorized physical access.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.7.5',
        name: 'Protecting against physical and environmental threats',
        category: 'Physical',
        description: 'Implement controls to protect against natural disasters, malicious attacks, or accidents.',
        riskMappings: ['availability', 'integrity']
    },
    {
        id: 'A.7.6',
        name: 'Working in secure areas',
        category: 'Physical',
        description: 'Establish and enforce procedures for working in areas with sensitive information.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.7.7',
        name: 'Clear desk and clear screen',
        category: 'Physical',
        description: 'Require employees to lock their screens when leaving their desks and keep sensitive papers out of sight.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.7.8',
        name: 'Equipment siting and protection',
        category: 'Physical',
        description: 'Position and protect equipment to reduce risks from environmental threats and unauthorized access.',
        riskMappings: ['availability', 'integrity']
    },
    {
        id: 'A.7.9',
        name: 'Security of assets off-premises',
        category: 'Physical',
        description: 'Apply security measures to assets when they are used outside the organization’s premises.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.7.10',
        name: 'Storage media',
        category: 'Physical',
        description: 'Manage and control all types of storage media to prevent unauthorized disclosure or misuse.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.7.11',
        name: 'Supporting utilities',
        category: 'Physical',
        description: 'Protect utilities like electricity, water, and telecommunications to prevent service interruptions.',
        riskMappings: ['availability']
    },
    {
        id: 'A.7.12',
        name: 'Cabling security',
        category: 'Physical',
        description: 'Protect power and data cables from interception, interference, or damage.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.7.13',
        name: 'Equipment maintenance',
        category: 'Physical',
        description: 'Ensure equipment is correctly maintained to ensure its continued availability and integrity.',
        riskMappings: ['availability', 'integrity']
    },
    {
        id: 'A.7.14',
        name: 'Secure disposal or re-use of equipment',
        category: 'Physical',
        description: 'Securely dispose of or reuse equipment containing storage media to prevent data leakage.',
        riskMappings: ['confidentiality']
    },

    // --- Technological Controls ---
    {
        id: 'A.8.1',
        name: 'User endpoint devices',
        category: 'Technological',
        description: 'Protect user devices (laptops, mobiles) through security configurations and policies.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.2',
        name: 'Privileged access rights',
        category: 'Technological',
        description: 'Restrict and control the use of privileged access rights (e.g., administrator accounts).',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.3',
        name: 'Information access restriction',
        category: 'Technological',
        description: 'Enforce access control policies to restrict access to information and application functions.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.8.4',
        name: 'Access to source code',
        category: 'Technological',
        description: 'Restrict access to software source code to prevent the introduction of unauthorized functionality.',
        riskMappings: ['integrity']
    },
    {
        id: 'A.8.5',
        name: 'Secure authentication',
        category: 'Technological',
        description: 'Implement strong authentication mechanisms to verify the identity of users.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.8.6',
        name: 'Capacity management',
        category: 'Technological',
        description: 'Monitor and plan for system capacity to ensure required performance and availability.',
        riskMappings: ['availability']
    },
    {
        id: 'A.8.7',
        name: 'Protection against malware',
        category: 'Technological',
        description: 'Deploy anti-malware software and other controls to protect against malicious code.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.8.8',
        name: 'Management of technical vulnerabilities',
        category: 'Technological',
        description: 'Identify, assess, and remediate technical vulnerabilities in a timely manner.',
        riskMappings: ['confidentiality', 'integrity', 'availability', 'frequency']
    },
    {
        id: 'A.8.9',
        name: 'Configuration management',
        category: 'Technological',
        description: 'Establish and maintain secure configurations for all hardware and software.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.8.10',
        name: 'Information deletion',
        category: 'Technological',
        description: 'Use tools and procedures to securely and permanently delete information when no longer required.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.8.11',
        name: 'Data masking',
        category: 'Technological',
        description: 'Use techniques like pseudonymization or anonymization to limit the exposure of sensitive data.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.8.12',
        name: 'Data leakage prevention',
        category: 'Technological',
        description: 'Implement technical controls to detect and prevent the unauthorized disclosure of sensitive information.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.8.13',
        name: 'Information backup',
        category: 'Technological',
        description: 'Perform regular backups of information, software, and systems.',
        riskMappings: ['availability']
    },
    {
        id: 'A.8.14',
        name: 'Redundancy of information processing facilities',
        category: 'Technological',
        description: 'Implement redundant components or systems to ensure availability in case of a failure.',
        riskMappings: ['availability']
    },
    {
        id: 'A.8.15',
        name: 'Logging',
        category: 'Technological',
        description: 'Generate, store, and review logs of user activities, exceptions, and security events.',
        riskMappings: ['integrity', 'frequency']
    },
    {
        id: 'A.8.16',
        name: 'Monitoring activities',
        category: 'Technological',
        description: 'Monitor networks, systems, and applications to detect anomalous behavior and potential security incidents.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.8.17',
        name: 'Clock synchronisation',
        category: 'Technological',
        description: 'Synchronize system clocks to a single reference time source to support event correlation.',
        riskMappings: ['integrity']
    },
    {
        id: 'A.8.18',
        name: 'Use of privileged utility programs',
        category: 'Technological',
        description: 'Restrict and control the use of powerful system utilities that could bypass security controls.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.8.19',
        name: 'Installation of software on operational systems',
        category: 'Technological',
        description: 'Manage and control the installation of software on production systems to minimize risks.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.8.20',
        name: 'Network controls',
        category: 'Technological',
        description: 'Manage and control networks to protect information in systems and applications.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.21',
        name: 'Security of network services',
        category: 'Technological',
        description: 'Secure network services and their connections to prevent unauthorized access and exploitation.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.22',
        name: 'Segregation in networks',
        category: 'Technological',
        description: 'Divide networks into segments to limit the impact of a security compromise.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.23',
        name: 'Web filtering',
        category: 'Technological',
        description: 'Implement controls to manage access to external websites to prevent exposure to malicious content.',
        riskMappings: ['frequency']
    },
    {
        id: 'A.8.24',
        name: 'Use of cryptography',
        category: 'Technological',
        description: 'Use encryption to protect the confidentiality and integrity of information.',
        riskMappings: ['confidentiality', 'integrity']
    },
    {
        id: 'A.8.25',
        name: 'Secure development lifecycle',
        category: 'Technological',
        description: 'Integrate security throughout the entire software development lifecycle (SDLC).',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.26',
        name: 'Application security requirements',
        category: 'Technological',
        description: 'Define and document security requirements for new applications or enhancements.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.27',
        name: 'Secure system architecture and engineering principles',
        category: 'Technological',
        description: 'Apply security principles to the design and engineering of system architectures.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.28',
        name: 'Secure coding',
        category: 'Technological',
        description: 'Follow secure coding practices to prevent common vulnerabilities in software.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.29',
        name: 'Security testing in development and acceptance',
        category: 'Technological',
        description: 'Conduct security testing throughout the development process to identify and fix vulnerabilities.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.30',
        name: 'Outsourced development',
        category: 'Technological',
        description: 'Manage security risks associated with software development that is outsourced to third parties.',
        riskMappings: ['confidentiality', 'integrity', 'availability']
    },
    {
        id: 'A.8.31',
        name: 'Separation of development, test and production environments',
        category: 'Technological',
        description: 'Separate development, testing, and production environments to reduce the risk of unauthorized access or changes.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.8.32',
        name: 'Change management',
        category: 'Technological',
        description: 'Use a formal change management process to control all changes to systems, applications, and networks.',
        riskMappings: ['integrity', 'availability']
    },
    {
        id: 'A.8.33',
        name: 'Test information',
        category: 'Technological',
        description: 'Protect test data and ensure it is carefully selected and controlled.',
        riskMappings: ['confidentiality']
    },
    {
        id: 'A.8.34',
        name: 'Protection of information systems during audit and testing',
        category: 'Technological',
        description: 'Protect operational systems from any adverse impact during security audits or tests.',
        riskMappings: ['availability', 'integrity']
    }
];
