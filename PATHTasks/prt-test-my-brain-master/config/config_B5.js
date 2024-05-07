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

var LEFT_IMG = 'bunnies';
var RIGHT_IMG = 'dogs';
var BIAS = 'dogs';

var IMG_FOLDER = 'img/bunny1_dog2/';
if ((LEFT_IMG == 'bunnies') && (RIGHT_IMG == 'dogs')) {
  var LEFT_MORE = 'M_L';
  var RIGHT_MORE = 'L_M';
} else if ((RIGHT_IMG == 'bunnies') && (LEFT_IMG == 'dogs')) {
  var RIGHT_MORE = 'M_L';
  var LEFT_MORE = 'L_M';
}
if (BIAS == 'bunnies') {
  var REWARD = 1;
} else if (BIAS == 'dogs') {
  var REWARD = 0;
}

// SECTION 1 //
var CONFIG_B4 = {
  LEFT_SHAPE: LEFT_IMG, // use plural form
  RIGHT_SHAPE: RIGHT_IMG, // use plural form
  BIAS_SHAPE: BIAS, // this is only for the purpose of recording in the data. actual bias is determined by the trial variables in SECTION 4.
  LEFT_EXAMPLE: IMG_FOLDER+LEFT_MORE+'_3.jpg', // for instructions page, example shown on the left side for left key
  RIGHT_EXAMPLE: IMG_FOLDER+RIGHT_MORE+'_3.jpg', // for instructions page, example shown on the right side for right key
  LEFT_SINGLE_EXAMPLE: IMG_FOLDER+LEFT_IMG+'.jpeg', // for instructions, a single example of the shape
  RIGHT_SINGLE_EXAMPLE: IMG_FOLDER+RIGHT_IMG+'.jpeg', // for instructions, a single example of the shape
  LEFT_PREFIX: LEFT_MORE, // the part of the image filename that identifies that there are more LEFT_SHAPE than RIGHT_SHAPE
  RIGHT_PREFIX: RIGHT_MORE, // the part of the image filename that identifies that there are more RIGHT_SHAPE than LEFT_SHAPE
  REWARD_AMOUNT: 20, // cents; set to null if no monetary reward
  TOTAL_REWARD: 16.40, // dollars
  REWARD_IMAGE: IMG_FOLDER+'reward.gif', // the image to show on a reward trial
}

// SECTION 2 //
CONFIG_B4.IMAGE_LIST = [
  IMG_FOLDER+'L_M_3.jpg',
  IMG_FOLDER+'L_M_4.jpg',
  IMG_FOLDER+'L_M_5.jpg',
  IMG_FOLDER+'L_M_6.jpg',
  IMG_FOLDER+'L_M_7.jpg',
  IMG_FOLDER+'L_M_8.jpg',
  IMG_FOLDER+'L_M_9.jpg',
  IMG_FOLDER+'L_M_10.jpg',
  IMG_FOLDER+'M_L_3.jpg',
  IMG_FOLDER+'M_L_4.jpg',
  IMG_FOLDER+'M_L_5.jpg',
  IMG_FOLDER+'M_L_6.jpg',
  IMG_FOLDER+'M_L_7.jpg',
  IMG_FOLDER+'M_L_8.jpg',
  IMG_FOLDER+'M_L_9.jpg',
  IMG_FOLDER+'M_L_10.jpg',
  IMG_FOLDER+'reward.gif',
  IMG_FOLDER+LEFT_IMG+'.jpeg',
  IMG_FOLDER+RIGHT_IMG+'.jpeg'
]

// SECTION 3 //
// note that practice trials will be shown in a random order
CONFIG_B4.PRACTICE_TRIALS = [
  {block: null, trial: null, stimulus: IMG_FOLDER+'L_M_3.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'L_M_4.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'L_M_5.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'L_M_6.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'M_L_3.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'M_L_4.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'M_L_5.jpg', rewarded: null},
  {block: null, trial: null, stimulus: IMG_FOLDER+'M_L_6.jpg', rewarded: null}
]

// SECTION 4 //
CONFIG_B4.TRIAL_INFO = [
  { block: 1, trial: 1, stimulus: IMG_FOLDER+"M_L_6.jpg", rewarded: Math.abs(0 - REWARD) },
  { block: 1, trial: 2, stimulus: IMG_FOLDER+"L_M_5.jpg", rewarded: Math.abs(1 - REWARD) },
  { block: 1, trial: 3, stimulus: IMG_FOLDER+"M_L_6.jpg", rewarded: Math.abs(0 - REWARD) },
  { block: 1, trial: 4, stimulus: IMG_FOLDER+"L_M_3.jpg", rewarded: Math.abs(1 - REWARD) },
  { block: 1, trial: 5, stimulus: IMG_FOLDER+"M_L_7.jpg", rewarded: Math.abs(0 - REWARD) }
 ]