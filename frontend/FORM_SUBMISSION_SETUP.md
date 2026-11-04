# Clip Culture form responses

The existing inquiry forms use `src/services/formSubmissionService.js`. A submission sends an internal notification to the business inbox, then an acknowledgement to the visitor's email address. The acknowledgement confirms receipt and says someone from the team will be in contact within 48 hours. The on-site success card uses the same copy from `src/lib/formResponseCopy.js`. The separate Join the Culture signup keeps its welcome message.

## EmailJS configuration

The current EmailJS account has one Gmail service and two templates:

| Setting | Current ID |
| --- | --- |
| Service | `clipculture_2025` |
| Internal notification | `clipculture_form_2025` |
| Visitor acknowledgement | `clipculture_reply_2025` |

Set these variables in `frontend/.env` for local development and in the hosting provider's build environment for production:

```text
VITE_EMAILJS_SERVICE_ID=clipculture_2025
VITE_EMAILJS_PUBLIC_KEY=<EmailJS public key>
VITE_EMAILJS_INTERNAL_TEMPLATE_ID=clipculture_form_2025
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=clipculture_reply_2025
VITE_EMAILJS_INTERNAL_TO_EMAIL=<business inbox>
VITE_PUBLIC_SITE_URL=https://clip-culture.netlify.app
```

The public key and template IDs stay the same when the business inbox changes. To hand this over to the client, connect their sending mailbox in **EmailJS → Email Services**, update the service ID if it changes, and change `VITE_EMAILJS_INTERNAL_TO_EMAIL` in both environments. Also check the internal template's **To Email** field is `{{to_email}}` and the acknowledgement template's **Reply To** field is `{{reply_to}}`. The visitor's email is supplied separately as `{{to_email}}`; changing the business inbox does not redirect visitor acknowledgements.

The reusable acknowledgement markup is in `email-templates/clip-culture-auto-reply.html`. Paste its HTML into **EmailJS → Email Templates → ClipCulture_AutoReply → Edit Content → Code Editor** when changing the design. Keep **To Email** as `{{to_email}}`, **Subject** as `{{customer_subject}}`, **From Name** as `Clip Culture Barbershop`, and **Reply To** as `{{reply_to}}`. The transparent favicon mark at `public/clip-culture-email-logo.png` must be deployed to the public site so email clients can load it. Text and layout CSS for the on-site confirmation are in `src/components/ClipCultureFormResponse.jsx` and `src/styles/clip-culture-form-response.css`.

## Test

Submit a form with an email address you control. Check the EmailJS History page for two successful sends: the internal notification and the visitor acknowledgement. Confirm the visitor email displays the logo, the correct form topic, and the 48-hour message. The free EmailJS allowance is 200 sends per month; the two-email flow uses two sends per submission.
