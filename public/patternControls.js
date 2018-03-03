const PATTERN_LIMIT = 4;

var beats = [];
var synth_patterns = [];

var patterns = {};
var pattern_types = ["beats", "synth_patterns"];

var seqs = {
  'beats': drumSequencer,
  'synth_patterns': synthSequencer,
};

var insts = ["drums", "synth"];

pattern_types.forEach(e => patterns[e] = eval(e));

function expand(array, rows) {
  var matrix = [];
  var subArray = [];

  var subArraySize = 16;

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

function flatten(pattern) {
  var matrix = pattern.map((e) => { return boolify(e); });

  var rows = matrix.map(e => {return e.toString().replace(/,/g, '')});

  var beatString = rows.join('');

  var beatArray = beatString.split('').map(e => { return (e === '1') ? 1:0; });

  return beatArray;
}

function getSelected(pattern_type) {
  return parseInt( document.querySelector('input[name='+pattern_type+']:checked').id.slice(-1) );
}

function set(pattern_type, i) {
  const patterns_type = pattern_type + 's';

  let pattern = patterns[patterns_type][i];
  let seq = seqs[patterns_type];

  document.getElementById(pattern_type + '_title').value = pattern.title;
  document.getElementById(pattern_type + '_description').value = pattern.description;
  seq.matrix.set.all(expand(pattern.beatArray, seq.matrix.pattern.length));
}

function init(patterns_type) {

  let patternArray = patterns[patterns_type];
  let seq = seqs[patterns_type];

  const pattern_type = patterns_type.slice(0, -1);

  let inputs = document.querySelectorAll('input[name='+ pattern_type +']');
  let ids = document.querySelectorAll('input[name='+ pattern_type +'Id]');


  // Loops through up to the first 4 patterns and gets all of them into the patternArray
  // Then attaches event listener for each radio button
  for(let i = 0; i < PATTERN_LIMIT && i < ids.length; i++)
  {
    let route = '/'+ patterns_type +'/' + ids[i].value;

    $.get(
      route
    )
    .done(function(pattern, statusText) {

      patternArray[i] = pattern;

      inputs[i].addEventListener('click', function(){
        set(pattern_type, i);
      });

      if(i === getSelected(pattern_type)) inputs[i].click();
    });
  }

  if(ids.length < inputs.length)
  {
    var tempObj = () => {
      return new Object
      ({
      title: "",
      description: "",
      beatArray: Array( flatten(seq.matrix.pattern).length ).fill(0)
      });
    }
    for(let i = ids.length; i < inputs.length; i++)
    {
      if(patternArray.length < inputs.length) patternArray[i] = tempObj();
      inputs[i].addEventListener('click', function(e){
        set(pattern_type, i);
      });
    }
  }

}

function loadBeats() {

  init('beats');
  init('synth_patterns');
}

function setupPatternControls() {

  pattern_types.forEach((p, i) => {
    let seq = seqs[p];
    let patternArray = patterns[p];
    const pattern_type = p.slice(0, -1);

    $('#'+ pattern_type +'_title').on('change', function(e) {
      var beatNo = getSelected(pattern_type);
      patternArray[beatNo].title = e.target.value;
    }).on('keypress', function(e) {
      e.stopPropagation();
    });

    $('#'+ pattern_type +'_description').on('change', function(e) {
      var beatNo = getSelected(pattern_type);
      patternArray[beatNo].description = e.target.value;
    }).on('keypress', function(e) {
      e.stopPropagation();
    });

    seq.on('change', function() {
      var beatNo = getSelected(pattern_type);
      patternArray[beatNo].beatArray = flatten(seq.matrix.pattern);
    });

  });
}

document.addEventListener("keypress", function(e){
  let key = e.key;
  if(key.match(/1|2|3|4/))
  {
    let num = key - 1;
    let input = document.getElementById('synth_pattern'+num);

    input.click();
    $("#synth")[0].click();
  }
  else if(key.match(/5|6|7|8/))
  {
    let num = key - 5;
    let input = document.getElementById('beat'+num);

    input.click();
    $("#drums")[0].click();
  }

});

var activeSeq;
var copiedPattern;

$("#drums, #synth").on("click", seqActive);

$(document).on("keydown", (e) => {
  let key = e.key;
  if(key === "c" && e.metaKey)
  {
    copyPattern();
  }
  else if(key === "v" && e.metaKey)
  {
    pastePattern();
  }
});

function initSeq(){
  let count = 0;
  for(let key in seqs)
  {
    let i = count;
    seqs[key].on('change', () => {
      activeSeq = insts[i];
    });
    count++;
  }


  $('.row').click(function(e){
    $('.row div').removeClass('active-row');
    let el = $(e.currentTarget).children()[0];
    $(el).addClass('active-row');
    for(let inst of insts){
      if($(el.parentNode).hasClass(inst))
        {
          activeSeq = inst;
          return;
        }
    }
    activeSeq = undefined;
  });
}

function seqActive(e){
  let eid = e.currentTarget.id;
  if(activeSeq && activeSeq !== eid){
    activeSeq = undefined;
  }
  activeSeq = eid;
}

function copyPattern(){
  let patternType, p;

  if(!activeSeq)
    return;

  if(activeSeq === "drums")
    p = pattern_types[0];
  else if(activeSeq === "synth")
    p = pattern_types[1];
  else
    return;

  patternType = p.slice(0, -1);

  let s = getSelected(patternType);

  copiedPattern = (patterns[p][s]).beatArray;
}

function pastePattern(){
  let p;

  if(!activeSeq || !copiedPattern)
    return;

  if(activeSeq === "drums" && copiedPattern.length === 64)
    p = pattern_types[0];
  else if(activeSeq === "synth" && copiedPattern.length === 128)
    p = pattern_types[1];
  else
    return;

  let seq = seqs[p];
  seq.matrix.set.all(expand(copiedPattern, seq.matrix.pattern.length));
}

$(loadBeats);
$(setupPatternControls);
$(initSeq);
