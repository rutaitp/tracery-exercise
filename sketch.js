// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// Tracery by Kate Compton
// https://github.com/galaxykate/tracery

var grammar;
var talk;
var par;
var saveButton;

var data = {
  "start": ["#story#"],
  "story": ["Code is the #adj# #adj# #noun#. In the #emoji#, it was #adj.a# #noun# that drove the #adj# #noun#. In the #emoji#, it was probably #noun.a#. But for my generation of #emoji#, software is the #emoji# to our #noun# and our #noun#. And that #verb.s# that we #verb# a #adverb#, #adverb# more #emoji# #noun# of #noun.s# to #verb# those #noun.s#, to not #verb# computers as #emoji# and #adj# and #adj# and #emoji#, to #verb# them as #noun.s# that they can #verb# and #verb# around and #verb#, and so #emoji#. \
  My personal #noun# into the #emoji# of programming and #emoji# #verb.ed# at the #adj# age of 14. I had this #emoji# #adj# #noun# on an #adj# #emoji#, and the #adj# #emoji# in #noun# just #verb.ed# to #verb# the then #emoji# of the United States, Mr. Al Gore. And I #verb.ed# what every #adj# #adj# girl would want to #verb#. I wanted to somehow #verb# all of this #noun#, so I #verb.ed# him a #adj# website, it's over here. And in 2001, there was no #emoji#, there was no #emoji#, there was no #emoji#. So I needed to #verb# to code in order to #verb# all of this #emoji# and #emoji#. \
  And that is how programming #verb.ed# for me. It #verb.ed# as a #noun.s# of self-#noun#. Just like when I was #adj#, I would #verb# #emoji# and #emoji#. And when I was #emoji#, I would #verb# #noun# #noun.s# and #noun# #noun.s#. But #adverb#, there were #adj# #emoji# to get #adj# about, like #noun# and knitting #noun.s# and conjugating French #adj# #noun.s# and coming up with #emoji#-#emoji# #noun.s# and #people# and his #profession#. And I #verb.ed# to #verb# one of those #emoji# who felt that computers are #adj# and #adj# and #adj#. \
  Here's what I #verb# today. #adj.capitalize# girls don't #verb# that they are not supposed to #verb# computers. #adj.capitalize# girls are #emoji#. They are #adverb#, #adverb# #adj# at #verb# on #noun.s# and being #adj# and they #verb# amazing #noun.s# like, '#adverb.capitalize#?' and '#adverb.capitalize#?' and '#adverb.capitalize#?' and '#adverb.capitalize# if?' And they don't #verb# that they are not supposed to #verb# computers. It's the #title.s# who do. It's us #title.s# who #verb# like computer #emoji# is this #adj#, #adj# science #emoji# that only #verb.s# to the #emoji# makers. That it's #adverb# as far #verb.ed# from #adj# #noun# as, say, #adj# #profession#."],
  "noun": ["language", "music", "generation", "money", "software", "interface", "imagination", "world", "set", "product", "journey", "world", "technology", "crush", "man", "question", "love", "website", "longing", "loving", "expression", "crayon", "lego", "guitar", "lesson", "theatre", "play", "thing", "poetry", "sock", "world", "question", "science", "discipline", "life"],
  "adj": ["universal", "next", "punk", "whole", "diverse", "mechanical", "lonely", "boring", "magic", "personal", "tender", "mad", "teenage", "older", "single", "smaller", "other", "excited", "irregular", "technical", "lonely", "little", "amazing", "good", "exact", "esoteric", "weird", "mystery", "everyday", "nuclear"],
  "adverb": ["radically", "then", "really", "almost", "what", "why", "how"],
  "verb": ["need", "mean", "build", "see", "tinker", "turn", "twist", "start", "happen", "be", "do", "want", "express", "learn", "start", "think", "know", "like", "concentrating", "ask", "feel", "belong", "remove"],
  "people": ["Bertrand Russel", "Albert Einstein", "Marvin Minsky", "Lady Gaga", "Adele"],
  "profession": ["philosophy", "culinary", "psychiatry", "physics"],
  "title": ["parent", "teacher", "government", "school", "administration", "society"],
  "emoji": ['😀', '😬', '😁', '😂', '😃', '😄', '😅', '😆', '🌎', '🌕', '🌖', '🌗', '🌝', '🌜', '🌞', '🌙', '⭐', '🌟', '💫', '✨', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🍅', '🚗', '🚕', '🚙', '🚌', '🚎', '⌚', '📱', '📲', '💻', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛']
}

function setup() {
  noCanvas();

  talk = loadStrings('talk.txt', showTalk);

  // Make the grammar
  grammar = tracery.createGrammar(data);

  // A button to generate a new sentence
  var button = select('#generate');
  button.mousePressed(generate);

  // A button to clear everything
  var clear = select('#clear');
  clear.mousePressed(clearAll);
}

function showTalk() {
  console.log(talk);

  var createTalk = select("#tedtalk");
  for (var i = 0; i<talk.length; i++) {
    p = createP(talk[i]);
    p.class('talkline');
    p.parent(createTalk);
  }
}

// Remove everything
function clearAll() {
  var elements = selectAll('.text');
  for (var i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
  saveButton.remove();
}

function generate() {
  var expansion = grammar.flatten('#start#');
  par = createP(expansion);
  var r = floor(random(100, 255));
  var g = floor(random(150, 255));
  var b = floor(random(200, 255));
  par.style('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
  par.class('text');

  saveButton = createButton('SAVE TALK');
  saveButton.class('save');
  saveButton.mousePressed(saveTalk);
}

function saveTalk() {
  console.log('talk saved');
  var toSaveText = par.html();
  console.log(toSaveText);

  var millisecond = millis();
  console.log(millisecond)
  saveJSON(toSaveText, 'talk' + millisecond, true);
}
