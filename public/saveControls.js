var beats = [];

var savebutton = !$('#save') || new Nexus.TextButton('#save', {
  'size': [150, 50],
  'state': false,
  'text': 'Save',
  'alternate': false,
});

function expand(array, rows) {
  var matrix = [];
  var subArray = [];

  var subArraySize = array.length / rows;

  for(var i = 0; i < rows; i++) {
    for(var j = 0; j < subArraySize; j++) {
      subArray.push(array[i*subArraySize + j]);
    }
    matrix.push(subArray);
    subArray = [];
  }
  return matrix;
}

function boolify(array) {
  return array.map(e => { return (e) ? 1:0; });
}

function flatten() {
  var matrix = drumSequencer.matrix.pattern.map((e) => { return boolify(e); });

  var rows = matrix.map(e => {return e.toString().replace(/,/g, '')});

  var beatString = rows.join('');

  var beatArray = beatString.split('').map(e => { return (e === '1') ? 1:0; });

  return beatArray;
}

function getSelectedBeat() {
  return parseInt( document.querySelector('input[name=beat]:checked').id[4] );
}

function getBeat(id) {

  $.get(
    '/beats/' + id
  )
  .done(function(beat, statusText) {

    return beat;
  });
}

function setBeat(i) {

  document.getElementById('beatTitle').value = beats[i].title;
  document.getElementById('beatDescription').value = beats[i].description;
  drumSequencer.matrix.set.all(expand(beats[i].beatArray, 4));
}

function loadBeats() {
  var inputs = document.querySelectorAll('input[name=beat]');
  var beatIds = document.querySelectorAll('input[name=beatId]');



  for(let i = 0; i < beatIds.length; i++)
  {

    $.get(
      '/beats/' + beatIds[i].value
    )
    .done(function(beat, statusText) {

      beats[i] = beat;
      inputs[i].addEventListener('click', function(){

        setBeat(i);

      });
    });

  }

  if(beatIds.length < inputs.length)
  {
    var tempBeat = () => {
      return new Object
      ({
      title: "",
      description: "",
      beatArray: Array(64).fill(0)
      });
    }
    for(let i = beatIds.length; i < 4; i++)
    {
      if(beats.length < 4) beats[i] = tempBeat();
      inputs[i].addEventListener('click', function(e){
        setBeat(i);
      });
    }
  }

  // if(beatIds.length < inputs.length)
  //   for(var i = beatIds.length; i < inputs.length; i++)
  //     inputs[i].addEventListener('click', function(){
  //       document.getElementById('beatTitle').value = "";
  //       document.getElementById('beatDescription').value = "";
  //       drumSequencer.matrix.set.all(expand(Array(64).fill(0), 4));
  //     });

  $('#beatTitle').on('change', function(e) {
    var beatNo = getSelectedBeat();
    beats[beatNo].title = e.target.value;
  });

  $('#beatDescription').on('change', function(e) {
    var beatNo = getSelectedBeat();
    beats[beatNo].description = e.target.value;
  });

  drumSequencer.on('change', function() {
    var beatNo = getSelectedBeat();
    beats[beatNo].beatArray = flatten();
  });

  $("#beat0").click();
}

function newBeat(params) {
  $.post(
    '/beats',
    params
  )
  .done(function(beat, statusText) {
    // This block is optional, fires when the ajax call is complete
    var beatIds = document.querySelectorAll('input[name=beatId]');
    var noBeats = beatIds.length;

    if(noBeats < 4)
    {
      beats[noBeats] = beat;
    }

    var beatSelection = document.getElementById('beatSelection');
    var newBeatInput = document.createElement('input');

    newBeatInput.name = "beatId";
    newBeatInput.id = "beatId"+noBeats;
    newBeatInput.type = "hidden";
    newBeatInput.value = beat.id;

  });
}

function updateBeat(id, params) {
  $.ajax({
    url: '/beats/'+id,
    type: 'PUT',
    data: params,
    success: function(result) {
        // Do something with the result
    }
  });
}

savebutton.on('click', function() {

  for(let i=0; i<4; i++)
  {
    var title = beats[i].title;
    var description = beats[i].description;
    var beatArray = beats[i].beatArray;

    if(title.length === 0 || description.length === 0)
      continue;

    var parameters = {
      title: title,
      description: description,
      beatArray: beatArray
    }

    if(beats[i].createdAt){
      updateBeat(beats[i].id, parameters)
    }
    else {
      newBeat(parameters);
    }
  }

  //loadBeats();
});

document.addEventListener("keypress", function(e){
  let key = e.key;
  if(key.match(/5|6|7|8/))
  {
    let num = key - 5;
    let input = document.getElementById('beat'+num);

    input.click();
  }

});

$( loadBeats );
