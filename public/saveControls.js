var savebutton = new Nexus.TextButton('#save', {
  'size': [150, 50],
  'state': false,
  'text': 'Save',
  'alternate': false,
});

function newBeat(params) {
  $.post(
    '/beats',
    params
  )
  .done(function(data, statusText) {
    // This block is optional, fires when the ajax call is complete
  });
}

function updateBeat() {

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

  newBeat(parameters);
});
