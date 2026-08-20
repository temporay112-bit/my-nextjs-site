# SLOTS SPORTSWEAR — Architecture.md

## 1. Technical Direction

### Framework
**Next.js**

### Recommended
- Next.js App Router
- TypeScript
- React Server Components by default
- Client Components only for interactive UI
- CSS Modules / Tailwind-style utility approach depending on the final implementation
- Next.js Route Handlers for backend endpoints
- Server Actions where they make the workflow simpler

There is no requirement for a separate Express backend.

---

# 2. High-Level App Flow

```text
Visitor
  ↓
Homepage
  ↓
Products / Capabilities / Manufacturing / Customization
  ↓
Trust & proof
  ↓
Get a Quote
  ↓
Inquiry Form
  ├── Text details
  └── Tech Pack / Design upload
        ↓
Next.js backend
        ↓
Validation
        ↓
Secure file storage
        ↓
Inquiry persistence
        ↓
Notification / admin workflow
```

---

# 3. Page Routes

```text
/
 /about
 /products
 /products/[slug]
 /capabilities
 /manufacturing
 /customization
 /contact
 /catalogue
 /privacy
 /terms
 /404
```

The dynamic product route should only be implemented when the product data model and approved product content are ready.

---

# 4. Suggested Next.js Folder Structure

```text
src/
  app/
    layout.tsx
    page.tsx

    about/
      page.tsx

    products/
      page.tsx
      [slug]/
        page.tsx

    capabilities/
      page.tsx

    manufacturing/
      page.tsx

    customization/
      page.tsx

    contact/
      page.tsx

    catalogue/
      page.tsx

    privacy/
      page.tsx

    terms/
      page.tsx

    api/
      inquiry/
        route.ts
      upload/
        route.ts
      analytics/
        route.ts

    sitemap.ts
    robots.ts
    not-found.tsx

  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNav.tsx

    hero/
      Hero.tsx
      HeroPosterSlider.tsx

    trust/
      TrustBadges.tsx

    products/
      ProductGrid.tsx
      ProductCard.tsx

    capabilities/
      CapabilityCards.tsx

    manufacturing/
      ProcessTimeline.tsx
      FactoryGallery.tsx

    forms/
      QuoteForm.tsx
      FileUpload.tsx

    shared/
      Button.tsx
      SectionHeading.tsx
      Icon.tsx
      Container.tsx

  lib/
    seo.ts
    validations.ts
    analytics.ts
    storage.ts
    db.ts
    utils.ts

  data/
    navigation.ts
    products.ts
    capabilities.ts
    process.ts
    site.ts

  styles/
    globals.css

public/
  images/
  icons/
  catalogue/
```

---

# 5. Content Architecture

Do not hard-code repeated product/capability content inside page JSX.

Prefer structured content:

```text
data/products.ts
data/capabilities.ts
data/process.ts
data/site.ts
```

This makes the site easier to scale and keeps content separate from presentation.

---

# 6. Backend Architecture

## Backend remains inside Next.js

Use:

### Route Handlers
For:
- inquiry submissions
- upload processing
- controlled integrations
- future admin endpoints

### Server Actions
For simple server-side mutations where appropriate.

### Validation
Validate all external input on the server.

Recommended validation principles:
- schema validation
- required-field checks
- file type checks
- size limits
- safe filenames / generated object keys
- rate limiting for public forms

---

# 7. Data Layer

The data layer should be selected after deployment requirements are confirmed.

Recommended pattern:

```text
Next.js
  ↓
Database
  ↓
Inquiry / Lead records

Next.js
  ↓
Object Storage
  ↓
Tech Packs / Design Files
```

Possible production choices:
- PostgreSQL-compatible database
- S3-compatible object storage

Avoid storing large binary files directly inside the relational database.

---

# 8. Inquiry Model

Minimum conceptual model:

```text
Inquiry
- id
- name
- email
- companyName
- productCategory
- message
- fileReference
- status
- createdAt
```

Potential status flow:

```text
NEW
↓
REVIEWING
↓
CONTACTED
↓
QUOTED
↓
CLOSED
```

---

# 9. SEO Architecture

Every indexable page should define:
- title
- description
- canonical URL
- Open Graph metadata
- social image where appropriate

Global:
- robots
- sitemap
- favicon / icons
- organization schema
- site-wide metadata

Page-level JSON-LD should be generated from actual content.

---

# 10. Analytics Architecture

GA4 should be initialized from the root layout/client analytics boundary.

Important events:

```text
quote_cta_click
catalogue_click
inquiry_start
inquiry_submit
upload_start
upload_success
upload_error
contact_email_click
whatsapp_click
product_view
```

Do not send unnecessary private form values to analytics.

---

# 11. Image Architecture

Use Next.js image optimization.

Recommended image classes:
- hero posters
- product cards
- factory gallery
- manufacturing detail
- lifestyle imagery
- fabric macro shots
- logo / UI assets

Every image requires:
- meaningful alt text when informative
- decorative treatment only when truly decorative
- responsive sizing
- appropriate crop / aspect ratio

---

# 12. Error Handling

Every major interactive action needs:

### Loading
Visible feedback during submission/upload.

### Success
Clear confirmation.

### Validation error
Tell the user exactly what needs fixing.

### Server error
Show a user-friendly message and log technical details server-side.

### Upload error
Allow retry without losing all completed form fields.

---

# 13. Security Baseline

- never trust client-side validation alone
- validate uploads on server
- limit upload size
- restrict MIME types/extensions
- use generated storage names
- prevent executable uploads
- protect secrets with environment variables
- rate-limit public endpoints
- do not expose private storage credentials in the browser
- log operational errors without leaking sensitive customer data

---

# 14. Rendering Strategy

Prefer:
- Server Components for content-heavy pages
- static / cached rendering for stable content
- client rendering only for sliders, menus, forms and other true interactions

The homepage should remain fast even with rich visuals.

---

# 15. Deployment

Recommended production process:

```text
Git repository
  ↓
CI / build
  ↓
Preview deployment
  ↓
QA
  ↓
Production
  ↓
Domain + SSL
  ↓
Google Search Console
  ↓
GA4 verification
```

Never treat a successful build as proof that the website is production-ready; test forms, uploads, SEO, analytics and mobile behavior separately.

---
# V2 — NEW COMPONENTS / DATA MODULES

Add these reusable components:
- `WhyChoose.tsx`
- `ProcessTimeline.tsx`
- `FactoryShowcase.tsx`
- `CertificatesGrid.tsx`
- `CertificateCard.tsx`
- `ShippingMethods.tsx`
- `ShippingMethodCard.tsx`
- `PaymentMethods.tsx`
- `PaymentMethodCard.tsx`

Add structured data modules:
- `data/trust.ts`
- `data/manufacturing.ts`
- `data/certificates.ts`
- `data/shipping.ts`
- `data/payments.ts`

Suggested conceptual models:

```ts
type Certificate = {
  id: string
  title: string
  issuingBody: string
  documentType: string
  documentUrl: string
  previewImage?: string
  issueDate?: string
  expiryDate?: string
  publicCertificateNumber?: string
  isPublished: boolean
}

type ShippingMethod = {
  id: string
  name: string
  description: string
  suitableFor: string
  leadTimeText?: string
  isPublished: boolean
}

type PaymentMethod = {
  id: string
  name: string
  description: string
  termsText?: string
  isPublished: boolean
}
```

Certificate documents containing sensitive information must not automatically be exposed from a public static folder; use approved public assets or controlled storage/access.
