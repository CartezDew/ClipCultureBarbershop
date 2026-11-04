import servicesData from '../mocks/services.json';

export async function getServices() {
  // Simulate async behavior for consistency with real API
  return Promise.resolve(servicesData);
}
