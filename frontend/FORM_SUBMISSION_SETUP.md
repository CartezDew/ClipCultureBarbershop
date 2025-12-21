# Form Submission Setup Guide

This guide explains how to set up email notifications for all forms on the Clip Culture website.

## Overview

All forms send **two emails**:
1. **Internal notification** → cartez.dewberry@gmail.com (always sent)
2. **Auto-reply** → User's email (only if they provided one)

## Installation

The required package is already installed:
```bash
npm install @emailjs/browser
```

## EmailJS Setup (Required)

### Step 1: Create EmailJS Account
Go to [EmailJS](https://www.emailjs.com/) and create a free account

### Step 2: Add Email Service
1. Go to **Email Services** → **Add New Service**
2. Choose **Gmail** (or your preferred provider)
3. Follow the connection steps
4. **Copy your Service ID** (e.g., `service_abc123`)

### Step 3: Create TWO Email Templates

#### Template 1: Internal Notification

1. Go to **Email Templates** → **Create New Template**
2. Configure:

**To Email:** `cartezmarkese57@gmail.com`

**Subject:**
```
{{subject}}
```

**Content (use plain text format for best results):**
```
NEW {{form_name}} SUBMISSION
================================

From: {{from_name}}
Email: {{from_email}}
Submitted: {{submitted_at}}
Page: {{page_url}}

FORM DETAILS:
--------------------------------
{{field_1_label}}: {{field_1_value}}
{{field_2_label}}: {{field_2_value}}
{{field_3_label}}: {{field_3_value}}
{{field_4_label}}: {{field_4_value}}
{{field_5_label}}: {{field_5_value}}
{{field_6_label}}: {{field_6_value}}
{{field_7_label}}: {{field_7_value}}
{{field_8_label}}: {{field_8_value}}
{{field_9_label}}: {{field_9_value}}
{{field_10_label}}: {{field_10_value}}
{{field_11_label}}: {{field_11_value}}
{{field_12_label}}: {{field_12_value}}
{{field_13_label}}: {{field_13_value}}
{{field_14_label}}: {{field_14_value}}
{{field_15_label}}: {{field_15_value}}
--------------------------------

Plain text version:
{{form_fields_text}}

---
Clip Culture Website
```

3. **Save** and **Copy Template ID** → use as `VITE_EMAILJS_INTERNAL_TEMPLATE_ID`

#### Template 2: Auto-Reply

1. Create another template
2. Configure:

**To Email:** `{{to_email}}`

**Subject:**
```
{{subject}}
```

**Content:**
```
Hi {{to_name}},

Thank you for your {{form_name}}!

We've received your submission and will get back to you soon.

YOUR SUBMISSION DETAILS:
--------------------------------
{{field_1_label}}: {{field_1_value}}
{{field_2_label}}: {{field_2_value}}
{{field_3_label}}: {{field_3_value}}
{{field_4_label}}: {{field_4_value}}
{{field_5_label}}: {{field_5_value}}
{{field_6_label}}: {{field_6_value}}
{{field_7_label}}: {{field_7_value}}
{{field_8_label}}: {{field_8_value}}
{{field_9_label}}: {{field_9_value}}
{{field_10_label}}: {{field_10_value}}
--------------------------------

Submitted: {{submitted_at}}

Best regards,
Clip Culture Team
```

3. **Save** and **Copy Template ID** → use as `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID`

### Step 4: Get Public Key
1. Go to **Account** → **API Keys**
2. **Copy your Public Key**

### Step 5: Configure Environment Variables

Edit `.env` file in project root:
```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=public_xxxxxxx
VITE_EMAILJS_INTERNAL_TEMPLATE_ID=template_internal_xxxxxxx
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=template_autoreply_xxxxxxx
```

### Step 6: Restart Dev Server
```bash
npm run dev
```

## Template Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{subject}}` | Email subject line | Clip Culture — Join the Culture Submission |
| `{{form_name}}` | Name of the form | Join the Culture |
| `{{from_name}}` | User's name | John Doe |
| `{{from_email}}` | User's email | john@example.com |
| `{{to_email}}` | Recipient email (auto-reply) | john@example.com |
| `{{to_name}}` | Recipient name (auto-reply) | John Doe |
| `{{submitted_at}}` | Timestamp | Friday, December 20, 2024, 3:45 PM EST |
| `{{page_url}}` | Page where form was submitted | https://clipculture.com/franchise |
| `{{form_fields_text}}` | All fields as plain text | Email: john@example.com\nPhone: 555-1234 |
| `{{field_1_label}}` | First field label | Email |
| `{{field_1_value}}` | First field value | john@example.com |
| `{{field_2_label}}` ... `{{field_15_label}}` | Additional field labels | |
| `{{field_2_value}}` ... `{{field_15_value}}` | Additional field values | |

**Note:** Unused fields will be blank. The template supports up to 15 fields.

## Forms Integrated

| Form | Component | Email Subject |
|------|-----------|---------------|
| Join the Culture | `JoinUs.jsx` | Clip Culture — Join the Culture Submission |
| Apply for Franchise | `FranchiseApplyModal.jsx` | Clip Culture — Apply for Franchise Submission |
| Request Franchise Information | `FranchiseRequestInfoModal.jsx` | Clip Culture — Request Franchise Information Submission |
| Purchase Advertising Package | `AdvertisePurchaseModal.jsx` | Clip Culture — Purchase Advertising Package Submission |
| Request Advertising Information | `AdvertiseRequestInfoModal.jsx` | Clip Culture — Request Advertising Information Submission |
| Applicant Form | `ApplicantFormModal.jsx` | Clip Culture — {title} Submission |
| Booking Inquiry | `BookingInquiryModal.jsx` | Clip Culture — Booking Inquiry Submission |
| Booking Appointment | `BookingForm.jsx` | Clip Culture — Booking Appointment Submission |

## Testing

1. Open browser DevTools (F12) → Console
2. Submit a form
3. Check for:
   - ✅ `EmailJS Config Status: { SERVICE_ID: '✓ Set', ... }`
   - ✅ `📧 Sending internal notification email...`
   - ✅ `✅ Internal email sent successfully: 200`
   - ✅ `📧 Sending auto-reply to: user@example.com` (if email provided)
4. Check cartez.dewberry@gmail.com for internal notification
5. Check user's email for auto-reply

## Troubleshooting

### Config Status shows "✗ Missing"
- Check your `.env` file exists in project root
- Verify variable names match exactly (case-sensitive)
- Restart dev server: `npm run dev`

### "The Public Key is invalid" (400)
- Check `VITE_EMAILJS_PUBLIC_KEY` is correct
- Make sure you copied the Public Key, not the Private Key

### "Service or template not found" (404)
- Check `VITE_EMAILJS_SERVICE_ID` is correct
- Check `VITE_EMAILJS_INTERNAL_TEMPLATE_ID` is correct
- Make sure service and templates are active in EmailJS dashboard

### Emails not arriving
- Check spam folder
- Verify email service is connected in EmailJS
- Check EmailJS dashboard for failed sends

### HTML showing as raw text
- This is fixed! We now send individual field variables instead of HTML
- Template uses `{{field_1_label}}: {{field_1_value}}` format

### Auto-reply not sending
- User must provide an email address
- Check `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` is set
- Console should show "Sending auto-reply to: ..."

## EmailJS Free Tier Limits

- 200 emails/month (internal + auto-reply count as 2)
- No attachments
- Basic templates

For higher volume, upgrade to a paid plan or use a backend solution.
