/**
 * EDIT THIS FILE to match your actual mini-decks.
 * Each video represents a Reveal.js HTML deck, not a real video.
 * The optional 'thumbnail' is a local file path; it falls back to a designed card if missing.
 * To use your existing deck, copy its folder into /decks and change 'deck' below.
 */
window.SEMINAR_VIDEOS = [
  {
    id: 'resting-membrane-potential',
    title: 'Why Is the Inside Negative? | Resting Membrane Potential',
    short: 'Resting Potential', category: 'Membrane Potentials',
    deck: 'decks/resting-membrane-potential/index.html',
    thumbnail: 'thumbnails/resting-membrane-potential.webp',
    symbol: '−70', unit: 'mV', accent: '#e98d42', duration: '04:12', views: '18.2K',
    description: 'Permeability, concentration gradients, and why the inside of a resting cell is negative.',
    tags: ['RMP', 'electrical gradients', 'physiology']
  },
  {
    id: 'sodium',
    title: 'Sodium (Na⁺): The Ion Behind Depolarization',
    short: 'Sodium', category: 'Electrolytes',
    deck: 'decks/sodium/index.html', thumbnail: 'thumbnails/sodium.webp',
    symbol: 'Na⁺', unit: 'SODIUM', accent: '#f5a946', duration: '03:48', views: '25.4K',
    description: 'Sodium concentration gradients, voltage-gated channels, and the upstroke of an action potential.',
    tags: ['Na+', 'depolarization', 'channels']
  },
  {
    id: 'potassium',
    title: 'Potassium (K⁺): The Ion That Brings You Back',
    short: 'Potassium', category: 'Electrolytes',
    deck: 'decks/potassium/index.html', thumbnail: 'thumbnails/potassium.webp',
    symbol: 'K⁺', unit: 'POTASSIUM', accent: '#c989fc', duration: '03:36', views: '22.6K',
    description: 'Potassium leak channels, repolarization, and resting membrane potential.',
    tags: ['K+', 'repolarization', 'leak channels']
  },
  {
    id: 'action-potential',
    title: 'Action Potential: From Threshold to Recovery',
    short: 'Action Potential', category: 'Membrane Potentials',
    deck: 'decks/action-potential/index.html', thumbnail: 'thumbnails/action-potential.webp',
    symbol: 'AP', unit: 'ACTION POTENTIAL', accent: '#4fd2d4', duration: '05:21', views: '36.9K',
    description: 'Threshold, depolarization, repolarization, afterhyperpolarization, and return to rest.',
    tags: ['threshold', 'spike', 'nerve impulse']
  },
  {
    id: 'sodium-potassium-pump',
    title: 'Na⁺/K⁺ Pump: 3 Out, 2 In, ATP Down',
    short: 'Na⁺/K⁺ ATPase', category: 'Transport & Pumps',
    deck: 'decks/sodium-potassium-pump/index.html', thumbnail: 'thumbnails/sodium-potassium-pump.webp',
    symbol: '3:2', unit: 'ATPase', accent: '#73cb8a', duration: '04:09', views: '29.1K',
    description: 'The electrogenic ATP-powered transport system that helps maintain sodium and potassium gradients.',
    tags: ['pump', 'ATP', 'active transport']
  },
  {
    id: 'calcium',
    title: 'Calcium (Ca²⁺): The Signal for Muscle Contraction',
    short: 'Calcium', category: 'Electrolytes',
    deck: 'decks/calcium/index.html', thumbnail: 'thumbnails/calcium.webp',
    symbol: 'Ca²⁺', unit: 'CALCIUM', accent: '#ff808b', duration: '04:44', views: '32.8K',
    description: 'Calcium as a signaling ion, including its role in activating the contractile apparatus.',
    tags: ['Ca2+', 'troponin', 'muscle']
  },
  {
    id: 'chloride',
    title: 'Chloride (Cl⁻): The Quiet Stabilizer',
    short: 'Chloride', category: 'Electrolytes',
    deck: 'decks/chloride/index.html', thumbnail: 'thumbnails/chloride.webp',
    symbol: 'Cl⁻', unit: 'CHLORIDE', accent: '#76b4ff', duration: '03:19', views: '13.8K',
    description: 'Chloride equilibrium potential and how chloride channels can influence excitability.',
    tags: ['Cl-', 'equilibrium', 'conductance']
  },
  {
    id: 'all-or-none',
    title: 'All-or-None Law: No Half Action Potentials',
    short: 'All-or-None Law', category: 'Membrane Potentials',
    deck: 'decks/all-or-none/index.html', thumbnail: 'thumbnails/all-or-none.webp',
    symbol: '0/1', unit: 'THRESHOLD', accent: '#f0ca67', duration: '02:57', views: '20.3K',
    description: 'Why a triggered action potential has a stereotyped amplitude in a given excitable cell.',
    tags: ['all-or-none', 'threshold', 'excitability']
  },
  {
    id: 'refractory-period',
    title: 'Refractory Periods: Why a Neuron Needs a Break',
    short: 'Refractory Periods', category: 'Membrane Potentials',
    deck: 'decks/refractory-period/index.html', thumbnail: 'thumbnails/refractory-period.webp',
    symbol: '⏳', unit: 'RECOVERY', accent: '#d6a6e3', duration: '03:43', views: '15.7K',
    description: 'Absolute versus relative refractory periods, and why repeated spikes have limits.',
    tags: ['absolute', 'relative', 'inactivation']
  },
  {
    id: 'depolarization-repolarization',
    title: 'Depolarization vs Repolarization: The Great Ion Swap',
    short: 'De- / Repolarization', category: 'Membrane Potentials',
    deck: 'decks/depolarization-repolarization/index.html', thumbnail: 'thumbnails/depolarization-repolarization.webp',
    symbol: '↗↘', unit: 'VOLTAGE', accent: '#7fa7fd', duration: '04:06', views: '24.0K',
    description: 'What membrane voltage means when it rises, falls, and overshoots the resting potential.',
    tags: ['voltage', 'Na+', 'K+']
  },
  {
    id: 'gibbs-donnan',
    title: 'Gibbs–Donnan: The Anions That Cannot Leave',
    short: 'Gibbs–Donnan', category: 'Transport & Pumps',
    deck: 'decks/gibbs-donnan/index.html', thumbnail: 'thumbnails/gibbs-donnan.webp',
    symbol: 'A⁻', unit: 'IMPERMEANT IONS', accent: '#ef9b6e', duration: '03:26', views: '11.1K',
    description: 'Impermeant intracellular anions and their effects on ion distribution across membranes.',
    tags: ['impermeant anions', 'membranes', 'ions']
  },
  {
    id: 'muscle-contraction',
    title: 'Excitation–Contraction Coupling: Calcium Does the Work',
    short: 'Muscle Contraction', category: 'Muscle',
    deck: 'decks/muscle-contraction/index.html', thumbnail: 'thumbnails/muscle-contraction.webp',
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
