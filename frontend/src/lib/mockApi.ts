import type { Service } from '../types/service';
import type { Barber } from '../types/barber';
import type { GalleryItem } from '../types/gallery';

export async function getServices(): Promise<Service[]> {
  const res = await fetch('/src/mocks/services.json');
  return res.json();
}

export async function getBarbers(): Promise<Barber[]> {
  const res = await fetch('/src/mocks/barbers.json');
  return res.json();
}

export async function getGallery(): Promise<GalleryItem[]> {
  const res = await fetch('/src/mocks/gallery.json');
  return res.json();
}
