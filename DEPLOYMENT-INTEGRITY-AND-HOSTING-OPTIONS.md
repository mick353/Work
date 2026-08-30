# Product Practice — Deployment, Integrity and Hosting Options

## Purpose

This paper describes practical options for distributing and hosting the Product Practice learning system and courses produced through Course Workshop. It is intended for training teams, product owners, governance areas and technical stakeholders who may need to consider how the system could move from a portable browser-based training resource into a more controlled departmental service.

The aim is not to prescribe a single implementation. The current model already supports useful low-infrastructure delivery. The purpose of this paper is to explain the available paths, what each path provides, and how the existing architecture can support a staged approach without discarding the work already completed.

The key design principle is that the course itself should remain portable. Hosting, authentication, logging and stronger integrity controls can then be added around the same course package where they are justified.

**Status:** this is an options paper, not an approved departmental architecture or a committed implementation sequence. The current product direction remains in [Learning System Direction](LEARNING-SYSTEM-DIRECTION.md). The immediate evidence priority is real trainer use plus manual accessibility and device testing; any stronger hosting, identity, signing or reporting controls should follow a defined business and assurance need.

---

## 1. Current position

Product Practice is designed around a reusable course package rather than a single hard-coded course.

A course is represented as a `TrainingPackage` containing:

- a manifest that identifies the course, version and provenance; and
- the course content, including learning stages, assessment, practice material, references and embedded assets.

Course Workshop produces the same package structure used by the learner application. This is important because it means a course does not need to be rewritten for different delivery methods.

The current system can produce several outputs, including:

- a self-contained learner HTML file;
- an isolated hosted-course package;
- an editable draft;
- a repository package for controlled installation;
- a combined multi-course learner site; and
- a separate browser-based Course Workshop authoring site.

The present architecture already includes substantial validation and release controls. Course packages are structurally validated before use. Isolated release archives and Course Workshop release records include SHA-256 digests so that exact generated files or canonical package data can be checked against the version originally produced.

This provides a strong foundation for future deployment options.

---

## 2. Why portable browser delivery remains valuable

A standalone browser-based course has several practical advantages.

It can:

- run without installation;
- operate on a standard browser;
- be distributed as a normal file or hosted as a normal website;
- work on Windows, macOS, tablets and phones where the browser supports the required features;
- operate without creating user accounts;
- operate without transmitting learner information to an external service; and
- continue to function when a central training platform is unavailable or unnecessary.

For many internal training activities, this may be sufficient.

The simplicity of the model is also useful from a governance perspective. The current standalone course performs no server-side processing and does not transmit learner progress or trainer material. The hosted static application retrieves its own files from its host, and a learner may choose to open an external source link, but there is no application API, central user database or telemetry. This is a much smaller technical footprint than a conventional Learning Management System.

However, portable delivery also has limits.

If a learner is given a complete HTML course file, the browser must be able to read the content. A technically capable person can therefore inspect or alter that file. No purely offline browser file can make modification impossible.

The appropriate objective is therefore not to claim that a portable course cannot be copied or changed. The more realistic controls are:

1. make authorised versions identifiable;
2. make alteration detectable;
3. preserve evidence of provenance and version;
4. make misleading repackaging or rebadging detectable and less credible; and
5. use stronger centrally controlled services where access control or formal completion records are required.

---

## 3. Integrity: checksum versus digital signature

A checksum or cryptographic hash provides evidence that content has changed.

For example, a SHA-256 value can represent the exact bytes of a course release. If any part of that release changes, the SHA-256 value also changes.

This is useful, but a hash by itself is not sufficient to prove authenticity. A person modifying a course could also calculate a new hash.

A stronger approach is a digitally signed release.

Under this model:

1. Course Workshop or the publishing process produces the final course package as immutable bytes, or through a documented and versioned canonical serialisation.
2. A SHA-256 digest is calculated from those exact bytes.
3. A release manifest records the digest, course and schema versions, publisher identifier, signature format and signing-key identifier.
4. The manifest is digitally signed using an authorised publisher private key held outside the browser tools.
5. A trusted learner application or separate verifier obtains the corresponding public key from a trusted distribution, certificate or managed key registry.
6. The verifier checks the publisher-key binding, signature and package digest before reporting the release status.

The result is a distinction between two questions:

**Integrity:** Is this exactly the course that was released?

**Authenticity:** Was this release authorised by the recognised publisher?

An altered package cannot pass a genuine verification against the authorised publisher key without access to the publisher's private signing key.

