// art
import Blanket from './humble_beginnings/art/blanket';
import Clam from './humble_beginnings/art/clam';
import BounceRipple from './humble_beginnings/art/bounceRipple';
import Collide0scope from './humble_beginnings/art/collide0scope';
import ConcentricPolygons from './humble_beginnings/art/concentricPolygons';
import ConcentricPolygons2 from './humble_beginnings/art/concentricPolygons2';
import Gyr0scope from './humble_beginnings/art/gyr0scope';
import Pearl from './humble_beginnings/art/pearl';
import Pinwheel from './humble_beginnings/art/pinwheel';
import SloshRipple from './humble_beginnings/art/sloshRipple';
import WrigglingDonut from './humble_beginnings/art/wrigglingDonut';

// math
import Apollo from './humble_beginnings/math/apollo';
import Apollo2 from './humble_beginnings/math/apollo2';
import Apollo3 from './humble_beginnings/math/apollo3';
import Apollo4 from './humble_beginnings/math/apollo4';
import Apollo5 from './humble_beginnings/math/apollo5';
import Apollo6 from './humble_beginnings/math/apollo6';
import Apollo7 from './humble_beginnings/math/apollo7';
import Mosaic from './humble_beginnings/math/mosaic';
import SacredCircles from './humble_beginnings/math/sacredCircles';
import OffsetStar from './humble_beginnings/math/offsetStar';

// physics
import SineWave from './humble_beginnings/physics/sineWave';

// shapes
import Circle from './humble_beginnings/shapes/circle';
import Cube from './humble_beginnings/shapes/cube';
import Polygon from './humble_beginnings/shapes/polygon';
import Rectangle from './humble_beginnings/shapes/rectangle';
import Triangle from './humble_beginnings/shapes/triangle';

const ANIMATION_MAP = {
  // art
  'blanket': Blanket,
  'bounce ripple': BounceRipple,
  'collide': Collide0scope,
  'concentric polygons': ConcentricPolygons,
  'concentric polygons 2': ConcentricPolygons2,
  'gyro': Gyr0scope,
  'pinwheel': Pinwheel,
  'slosh ripple': SloshRipple,
  'wriggling donut': WrigglingDonut,
  // math
  'apollo': Apollo,
  'apollo2': Apollo2,
  'apollo3': Apollo3,
  'apollo4': Apollo4,
  'apollo5': Apollo5,
  'apollo6': Apollo6,
  'apollo7': Apollo7,
  'mosaic': Mosaic,
  'sacred circles': SacredCircles,
  'star': OffsetStar,
  // shapes
  'circle': Circle,
  'clam': Clam,
  'cube': Cube,
  'pearl': Pearl,
  'polystarter': Polygon,
  'rectangle': Rectangle,
  'sine wave': SineWave,
  'triangle': Triangle
};

export function generateAnimation (scene, animation) {

  if (ANIMATION_MAP[animation.name]) {
    return new ANIMATION_MAP[animation.name](scene, animation);
  }

}
