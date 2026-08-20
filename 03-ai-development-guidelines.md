# SLOTS SPORTSWEAR — AI Development Guidelines

## Purpose

This file defines boundaries for AI/Vibe Coding so the implementation stays consistent, secure and maintainable.

---

# 1. Non-Negotiable Brand Rules

- Use the official SLOTS SPORTSWEAR logo exactly as supplied.
- Do not distort, rotate, recolor or redraw the logo.
- Use only approved logo variants.
- Keep the visual identity premium, athletic, technical and B2B.
- Do not introduce random colors.
- Do not introduce decorative/script fonts.
- Do not make the site look like a generic template.

---

# 2. Code Rules

- Use TypeScript.
- Prefer reusable components.
- Avoid giant single-file pages.
- Keep content/data separate from UI.
- Prefer Server Components by default.
- Use Client Components only when interaction requires them.
- Keep components focused on one responsibility.
- Reuse design primitives for buttons, sections, cards, form controls and headings.
- Do not duplicate large blocks of JSX unnecessarily.

---

# 3. AI Coding Rules

Before changing code:
1. Inspect the current file structure.
2. Inspect the component involved.
3. Preserve working behavior.
4. Make the smallest safe change.
5. Run the relevant checks.
6. Record what changed in `06-memory.md`.

Never claim a feature is complete without verifying it.

---

# 4. Libraries

Use libraries only when they provide a real advantage.

Before adding a dependency ask:
- Is this already possible with Next.js/React/CSS?
- Is the dependency maintained?
- Does it significantly increase bundle size?
- Does it create an avoidable compatibility problem?
- Is it necessary for the business requirement?

Avoid adding multiple libraries for the same purpose.

---

# 5. Animation Rules

Animation should support the premium feel, not distract.

Use:
- subtle slide motion
- controlled transitions
- reduced motion support
- smooth hover states
- lightweight entrance animation where justified

Avoid:
- constant parallax everywhere
- long blocking animations
- excessive bouncing
- animation that harms mobile performance

The hero poster slider must remain usable with reduced-motion preferences.

---

# 6. Image Rules

Do not invent final business imagery.

Priority:
1. official product assets
2. authentic factory photography
3. authentic brand/lifestyle photography
4. approved generated visuals only when explicitly accepted by the business owner

The brand photography system prioritizes:
- clean product photography
- controlled studio lighting
- athletic/editorial lifestyle
- authentic factory/manufacturing
- golfwear
- fabric and detail macro shots

Avoid:
- cheap stock-photo appearance
- cluttered backgrounds
- fake-looking AI factory scenes
- incorrect garment construction
- inaccurate logos or garment branding

---

# 7. Content Rules

Do not invent:
- certifications
- years of experience
- client names/logos
- production numbers
- MOQ claims
- country coverage
- factory capabilities
- awards
- compliance claims

Only publish verified business information.

---

# 8. Form Rules

Form UX must be simple.

Do not request unnecessary information.

Always provide:
- clear labels
- validation
- loading state
- success state
- error state
- keyboard accessibility
- mobile usability

---

# 9. File Upload Rules

For Tech Pack / Design File uploads:
- accept only approved file types
- enforce a server-side size limit
- sanitize metadata/filenames
- never execute uploaded content
- store outside the public static folder
- use secure references
- log upload outcome
- allow retry

---

# 10. Error Handling Rules

Never expose raw stack traces to customers.

Customer sees:
> Something went wrong. Please try again or contact us.

Developer logs should contain:
- route/action
- error class/message
- request correlation id where useful

Do not log:
- passwords
- private file contents
- unnecessary personal information
- secret keys

---

# 11. SEO Rules

Every page must have intentional metadata.

Do not:
- copy one title across every page
- create thin duplicate pages
- hide important text inside images
- forget canonical URLs
- leave staging pages indexable
- use fake schema markup

---

# 12. Accessibility Rules

- semantic HTML
- keyboard navigation
- visible focus states
- accessible labels
- sufficient contrast
- alt text
- reduced motion support
- buttons must look and behave like buttons
- links must be real links

---

# 13. Quality Gate Before Marking Complete

For each feature:
- build passes
- type checks pass
- lint passes where configured
- desktop checked
- mobile checked
- error state checked
- loading state checked
- success state checked
- SEO impact checked
- analytics impact checked
- memory file updated

---
# V2 ADDITION — CERTIFICATES / SHIPPING / PAYMENT

AI coding must never invent certificate names, tax/compliance status, shipping methods, payment terms, lead times, bank details or company statistics. Keep placeholders until verified business data is supplied.

Certificates: use only approved documents and avoid public exposure of sensitive information.
Shipping: use a configurable data source; no fixed prices or delivery times unless verified.
Payment: use a configurable data source; no bank/account details or percentages unless explicitly approved.
Manufacturing: the complete 10-step process must be represented consistently across homepage and manufacturing page.
Why Choose: use evidence-based value propositions only.
