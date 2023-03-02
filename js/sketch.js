let rSlider;
const synth = new Tone.Synth({
  "portamento" : 0.0,
  "oscillator": {
      "type": "square4"
  },
  "envelope": {
    "attack": 2,
    "decay": 1,
    "sustain": 0.2,
    "release": 2
  }
});
const reverb = new Tone.Freeverb({
	"roomSize": 0.9,
	"dampening": 2000,
  "wet": 0.5
});
synth.connect(reverb);
const osc = new Tone.OmniOscillator("C#4","pwm").start();
const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
});
let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
};

function setup() {
  createCanvas(400, 400);
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.98;
  
  rSlider = createSlider(0., 0.9, 0.45, 0.05);
  rSlider.mouseReleased( () => {
    reverb.roomSize.value = rSlider.value();
  });
  osc.connect(ampEnv);
  ampEnv.connect(reverb);
}

function draw() {
  background("lightBlue");
  fill(0);
  textAlign(CENTER);
  textSize(20);
  text("press the A-K keys to play a scale", width/2, height/2);
}

function keyPressed() {
  Tone.start();
  let note = notes[key];
  // console.log(note);
  osc.frequency.value = note;
  ampEnv.triggerAttackRelease('8n');
}