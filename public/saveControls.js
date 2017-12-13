

//Order must match the pattern_types array in patternControls.js
var instruments = ["drums", "synth"];
var save_btns = {};

instruments.forEach(inst => {
  save_btns[inst + '_save_btn'] =
    new Nexus.TextButton('#' + inst + '_save', {
      'size': [150, 50],
      'state': false,
      'text': 'Save',
      'alternate': false,
    });
});

function createPattern(params, pattern_type) {

  const patterns_type = pattern_type + 's';
  const route = '/' + patterns_type;

  $.post(
    route,
    params
  )
  .done(function(ptrn, statusText) {

    //console.log(statusText);
    // This block is optional, fires when the ajax call is complete
    let patternArray = patterns[patterns_type];

    var beatIds = document.querySelectorAll('input[name='+ pattern_type + 'Id]');
    var noBeats = beatIds.length;

    if(noBeats < PATTERN_LIMIT)
    {
      patternArray[noBeats] = ptrn;
    }

    var container = document.getElementById(pattern_type + 'Selection').parentNode;
    var save_btn = container.lastElementChild;

    var patternInput = document.createElement('input');

    patternInput.name = pattern_type + "Id";
    patternInput.id = pattern_type + "Id" + noBeats;
    patternInput.type = "hidden";
    patternInput.value = ptrn.id;

    container.insertBefore(patternInput, save_btn);
  });
}

function updatePattern(params, pattern_type, id) {

  const route = '/' + pattern_type + 's/' + id;
  console.log(route);

  $.ajax({
    url: route,
    type: 'PUT',
    data: params,
    success: function(result) {
        // Do something with the result
    }
  });
}

function saveBeats(patterns_type) {

  const pattern_type = patterns_type.slice(0, -1);
  let patternArray = patterns[patterns_type];

  for(let i=0; i<PATTERN_LIMIT; i++)
  {

    console.log(patternArray[i]);

    var title = patternArray[i].title;
    var description = patternArray[i].description;
    var beatArray = patternArray[i].beatArray;
    var id = patternArray[i].id;

    if(title.length === 0)
      continue;

    var parameters = {
      title: title,
      description: description,
      beatArray: beatArray
    };

    if(patternArray[i].createdAt){
      updatePattern(parameters, pattern_type, id);
    }
    else {
      createPattern(parameters, pattern_type);
    }
  }

}

pattern_types.forEach((p_type, i) => {
  save_btns[instruments[i] + '_save_btn'].on('click', () => saveBeats(p_type));
})

//savebutton.on('click', () => saveBeats('beats'));
