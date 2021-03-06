var radar = document.getElementById( 'radar' ),
diameter = 660,
radius = diameter / 2,
padding = 14,
ctx = Sketch.create({
  container: radar,
  fullscreen: false,
  width: diameter,
  height: diameter
}),
dToR = function( degrees ){
  return degrees * (Math.PI / 180);
},
sweepAngle = 270,
sweepSize = 2,
sweepSpeed = 1.2,
rings = 5,
hueStart = 120,
hueEnd = 170,
hueDiff = Math.abs( hueEnd - hueStart ),
saturation = 50,
lightness = 40,
lineWidth = 2,
gradient = ctx.createLinearGradient( radius, 0, 0, 0 );


radar.style.marginLeft = radar.style.marginTop = ( -diameter / 2 ) - padding + 'px';
gradient.addColorStop( 0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )' );
gradient.addColorStop( 1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )' );

var renderRings = function(){
  var i;
  for( i = 0; i < rings; i++ ){
    ctx.beginPath();
    ctx.arc( radius, radius, ( ( radius - ( lineWidth / 2) ) / rings) * ( i + 1 ), 0, TWO_PI, false );
    ctx.strokeStyle = 'hsla(' + ( hueEnd - ( i * ( hueDiff / rings ) ) ) + ', ' + saturation + '%, ' + lightness + '%, 0.1)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };
};

var renderGrid = function(){
  ctx.beginPath();
  ctx.moveTo( radius - lineWidth / 2, lineWidth );
  ctx.lineTo( radius - lineWidth / 2, diameter - lineWidth );
  ctx.moveTo( lineWidth, radius - lineWidth / 2 );
  ctx.lineTo( diameter - lineWidth, radius - lineWidth / 2 );
  ctx.strokeStyle = 'hsla( ' + ( ( hueStart + hueEnd ) / 2) + ', ' + saturation + '%, ' + lightness + '%, .03 )';
  ctx.stroke();
};


var renderScanLines = function(){
  var i;
  var j;
  ctx.beginPath();
  for( i = 0; i < diameter; i += 2 ){
    ctx.moveTo( 0, i + .5 );
    ctx.lineTo( diameter, i + .5);
  };
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'hsla( 0, 0%, 0%, .02 )';
  ctx.globalCompositeOperation = 'source-over';
  ctx.stroke();
};

ctx.clear = function(){
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla( 0, 0%, 0%, 0.1 )';
  ctx.fillRect( 0, 0, diameter, diameter );
};

ctx.update = function(){
  sweepAngle += sweepSpeed;
};

ctx.draw = function(){
  ctx.globalCompositeOperation = 'lighter';
  renderRings();
  renderGrid();
  // renderSweep();
  renderScanLines();
};