The verifier itself is part of the trust boundary. A standalone HTML file containing the course, public key, verification code and “Verified” badge cannot independently establish its own authenticity: a person who changes the file can also change the verifier or display. Portable HTML therefore needs either an external trusted verifier and detached signed manifest, or distribution from a trusted location or code-signed application. A departmentally hosted player can instead derive trust from the controlled service, domain and key-management arrangements.

This is an established cryptographic model and is preferable to proprietary obfuscation or an invented protection mechanism.

---

## 4. Candidate signed-course model

The existing `TrainingPackage` design is well suited to digital signing because the course already has a clear identity, version and canonical content boundary.

A future release package could conceptually contain:

```text
Course package
├── manifest
│   ├── course identifier
│   ├── course title
│   ├── schema version
│   ├── course version
│   ├── publisher
│   ├── signing-key identifier
│   └── release and signature-format metadata
├── content
├── assets
├── validation record
├── SHA-256 digest
└── digital signature
```

A learner-facing verification result might report:

```text
Course: Product Management Fundamentals
Version: 1.3.0
Authorised publisher: [publisher identity]
Integrity: Verified
Publisher signature: Valid
```

The exact presentation could be simple. Learners generally do not need cryptographic detail. The technical evidence can remain available for support, assurance or release management.

### Important security principle

The private signing key must never be embedded in Course Workshop, a portable learner HTML file, a public source repository or any other client-side application.

Anything delivered to a browser must be treated as accessible to the person operating that browser.

The public verification key can be distributed, but its integrity and binding to the claimed publisher must be protected. A substituted public key can make an attacker's signature appear valid. The trusted player, certificate or managed key registry should therefore identify the publisher, key identifier and approved algorithm, and support key rotation, revocation and historical verification. The private signing key should remain in a controlled publishing environment.

The signed scope must also be exact. Sign immutable package bytes or a documented, versioned canonical serialisation—not an undefined in-memory object whose field ordering or encoding may change between tools.

---

## 5. Course Workshop and authorised publishing

Course Workshop is intended to allow trainers to create new courses. That requirement needs to be separated from the authority to declare a course an official departmental release.

A practical publishing flow would be:

```text
Trainer creates course
        ↓
Course Workshop validation
        ↓
Candidate course package
        ↓
Review / approval process
        ↓
Controlled publishing or signing process
        ↓
Official signed course release
```

This preserves trainer flexibility without placing a high-value signing credential in every trainer's copy of the authoring tool.

The signing step could initially be performed by a controlled release utility used by an authorised custodian. If the system later becomes departmentally hosted, the signing function could be provided by a controlled departmental service.

This approach also supports role separation. A trainer can author content, reviewers can confirm learning and subject-matter requirements, and a release custodian can publish the final authorised build.

---

## 6. Distribution and hosting options

There is no requirement to select one delivery model for every course. Different courses may have different assurance, accessibility, privacy and reporting needs.

### Option A — Portable standalone HTML

A learner receives one self-contained HTML course file and opens it in a browser.

**Advantages**

- minimal infrastructure;
- no installation;
- can operate offline;
- easy to distribute through existing approved channels;
- can be used on personal devices where policy allows;
- no central user database is required; and
- suitable for demonstrations, low-risk learning and situations where completion tracking is not required.

**Limitations**

- the learner receives the complete browser-readable application and content;
- central access control is not available;
- central completion records are not available unless a separate mechanism is introduced;
- updates require redistribution of the new release; and
- integrity controls can detect authorised versus altered versions, but cannot make a completely offline client-side file impossible to reverse engineer.

**Possible enhancement**

Publish a detached signed release manifest that can be checked by a separate trusted verifier or managed release catalogue, or distribute the file from an authoritative departmental location.

A verification badge generated solely by the same modifiable HTML file is not proof of authenticity. Any offline verification approach also needs browser and `file://` compatibility testing before it is relied upon.

---

### Option B — Portable signed course package

Instead of treating the HTML file as the course itself, the course can be treated as a portable signed package that is opened by the learner application.

A file extension such as `.training` could be used for usability, although the extension itself provides no security. The security comes from the package structure and digital signature.

The package could contain course JSON, embedded media, release metadata, hashes and a digital signature.

**Advantages**

- separates the course from the player;
- gives each course a formal portable identity;
- supports strong version and provenance checks;
- allows one player to open multiple authorised courses;
- makes it easier to use the same package in portable and hosted environments; and
- reduces reliance on a large generated HTML file as the long-term system boundary.

**Consideration**

