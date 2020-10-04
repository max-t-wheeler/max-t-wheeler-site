// art
import Blanket from './art/blanket';
import BounceRipple from './art/bounceRipple';
import Chrysanthedad from './art/chrysanthedad';
import Chrysanthemum from './art/chrysanthemum';
import Chrysanthemum2 from './art/chrysanthemum2';
import Chrysanthemum3 from './art/chrysanthemum3';
import Chrysanthemum4 from './art/chrysanthemum4';
import Chrysanthemum5 from './art/chrysanthemum5';
import Chrysanthemum6 from './art/chrysanthemum6';
import Chrysanthemum7 from './art/chrysanthemum7';
import Chrysanthemum8 from './art/chrysanthemum8';
import Chrysanthemum9 from './art/chrysanthemum9';
import Clam from './art/clam';
import Collide0scope from './art/collide0scope';
import ConcentricPolygons from './art/concentricPolygons';
import ConcentricPolygons2 from './art/concentricPolygons2';
import Fauxlidoscope from './art/fauxlidoscope';
import Flowers from './art/flowers';
import Gyr0scope from './art/gyr0scope';
import Pearl from './art/pearl';
import Pinwheel from './art/pinwheel';
import Snowflake from './art/snowflake';
import SloshRipple from './art/sloshRipple';
import StarryNight from './art/starryNight';
import WrigglingDonut from './art/wrigglingDonut';

// math
import Mosaic from './math/mosaic';
import Mosaic2 from './math/mosaic2';
import OffsetStar from './math/offsetStar';
import SacredCircles from './math/sacredCircles';
import Unoriginal from './math/unoriginal';

// physics
import SineWave from './physics/sineWave';

// shapes
import Circle from './shapes/circle';
import Cube from './shapes/cube';
import Polygon from './shapes/polygon';
import Rectangle from './shapes/rectangle';
import Triangle from './shapes/triangle';

// simulations
import Amparo from './simulations/amparo';
import Andorinha from './simulations/andorinha';
import Antigua from './simulations/antigua';
import Batidinha from './simulations/batidinha';
import Bicardi from './simulations/bicardi';
import Blouse from './simulations/blouse';
import Brazil from './simulations/brazil';
import Choro from './simulations/choro';
import Dialogo from './simulations/dialogo';
import Flower from './simulations/flower';
import Games from './simulations/games';
import Lamento from './simulations/lamento';
import Look from './simulations/look';
import Mojave from './simulations/mojave';
import Sabia from './simulations/sabia';
import Tereza from './simulations/tereza';
import Triste from './simulations/triste';
import Wave from './simulations/wave';

const ANIMATION_MAP = {
  // art
  blanket: Blanket,
  'bounce ripple': BounceRipple,
  chrysanthedad: Chrysanthedad,
  chrysanthemum: Chrysanthemum,
  chrysanthemum2: Chrysanthemum2,
  chrysanthemum3: Chrysanthemum3,
  chrysanthemum4: Chrysanthemum4,
  chrysanthemum5: Chrysanthemum5,
  chrysanthemum6: Chrysanthemum6,
  chrysanthemum7: Chrysanthemum7,
  chrysanthemum8: Chrysanthemum8,
  chrysanthemum9: Chrysanthemum9,
  collide: Collide0scope,
  'concentric polygons': ConcentricPolygons,
  'concentric polygons 2': ConcentricPolygons2,
  fauxlidoscope: Fauxlidoscope,
  flowers: Flowers,
  gyro: Gyr0scope,
  pinwheel: Pinwheel,
  snowflake: Snowflake,
  'slosh ripple': SloshRipple,
  'starry night': StarryNight,
  'wriggling donut': WrigglingDonut,
  // math
  mosaic: Mosaic,
  mosaic2: Mosaic2,
  'sacred circles': SacredCircles,
  star: OffsetStar,
  unoriginal: Unoriginal,
  // physics
  'sine wave': SineWave,
  // shapes
  circle: Circle,
  clam: Clam,
  cube: Cube,
  pearl: Pearl,
  polystarter: Polygon,
  rectangle: Rectangle,
  triangle: Triangle,
  // simulations
  amparo: Amparo,
  andorinha: Andorinha,
  antigua: Antigua,
  batidinha: Batidinha,
  bicardi: Bicardi,
  blouse: Blouse,
  brazil: Brazil,
  choro: Choro,
  dialogo: Dialogo,
  flower: Flower,
  games: Games,
  lamento: Lamento,
  look: Look,
  mojave: Mojave,
  sabia: Sabia,
  tereza: Tereza,
  triste: Triste,
  wave: Wave
};

export function generateAnimation (scene, camera, animation) {

  if (ANIMATION_MAP[animation.name]) {
    return new ANIMATION_MAP[animation.name](scene, camera, animation);
  }

}
