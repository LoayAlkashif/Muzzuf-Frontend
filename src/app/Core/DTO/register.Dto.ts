export interface RegisterDto {
  fullName: string;
//   nationalId: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  region: string;
  bio?: string;

  programmingLanguages?: string[];
  level?: 'Junior' | 'Mid' | 'Senior' | '';

  companyName?: string;
  companyDescription?: string;

  userType?: 'Employee' | 'Employer';
}

export const REGIONS = [
  {
    name: 'Egypt',
    cities: [
      'Cairo',
      'Alexandria',
      'Giza',
      'Shubra El-Kheima',
      'Port Said',
      'Suez',
      'El-Mahalla El-Kubra',
      'Luxor',
      'Mansoura',
      'Tanta',
    ],
  },
  {
    name: 'Saudi Arabia',
    cities: [
      'Riyadh',
      'Jeddah',
      'Mecca',
      'Medina',
      'Dammam',
      'Khobar',
      'Tabuk',
      'Buraidah',
      'Khamis Mushait',
      'Hail',
    ],
  },
  {
    name: 'United States',
    cities: [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
    ],
  },
];
