import { Product } from '@/types/content';

export const products: Product[] = [
  {
    slug: 'cctv',
    title: 'CCTV Cameras',
    tagline: 'Eyes in Every Corner',
    features: [
      'IP, HD, PTZ, WiFi cameras',
      'Night-vision color',
      'AI Enabled',
      'Audio Enabled',
      'Camera accessories',
    ],
    image: 'product-cctv.png',
    useCases: ['Homes', 'retail stores', 'warehouses', 'offices', 'educational institutions'],
  },
  {
    slug: 'ptz',
    title: 'PTZ Camera',
    tagline: '360° Coverage, Total Control',
    features: [
      '360° coverage',
      'mobile access',
      '45x zoom',
    ],
    image: 'product-ptz.png',
    useCases: ['Parking areas', 'large campuses', 'warehouses', 'outdoor perimeters'],
  },
  {
    slug: 'wifiCamera',
    title: 'WiFi Camera',
    tagline: 'Wire-Free, Worry-Free',
    features: [
      'Wire-free installation',
      'mobile app access',
      'auto-tracking',
    ],
    image: 'product-wifi-camera.png',
    useCases: ['Homes', 'small offices', 'shops', 'quick-deploy setups'],
  },
  {
    slug: 'videoDoorPhone',
    title: 'Video Door Phone',
    tagline: 'See Who\'s at the Door, Anywhere',
    features: [
      'Smart alerts',
      'night vision',
      'remote unlock',
    ],
    image: 'product-video-door-phone.png',
    useCases: ['Homes', 'apartments', 'gated communities', 'offices'],
  },
  {
    slug: 'burglarAlarms',
    title: 'Burglar Alarms',
    tagline: 'Protection That Never Sleeps',
    features: [
      'GSM, IP, Fire panels',
      'Vibration, temperature, glass break, gas leak, magnetic contact, motion, smoke, and more',
    ],
    image: 'product-burglar-alarms.png',
    useCases: ['Homes', 'warehouses', 'offices', 'industrial sites', 'retail stores'],
  },
  {
    slug: 'pbx',
    title: 'PBX Systems',
    tagline: 'Efficient Communication for Every Scale',
    features: [
      'Digital PBX',
      'IP PBX',
    ],
    useCases: [
      'Residential societies',
      'Hotels',
      'Corporate offices',
      'Hostels and dormitories',
      'Educational institutions',
      'Hospitals',
    ],
    image: 'product-pbx.png',
  },
  {
    slug: 'biometric',
    title: 'Biometric Access',
    tagline: 'Seamless Access, Maximum Security',
    features: [
      'Face',
      'Thumb',
      'RFID card',
    ],
    useCases: [
      'Attendance',
      'Access control',
      'Electric doorlocks',
      'Boom barriers',
    ],
    image: 'product-biometric.png',
  },
  {
    slug: 'networking',
    title: 'Networking',
    tagline: 'Connectivity Without Compromise',
    features: [
      'Networking switches',
      'Access points',
      'WiFi routers',
      'Point-to-point switches',
    ],
    useCases: [
      'Corporate office networking',
      'WiFi zone creation',
      'Remote area connectivity',
    ],
    image: 'product-networking.png',
  },
  {
    slug: 'audio',
    title: 'Audio Systems',
    tagline: 'Crystal-Clear Audio, Anywhere You Need',
    features: [
      'Amplifiers',
      'Speakers (wired, Bluetooth)',
    ],
    useCases: [
      'Public address',
      'Offices',
      'Lecture halls',
      'Home theatre',
    ],
    image: 'product-audio.png',
  },
];