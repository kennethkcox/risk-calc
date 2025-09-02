const ISO_27001_CONTROLS = [
    // --- Organizational Controls ---
    {
        id: 'A.5.1',
        name: 'Policies for information security',
        category: 'Organizational',
        description: 'Define and document the organization\'s stance and rules for information security.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.5.2',
        name: 'Information security roles and responsibilities',
        category: 'Organizational',
        description: 'Assign and communicate clear roles for managing and overseeing information security.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.5.3',
        name: 'Segregation of duties',
        category: 'Organizational',
        description: 'Separate conflicting duties to reduce the risk of unauthorized or unintentional modification or misuse of assets.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.5.7',
        name: 'Threat intelligence',
        category: 'Organizational',
        description: 'Collect and analyze information about emerging threats to inform defensive strategies.',
        impacts: ['frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.5.12',
        name: 'Classification of information',
        category: 'Organizational',
        description: 'Classify information based on its sensitivity, criticality, and legal requirements.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.5.14',
        name: 'Information transfer',
        category: 'Organizational',
        description: 'Establish rules and security measures for transferring information, both physically and electronically.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.5.15',
        name: 'Access control',
        category: 'Organizational',
        description: 'Establish a formal policy for controlling access to information and systems.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.5.16',
        name: 'Identity management',
        category: 'Organizational',
        description: 'Manage the full lifecycle of user identities, from creation to deletion.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.5.19',
        name: 'Information security in supplier relationships',
        category: 'Organizational',
        description: 'Manage information security risks associated with suppliers and third parties.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.5.23',
        name: 'Information security for use of cloud services',
        category: 'Organizational',
        description: 'Establish policies for the secure adoption and use of cloud services.',
        impacts: ['magnitude'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.5.24',
        name: 'Information security incident management planning and preparation',
        category: 'Organizational',
        description: 'Develop and maintain a plan for responding to security incidents effectively.',
        impacts: ['magnitude', 'frequency'],
        cia: ['I', 'A']
    },
    {
        id: 'A.5.29',
        name: 'Information security during disruption',
        category: 'Organizational',
        description: 'Maintain information security controls and continuity during a business disruption.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.5.30',
        name: 'ICT readiness for business continuity',
        category: 'Organizational',
        description: 'Ensure that IT systems are resilient and can be recovered to meet business continuity objectives.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.5.34',
        name: 'Privacy and protection of PII',
        category: 'Organizational',
        description: 'Protect Personally Identifiable Information (PII) in accordance with legal and regulatory requirements.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.5.35',
        name: 'Independent review of information security',
        category: 'Organizational',
        description: 'Conduct independent reviews or audits of the information security program to ensure its effectiveness.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },

    // --- People Controls ---
    {
        id: 'A.6.3',
        name: 'Information security awareness, education and training',
        category: 'People',
        description: 'Provide regular training to all employees on information security policies and procedures.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.6.7',
        name: 'Remote working',
        category: 'People',
        description: 'Implement security measures to protect information accessed, processed, or stored when working remotely.',
        impacts: ['magnitude'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.6.8',
        name: 'Information security event reporting',
        category: 'People',
        description: 'Encourage and enable employees to report observed or suspected security events and weaknesses.',
        impacts: ['frequency'],
        cia: ['C', 'I', 'A']
    },

    // --- Physical Controls ---
    {
        id: 'A.7.1',
        name: 'Physical security perimeter',
        category: 'Physical',
        description: 'Use physical barriers (e.g., walls, fences, gates) to protect areas that contain information and information processing facilities.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.7.2',
        name: 'Physical entry controls',
        category: 'Physical',
        description: 'Secure and control all entry points to prevent unauthorized physical access.',
        impacts: ['magnitude'],
        cia: ['C', 'A']
    },
    {
        id: 'A.7.4',
        name: 'Physical security monitoring',
        category: 'Physical',
        description: 'Use surveillance systems (e.g., CCTV) to monitor premises for unauthorized physical access.',
        impacts: ['frequency'],
        cia: ['C', 'A']
    },
    {
        id: 'A.7.7',
        name: 'Clear desk and clear screen',
        category: 'Physical',
        description: 'Require employees to lock their screens when leaving their desks and keep sensitive papers out of sight.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.7.11',
        name: 'Supporting utilities',
        category: 'Physical',
        description: 'Protect utilities like electricity, water, and telecommunications to prevent service interruptions.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.7.14',
        name: 'Secure disposal or re-use of equipment',
        category: 'Physical',
        description: 'Securely dispose of or reuse equipment containing storage media to prevent data leakage.',
        impacts: ['magnitude'],
        cia: ['C']
    },

    // --- Technological Controls ---
    {
        id: 'A.8.1',
        name: 'User endpoint devices',
        category: 'Technological',
        description: 'Protect user devices (laptops, mobiles) through security configurations and policies.',
        impacts: ['magnitude'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.2',
        name: 'Privileged access rights',
        category: 'Technological',
        description: 'Restrict and control the use of privileged access rights (e.g., administrator accounts).',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.8.3',
        name: 'Information access restriction',
        category: 'Technological',
        description: 'Enforce access control policies to restrict access to information and application functions.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.8.5',
        name: 'Secure authentication',
        category: 'Technological',
        description: 'Implement strong authentication mechanisms to verify the identity of users.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.8.6',
        name: 'Capacity management',
        category: 'Technological',
        description: 'Monitor and plan for system capacity to ensure required performance and availability.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.8.7',
        name: 'Protection against malware',
        category: 'Technological',
        description: 'Deploy anti-malware software and other controls to protect against malicious code.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.8',
        name: 'Management of technical vulnerabilities',
        category: 'Technological',
        description: 'Identify, assess, and remediate technical vulnerabilities in a timely manner.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.9',
        name: 'Configuration management',
        category: 'Technological',
        description: 'Establish and maintain secure configurations for all hardware and software.',
        impacts: ['magnitude'],
        cia: ['I', 'A']
    },
    {
        id: 'A.8.10',
        name: 'Information deletion',
        category: 'Technological',
        description: 'Use tools and procedures to securely and permanently delete information when no longer required.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.8.11',
        name: 'Data masking',
        category: 'Technological',
        description: 'Use techniques like pseudonymization or anonymization to limit the exposure of sensitive data.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.8.12',
        name: 'Data leakage prevention',
        category: 'Technological',
        description: 'Implement technical controls to detect and prevent the unauthorized disclosure of sensitive information.',
        impacts: ['magnitude'],
        cia: ['C']
    },
    {
        id: 'A.8.13',
        name: 'Information backup',
        category: 'Technological',
        description: 'Perform regular backups of information, software, and systems.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.8.14',
        name: 'Redundancy of information processing facilities',
        category: 'Technological',
        description: 'Implement redundant components or systems to ensure availability in case of a failure.',
        impacts: ['magnitude'],
        cia: ['A']
    },
    {
        id: 'A.8.15',
        name: 'Logging',
        category: 'Technological',
        description: 'Generate, store, and review logs of user activities, exceptions, and security events.',
        impacts: ['magnitude', 'frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.16',
        name: 'Monitoring activities',
        category: 'Technological',
        description: 'Monitor networks, systems, and applications to detect anomalous behavior and potential security incidents.',
        impacts: ['frequency'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.20',
        name: 'Network controls',
        category: 'Technological',
        description: 'Manage and control networks to protect information in systems and applications.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.8.22',
        name: 'Segregation in networks',
        category: 'Technological',
        description: 'Divide networks into segments to limit the impact of a security compromise.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.8.23',
        name: 'Web filtering',
        category: 'Technological',
        description: 'Implement controls to manage access to external websites to prevent exposure to malicious content.',
        impacts: ['frequency'],
        cia: ['C', 'I']
    },
    {
        id: 'A.8.24',
        name: 'Use of cryptography',
        category: 'Technological',
        description: 'Use encryption to protect the confidentiality and integrity of information.',
        impacts: ['magnitude'],
        cia: ['C', 'I']
    },
    {
        id: 'A.8.25',
        name: 'Secure development lifecycle',
        category: 'Technological',
        description: 'Integrate security throughout the entire software development lifecycle (SDLC).',
        impacts: ['magnitude'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.28',
        name: 'Secure coding',
        category: 'Technological',
        description: 'Follow secure coding practices to prevent common vulnerabilities in software.',
        impacts: ['magnitude'],
        cia: ['C', 'I', 'A']
    },
    {
        id: 'A.8.31',
        name: 'Separation of development, test and production environments',
        category: 'Technological',
        description: 'Separate development, testing, and production environments to reduce the risk of unauthorized access or changes.',
        impacts: ['magnitude'],
        cia: ['C', 'I', 'A']
    }
];