A browser normally cannot register a custom file type in the same way as an installed desktop application. A hosted or local player may therefore still need the learner to select or import the package unless an approved wrapper is later introduced.

The format should therefore be considered a packaging and assurance improvement, not a reason to sacrifice browser portability.

The player used to open the package must itself come from a trusted host, managed application distribution or other authenticated channel. Separating the signed course from an untrusted player does not establish authenticity.

---

### Option C — Departmentally hosted static training site

The existing learner application can be hosted on an approved departmental web service while remaining predominantly static and browser-based.

For example:

```text
Department hosting
      ↓
Learner web application
      ↓
Approved course package
      ↓
Browser
```

**Advantages**

- learners always reach the current authorised version;
- no file needs to be manually redistributed;
- the source of the authorised service is clear;
- the same site can be reached from desktop or mobile browsers where network and policy settings permit;
- central publishing becomes easier; and
- the solution can remain technically simple if authentication and central logging are not required.

This option can provide a useful middle ground between standalone HTML distribution and a full departmental application.

The exact hosting platform would be a departmental ICT decision. The important architectural point is that the existing browser application does not need to become a conventional server application simply because it is hosted.

---

### Option D — Departmentally hosted service with authentication

Where access must be limited to authorised users, the hosted application can be placed behind departmental identity services.

Conceptually:

```text
Learner
   ↓
Department identity / single sign-on
   ↓
Training service
   ↓
Authorised course
```

In a Microsoft environment this may involve Microsoft Entra ID or another departmental identity platform, subject to departmental architecture and security requirements.

**Advantages**

- departmental identity can be used instead of creating separate training usernames and passwords;
- access can be withdrawn through existing identity processes;
- users may be able to access the service from home or mobile devices where departmental policy permits external access;
- course access can be associated with an authenticated user; and
- the system becomes capable of reliable central completion tracking.

**Additional governance requirements**

Authentication materially changes the service boundary. Security assessment, privacy considerations, application ownership, operational support, logging requirements and records-management obligations may become relevant.

The application should not create or store passwords itself when an existing departmental identity service can provide authentication.

---

### Option E — Hosted training service with completion and usage records

A small server-side component can be added if the training team needs reliable completion records, progress synchronisation or usage reporting.

The browser application could continue to perform the actual learning interaction while a controlled service records only the information required for training administration.

For example:

```text
Authenticated learner
        ↓
Browser learning application
        ↓
Completion API
        ↓
Department-controlled data store
```

Potential records could include:

- user identifier;
- course identifier;
- course version;
- date started;
- date completed;
- completion status;
- assessment outcome where appropriate; and
- mandatory-training evidence where required.

Only information that has a defined business purpose should be collected.

This model provides capabilities similar to part of an LMS without requiring the learning application itself to become a large monolithic LMS product.

Before building a bespoke completion service, the department should assess whether an existing learning platform already provides the required identity, assignment, completion, reporting and records functions.

---

### Option F — Integrate with an existing departmental learning platform

If the department already operates a Learning Management System, learning record store or comparable platform, Product Practice may be able to remain the learning experience while the existing platform provides enrolment, access and completion administration.

**Advantages**

- reuses established identity, assignment, reporting and support arrangements;
- avoids creating a second departmental training record;
- may already satisfy mandatory-training and records requirements; and
- keeps the course package and learning interaction separate from administration.

**Considerations**

- the platform's supported integration and package formats must be confirmed rather than assumed;
- required standards or interfaces may constrain offline operation or some interactive features;
- completion rules and assessment data need an agreed meaning before they are transmitted; and
- a proof of integration is required before claiming compatibility with any LMS or reporting standard.

---

## 7. Home and mobile access

A browser-first architecture is compatible with access from work computers, home computers, tablets and mobile phones, subject to departmental security and access policy.

There are two fundamentally different ways to enable this.

### Portable access

The learner possesses the course file and opens it locally.

No central authentication is required and the course may work offline.

This provides maximum portability but minimum central control.

### Hosted external access

The learner accesses an approved departmental web address from outside the departmental network.

Authentication and conditional-access controls can then be applied by departmental infrastructure.

This provides stronger access control and central administration while retaining browser and mobile usability.

The decision between the two should be based on the sensitivity of the course, whether completion records are required, and whether external departmental access is permitted.

---

## 8. GitHub Pages and external hosting

GitHub Pages is useful as a development, demonstration and proof-of-concept hosting environment. It demonstrates that the application can operate as a browser-based static site and makes stakeholder evaluation straightforward.

It should not automatically be treated as the production departmental architecture.

