# Security Specification - CodeSaarthi

This specification outlines the data invariants, threat model payloads, and security rules logic designed to isolate and protect student information, quiz scoring, and AI chat logs.

## 1. Data Invariants

* **Identity Bounds**: A user profile must belong entirely to the authenticated owner. No student can edit, look up, or overwrite another student's profile details or points.
* **Integrity Bounds**: Fields like `uid` and `email` must exactly match the authenticated request state. Timestamps for creation or updates must be authenticated against the secure server time.
* **Isolations**: PII like `email` is strictly nested under ownership checks. Chat messages and quiz attempts are separated per-student and cannot be accessed or queried in a flat collection query.

## 2. The "Dirty Dozen" Threat Payloads

The following payloads attempt to exploit access or update gaps and are blocked by the rule engine:

1. **Self-Assigned Identity**: Attempting to create a user profile with a different user ID (`uid = 'attacker_id'`) inside `/users/student_id`. (Fails owner check)
2. **Ghost Fields Update**: Attempting to write a shadow field `isAdmin: true` into the profile document. (Fails exact key schema)
3. **Immutability Breach**: Attempting to overwrite `createdAt` on profile update. (Fails equality check)
4. **Time Spoofing**: Attempting to set `createdAt` or `updatedAt` to a future/past date instead of `request.time`. (Fails timestamp check)
5. **PII Scraping**: Attempting to list all student profile documents. (Fails blanket query block)
6. **AI Logs Poisoning**: Attempting to write an ultra-large string (e.g. 5MB) into a chat message text field. (Fails character length limit of 10000)
7. **Score Spoofing**: Attempting to submit a quiz attempt with a negative score or invalid data type. (Fails type check)
8. **Malicious Path Injection**: Injecting a custom crafted string like `users/mahek_id/chatMessages/%2E%2E%2F` as message ID. (Fails `isValidId()` regex validator)
9. **Fake Email Validation**: Spoofing a profile email mismatch. (Fails model validator)
10. **Role Escalation**: Attempting to set role to `admin`. (Fails role enum verification)
11. **Orphaned Message Writes**: Attempting to write a message under an unowned user's path. (Fails ownership validator)
12. **Foreign Quiz Logging**: Attempting to push mock results to another student's quizAttempts. (Fails nested ownership validator)
