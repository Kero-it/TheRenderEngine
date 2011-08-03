// Load all required engine components
R.Engine.define({
   "class": "ExplosionParticle",
   "requires": [
      "R.particles.AbstractParticle",
      "R.math.Math2D"
   ]
});

/**
 * @class An explosion particle
 *
 * @param pos {R.math.Point2D} The starting position of the particle.  A
 *            velocity vector will be derived from this position.
 */
var ExplosionParticle = function() {
   return R.particles.AbstractParticle.extend(/** @scope SimpleParticle.prototype */{

      vec: null,
      decel: 0,
      invVel: null,

      constructor: function(pos, ttl, decel) {
         this.base(ttl || 2000);
         this.setPosition(pos.x, pos.y);

         var a = Math.floor(R.lang.Math2.random() * 360);
         this.vec = R.math.Math2D.getDirectionVector(R.math.Vector2D.ZERO, R.math.Vector2D.UP, a);
         var vel = 1 + (R.lang.Math2.random() * 10);
         this.vec.mul(vel);
         this.decel = decel;
         this.invVel = R.math.Vector2D.create(0, 0);
      },

      destroy: function() {
         this.vec.destroy();
         this.invVel.destroy();
         this.base();
      },

      release: function() {
         this.base();
         this.vec = null;
         this.invVel = null;
         this.decel = 0;
      },

      /**
       * Called by the particle engine to draw the particle to the rendering
       * context.
       *
       * @param renderContext {RenderContext} The rendering context
       * @param time {Number} The engine time in milliseconds
       */
      draw: function(renderContext, time) {
         if (this.decel > 0 && this.vec.len() > 0) {
            this.invVel.set(this.vec).neg();
            this.invVel.mul(this.decel);
            this.vec.add(this.invVel);
         }

         this.getPosition().add(this.vec);

         var colr = "#fff";
         var s = time - this.getBirth();
         var e = this.getTTL() - this.getBirth();
         colr = 255 - Math.floor(255 * (s / e));
         colr += (-10 + (Math.floor(R.lang.Math2.random() * 20)));
         var fb = (R.lang.Math2.random() * 100);
         if (fb > 90) {
            colr = 255;
         }

         colr = "#" + (colr.toString(16) + colr.toString(16) + colr.toString(16));

         renderContext.setFillStyle(colr);
         renderContext.drawPoint(this.getPosition());
      }

   }, {
      getClassName: function() {
         return "ExplosionParticle";
      }
   });
};


// Load all required engine components
R.Engine.define({
   "class": "FuseParticle",
   "requires": [
      "R.particles.AbstractParticle",
      "R.math.Math2D"
   ]
});

/**
 * @class A fuse particle
 *
 * @param pos {R.math.Point2D} The starting position of the particle.  A
 *            velocity vector will be derived from this position.
 */
var FuseParticle = function() {
   return R.particles.AbstractParticle.extend(/** @scope SimpleParticle.prototype */{

      vec: null,

      constructor: function(pos, ttl) {
         this.base(ttl || 500);
         this.setPosition(pos);

         var a = Math.floor(R.lang.Math2.random() * 360);
         this.vec = R.math.Math2D.getDirectionVector(R.math.Vector2D.ZERO, R.math.Vector2D.UP, a);
         var vel = 0.3 + R.lang.Math2.random();
         this.vec.mul(vel);
      },

      /**
       * Called by the particle engine to draw the particle to the rendering
       * context.
       *
       * @param renderContext {RenderContext} The rendering context
       * @param time {Number} The engine time in milliseconds
       * @param dt {Number} The delta between the world time and the last time the world was updated
       *          in milliseconds.
       */
      draw: function(renderContext, time, dt) {
         this.getPosition().add(this.vec);

         var colr,rgba;
         var s = time - this.getBirth();
         var e = this.getTTL() - this.getBirth();
         colr = 255 - Math.floor(40 * (s / e));
         colr += (-10 + (Math.floor(R.lang.Math2.random() * 20)));

         rgba = "rgb(" + colr + "," + colr + ",0)";

         renderContext.setFillStyle(rgba);
         renderContext.drawPoint(this.getPosition());
      }

   }, {
      getClassName: function() {
         return "FuseParticle";
      }
   });
};