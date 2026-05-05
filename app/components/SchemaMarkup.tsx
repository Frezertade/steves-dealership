import Script from 'next/script'

export default function SchemaMarkup() {
  const dealershipSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Steve's Dealership",
    "image": "https://steves-dealership.vercel.app/og-image.jpg",
    "url": "https://steves-dealership.vercel.app",
    "telephone": "+1-717-397-3497",
    "email": "stevesdealer@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1027 Dillerville Rd #16",
      "addressLocality": "Lancaster",
      "addressRegion": "PA",
      "postalCode": "17603",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.0604",
      "longitude": "-76.3233"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$",
    "paymentAccepted": ["Cash", "Credit Card", "Financing"],
    "areaServed": {
      "@type": "City",
      "name": "Lancaster, PA"
    }
  }

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dealershipSchema) }}
    />
  )
}