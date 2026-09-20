export const fontPairings = [
  { id: 'inter', name: 'Inter', heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
  { id: 'playfair-source', name: 'Playfair + Source Sans', heading: "'Playfair Display', serif", body: "'Source Sans 3', sans-serif" },
  { id: 'merriweather-lato', name: 'Merriweather + Lato', heading: "'Merriweather', serif", body: "'Lato', sans-serif" },
  { id: 'poppins', name: 'Poppins', heading: "'Poppins', sans-serif", body: "'Poppins', sans-serif" },
  { id: 'robotoslab-roboto', name: 'Roboto Slab + Roboto', heading: "'Roboto Slab', serif", body: "'Roboto', sans-serif" },
  { id: 'montserrat-lora', name: 'Montserrat + Lora', heading: "'Montserrat', sans-serif", body: "'Lora', serif" },
];

export function getFontPairing(id) {
  return fontPairings.find((f) => f.id === id) || fontPairings[0];
}
