import React from 'react';
import { Text } from 'react-native';

const getSlides = () => [
  { 
    id: '1', 
    image: require('../assets/images/umboardimg/hospit.png'),
    title: 'Get Quick Access to Emergency Services',
    titleHighlight: 'Quick Access',
    description: 'Quickly find and contact emergency services when you need them the most.',
    showEmergencyHelp: true
  },
  { 
    id: '2', 
    image: require('../assets/images/umboardimg/hospi.png'),
    title: 'Locate the Nearest Hospitals and Clinics',
    titleHighlight: 'Nearest',
    description: 'Easily find hospitals and medical facilities closest to your location with just a few taps',
    showEmergencyHelp: false
  },
  { 
    id: '3', 
    image: require('../assets/images/umboardimg/nurs.png'),
    title: 'Fast Patient Referral Process',
    titleHighlight: 'Patient Referral',
    description: 'Doctors can quickly locate and refer patients to available experts in various hospitals.',
    showEmergencyHelp: false
  },
];

export default getSlides;