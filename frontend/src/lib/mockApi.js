export async function getServices() {
  const res = await fetch('/src/mocks/services.json');
  return res.json();
}

export async function getBarbers() {
  const res = await fetch('/src/mocks/barbers.json');
  return res.json();
}

export async function getGallery() {
  const res = await fetch('/src/mocks/gallery.json');
  return res.json();
}
