# Integration Guide

SonicStream is designed to be easily integrated with third-party services. Below are the steps to connect various features.

## 1. Contact Form (Mailchimp/Formspree)
The contact form in `pages/contact.html` is compatible with Formspree or Netlify Forms. 
- Replace `<form action="#">` with `<form action="https://formspree.io/f/your-id" method="POST">`.

## 2. Payments (Stripe/PayPal)
To enable listener support/donations:
- **Stripe**: Use the pre-styled button classes `.btn-primary` and add the Stripe `Checkout` script in the dashboard pages.
- **PayPal**: Insert the PayPal Smart Button script into the placeholder div in `dashboard-dj.html`.

## 3. SEO Optimization
- **Meta Tags**: Ensure the `<title>` and `<meta name="description">` tags are updated for each page.
- **JSON-LD**: Structured data placeholders are included in the `<head>` of the Home page for local business info.

## 4. Maps Integration
The Contact page has a placeholder for Google Maps. To enable:
- Replace the interactive map div with:
  `<iframe src="https://www.google.com/maps/embed?pb=YOUR_KEY"></iframe>`

## 5. Booking System
For show bookings or DJ slots, we recommend integrating **Calendly** via their embed script in the Services page.
