# Orange Postcard MVP

Online-to-physical postcard MVP for testing whether people would send a short, sincere message if the writing and delivery friction disappeared.

Live: https://orangepostcard.vercel.app/

## What It Is

Orange Postcard lets a user type a short message online and imagine it being printed on a physical orange postcard and delivered to someone. The project was built as a landing and writing-flow MVP, not as a fully scaled logistics service.

## Why I Made It

I like the sincerity and physical texture of postcards, but sending one usually requires too many small steps: buying a card, writing it, finding an address, buying stamps, and mailing it.

The product question was simple:

> If the delivery friction is removed, will people still want to send the sincerity of a physical postcard?

## My Role

I led the project end to end:

- Problem framing and target-user hypothesis
- Landing-page concept, copy, and visual direction
- Mobile-first writing flow
- Micro-interactions and postcard-inspired motion
- Analytics event design with GTM and Vercel Analytics
- MVP validation framing around payment intent

## MVP Validation

The MVP tested intent through a live landing and checkout-like flow. The key signal was not a generic click-through rate, but the share of users who reached the final step, entered the required information, and clicked the payment button.

Result: **6% payment-intent conversion**.

This was enough to show that the value I felt in postcards could be translated into a digital product experience that other people understood.

## Important Boundary

This repository represents an MVP/prototype validation project. It should be read as evidence of product thinking, user-flow design, implementation, and validation, rather than as a fully launched delivery business.

## Tech / Tools

- HTML, CSS, JavaScript
- Tailwind CDN for rapid UI iteration
- Google Tag Manager
- Vercel Analytics
- Supabase client experiment for postcard submission flow
- Vercel deployment

## Screens / Flow

Core public flow:

1. Read the landing page
2. Click the postcard CTA
3. Write a message
4. Enter delivery-related information
5. Reach the payment-intent step

## Links

- Live MVP: https://orangepostcard.vercel.app/
- Personal site: https://coldwaterkim.com/
