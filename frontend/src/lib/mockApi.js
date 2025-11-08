import servicesData from '../mocks/services.json';
import barbersData from '../mocks/barbers.json';
import galleryData from '../mocks/gallery.json';

export async function getServices() {
  // Simulate async behavior for consistency with real API
  return Promise.resolve(servicesData);
}

export async function getBarbers() {
  // Simulate async behavior for consistency with real API
  return Promise.resolve(barbersData);
}

export async function getGallery() {
  // Simulate async behavior for consistency with real API
  return Promise.resolve(galleryData);
}
