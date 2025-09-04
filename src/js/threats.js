const THREAT_FRAMEWORKS = {
    "STRIDE": [
        {
            "id": "S1",
            "name": "Spoofing",
            "description": "Spoofing is about impersonating someone or something else. An attacker might spoof an IP address, a user identity, or a system component to gain unauthorized access or deceive users.",
            "example": "An attacker creates a fake login page that looks identical to a real banking website to trick users into entering their credentials.",
            "mitigation": "Use strong authentication mechanisms like multi-factor authentication (MFA). Implement digital signatures and validate certificates to ensure the authenticity of communication endpoints.",
            "framework": "STRIDE"
        },
        {
            "id": "T1",
            "name": "Tampering",
            "description": "Tampering involves the unauthorized modification of data. This can happen to data in transit over a network or to data at rest in a database or file system.",
            "example": "An attacker intercepts network traffic and alters a financial transaction to redirect funds to their own account.",
            "mitigation": "Use data integrity mechanisms like digital signatures, MACs (Message Authentication Codes), or checksums. Implement access controls and logging to prevent and detect unauthorized data modifications.",
            "framework": "STRIDE"
        },
        {
            "id": "R1",
            "name": "Repudiation",
            "description": "Repudiation threats are associated with the inability to prove that an action took place. An attacker might perform a malicious action and then deny having done so.",
            "example": "A user transfers funds from a joint account and then claims they never authorized the transaction.",
            "mitigation": "Implement secure logging and auditing mechanisms that create a non-repudiable trail of user actions. Use digital signatures to tie actions to specific identities.",
            "framework": "STRIDE"
        },
        {
            "id": "I1",
            "name": "Information Disclosure",
            "description": "This involves exposing sensitive information to unauthorized individuals. It can be due to system vulnerabilities, weak access controls, or human error.",
            "example": "A misconfigured web server exposes a directory containing sensitive customer data, making it accessible to anyone on the internet.",
            "mitigation": "Encrypt data both at rest and in transit. Enforce strict access controls and the principle of least privilege. Regularly scan for and patch information disclosure vulnerabilities.",
            "framework": "STRIDE"
        },
        {
            "id": "D1",
            "name": "Denial of Service",
            "description": "Denial of Service (DoS) attacks aim to make a system or resource unavailable to legitimate users. This can be achieved by overwhelming the system with traffic or exploiting a vulnerability that causes it to crash.",
            "example": "An attacker floods a web server with a massive number of requests, causing it to become unresponsive and inaccessible to users.",
            "mitigation": "Use firewalls and intrusion detection/prevention systems. Implement rate limiting and traffic shaping. Use load balancers and have a scalable infrastructure that can handle traffic spikes.",
            "framework": "STRIDE"
        },
        {
            "id": "E1",
            "name": "Elevation of Privilege",
            "description": "This occurs when a user or process gains more privileges than they are authorized to have. It can allow an attacker to take full control of a system.",
            "example": "A user exploits a buffer overflow vulnerability in a web application to execute arbitrary code and gain administrative access to the server.",
            "mitigation": "Enforce the principle of least privilege. Sanitize user inputs and use secure coding practices to prevent vulnerabilities like buffer overflows. Run processes with the minimum necessary permissions.",
            "framework": "STRIDE"
        }
    ],
    "DREAD": [
        {
            "id": "D2",
            "name": "Damage Potential",
            "description": "How much damage could the threat cause if it were to succeed? This is often measured in terms of financial loss, data loss, or reputational damage.",
            "example": "A successful ransomware attack could lead to significant financial loss and reputational damage.",
            "mitigation": "Implement a robust backup and recovery strategy. Have an incident response plan in place to minimize damage.",
            "framework": "DREAD"
        },
        {
            "id": "R2",
            "name": "Reproducibility",
            "description": "How easy is it to reproduce the attack? An attack that is easy to reproduce is more likely to be exploited by a wide range of attackers.",
            "example": "A simple SQL injection vulnerability that can be exploited with a web browser is highly reproducible.",
            "mitigation": "Prioritize patching and fixing vulnerabilities that are easy to reproduce. Use web application firewalls (WAFs) to block common attack patterns.",
            "framework": "DREAD"
        },
        {
            "id": "E2",
            "name": "Exploitability",
            "description": "How much effort and expertise is required to exploit the vulnerability? A vulnerability that requires a high level of expertise is less likely to be exploited.",
            "example": "A complex timing attack against a cryptographic protocol requires deep expertise and is less exploitable than a simple cross-site scripting (XSS) flaw.",
            "mitigation": "Focus on fixing vulnerabilities that are easy to exploit, even if their damage potential is lower. Conduct regular penetration testing to identify and fix exploitable flaws.",
            "framework": "DREAD"
        },
        {
            "id": "A1",
            "name": "Affected Users",
            "description": "How many users will be affected if the threat is realized? A threat that affects all users is more severe than one that affects only a small subset.",
            "example": "A vulnerability that allows an attacker to compromise all user accounts is more critical than one that affects only a single user.",
            "mitigation": "Implement segmentation and segregation to limit the blast radius of an attack. Apply the principle of least privilege to reduce the impact on users.",
            "framework": "DREAD"
        },
        {
            "id": "D3",
            "name": "Discoverability",
            "description": "How easy is it for an attacker to discover the vulnerability? A vulnerability that is easy to find is more likely to be exploited.",
            "example": "A vulnerability in a widely used open-source library is highly discoverable, as attackers can analyze the source code for flaws.",
            "mitigation": "Use vulnerability scanning tools to discover and patch flaws before attackers do. Practice defense-in-depth to make it harder for attackers to find vulnerabilities.",
            "framework": "DREAD"
        }
    ]
};