If the system becomes an approved departmental service, consideration should be given to moving production hosting, publishing authority, identity integration and operational ownership into approved departmental infrastructure.

A useful distinction is:

```text
Development / demonstration
    External development hosting may be appropriate

Production departmental service
    Hosting, identity, security and records controls are departmental decisions
```

The underlying course and learner architecture does not need to change merely because the hosting location changes.

The same `TrainingPackage` can remain the canonical course unit.

---

## 9. Authenticity, access and source protection

It is important to distinguish between protecting authenticity and attempting to make browser content unreadable.

### What can be achieved effectively

The system can:

- prove whether a course is an authorised release;
- detect whether authorised course content has been altered;
- identify the publisher and version;
- prevent an altered package from passing signature verification;
- separate official publishing authority from ordinary course authoring;
- make misleading rebadging detectable; and
- provide a verifiable release trail for released courses.

A digital signature does not prevent copying, enforce copyright or licensing terms, restrict access, or establish that the course received competent or independent review. It proves only that defined bytes were signed by the holder of a private key whose authority the verifier has reason to trust.

### What cannot be guaranteed in a client-side browser application

If content is displayed in a browser, the browser necessarily receives enough information to display it. A technically capable user can inspect client-side code and content.

Encoding, minification, bundling or obfuscation can increase the effort required to understand the source, but they should not be represented as strong security controls.

Encryption has the same fundamental limitation when a course must operate entirely offline: the client needs access to the decryption mechanism in order to display the content.

For that reason, signed provenance and integrity can provide useful assurance for a portable course, provided the verifier and publisher key are trusted. They should not be represented as copy protection.

Where actual access restriction is required, the stronger control is departmental hosting and authentication.

---

## 10. Application packaging as an optional path

The browser application could also be wrapped as a Windows or cross-platform desktop application using an approved technology.

This may provide:

- code-signed executables;
- controlled installation;
- tighter operating-system integration;
- custom course-file associations; and
- some additional resistance to casual modification.

However, a desktop application should not be assumed to be the preferred direction simply because it appears more protected.

It would introduce additional considerations such as:

- software packaging and deployment;
- endpoint approval;
- patching;
- application signing;
- support across work and personal devices; and
- loss of some of the current zero-install portability.

For the present architecture, browser delivery should remain the default unless a defined business or security requirement justifies an installed application.

---

## 11. Suggested staged implementation path

A staged approach allows the system to gain stronger controls without prematurely introducing infrastructure.

### Stage 1 — Retain current portable and hosted outputs

Continue using the existing `TrainingPackage` model and Course Workshop export paths.

Maintain the current structural validation, release declarations and SHA-256 generation.

This keeps the system easy to evaluate and use. Complete the agreed trainer-use, manual accessibility and supported-device evidence before selecting additional infrastructure. The resulting needs and risks should determine whether signing, hosting, identity or reporting is next.

### Stage 2 — Add cryptographic release signing

If a confirmed requirement exists for publisher authentication or tamper-evident portable releases, add a standard digital-signature process for final course releases.

Recommended implementation characteristics:

- SHA-256 or the current department-approved digest standard;
- a digital-signature algorithm and implementation approved under current departmental security architecture and applicable Australian Government guidance;
- a controlled private signing key;
- an exact, versioned signed scope covering immutable package bytes or canonical serialisation;
- a trusted mechanism for binding the publisher identity to the public verification key;
- key identifiers, rotation, revocation and historical-verification arrangements;
- clear verification status available to users and support staff.

The exact cryptographic standard must be selected and reviewed under departmental security architecture and current policy rather than fixed by this options paper. Browser-based verification must also be proven across the supported hosted and offline environments.

### Stage 3 — Formalise the portable course package

Treat the course package, rather than generated HTML, as the canonical distribution artefact.

The standalone HTML export can continue to exist for convenience, but the signed package becomes the authoritative course release.

### Stage 4 — Departmental static hosting

Host the learner application and approved packages using approved departmental infrastructure.

This provides central version control and a recognised authoritative location without necessarily introducing authentication or server-side learner data.

### Stage 5 — Departmental identity integration

If there is a business requirement for restricted access or reliable user-level records, integrate the hosted service with the department's existing identity platform.

Avoid creating a separate credentials system.

### Stage 6 — Completion and reporting service

Where there is a defined requirement for completion, progress or reporting information, first assess integration with the department's existing learning platform. Add a narrowly scoped server-side API and departmental data store only when the existing platform cannot meet the requirement appropriately.

This can be introduced without changing the underlying course package format.

