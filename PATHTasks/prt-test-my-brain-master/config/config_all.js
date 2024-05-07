/* 

Configuration file for PRT task -- Instructions

This file has four sections.

SECTION 1 contains parameter settings, such as duration of events, keys to use, and reward amounts.
A comment describes what each parameter does. It is important that each parameter value be followed
by a comma, or else a syntax error will occur (except for the final parameter).

SECTION 2 is a list of all the images used by the experiment. The path to these files should be relative
to the location of the index.html file. This list is used to preload the images at the start of 
the experiment.

SECTION 3 is a list of practice trials. Each trial has four parameters (block, trial, stimulus, rewarded),
though only stimulus is used in the practice trials. The other values must exist, with the value of null.

SECTION 4 is a list of the test trials in the order that they will be presented. The block variable
controls when breaks appear in the task; all trials with the same block value are presented together.
The trial variable is just an index of the trial number. The stimulus variable controls which image is
displayed. The rewarded variable controls whether the stimulus will be rewarded (0 = no reward, 1 = reward)

*/

// SECTION 1 //
var CONFIG = {
  FIXATION_DURATION: 500, // ms (how long to show the fixation cross)
  STIMULUS_DURATION: 375, // ms (how long to show the stimulus for classification)
  TRIAL_DURATION: 5000, // ms, (maximum duration to wait for a response before continuing; or set to null to wait for a response indefinitely)
  FEEDBACK_DURATION: 1500, // ms (how long to show the feedback when it appears)
  // RESPONSE_DISPLAY_DURATION: 1000, // ms (how long to show the image corresponding to the response that the subject made) (not used currently)
  LEFT_KEY: 'a', // use lowercase
  RIGHT_KEY: 'l', // use lowercase
  IMAGE_SIZE: 600, // pixels
  ESTIMATED_TOTAL_DURATION: 10, // minutes
  TOTAL_BLOCKS: 3, // make sure this matches the numbers assigned in the stimulus info below
  BREAK_LENGTH: 10000, // ms length of break between blocks
  PLAY_REWARD_AUDIO: true,
  REWARD_SOUND: 'mp3/reward-coin-drop.mp3', // path to file (use mp3 if possible for browser compatibility), set to null if no sound
  SHOW_ACCURACY_AT_END: false, // show "you responded correctly on X of N trials" at the end screen?
  SAVE_DATA_TYPE: 'redcap', // How data should be saved. Current options are 'tmb' for TestMyBrain, 'cognition' for cognition.run, and 'local' for downloading a CSV file.
  ID_MESSAGE: 'Please enter your ID in the text box below:'
}