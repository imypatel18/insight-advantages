
# 📘 Consultant Registration Tool – Full Database Schema

This schema supports a comprehensive consultant-client platform, allowing consultants to register with detailed profiles and clients to find and engage the right professionals. It is modular, scalable, and normalized for clarity and performance.

---

## 👤 Consultant Profiles

| **Field**               | **Type**     | **Constraints**  | **Description**                              |
|------------------------|--------------|------------------|----------------------------------------------|
| ConsultantID           | `int`        | PK, not null     | Unique identifier for each consultant        |
| FullName               | `nvarchar`   | not null         | Full name of the consultant                  |
| Email                  | `nvarchar`   | not null         | Consultant's login email                     |
| PhoneNumber            | `nvarchar`   | null             | Contact number                               |
| Location               | `nvarchar`   | null             | City or region                               |
| PreferredWorkType      | `nvarchar`   | null             | Full-time, Part-time, etc.                   |
| PreferredWorkMode      | `nvarchar`   | null             | Remote, Onsite, Hybrid                       |
| Specialization         | `nvarchar`   | null             | Consultant’s area of expertise               |
| YearsOfExperience      | `nvarchar`   | null             | Total years of experience                    |
| PrimarySkills          | `text`       | null             | Key skills (e.g., Python, React)             |
| AvailableServices      | `text`       | null             | Services offered (e.g., development, training) |
| PreferredWorkingHours  | `nvarchar`   | null             | Time availability (e.g., 10am–6pm)           |
| ConsultingMode         | `nvarchar`   | null             | Contractual, Freelance, Advisory             |
| PricingStructure       | `nvarchar`   | null             | Hourly, Fixed, Subscription                  |
| PaymentPreferences     | `nvarchar`   | null             | Bank, PayPal, etc.                           |
| BriefBio               | `text`       | null             | Short profile description                    |
| CreatedAt              | `datetime`   | null             | Account creation timestamp                   |
| Password               | `nvarchar`   | null             | Encrypted login password                     |

---

## 💼 Experience

| **Field**     | **Type**     | **Constraints**  | **Description**                |
|---------------|--------------|------------------|--------------------------------|
| ExperienceID  | `int`        | PK, not null     | Unique experience entry        |
| ConsultantID  | `int`        | FK to Consultants| Consultant's foreign key       |
| Role          | `nvarchar`   | null             | Job title held                 |
| Company       | `nvarchar`   | null             | Organization name              |
| Years         | `nvarchar`   | null             | Duration of experience         |

---

## 🎓 Education

| **Field**     | **Type**     | **Constraints**  | **Description**                          |
|---------------|--------------|------------------|------------------------------------------|
| EducationID   | `int`        | PK, not null     | Unique education entry                   |
| ConsultantID  | `int`        | FK to Consultants| Consultant's foreign key                 |
| Degree        | `nvarchar`   | null             | Degree name (e.g., MSc Computer Science) |
| Institution   | `nvarchar`   | null             | University or college                    |
| Year          | `nvarchar`   | null             | Year of graduation/completion            |

---

## 🗣️ Languages Spoken

| **Field**     | **Type**     | **Constraints**  | **Description**                          |
|---------------|--------------|------------------|------------------------------------------|
| LanguageID    | `int`        | PK, not null     | Unique language entry                    |
| ConsultantID  | `int`        | FK to Consultants| Consultant's foreign key                 |
| Language      | `nvarchar`   | null             | Spoken language (e.g., English, Hindi)   |

---

## 📜 Certificates

| **Field**     | **Type**     | **Constraints**  | **Description**                          |
|---------------|--------------|------------------|------------------------------------------|
| CertificateID | `int`        | PK, not null     | Unique certificate entry                 |
| ConsultantID  | `int`        | FK to Consultants| Consultant's foreign key                 |
| Name          | `nvarchar`   | null             | Name of the certificate (e.g., AWS Certified Developer) |

---

## 🧑‍💼 Clients

| **Field**       | **Type**     | **Constraints**  | **Description**                          |
|------------------|--------------|------------------|------------------------------------------|
| ClientID         | `int`        | PK, not null     | Unique client identifier                 |
| FullName         | `nvarchar`   | not null         | Client’s full name                       |
| Email            | `nvarchar`   | not null         | Login email                              |
| Password         | `nvarchar`   | not null         | Encrypted password                       |
| CompanyName      | `nvarchar`   | not null         | Company the client represents            |
| CompanyWebsite   | `nvarchar`   | null             | Website URL                              |
| Industry         | `nvarchar`   | not null         | Company’s industry                       |
| CompanySize      | `nvarchar`   | not null         | e.g., 1–10, 50–100                       |
| Location         | `nvarchar`   | not null         | Location of company                      |
| Role             | `nvarchar`   | not null         | Client's role in company                 |
| UseCase          | `nvarchar`   | not null         | Reason for hiring consultants            |
| PhoneNumber      | `nvarchar`   | null             | Contact number                           |
| HearAboutUs      | `nvarchar`   | null             | Marketing source (e.g., Google, Referral)|
| AcceptTerms      | `bit`        | not null         | True/false if they accepted T&Cs         |
| CreatedAt        | `datetime`   | null             | Account creation date                    |

