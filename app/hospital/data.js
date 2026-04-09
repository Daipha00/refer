export const hospitalProfiles = {
  uci: {
    id: 'uci',
    shortCode: 'NRH',
    name: 'Uganda Cancer Institute National Referral Hospital',
    address: 'Plot 14, Old Kampala Road, Kampala',
    distance: '45 km away',
    departmentsCount: '42 Departments',
    doctorsCount: '120 Doctors',
    image: require('../../assets/images/umboardimg/hospi.png'),
    departments: [
      { id: 'cardiology', title: 'Cardiology', doctors: '12 Doctors', color: '#F8C8CD', icon: 'heart-pulse' },
      { id: 'gynecology', title: 'Gynecology', doctors: '6 Doctors', color: '#F1C4F7', icon: 'human-female-female' },
      { id: 'nephrology', title: 'Nephrology', doctors: '30 Doctors', color: '#FFE0A8', icon: 'kidney' },
      { id: 'oncology', title: 'Oncology', doctors: '18 Doctors', color: '#E8EFE6', icon: 'ribbon' },
    ],
    ambulances: [
      { id: 'uci-003', code: 'UCI-AMB-003', status: 'Available', grade: 'A', rating: '4.5', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
      { id: 'uci-061', code: 'UCI-AMB-061', status: 'In-use (unavailable)', grade: 'C', rating: '3.7', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
      { id: 'uci-007', code: 'UCI-AMB-007', status: 'Available', grade: 'C', rating: '5.0', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
      { id: 'uci-010', code: 'UCI-AMB-010', status: 'In-use (unavailable)', grade: 'B', rating: '2.9', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
    ],
    review: {
      name: 'Nakalema Joyce',
      department: 'Pediatrics',
      score: '5.0',
      text: 'The care I received from the Pediatrics department was exceptional. The doctors and nurses were patient and attentive to every detail.',
    },
  },
  butabika: {
    id: 'butabika',
    shortCode: 'NRH',
    name: 'Butabika National Referral Hospital',
    address: 'Kampala, Uganda',
    distance: '2 km away',
    departmentsCount: '56 Departments',
    doctorsCount: '98 Doctors',
    image: require('../../assets/images/umboardimg/hospit.png'),
    ambulances: [
      { id: 'bnh-012', code: 'BNH-AMB-012', status: 'In-use (unavailable)', grade: 'C', rating: '3.7', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
      { id: 'bnh-021', code: 'BNH-AMB-021', status: 'Available', grade: 'A', rating: '4.4', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
    ],
  },
  uhi: {
    id: 'uhi',
    shortCode: 'NRH',
    name: 'Uganda Heart Institute National Referral Hospital',
    address: 'Mulago Hill Road, Kampala',
    distance: '1 km away',
    departmentsCount: '112 Departments',
    doctorsCount: '140 Doctors',
    image: require('../../assets/images/umboardimg/nurs.png'),
    ambulances: [
      { id: 'uhi-001', code: 'UHI-AMB-001', status: 'Available', grade: 'A', rating: '4.5', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
      { id: 'uhi-009', code: 'UHI-AMB-009', status: 'In-use (unavailable)', grade: 'B', rating: '3.9', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
    ],
  },
  entebbe: {
    id: 'entebbe',
    shortCode: 'NRH',
    name: 'Entebbe National Referral Hospital for Infectious Diseases',
    address: 'Entebbe, Uganda',
    distance: '2 km away',
    departmentsCount: '211 Departments',
    doctorsCount: '172 Doctors',
    image: require('../../assets/images/umboardimg/hospi.png'),
    ambulances: [
      { id: 'enh-003', code: 'ENH-AMB-003', status: 'Available', grade: 'B', rating: '4.8', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
      { id: 'enh-010', code: 'ENH-AMB-010', status: 'In-use (unavailable)', grade: 'B', rating: '2.9', personnel: '2 Personnel', image: require('../../assets/images/umboardimg/Ambulance.png') },
    ],
  },
};

export function findAmbulanceById(ambulanceId) {
  for (const hospital of Object.values(hospitalProfiles)) {
    const ambulance = hospital.ambulances?.find((item) => item.id === ambulanceId);
    if (ambulance) {
      return { hospital, ambulance };
    }
  }
  return null;
}
