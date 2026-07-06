/**
 * Generic per-model Key Features + Vehicle Details accordion content for the
 * vehicle detail page. Keyed by `model` as it appears in inventory.json.
 *
 * CX-5, CX-30, CX-90, and Mazda3 entries are adapted from real Mazda spec-deck
 * / dealer-listing content (see pdp-clone/src/data/vehicles/*.ts for the
 * original per-VIN sourcing). CX-50, CX-70, and MX-5 Miata have no real
 * per-VIN source in this repo, so their entries are generic, model-accurate
 * mock content in the same style, not tied to any specific real listing.
 */

const MODEL_CONTENT = {
  'CX-5': {
    keyFeatures: [
      'i-ACTIV All-Wheel Drive',
      'Mazda Radar Cruise Control (MRCC) with Speed Limit Assist',
      'Blind Spot Monitoring',
      'Emergency Lane Keeping',
      'Smart Brake Support (SBS)',
      'Power Rear Liftgate',
      'Heated Front Seats',
      'Heated Steering Wheel',
      'Smart Keyless Entry',
      'Wireless Apple CarPlay / Android Auto',
      'Homelink Garage Door Opener',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '19 x 7J inch aluminum alloy wheels with Black Metallic w/ Machining Finish',
          'P225/55 R19 all-season tires',
          'Headlights - LED with auto-leveling',
          'Headlights - Daytime Running Lights (LED)',
          'Privacy glass - rear side windows and rear liftgate glass',
          'Rear roof spoiler - body color',
          'Roof rails - black finish',
          'Side mirrors - automatic power folding, heated',
          'Windshield wipers - rain-sensing, variable-intermittent',
        ],
      },
      {
        category: 'Interior',
        items: [
          "10-way power adjustable driver's seat w/ power lumbar support",
          '40/20/40 split one-touch fold-down and reclining rear seatback',
          'Heated front seats',
          'Seat material - leatherette with microsuede insert',
          'Dual-zone automatic climate control',
          'Power rear liftgate with programmable height adjustment',
          'Rearview mirror - frameless, auto-dimming',
          'Steering wheel - heated, leather-wrapped, tilt & telescopic',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          '8-speaker sound system',
          '10.25" center display',
          'AM/FM/HD Radio',
          'Wireless Apple CarPlay / Android Auto integration',
          'Wireless phone charger',
          'Mazda Connect Infotainment System',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'SKYACTIV-G 2.5 DOHC 16-valve 4-cylinder engine with i-STOP',
          'SKYACTIV-Drive 6-Speed AT with manual-shift mode',
          'Mazda Intelligent Drive Select (Mi-Drive) - Normal/Sport/Off-road',
          'Anti-lock Brake System (ABS) with Electronic Brakeforce Distribution',
          'Dynamic Stability Control (DSC) and Traction Control System (TCS)',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Advanced dual front, side, and side curtain airbags',
          'Blind Spot Monitoring',
          'Driver Attention Alert',
          'Lane Departure Warning & Lane-keep Assist',
          'Mazda Radar Cruise Control (MRCC) with Speed Limit Assist',
          'Rearview camera w/ Dynamic Line',
          'Tire pressure monitoring system (TPMS)',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: SUV',
          'Passenger Capacity: 5',
          'Horsepower (SAE net): 187 hp @ 6,000 rpm',
          'Torque: 186 lb-ft @ 4,000 rpm',
          'Wheelbase: 110.8 in',
          'Overall Length: 184.6 in',
          'Curb Weight: 3,856 lbs',
        ],
      },
    ],
  },

  'CX-30': {
    keyFeatures: [
      'AWD',
      'Mazda Radar Cruise Control (MRCC) with Stop & Go',
      'Blind Spot Monitor',
      'Lane Departure Warning',
      'Lane Keep Assist',
      'Backup Camera',
      'Push Button Start',
      'Keyless Entry',
      'Bluetooth',
      'Wi-Fi Hotspot',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '18 x 7J inch aluminum alloy wheels',
          'P215/65R16 all-season tires',
          'Body-colored front and rear bumpers with black rub strip accent',
          'Black bodyside cladding and wheel well trim',
          'LED headlights with auto on/off and automatic high beams',
          'Lip spoiler',
          'Liftgate rear cargo access',
        ],
      },
      {
        category: 'Interior',
        items: [
          "6-way manual adjustable driver's seat w/ seat lifter",
          '60/40 folding rear seatback',
          'Manual tilt/telescoping steering column',
          'Dual-zone automatic climate control',
          'Mazda Radar Cruise Control (MRCC) with Stop & Go',
          'Proximity key with push button start',
          'Full carpet floor covering with front and rear floor mats',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          '8-speaker audio system',
          '8.8" center display',
          'Apple CarPlay / Android Auto integration',
          'Bluetooth hands-free phone and audio',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'SKYACTIV-G 2.5 DOHC 16-valve 4-cylinder engine',
          '6-Speed SKYACTIV-Drive Automatic with manual-shift and sport mode',
          'Automatic full-time all-wheel drive (AWD trims)',
          'MacPherson strut front suspension, torsion beam rear',
          '4-wheel disc brakes with ABS, brake assist, and hill hold control',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Blind Spot Monitoring (BSM)',
          'Smart Brake Support (SBS)',
          'Rear Cross Traffic Alert (RCTA)',
          'Dual stage driver and passenger front airbags',
          'Curtain 1st and 2nd row airbags',
          'Back-up camera',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: Sport Utility',
          'Passenger Capacity: 5',
          'Horsepower (SAE net): 186 hp @ 6,000 rpm',
          'Torque: 186 lb-ft @ 4,000 rpm',
          'Wheelbase: 104.4 in',
          'Overall Length: 173 in',
          'Curb Weight: 3,395 lbs',
        ],
      },
    ],
  },

  'CX-50': {
    keyFeatures: [
      'i-ACTIV All-Wheel Drive',
      'Off-Road Traction Assist',
      'Mazda Radar Cruise Control (MRCC) with Stop & Go',
      'Blind Spot Monitoring',
      'Power Liftgate',
      'Heated Front Seats',
      'Wireless Apple CarPlay / Android Auto',
      'Roof Rails with Standard Crossbars',
      'Smart Keyless Entry',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '18 x 7J inch aluminum alloy wheels',
          'P225/65R17 or P225/55R19 tires depending on trim',
          'Standard roof rails with crossbars',
          'LED headlights with auto on/off',
          'Privacy glass - rear side windows and liftgate',
          'Power liftgate with programmable height adjustment',
          'Side mirrors - power folding, heated',
        ],
      },
      {
        category: 'Interior',
        items: [
          "8-way power adjustable driver's seat",
          '40/20/40 split fold-down rear seatback',
          'Heated front seats',
          'Dual-zone automatic climate control',
          'Rear seat air vents',
          'Rubberized cargo area flooring',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          '8-speaker sound system',
          '10.25" center display',
          'Wireless Apple CarPlay / Android Auto integration',
          'Mazda Connect Infotainment System',
          'USB-C ports - front and rear',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'SKYACTIV-G 2.5 DOHC 16-valve 4-cylinder engine',
          'SKYACTIV-Drive 6-Speed AT with manual-shift mode',
          'Mazda Intelligent Drive Select (Mi-Drive) with Off-Road mode',
          'i-ACTIV AWD All-Wheel Drive, standard on all trims',
          'Off-Road Traction Assist',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Blind Spot Monitoring with Rear Cross Traffic Alert',
          'Smart Brake Support (SBS)',
          'Lane Departure Warning & Lane-keep Assist',
          'Mazda Radar Cruise Control (MRCC) with Stop & Go',
          'Rearview camera',
          'Tire pressure monitoring system (TPMS)',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: SUV',
          'Passenger Capacity: 5',
          'Horsepower (SAE net): 187 hp @ 6,000 rpm',
          'Torque: 186 lb-ft @ 4,000 rpm',
          'Wheelbase: 110.8 in',
          'Overall Length: 185.9 in',
          'Curb Weight: 3,900 lbs',
        ],
      },
    ],
  },

  'CX-70': {
    keyFeatures: [
      'i-ACTIV All-Wheel Drive',
      'M Hybrid Boost (48V Mild Hybrid)',
      'Mazda Radar Cruise Control with Stop & Go',
      'Blind Spot Monitoring with Vehicle Exit Warning',
      'Emergency Lane Keeping',
      'Power Panoramic Moonroof',
      'Heated & Ventilated Front Seats',
      'Hands-Free Power Rear Liftgate',
      'Wireless Apple CarPlay / Android Auto',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '21 x 9.5J inch aluminum alloy wheels',
          '275/45 R21 tires',
          'Antenna - roof-mounted "shark fin"',
          'Headlights - LED with auto-leveling',
          'Power panoramic moonroof',
          'Hands-free power rear liftgate',
          'Roof rails',
        ],
      },
      {
        category: 'Interior',
        items: [
          "8-way power adjustable driver's and passenger seats",
          '2-row seating, 5 passengers',
          'Heated and ventilated front seats',
          '3-zone automatic climate control',
          'Nappa leather seating surfaces (upper trims)',
          'Garage door opener with Homelink',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          '12-speaker premium audio sound system',
          '12.3" full-color center display',
          'Wireless Apple CarPlay / Android Auto integration',
          'Mazda Connected Services (Wi-Fi, remote services)',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'e-SKYACTIV G 3.3L Inline-6 Turbocharged engine',
          'M Hybrid Boost (48V Mild Hybrid)',
          'SKYACTIV-Drive 8-Speed AT with manual-shift mode',
          'i-ACTIV AWD All-Wheel Drive',
          'Mazda Intelligent Drive Select (Mi-Drive): Sport/Off-Road/Towing',
          'Towing capacity up to 5,000 lbs',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Frontal, knee, curtain, and side impact airbags',
          'Blind Spot Monitoring with Vehicle Exit Warning',
          'Rear Cross Traffic Alert',
          'Lane Departure Warning & Lane-keep Assist',
          'Mazda Radar Cruise Control with Stop & Go',
          'Front and rear parking sensors',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: 2-Row SUV, unibody with Ring Structure',
          'Passenger Capacity: 5',
          'Horsepower (SAE net, System): up to 340 HP (premium fuel)',
          'Wheelbase: 122.8 in',
          'Overall Length: 201.6 in',
          'Curb Weight: 4,700 lbs',
        ],
      },
    ],
  },

  'CX-90': {
    keyFeatures: [
      'i-ACTIV All-Wheel Drive',
      'M Hybrid Boost (48V Mild Hybrid)',
      'Mazda Radar Cruise Control with Stop & Go',
      'Blind Spot Monitoring with Vehicle Exit Warning',
      'Emergency Lane Keeping',
      'Power Panoramic Moonroof',
      'Bose 12-Speaker Audio',
      'Heated Front & 2nd-Row Seats',
      'Hands-Free Power Rear Liftgate',
      'Wireless Apple CarPlay / Android Auto',
      '8-Passenger Seating (3rd Row)',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '21 x 9.5J inch aluminum alloy wheels with Black Metallic Finish',
          '275/45 R21 tires',
          'Antenna - roof-mounted "shark fin"',
          'Headlights - LED with Auto-Leveling',
          'Power Panoramic Moonroof',
          'Hands-free Power Rear Liftgate with programmable height adjustment',
          'Roof Rails',
        ],
      },
      {
        category: 'Interior',
        items: [
          "8-way power adjustable driver's seat w/ power lumbar support",
          '2nd-row bench seats with 60/40 split fold-down reclining',
          '3rd Row Seats: 3 seats (60/40 split fold-down)',
          '8 Passenger seating capacity',
          'Heated front and 2nd-row seats',
          '3-zone automatic climate control',
          'Paddle shifters',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          'Bose 12-speaker audio sound system',
          '12.3" full-color center display',
          'Wireless Apple CarPlay / Android Auto integration',
          'Mazda Connected Services (Wi-Fi, Remote Services, Vehicle Status Alert)',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'e-SKYACTIV G 3.3L Inline 6 Turbocharged engine',
          'M Hybrid Boost (48V Mild Hybrid)',
          'SKYACTIV-Drive 8-Speed AT with manual-shift mode',
          'i-ACTIV AWD All-Wheel Drive',
          'Mazda Intelligent Drive Select (Mi-Drive): Sports/Off Road/Towing',
          'Towing Capacity up to 5,000 lbs',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Frontal, Knee, Curtain, and Side Impact Airbags',
          'Blind Spot Monitoring with Vehicle Exit Warning',
          'Rear Cross Traffic Alert',
          'Lane Departure Warning System & Lane-keep Assist',
          'Mazda Radar Cruise Control with Stop & Go with Speed Limit Assist',
          'Front and Rear Parking Sensors',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: 3-Row SUV, unibody with Ring Structure',
          'Passenger Capacity: 8',
          'Horsepower (SAE net, System): up to 340 HP (premium fuel)',
          'Torque: 332 lb-ft @ 2,000-3,500 rpm (regular fuel)',
          'Wheelbase: 122.8 in',
          'Overall Length: 201.6 in',
          'Curb Weight: 4,846 lbs',
        ],
      },
    ],
  },

  Mazda3: {
    keyFeatures: [
      'Mazda Radar Cruise Control (MRCC) with Stop & Go',
      'Blind Spot Monitoring',
      'Lane Departure Warning System',
      'Lane Keep Assist',
      'Bluetooth',
      'Mazda Advanced Keyless Entry',
      'Heated Front Seats',
      'Power-Sliding Glass Moonroof',
      'Apple CarPlay / Android Auto',
      'Rear Cross Traffic Alert',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '18 x 7J inch aluminum alloy wheels',
          'P215/45R18 all-season tires',
          'Headlights - LED with daytime running lights',
          'Power-sliding glass moonroof w/ sunshade',
          'Side mirrors - heated, power folding',
          'Rain-sensing wipers',
          'Dual exhaust outlets',
        ],
      },
      {
        category: 'Interior',
        items: [
          "8-way power adjustable driver's seat w/ power lumbar support",
          '60/40 split one-touch fold-down rear seatback',
          'Heated front seats',
          'Dual-zone automatic climate control',
          'Mazda advanced keyless entry & start system',
          'Leather-wrapped steering wheel, tilt & telescopic',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          '8-speaker audio system with Mazda Harmonic Acoustics',
          '8.8" full-color center display',
          'Apple CarPlay / Android Auto integration',
          'Bluetooth hands-free phone and audio capability',
          'MAZDA CONNECT Infotainment System',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'SKYACTIV-G 2.5 DOHC 16-valve 4-cylinder engine',
          'SKYACTIV-Drive 6-Speed AT with manual-shift mode and Sport mode',
          'MacPherson strut front suspension, torsion beam rear',
          'Hill Launch Assist and Auto Hold',
          'SKYACTIV-VEHICLE DYNAMICS: G-Vectoring Control Plus (GVC Plus)',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Advanced dual front air bags, side and curtain air bags',
          'Blind Spot Monitoring',
          'Lane Departure Warning System & Lane Keep Assist',
          'Mazda Radar Cruise Control (MRCC) with stop and go function',
          'Rear Cross Traffic Alert',
          'Rearview camera',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: Sedan',
          'Passenger Capacity: 5',
          'Horsepower (SAE net): 186 hp @ 6,000 rpm',
          'Torque: 186 lb-ft @ 4,000 rpm',
          'Wheelbase: 107.3 in',
          'Overall Length: 183.5 in',
          'Curb Weight: 3,111 lbs',
        ],
      },
    ],
  },

  'MX-5 Miata': {
    keyFeatures: [
      'SKYACTIV-G Naturally Aspirated Engine',
      '6-Speed Manual or Automatic Transmission',
      'Lightweight Front-Engine, Rear-Wheel Drive Layout',
      'Bilstein Performance Dampers (Club/GT trims)',
      'Blind Spot Monitoring',
      'Rear Cross Traffic Alert',
      'Heated Seats',
      'Apple CarPlay / Android Auto',
      'Advanced Keyless Entry',
      'LED Headlights',
    ],
    detailCategories: [
      {
        category: 'Exterior',
        items: [
          '17 x 7J inch aluminum alloy wheels',
          '205/45R17 summer tires',
          'LED headlights with auto on/off',
          'Power soft top with one-touch open/close',
          'Side mirrors - body-color, heated',
          'LED taillights',
        ],
      },
      {
        category: 'Interior',
        items: [
          '6-way manual adjustable sport seats',
          'Heated front seats',
          'Leather-wrapped steering wheel and shift knob',
          'Manual air conditioning',
          'Advanced keyless entry & push-button start',
          'Cloth or leather seating surfaces depending on trim',
        ],
      },
      {
        category: 'Entertainment',
        items: [
          '7" full-color center display',
          'Apple CarPlay / Android Auto integration',
          'Bluetooth hands-free phone and audio streaming',
          'Bose sound system with headrest speakers (GT trim)',
        ],
      },
      {
        category: 'Mechanical',
        items: [
          'SKYACTIV-G 2.0L DOHC 16-valve 4-cylinder engine',
          '6-Speed manual or 6-Speed SKYACTIV-Drive automatic transmission',
          'Front-engine, rear-wheel drive layout',
          'Front and rear stabilizer bars',
          'Bilstein performance dampers (Club and Grand Touring trims)',
          'Limited-slip differential (available)',
        ],
      },
      {
        category: 'Safety',
        items: [
          'Dual front and side air bags',
          'Blind Spot Monitoring',
          'Rear Cross Traffic Alert',
          'Smart Brake Support (SBS)',
          'Traction control and Dynamic Stability Control (DSC)',
          'Tire pressure monitoring system (TPMS)',
        ],
      },
      {
        category: 'Tech Specs',
        items: [
          'Body Style: Convertible',
          'Passenger Capacity: 2',
          'Horsepower (SAE net): 181 hp @ 7,000 rpm',
          'Torque: 151 lb-ft @ 4,000 rpm',
          'Wheelbase: 90.9 in',
          'Overall Length: 154.1 in',
          'Curb Weight: 2,341 lbs',
        ],
      },
    ],
  },
};

module.exports = MODEL_CONTENT;
