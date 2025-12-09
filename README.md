# Dreamshift Contact Forms (Airtable Edition) 🎯

_Region-specific, multi-step onboarding forms for Dreamshift. Features real-time Airtable logging, Calendly integration, and a "Low Budget" capture flow with a custom secure popup._

[![Platform](https://img.shields.io/badge/Platform-WordPress%20%2B%20Elementor-7a5)](#)
[![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-blue)](#)
[![Data](https://img.shields.io/badge/Data-Airtable-yellow)](#)
[![Booking](https://img.shields.io/badge/Booking-Calendly-00a2ff)](#)
[![Phone%20UX](https://img.shields.io/badge/Phone-intl--tel--input-444)](#)
[![License](https://img.shields.io/badge/License-MIT-black)](#)

---

## Live URL
**https://dreamshift.net/contact**

---

## Overview
This project replaces the old Gateway flow with **standalone, region-optimized forms**. 
Data is synced to **Airtable** in two stages ("Partial" on input, "Final" on completion).

**Key Features:**
* **Airtable Integration:** Direct API connection (No Apps Script required).
* **Smart "Low Budget" Logic:** Users who cannot afford the package are captured as leads and shown a **Free Gift Popup** instead of the calendar.
* **"Nuclear" Popup Fix:** Custom HTML/CSS popup implementation that strictly prevents "Flash of Unstyled Content" (FOUC) or auto-loading glitches.
* **Region Specifics:** Custom currency symbols, phone masks, and step counts per region.

---

## Variations & Logic

| Region | Code | Steps | Currency | Popup Logic |
| :--- | :--- | :--- | :--- | :--- |
| **Australia** | `AU` | 5 | AUD ($) | **Step 3 (Location) Removed**. Low Budget = Popup. |
| **United Kingdom** | `UK` | 5 | GBP (£) | **Step 3 (Location) Removed**. Low Budget = Popup. |
| **Sri Lanka** | `LK` | 6 | LKR (Rs) | Includes Location Step. Low Budget = Popup. |
| **USA / General** | `US` | 6 | USD ($) | Includes Location Step. Low Budget = Popup. |

---

## Architecture

```mermaid
graph TD
    A[User Visits Page] --> B[Multi-Step Form]
    B -- Input Data --> C{Airtable (Partial)}
    B -- Step 1-4 --> D[Package Selection]
    D -- "Select Package" --> E[Calendly Embed]
    E --> F[Airtable (Final: Booked)]
    D -- "Can't Afford" --> G[Lead Magnet Table]
    G --> H[Secure Custom Popup]
```

**Libraries:**

  - intl-tel-input: Phone formatting.
  - Calendly Widget: Embedded booking.

-----

## Project Structure

```
/
├── contact-au.html        # 5-Step Form (Location removed), AUD pricing
├── contact-uk.html        # 5-Step Form (Location removed), GBP pricing
├── contact-lk.html        # 6-Step Form (Location kept), LKR pricing
├── contact-us.html        # 6-Step Form (Location kept), USD pricing
└── README.md
```

-----

## Configuration

To deploy these forms, edit the `<script>` section at the top of each HTML file.

### 1. Airtable Keys

You need a Personal Access Token with `data.records:write` permissions.

```javascript
const AIRTABLE_API_KEY = 'pat...'; // Your Token
const AIRTABLE_BASE_ID = 'app...'; // Base ID
const TABLE_MAIN       = 'Contact Form Submissions';
const TABLE_LEAD       = 'Lead Magnet Form';
```

### 2. Region Settings

Ensure `COUNTRY_CODE` is unique for each file to prevent session cache conflicts.

```javascript
// Example for UK
const COUNTRY_CODE = 'UK'; 
const PACKAGE_PRICES = { essential: '£125', advanced: '£150', ultimate: '£300' };
```

### 3. The "Nuclear" Popup Fix

To prevent the popup from showing immediately upon page load, we use strict inline styling.
**Do not remove the inline style:**

```html
<div id="ds-secure-popup" class="dreamshift-popup-container" style="display:none;">
```

-----

## Installation Guide

1. **WordPress / Elementor:**
      * Drag an **HTML Widget** onto your page.
      * Copy the full code from the specific region file (e.g., `contact-uk.html`).
      * Paste into the widget.
2. **Clear Cache:**
      * If updating from a previous version, **purge your site cache** (WP Rocket/Cloudflare) and browser cache. The new ID `ds-secure-popup` is designed to break old cache chains.

-----

## Troubleshooting

* **Popup shows on load?**
      * Ensure the HTML div has `style="display:none;"` inline.
      * Ensure the ID is `ds-secure-popup`.
* **Phone flag wrong?**
      * Check the `initialCountry` setting in the `initPhone()` function (e.g., `'gb'`, `'au'`, `'lk'`).
* **Airtable error?**
      * Check the browser console (`F12`). If you see `401 Unauthorized`, generate a new Airtable Token.