/* Static map so Metro can bundle every destination photo. */
const sources = {
  '/images/borobudur.jpg': require('../../assets/images/borobudur.jpg'),
  '/images/bromo.jpg': require('../../assets/images/bromo.jpg'),
  '/images/bunaken.jpg': require('../../assets/images/bunaken.jpg'),
  '/images/derawan.jpg': require('../../assets/images/derawan.jpg'),
  '/images/diamond-beach.jpg': require('../../assets/images/diamond-beach.jpg'),
  '/images/ijen-hero.jpg': require('../../assets/images/ijen-hero.jpg'),
  '/images/ijen-lake.jpg': require('../../assets/images/ijen-lake.jpg'),
  '/images/ijen-miner.jpg': require('../../assets/images/ijen-miner.jpg'),
  '/images/ijen.jpg': require('../../assets/images/ijen.jpg'),
  '/images/komodo.jpg': require('../../assets/images/komodo.jpg'),
  '/images/nusa-penida.jpg': require('../../assets/images/nusa-penida.jpg'),
  '/images/pink-beach.jpg': require('../../assets/images/pink-beach.jpg'),
  '/images/raja-ampat.jpg': require('../../assets/images/raja-ampat.jpg'),
  '/images/tanah-lot.jpg': require('../../assets/images/tanah-lot.jpg'),
  '/images/Air_Asia.png': require('../../assets/images/Air_Asia.png'),
  '/images/Garuda_Indonesia.png': require('../../assets/images/Garuda_Indonesia.png'),
  '/images/Lion_Air.png': require('../../assets/images/Lion_Air.png'),
  '/images/Super_Air_Jet.png': require('../../assets/images/Super_Air_Jet.png'),
  '/onboarding.jpeg': require('../../assets/onboarding.jpeg'),
  '/Wanderly.png': require('../../assets/Wanderly.png'),
}

/* Accepts a bundled data path, a data URI or a remote URL. */
export function imageSource(path) {
  if (!path) return null
  if (sources[path]) return sources[path]
  if (typeof path === 'string') return { uri: path }
  return path
}

export const brandLogo = sources['/Wanderly.png']
export const onboardingImage = sources['/onboarding.jpeg']
