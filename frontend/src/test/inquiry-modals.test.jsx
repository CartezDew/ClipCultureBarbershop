import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import AdvertisePurchaseModal from '../components/AdvertisePurchaseModal.jsx';
import AdvertiseRequestInfoModal from '../components/AdvertiseRequestInfoModal.jsx';
import FranchiseApplyModal from '../components/FranchiseApplyModal.jsx';
import FranchiseRequestInfoModal from '../components/FranchiseRequestInfoModal.jsx';
import ApplicantFormModal from '../components/ApplicantFormModal.jsx';
import BookingInquiryModal from '../components/BookingInquiryModal.jsx';
import { submitFormWithAttachments } from '../services/formSubmissionService';

vi.mock('../services/formSubmissionService', () => ({ submitFormWithAttachments: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const modals = [
  ['Advertising package', AdvertisePurchaseModal],
  ['Advertising information', AdvertiseRequestInfoModal],
  ['Franchise application', FranchiseApplyModal],
  ['Franchise information', FranchiseRequestInfoModal],
  ['Applicant form', ApplicantFormModal],
  ['Booking inquiry', BookingInquiryModal],
];

describe.each(modals)('%s delivery failure', (_name, Modal) => {
  it('keeps the completed form open and reports that the request was not sent', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    submitFormWithAttachments.mockRejectedValueOnce(new Error('Delivery unavailable'));
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Test inquiry" />);
    const form = document.querySelector('.form0modal-form');

    form.querySelectorAll('input:not([type="radio"]), textarea').forEach((field) => {
      fireEvent.change(field, { target: { value: field.name === 'email' ? 'owner@example.com' : field.name === 'phone' ? '555-0100' : 'Test value' } });
    });
    form.querySelectorAll('select').forEach((field) => {
      const option = [...field.options].find(({ value }) => value);
      fireEvent.change(field, { target: { value: option.value } });
    });
    const radioNames = [...new Set([...form.querySelectorAll('input[type="radio"]')].map((field) => field.name))];
    radioNames.forEach((name) => fireEvent.click(form.querySelector(`input[type="radio"][name="${name}"]`)));
    fireEvent.submit(form);

    await waitFor(() => expect(submitFormWithAttachments).toHaveBeenCalledTimes(1));
    expect(await screen.findByRole('alert')).toHaveTextContent('We could not send your request. Please try again.');
    expect(form).toBeInTheDocument();
    expect(form.querySelector('[name="email"]')).toHaveValue('owner@example.com');
    expect(onClose).not.toHaveBeenCalled();
  });
});
