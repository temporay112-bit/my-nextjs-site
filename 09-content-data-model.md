# SLOTS SPORTSWEAR — Content & Data Model V2

Use structured data instead of scattering business content across JSX.

## Certificate
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
```
Initial slots:
- Chamber of Commerce / Company Certificate
- FBR Tax / Taxpayer Certificate — 2026
- Additional verified certificates

## Shipping
```ts
type ShippingMethod = {
  id: string
  name: string
  description: string
  suitableFor: string
  leadTimeText?: string
  isPublished: boolean
}
```
Possible configurable methods after verification: Air Freight, Courier, Sea Freight, Express, Buyer-Nominated Forwarder.

## Payment
```ts
type PaymentMethod = {
  id: string
  name: string
  description: string
  termsText?: string
  isPublished: boolean
}
```
Populate only with actual company-approved methods and terms.

## Manufacturing step
```ts
type ManufacturingStep = {
  id: string
  number: number
  title: string
  description: string
  image?: string
}
```

## Why Choose point
```ts
type TrustPoint = {
  id: string
  title: string
  description: string
  icon?: string
  isPublished: boolean
}
```

## Governance
Every sensitive claim follows: `draft → verified → approved_for_web → published`.
This applies to certificates, shipping methods, payment terms, MOQ, lead times, production capacity, client numbers, years and certifications.
