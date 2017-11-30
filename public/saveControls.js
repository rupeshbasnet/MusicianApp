var savebutton = new Nexus.TextButton('#save', {
  'size': [150, 50],
  'state': false,
  'text': 'Save',
  'alternate': false,
});

function loadBeats() {
  var inputs = document.querySelectorAll('input[name=beat]');
  var beatIds = document.querySelectorAll('input[name=beatId]');

  function expand(array, rows) {
    var matrix = [];
    var subArray = [];

    for(var i = 0; i < rows; i++) {
      for(var j = 0; j < 16; j++) {
        subArray.push(array[i*16 + j]);
      }
      matrix.push(subArray);
      subArray = [];
    }
    return matrix;
  }

  for(let i = 0; i < beatIds.length; i++){

    $.get(
      '/beats/' + beatIds[i].value
    )
    .done(function(data, statusText) {
      inputs[i].addEventListener('click', function(){
        document.getElementById('beatTitle').value = data.title;
        document.getElementById('beatDescription').value = data.description;
        drumSequencer.matrix.set.all(expand(data.beatArray, 4));
      });
    });

  }

  if(beatIds.length < inputs.length)
    for(var i = beatIds.length; i < inputs.length; i++)
      inputs[i].addEventListener('click', function(){
        document.getElementById('beatTitle').value = "";
        document.getElementById('beatDescription').value = "";
        drumSequencer.matrix.set.all(expand(Array(64).fill(0), 4));
      });
}

function newBeat(params) {
  $.post(
    '/beats',
    params
  )
  .done(function(data, statusText) {
    // This block is optional, fires when the ajax call is complete
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
  function flatten(array) {
    return array.map(e => { return (e) ? 1:0; });
  }

  var matrix = drumSequencer.matrix.pattern.map((e) => { return flatten(e); });

  var rows = matrix.map(e => {return e.toString().replace(/,/g, '')});

  var beatString = rows.join('');

  var beatArray = beatString.split('').map(e => { return (e === '1') ? 1:0; });


  var title = document.getElementById('beatTitle').value;
  var description = document.getElementById('beatDescription').value;

  var parameters = {
    title: title,
    description: description,
    beatArray: beatArray
  }

  var slotNo = parseInt( document.querySelector('input[name=beat]:checked').id[4] );
  var beatNo;

  if(slotNo){
    beatNo = parseInt( document.querySelectorAll('input[name=beatId]')[slotNo].value );

    if(beatNo)
      updateBeat(beatNo, parameters);
  }

  if(!beatNo)
    newBeat(parameters);

  loadBeats();
});

loadBeats();