---

## 12. Decision guide

The following questions can help determine the appropriate delivery level for a course.

### If the course only needs to be viewed

A standalone or statically hosted browser course may be sufficient.

### If the course needs to remain usable offline

Retain standalone HTML or a portable signed package.

### If learners must always use the current approved version

Use central departmental hosting.

### If access must be restricted

Use departmental hosting with existing identity services.

### If completion must be associated with an individual

Use authenticated departmental hosting and, where possible, the department's existing learning platform. Introduce a separate controlled completion service only if the established platform cannot meet the defined requirement.

### If authenticity and unauthorised modification are the primary concerns

Consider signed releases with a trusted verifier and managed publisher key. For hosted delivery, a controlled authoritative service may already address much of the practical authenticity risk.

### If trainers need to create courses

Retain Course Workshop as the authoring layer, but separate authoring from final publishing authority.

---

## 13. Illustrative extensible architecture

If stronger controls are justified, the existing common course model can support several controlled delivery modes without prescribing one as the approved departmental target.

```text
                         COURSE WORKSHOP
                              │
                              ▼
                     Canonical TrainingPackage
                              │
                       Validation / Review
                              │
                              ▼
                      Authorised Publishing
                              │
                         Digital Signature
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              ▼               ▼                ▼
       Standalone HTML   Portable package   Hosted service
              │               │                │
              ▼               ▼                ▼
          Offline use      Reusable file    Browser access
                                               │
                                      optional authentication
                                               │
                                      optional completion API
```

This pattern preserves the current strengths of the system while providing a pathway to stronger departmental control. The signing branch assumes a trusted verifier and publisher-key distribution; it cannot be established by a self-asserted badge inside a modifiable learner file.

It avoids a premature dependency on a specific hosting platform, authentication service or Learning Management System, while allowing those capabilities to be introduced if the business requirement warrants them.

---

## 14. Implementation considerations for departmental review

If the system progresses toward production departmental hosting, the relevant technical and governance areas may need to consider:

- application/service ownership;
- approved hosting environment;
- security assessment and accreditation requirements;
- information classification and handling requirements;
- identity and access management;
- external and mobile access policy;
- privacy and data minimisation;
- records-management obligations;
- accessibility testing;
- supported browser/device matrix;
- release and change management;
- exact signed-byte or canonical-serialisation rules;
- verifier and public-key trust distribution;
- signing-key custody, rotation, compromise response and revocation;
- offline browser and secure-context compatibility where cryptography is used;
- existing learning-platform and interoperability constraints;
- logging and monitoring requirements;
- backup and recovery where server-side records exist;
- support arrangements; and
- retention requirements for course releases and completion records.

Not all of these considerations apply to the current standalone model. They become relevant progressively as the service takes on authentication, central storage or formal operational ownership.

---

## 15. Conclusion

The existing Product Practice learning system does not need to be rebuilt in order to support stronger distribution and departmental hosting models.

Its current separation between the shared learner application and the reusable `TrainingPackage` provides an appropriate foundation for both portable and centrally hosted delivery.

The agreed near-term priority remains trainer use and manual accessibility/device evidence. If that work or departmental review establishes a material need for publisher authentication or tamper-evident portable releases, digital signing is a viable later control—provided the verifier, public-key trust, signed scope and key-management arrangements are also controlled.

If the department later requires central access, authentication or completion records, those capabilities can be added as hosting and service layers around the same course package model.

This provides a practical progression from a low-infrastructure training resource to a departmentally managed learning service without unnecessarily constraining Course Workshop, browser portability or future implementation choices.

---

## Related project documentation

- [Architecture](ARCHITECTURE.md)
- [Course Package Format](COURSE-PACKAGE-FORMAT.md)
- [Course Workshop](COURSE-WORKSHOP.md)
- [Authoring Guide](AUTHORING.md)
- [Learning System Direction](LEARNING-SYSTEM-DIRECTION.md)
- [Standards](STANDARDS.md)
- [Roadmap](ROADMAP.md)

## External technical references

- [Australian Cyber Security Centre — Guidelines for cryptography](https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/ism/cyber-security-guidelines/guidelines-for-cryptography) — current Australian Government guidance for approved cryptographic algorithms and key-management controls.
- [NIST FIPS 186-5 — Digital Signature Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf) — explains the distinction between mathematical signature verification and assurance that a public key belongs to the claimed signer.
- [MDN — `SubtleCrypto.verify()`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify) — browser API and compatibility reference for client-side signature verification, including the secure-context requirement.
