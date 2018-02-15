import Triangle from './humble_beginnings/shapes/triangle';
import Rectangle from './humble_beginnings/shapes/rectangle';
import Cube from './humble_beginnings/shapes/cube';
import Circle from './humble_beginnings/shapes/circle';
import Clam from './humble_beginnings/shapes/clam';
import Pearl from './humble_beginnings/shapes/pearl';
import Polygon from './humble_beginnings/shapes/polygon';
import SacredCircles from './humble_beginnings/shapes/sacredCircles';
import OffsetStar from './humble_beginnings/shapes/offsetStar';

import Collide0scope from './humble_beginnings/art/collide0scope';
import Gyr0scope from './humble_beginnings/art/gyr0scope';
import Blanket from './humble_beginnings/art/blanket';
import ConcentricPolygons from './humble_beginnings/art/concentricPolygons';
import ConcentricPolygons2 from './humble_beginnings/art/concentricPolygons2';
import Pinwheel from './humble_beginnings/art/pinwheel';
import BounceRipple from './humble_beginnings/art/bounceRipple';
import SloshRipple from './humble_beginnings/art/sloshRipple';
import WrigglingDonut from './humble_beginnings/art/wrigglingDonut';
import Apollo from './humble_beginnings/art/apollo';

import SineWave from './humble_beginnings/physics/sineWave';

const ANIMATION_MAP = {
  'triangle': Triangle,
  'rectangle': Rectangle,
  'cube': Cube,
  'circle': Circle,
  'clam': Clam,
  'pearl': Pearl,
  'polystarter': Polygon,
  'sacred circles': SacredCircles,
  'star': OffsetStar,
  'collide': Collide0scope,
  'gyro': Gyr0scope,
  'blanket': Blanket,
  'concentric polygons': ConcentricPolygons,
  'concentric polygons 2': ConcentricPolygons2,
  'pinwheel': Pinwheel,
  'bounce ripple': BounceRipple,
  'slosh ripple': SloshRipple,
  'wriggling donut': WrigglingDonut,
  'apollo': Apollo,
  'sine wave': SineWave
};

export function generateAnimation (scene, animation) {

  if (ANIMATION_MAP[animation.name]) {
    return new ANIMATION_MAP[animation.name](scene, animation);
  }

}
