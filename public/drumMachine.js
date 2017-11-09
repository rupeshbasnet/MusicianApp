Nexus.context = Tone.context
output = [];

/* ------------ Drums ------------ */

var kick = new Tone.Player({"url" : "/vendor/Samples/kick.wav", "fadeOut" : 0.2}).toMaster();
var sistersnare = new Tone.Player({"url" : "/vendor/Samples/sistersnare.wav", "fadeOut" : 0.2}).toMaster();
var hat = new Tone.Player({"url" : "/vendor/Samples/hat.wav", "fadeOut" : 0.2}).toMaster();
var hihat = new Tone.Player({"url" : "/vendor/Samples/hihat.wav", "fadeOut" : 0.2}).toMaster();

var sequencer2 = new Nexus.Sequencer('#drums',{
  'size': [600,150],
  'mode': 'toggle',
  'rows': 4,
  'columns': 16
})
sequencer2.colorize("accent", "orange");

//sequencer2.start();

sequencer2.on('step',function(v) {
  if (v[0] == 1){kick.start();}
  if (v[1] == 1){sistersnare.start();}
  if (v[2] == 1){hat.start();}
  if (v[3] == 1){hihat.start();}

 output = v;

});



// sequencer2.on('change',function(v) {
//     var socket = io();
//     socket.emit('beat2', sequencer2.matrix.pattern);
//     //console.log(sequencer.matrix.pattern);
//     socket.on('beat2', function( data ) {
//       sequencer2.matrix.set.all(data);
//       console.log(data);
//     });
// });

seqs.push(sequencer2);
