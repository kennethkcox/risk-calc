const THREAT_FRAMEWORKS = {
    "STRIDE": [
        {
            "id": "S1",
            "name": "Spoofing",
            "description": "Impersonating another user, component, or entity in the system.",
            "framework": "STRIDE",
            "impacts": { "aroMultiplier": 1.5, "sleMultiplier": 1.0 }
        },
        {
            "id": "T1",
            "name": "Tampering",
            "description": "Unauthorized modification of data, either in transit or at rest.",
            "framework": "STRIDE",
            "impacts": { "aroMultiplier": 1.4, "sleMultiplier": 1.1 }
        },
        {
            "id": "R1",
            "name": "Repudiation",
            "description": "A user's ability to deny performing an action that they did, in fact, perform.",
            "framework": "STRIDE",
            "impacts": { "aroMultiplier": 1.2, "sleMultiplier": 1.2 }
        },
        {
            "id": "I1",
            "name": "Information Disclosure",
            "description": "Exposing sensitive information to individuals who are not authorized to access it.",
            "framework": "STRIDE",
            "impacts": { "aroMultiplier": 1.6, "sleMultiplier": 1.0 }
        },
        {
            "id": "D1",
            "name": "Denial of Service",
            "description": "Preventing legitimate users from accessing the system or its resources.",
            "framework": "STRIDE",
            "impacts": { "aroMultiplier": 1.3, "sleMultiplier": 1.0 }
        },
        {
            "id": "E1",
            "name": "Elevation of Privilege",
            "description": "A user or component gaining a higher level of access than they are authorized for.",
            "framework": "STRIDE",
            "impacts": { "aroMultiplier": 1.8, "sleMultiplier": 1.2 }
        }
    ]
};
