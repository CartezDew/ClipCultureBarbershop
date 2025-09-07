export interface Service {
  id: number;
  name: string;
  price: number;
  durationMins: number;
  description: string;
}

export interface Barber {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  bio: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ContactInfo {
  phone: string;
  address: string;
  hours: string;
  email: string;
}
