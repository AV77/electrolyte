/**
 * EDIT THIS FILE to match your actual mini-decks.
 * Each video represents a Reveal.js HTML deck, not a real video.
 * The optional 'thumbnail' is a local file path; it falls back to a designed card if missing.
 * To use your existing deck, copy its folder into /decks and change 'deck' below.
 */
window.SEMINAR_VIDEOS = [
  {
    id: '00_intro',
    title: 'The body runs on electrolytes',
    short: 'Intro', category: 'Membrane Potentials',
    deck: 'decks/00_intro/index.html',
    thumbnail: 'thumbnails/00_intro.jpg',
    symbol: '-70', unit: 'mV', accent: '#e98d42', duration: '04:12', views: '18.2K',
    description: 'Permeability, concentration gradients, and why the inside of a resting cell is negative.',
    tags: ['RMP', 'electrical gradients', 'physiology']
  },
  {
    id: '01_electrical_life',
    title: 'Electrical life',
    short: 'Action Potential', category: 'Electrolytes',
    deck: 'decks/01_electrical_life/index.html', thumbnail: 'thumbnails/01_electrical_life.jpg',
    symbol: 'Na⁺', unit: 'SODIUM', accent: '#f5a946', duration: '03:48', views: '25.4K',
    description: 'Action Potential.',
    tags: ['Na+', 'depolarization', 'channels']
  },
  {
    id: '02_voltage_duo',
    title: 'The voltage duo',
    short: 'Sodium Potassium', category: 'Electrolytes',
    deck: 'decks/02_voltage_duo/index.html', thumbnail: 'thumbnails/02_voltage_duo.jpg',
    symbol: 'K⁺', unit: 'POTASSIUM', accent: '#c989fc', duration: '03:36', views: '22.6K',
    description: 'Sodium Potassium.',
    tags: ['K+', 'repolarization', 'leak channels']
  },
  {
    id: '03_muscle_factor',
    title: 'The muscle factor',
    short: 'Calcium', category: 'Membrane Potentials',
    deck: 'decks/03_muscle_factor/index.html', thumbnail: 'thumbnails/03_muscle_factor.jpg',
    symbol: 'AP', unit: 'ACTION POTENTIAL', accent: '#4fd2d4', duration: '05:21', views: '36.9K',
    description: 'Calcium.',
    tags: ['threshold', 'spike', 'nerve impulse']
  },
  {
    id: '04_quiet_regulator',
    title: 'The quiet regulator',
    short: 'Chloride', category: 'Transport & Pumps',
    deck: 'decks/04_quiet_regulator/index.html', thumbnail: 'thumbnails/04_quiet_regulator.jpg',
    symbol: '3:2', unit: 'ATPase', accent: '#73cb8a', duration: '04:09', views: '29.1K',
    description: 'Chloride.',
    tags: ['pump', 'ATP', 'active transport']
  },
  {
    id: '05_heart',
    title: 'The heart',
    short: 'Electrical activity in cardiac cells', category: 'Electrolytes',
    deck: 'decks/05_heart/index.html', thumbnail: 'thumbnails/05_heart.jpg',
    symbol: 'Ca²⁺', unit: 'CALCIUM', accent: '#ff808b', duration: '04:44', views: '32.8K',
    description: 'Electrical activity in cardiac cells.',
    tags: ['Ca2+', 'troponin', 'muscle']
  },
  {
    id: '06_clinical',
    title: 'When balance breaks',
    short: 'Clinical', category: 'Electrolytes',
    deck: 'decks/06_clinical/index.html', thumbnail: 'thumbnails/06_clinical.jpg',
    symbol: 'Cl⁻', unit: 'CHLORIDE', accent: '#76b4ff', duration: '03:19', views: '13.8K',
    description: 'The clinical significance.',
    tags: ['Cl-', 'equilibrium', 'conductance']
  },
  {
    id: 'all-or-none',
    title: 'All-or-None Law: No Half Action Potentials',
    short: 'All-or-None Law', category: 'Membrane Potentials',
    deck: 'decks/all-or-none/index.html', thumbnail: 'thumbnails/07.jpg',
    symbol: '0/1', unit: 'THRESHOLD', accent: '#f0ca67', duration: '02:57', views: '20.3K',
    description: 'Why a triggered action potential has a stereotyped amplitude in a given excitable cell.',
    tags: ['all-or-none', 'threshold', 'excitability']
  },
  {
    id: 'refractory-period',
    title: 'Refractory Periods: Why a Neuron Needs a Break',
    short: 'Refractory Periods', category: 'Membrane Potentials',
    deck: 'decks/refractory-period/index.html', thumbnail: 'thumbnails/08.jpg',
    symbol: '⏳', unit: 'RECOVERY', accent: '#d6a6e3', duration: '03:43', views: '15.7K',
    description: 'Absolute versus relative refractory periods, and why repeated spikes have limits.',
    tags: ['absolute', 'relative', 'inactivation']
  },
  {
    id: 'depolarization-repolarization',
    title: 'Depolarization vs Repolarization: The Great Ion Swap',
    short: 'De- / Repolarization', category: 'Membrane Potentials',
    deck: 'decks/depolarization-repolarization/index.html', thumbnail: 'thumbnails/depolarization-repolarization.jpg',
    symbol: '↗↘', unit: 'VOLTAGE', accent: '#7fa7fd', duration: '04:06', views: '24.0K',
    description: 'What membrane voltage means when it rises, falls, and overshoots the resting potential.',
    tags: ['voltage', 'Na+', 'K+']
  },
  {
    id: 'gibbs-donnan',
    title: 'Gibbs–Donnan: The Anions That Cannot Leave',
    short: 'Gibbs–Donnan', category: 'Transport & Pumps',
    deck: 'decks/gibbs-donnan/index.html', thumbnail: 'thumbnails/gibbs-donnan.jpg',
    symbol: 'A⁻', unit: 'IMPERMEANT IONS', accent: '#ef9b6e', duration: '03:26', views: '11.1K',
    description: 'Impermeant intracellular anions and their effects on ion distribution across membranes.',
    tags: ['impermeant anions', 'membranes', 'ions']
  },
  {
    id: 'muscle-contraction',
    title: 'Excitation–Contraction Coupling: Calcium Does the Work',
    short: 'Muscle Contraction', category: 'Muscle',
    deck: 'decks/muscle-contraction/index.html', thumbnail: 'thumbnails/muscle-contraction.jpg',
    symbol: '💪', unit: 'CONTRACTION', accent: '#f1a05a', duration: '04:37', views: '19.5K',
    description: 'From sarcoplasmic reticulum Ca²⁺ release to troponin binding and cross-bridge cycling.',
    tags: ['SR', 'troponin', 'actin-myosin']
  }
];

// Optional display metadata. Set `slides` to the actual slide count after adding your decks.
// Your own thumbnails automatically take priority over the bundled SVG previews.
window.SEMINAR_VIDEOS.forEach((video, index) => {
  video.slides ??= 3;
  video.postedDays ??= index === 0 ? 0 : index;
  video.popularity ??= 100 - index;
  video.featured ??= index < 8;
  video.thumbnailFallback ??= `thumbnails/fallback/${video.id}.svg`;
});
