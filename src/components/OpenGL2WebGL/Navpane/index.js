// art
import Blanket from './humble_beginnings/art/blanket';
import BounceRipple from './humble_beginnings/art/bounceRipple';
import Chrysanthedad from './humble_beginnings/art/chrysanthedad';
import Chrysanthemum from './humble_beginnings/art/chrysanthemum';
import Chrysanthemum2 from './humble_beginnings/art/chrysanthemum2';
import Chrysanthemum3 from './humble_beginnings/art/chrysanthemum3';
import Chrysanthemum4 from './humble_beginnings/art/chrysanthemum4';
import Chrysanthemum5 from './humble_beginnings/art/chrysanthemum5';
import Chrysanthemum6 from './humble_beginnings/art/chrysanthemum6';
import Chrysanthemum7 from './humble_beginnings/art/chrysanthemum7';
import Chrysanthemum8 from './humble_beginnings/art/chrysanthemum8';
import Chrysanthemum9 from './humble_beginnings/art/chrysanthemum9';
import Clam from './humble_beginnings/art/clam';
import Collide0scope from './humble_beginnings/art/collide0scope';
import ConcentricPolygons from './humble_beginnings/art/concentricPolygons';
import ConcentricPolygons2 from './humble_beginnings/art/concentricPolygons2';
import Fauxlidoscope from './humble_beginnings/art/fauxlidoscope';
import Flowers from './humble_beginnings/art/flowers';
import Gyr0scope from './humble_beginnings/art/gyr0scope';
import Pearl from './humble_beginnings/art/pearl';
import Pinwheel from './humble_beginnings/art/pinwheel';
import Snowflake from './humble_beginnings/art/snowflake';
import SloshRipple from './humble_beginnings/art/sloshRipple';
import StarryNight from './humble_beginnings/art/starryNight';
import WrigglingDonut from './humble_beginnings/art/wrigglingDonut';

// math
import Mosaic from './humble_beginnings/math/mosaic';
import Mosaic2 from './humble_beginnings/math/mosaic2';
import SacredCircles from './humble_beginnings/math/sacredCircles';
import OffsetStar from './humble_beginnings/math/offsetStar';
import Unoriginal from './humble_beginnings/math/unoriginal';

// physics
import SineWave from './humble_beginnings/physics/sineWave';

// shapes
import Circle from './humble_beginnings/shapes/circle';
import Cube from './humble_beginnings/shapes/cube';
import Polygon from './humble_beginnings/shapes/polygon';
import Rectangle from './humble_beginnings/shapes/rectangle';
import Triangle from './humble_beginnings/shapes/triangle';

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
  'blanket': Blanket,
  'bounce ripple': BounceRipple,
  'chrysanthedad': Chrysanthedad,
  'chrysanthemum': Chrysanthemum,
  'chrysanthemum2': Chrysanthemum2,
  'chrysanthemum3': Chrysanthemum3,
  'chrysanthemum4': Chrysanthemum4,
  'chrysanthemum5': Chrysanthemum5,
  'chrysanthemum6': Chrysanthemum6,
  'chrysanthemum7': Chrysanthemum7,
  'chrysanthemum8': Chrysanthemum8,
  'chrysanthemum9': Chrysanthemum9,
  'collide': Collide0scope,
  'concentric polygons': ConcentricPolygons,
  'concentric polygons 2': ConcentricPolygons2,
  'fauxlidoscope': Fauxlidoscope,
  'flowers': Flowers,
  'gyro': Gyr0scope,
  'pinwheel': Pinwheel,
  'snowflake': Snowflake,
  'slosh ripple': SloshRipple,
  'starry night': StarryNight,
  'wriggling donut': WrigglingDonut,
  // math
  'mosaic': Mosaic,
  'mosaic2': Mosaic2,
  'sacred circles': SacredCircles,
  'star': OffsetStar,
  'unoriginal': Unoriginal,
  // physics
  'sine wave': SineWave,
  // shapes
  'circle': Circle,
  'clam': Clam,
  'cube': Cube,
  'pearl': Pearl,
  'polystarter': Polygon,
  'rectangle': Rectangle,
  'triangle': Triangle,
  // simulations
  'amparo': Amparo,
  'andorinha': Andorinha,
  'antigua': Antigua,
  'batidinha': Batidinha,
  'bicardi': Bicardi,
  'blouse': Blouse,
  'brazil': Brazil,
  'choro': Choro,
  'dialogo': Dialogo,
  'flower': Flower,
  'games': Games,
  'lamento': Lamento,
  'look': Look,
  'mojave': Mojave,
  'sabia': Sabia,
  'tereza': Tereza,
  'triste': Triste,
  'wave': Wave
};

export function generateAnimation (scene, camera, animation) {

  if (ANIMATION_MAP[animation.name]) {
    return new ANIMATION_MAP[animation.name](scene, camera, animation);
  }

}
