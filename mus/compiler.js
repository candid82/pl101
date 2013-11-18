function endTime(startTime, expr) {
  if (expr.tag === 'note')
    return startTime + expr.dur;
  if (expr.tag === 'seq')
    return endTime(endTime(startTime, expr.left), expr.right);
  return Math.max(endTime(startTime, expr.left), endTime(startTime, expr.right));
}

var LETTER_PITCH = {c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11};

function pitchToMidi(pitch) {
  var letter = pitch[0],
      octave = pitch[1];
  return 12 + 12 * octave + LETTER_PITCH[letter];
}

function musToNote(musNode, startTime) {
  return musNode.tag === 'note' ?
    {tag: musNode.tag, pitch: pitchToMidi(musexpr.pitch), start: startTime, dur: musexpr.dur} :
    {tag: musNode.tag, start: startTime, dur: musexpr.dur};
}

function compile(musexpr, startTime) {
  startTime = startTime || 0;
  if (musexpr.tag === 'note' || musexpr.tag === 'rest')
    return [musToNote(musexpr, startTime)];
  if (musexpr.tag === 'seq')
    return compile(musexpr.left, startTime).concat(compile(musexpr.right, endTime(startTime, musexpr.left)));
  return compile(musexpr.left, startTime).concat(compile(musexpr.right, startTime));
}

var melody_mus =
{ tag: 'seq',
left:
{ tag: 'seq',
left: { tag: 'note', pitch: 'a4', dur: 250 },
right: { tag: 'note', pitch: 'b4', dur: 250 } },
right:
{ tag: 'seq',
left: { tag: 'note', pitch: 'c4', dur: 500 },
right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
