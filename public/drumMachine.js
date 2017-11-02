Nexus.context = Tone.context
var sequencer = new Nexus.Sequencer('#synth',{
  'size': [600,300],
  'mode': 'toggle',
  'rows': 4,
  'columns': 16
})
sequencer.colorize("accent", "black");

var kick = new Tone.Player({"url" : "/vendor/Samples/kick.wav", "fadeOut" : 0.2}).toMaster();
var sistersnare = new Tone.Player({"url" : "/vendor/Samples/sistersnare.wav", "fadeOut" : 0.2}).toMaster();
var hat = new Tone.Player({"url" : "/vendor/Samples/hat.wav", "fadeOut" : 0.2}).toMaster();
var hihat = new Tone.Player({"url" : "/vendor/Samples/hihat.wav", "fadeOut" : 0.2}).toMaster();

output = [];
sequencer.start();

var sequencer2 = new Nexus.Sequencer('#drums',{
  'size': [600,150],
  'mode': 'toggle',
  'rows': 4,
  'columns': 16
})
sequencer2.colorize("accent", "orange");

sequencer2.start();
//console.log(number.value * 100);
sequencer.on('step',function(v) {
  //console.log(v);
  if (v[0] == 1){kick.start();}
  if (v[1] == 1){sistersnare.start();}
  if (v[2] == 1){hat.start();}
  if (v[3] == 1){hihat.start();}

 output = v;

})

sequencer.on('change',function(v) {
    var socket = io();
    socket.emit('beat1', sequencer.matrix.pattern);
    //console.log(sequencer.matrix.pattern);
    socket.on('beat1', function( data ) {
      sequencer.matrix.set.all(data);
      console.log(data);
    });
});


//console.log(number.value * 100);
sequencer2.on('step',function(v) {
  //console.log(v);

  if (v[0] == 1){kick.start();}
  if (v[1] == 1){sistersnare.start();}
  if (v[2] == 1){hat.start();}
  if (v[3] == 1){hihat.start();}

 output = v;

})

sequencer2.on('change',function(v) {
    var socket = io();
    socket.emit('beat2', sequencer2.matrix.pattern);
    //console.log(sequencer.matrix.pattern);
    socket.on('beat2', function( data ) {
      sequencer2.matrix.set.all(data);
      console.log(data);
    });
});
