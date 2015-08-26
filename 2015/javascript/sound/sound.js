function ArcadeAudio() {
  this.sounds = {}
}

ArcadeAudio.prototype.add = function( key, count, settings ) {
  this.sounds[ key ] = []
  settings.forEach( function( elem, index ) {
    this.sounds[ key ].push( {
      tick: 0,
      count: count,
      pool: []
    } )
    for( var i = 0; i < count; i++ ) {
      var audio = new Audio()
      audio.src = jsfxr( elem )
      this.sounds[ key ][ index ].pool.push( audio )
    }
  }, this )
};

ArcadeAudio.prototype.play = function( key ) {
  var sound = this.sounds[ key ]
  var soundData = sound.length > 1 ? sound[ Math.floor( Math.random() * sound.length ) ] : sound[ 0 ]
  soundData.pool[ soundData.tick ].play()
  soundData.tick < soundData.count - 1 ? soundData.tick++ : soundData.tick = 0
}

var sound = new ArcadeAudio()

sound.add( 'enemy collision', 10,
  [
    [0,,0.01,,0.4384,0.2,,0.12,0.28,1,0.65,,,0.0419,,,,,1,,,,,0.7],
    [0,,0.16,0.18,0.18,0.47,0.0084,-0.26,,,,,,0.74,-1,,-0.76,,1,,,,,0.7],
    
  ]
)

sound.add( 'jump', 5,
  [
    [0,,0.2924,,0.293,0.4953,,0.186,,,,,,0.4419,,,,,1,,,,,0.5]
  ]
)

sound.add( 'damage', 3,
  [
    [3,,0.0138,,0.2701,0.4935,,-0.6881,,,,,,,,,,,1,,,,,0.7],
    [0,,0.0639,,0.2425,0.7582,,-0.6217,,,,,,0.4039,,,,,1,,,,,0.7],
    [3,,0.0948,,0.2116,0.7188,,-0.6372,,,,,,,,,,,1,,,0.2236,,0.25],
    [3,,0.1606,0.5988,0.2957,0.1157,,-0.3921,,,,,,,,,0.3225,-0.2522,1,,,,,0.7],
    [3,,0.1726,0.2496,0.2116,0.0623,,-0.2096,,,,,,,,,0.2665,-0.1459,1,,,,,0.7],
    [3,,0.1645,0.7236,0.3402,0.0317,,,,,,,,,,,,,1,,,,,0.7]
  ]
)

sound.add('lvl', 2, [
    [2,0.0703,0.4438,0.1843,0.3133,0.7169,,-0.3947,0.2224,,,-0.8926,,,0.0018,0.5304,0.0024,-0.0733,0.9999,0.0008,,,0.001,0.5]
])