/* add TMB script if using TMB to save data */

var releaseversion = true;

if (CONFIG.SAVE_DATA_TYPE == 'tmb') {
  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "TestMyBrain.12.18.min.js";
  head.appendChild(js);
}

var specCONFIG = CONFIG_A1;

var converter = {
  A1: CONFIG_A1,
  A2: CONFIG_A2,
  A3: CONFIG_A3,
  A4: CONFIG_A4,
  B1: CONFIG_B1,
  B2: CONFIG_B2,
  B3: CONFIG_B3,
  B4: CONFIG_B4,
  B5: CONFIG_B5,
  C1: CONFIG_A1,
  C2: CONFIG_A2,
  C3: CONFIG_A3,
  C4: CONFIG_A4,
}

var counterbalance = {
  1: ['A1', 'B2', 'A3', 'B4', 'A2'],
  2: ['B1', 'A2', 'B3', 'A4', 'B2'],
  3: ['A2', 'B3', 'A4', 'B1', 'A3'],
  4: ['B2', 'A3', 'B4', 'A1', 'B3'],
  5: ['A3', 'B4', 'A1', 'B2', 'A4'],
  6: ['B3', 'A4', 'B1', 'A2', 'B4'],
  7: ['A4', 'B1', 'A2', 'B3', 'A1'],
  8: ['B4', 'A1', 'B2', 'A3', 'B1'],
}

/* reward setup */
var unrewarded_left_trials = 0;
var unrewarded_right_trials = 0;

window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
const isMobile = window.mobileAndTabletCheck();
if (isMobile == true) {
  var MOBILE_WIDTH_DIVISER = CONFIG.IMAGE_SIZE/window.innerWidth;
  var CONT_TEXT = "Tap to continue.";
  var INTRO1_TEXT = `<li>Hold your device steady.</li> 
  <li>Position your device so that your face is approximately 1.5 feet (50 cm) from the screen.</li>
  <li>Ensure that your device's sound is switched on.</li>`;
} else {
  var MOBILE_WIDTH_DIVISER = 1;
  var CONT_TEXT = "Press the spacebar to continue.";
  var INTRO1_TEXT = `<li>Place your computer on a flat surface.</li> 
  <li>Seat yourself so that your face is approximately 1.5 feet (50 cm) from the screen.</li>
  <li>Ensure that your computer sound is switched on.</li>`;
}

/* instructions */

var id_entry = {
  type: 'survey-text',
  preamble: '<p style="font-size:24px;">Welcome to the task!</p>',
  questions: [
    { prompt: 'Please enter your ID in the text box below:', required: true},
  ],
  data: {
    task: 'start',
  },
  on_finish: function (data) {
    var id = JSON.parse(data.responses).Q0;
    jsPsych.data.addProperties({
      subject_id: id,
      mobile: String(isMobile),
    });
    console.log("Records ID");
  }
}

var version_select = {
  type: 'survey-multi-choice',
  preamble: '<p style="font-size:24px;">Welcome to the task!</p>',
  // questions: [{prompt: 'Please choose your Group Letter (A or B):', options: ["A", "B"], required: true, horizontal: true},
  //   {prompt: 'Please choose your Group Number (1 - 4):', options: ["1", "2", "3", "4"], required: true, horizontal: true},
  //   {prompt: 'Please choose your Time Point (1 - 5):', options: ["1", "2", "3", "4", "5"], required: true, horizontal: true}
  // ],
  questions: [{prompt: 'Please choose your Group Number:', options: ["1", "2", "3", "4", "5", "6", "7", "8"], required: true, horizontal: true},
    {prompt: 'Please choose your Time Point (1 - 5):', options: ["1", "2", "3", "4", "5"], required: true, horizontal: true}
  ],
  data: {
    task: 'start',
  },
  on_finish: function (data) {
    var group = counterbalance[data.response.Q0][Number(data.response.Q1)-1];
    var time = data.response.Q1;
    specCONFIG = converter[group];
    jsPsych.data.addProperties({
      group: group,
      time: time,
      left_shape: specCONFIG.LEFT_SHAPE,
      right_shape: specCONFIG.RIGHT_SHAPE,
      bias_shape: specCONFIG.BIAS_SHAPE
    });
    var test_procedure = {
      timeline: [],
      data: {
        phase: 'test'
      }
    };
    const url = 'https://redcap.case.edu/api/';
    const datadict = {
        'record_id': jsPsych.data.get().values()[0]['subject_id'],
        'redcap_event_name': 'intake_arm_1'
    };
    const body = {
      method: 'POST',
      token: 'BBB56B8445954A08A65E9517DB426E2F',
      content: 'record',
      format: 'json',
      type: 'flat',
      overwriteBehavior: 'normal',
      forceAutoNumber: 'false',
      data: JSON.stringify([datadict]),
      returnContent: 'count',
      returnFormat: 'json'
    };
    $.post(url, body)
      .done(function(response) {
          console.log('Creating record to REDCap. Response:', response);
      })
      .fail(function(error) {
          console.error('Failed to create record to REDCap:', error);
      });
    for (var b = 1; b <= CONFIG.TOTAL_BLOCKS; b++) {
      var test_block = {
        timeline: [fixation, target_display, timeout_display, feedback, blank_in_place_of_feedback],
        timeline_variables: specCONFIG.TRIAL_INFO.filter(function (x) { return x.block == b }),
        data: {
          block: b
        }
      }
      test_procedure.timeline.push(test_block);
      if (b < CONFIG.TOTAL_BLOCKS) {
        var rest = {
          type: 'html-keyboard-response',
          stimulus: `<p>You have completed ${b} of ${CONFIG.TOTAL_BLOCKS} blocks of trials.</p>
                <p>The next block will begin in ${CONFIG.BREAK_LENGTH / 1000} seconds.</p>`,
          trial_duration: CONFIG.BREAK_LENGTH,
          choices: jsPsych.NO_KEYS,
          on_finish: function(){
            // reset the unrewarded trials count, as these are on a per-block basis
            unrewarded_left_trials = 0;
            unrewarded_right_trials = 0;
          }
        }
        test_procedure.timeline.push(rest);
      }
    }
    var practice_trials = {
      timeline: [fixation, target_display, practice_feedback, blank_in_place_of_feedback],
      timeline_variables: specCONFIG.PRACTICE_TRIALS,
      data: {
        phase: 'practice'
      },
      randomize_order: true
    }
    
    var practice_procedure = {
      timeline: [practice_trials, instructions_practice_loop],
      loop_function: function (data) {
        return more_practice == true;
      }
    }
    timeline = [];
    timeline.push(instructions_intro);
    timeline.push(practice_procedure);
    timeline.push(instructions_feedback);
    timeline.push(test_procedure);
    timeline.push(save_data);
    timeline.push(final_screen);
    jsPsych.init({
      timeline: timeline,
      preload_images: specCONFIG.IMAGE_LIST,
      preload_audio: audio,
      use_webaudio: releaseversion,
      experiment_width: 800
    })
  }

}

var more_practice = false;
var trial_start_time;

var instructions_intro_1 = {
  type: 'html-keyboard-response',
  stimulus: `<p>Before you begin, please do the following:</p> 
    <ol style="text-align: left;"> 
      ${INTRO1_TEXT}
    </ol>
	  <p>${CONT_TEXT}</p>`,
  choices: [32]
}

function advance(event) {
  var click_time = performance.now();
  var reaction_time = click_time - trial_start_time;
  click_X = event.clientX;
  jsPsych.finishTrial();
  jsPsych.data.get().addToLast({rt: reaction_time});
}

function tap_practice_loop(event) {
  var click_time = performance.now();
  var reaction_time = click_time - trial_start_time;
  click_X = event.clientX;
  if (click_X < window.innerWidth / 2) {
    more_practice = true;  
    jsPsych.finishTrial();
  }
  if (click_X > window.innerWidth / 2) {
    more_practice = false;
    jsPsych.finishTrial();
  }
  jsPsych.data.get().addToLast({rt: reaction_time});
}

function click_left(event) {
  var click_time = performance.now();
  var reaction_time = click_time - trial_start_time;
  click_X = event.clientX;
  if (click_X < window.innerWidth / 2) {
    jsPsych.finishTrial();
  }
  jsPsych.data.get().addToLast({rt: reaction_time});
}

function click_right(event) {
  var click_time = performance.now();
  var reaction_time = click_time - trial_start_time;
  click_X = event.clientX;
  if (click_X > window.innerWidth / 2) {
    jsPsych.finishTrial();
  }
  jsPsych.data.get().addToLast({rt: reaction_time});
}

var instructions_intro_1a = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<p>Please position your index fingers on the "${CONFIG.LEFT_KEY.toUpperCase()}" and "${CONFIG.RIGHT_KEY.toUpperCase()}" keys for this experiment.
        The game will last approximately ${CONFIG.ESTIMATED_TOTAL_DURATION} minutes and is composed of ${CONFIG.TOTAL_BLOCKS} blocks 
        separated by a break.</p><p>${CONT_TEXT}</p>`
    } else {
      return `<p>Please position your thumbs over the left and right sides of the screen for this experiment.
      The game will last approximately ${CONFIG.ESTIMATED_TOTAL_DURATION} minutes and is composed of ${CONFIG.TOTAL_BLOCKS} blocks 
      separated by a break.</p><p>${CONT_TEXT}</p>`
    }
  },
  choices: [32]
}

var instructions_intro_2 = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<p>You will be presented with either an image with more ${specCONFIG.LEFT_SHAPE} than ${specCONFIG.RIGHT_SHAPE}, or an image with 
      more ${specCONFIG.RIGHT_SHAPE} than ${specCONFIG.LEFT_SHAPE}. You will see them one at a time.</p>
      <p>Your task will be to decide whether more ${specCONFIG.LEFT_SHAPE} or more ${specCONFIG.RIGHT_SHAPE} were presented by pushing the correct button as quickly
      and accurately as possible.</p>
      <p>The "${CONFIG.LEFT_KEY.toUpperCase()}" key will be used to identify more ${specCONFIG.LEFT_SHAPE} and the "${CONFIG.RIGHT_KEY.toUpperCase()}" key will be used 
      to identify more ${specCONFIG.RIGHT_SHAPE}. Examples of what the images look like are below:</p>
      <p style="height: ${CONFIG.IMAGE_SIZE / 2 + 50}px;">
      <img style="width:${window.innerWidth/3}px; float: left;" src="${specCONFIG.LEFT_EXAMPLE}"></img>
      <img style="width:${window.innerWidth/3}px; float: right;" src="${specCONFIG.RIGHT_EXAMPLE}"></img>
      <span style="text-align:center; width:${window.innerWidth/3}px; clear:both; float: left;">More ${specCONFIG.LEFT_SHAPE} = ${CONFIG.LEFT_KEY.toUpperCase()}</span>
      <span style="text-align:center; width:${window.innerWidth/3}px; float: right;">More ${specCONFIG.RIGHT_SHAPE} = ${CONFIG.RIGHT_KEY.toUpperCase()}</span>
      </p>
      <p>${CONT_TEXT}</p>`
    } else {
      return `<p>You will be presented with either an image with more ${specCONFIG.LEFT_SHAPE} than ${specCONFIG.RIGHT_SHAPE}, or an image with 
      more ${specCONFIG.RIGHT_SHAPE} than ${specCONFIG.LEFT_SHAPE}. You will see them one at a time.</p>
      <p>Your task will be to decide whether more ${specCONFIG.LEFT_SHAPE} or more ${specCONFIG.RIGHT_SHAPE} were presented by tapping the correct side of the screen as quickly
      and accurately as possible.</p>
      <p>The LEFT side of the screen will be used to identify more ${specCONFIG.LEFT_SHAPE} and the RIGHT side of the screen will be used 
      to identify more ${specCONFIG.RIGHT_SHAPE}. Examples of what the images look like are below:</p>
      <p style="height: ${CONFIG.IMAGE_SIZE / 2 + 50}px;">
      <img style="width:${window.innerWidth/3}px; float: left;" src="${specCONFIG.LEFT_EXAMPLE}"></img>
      <img style="width:${window.innerWidth/3}px; float: right;" src="${specCONFIG.RIGHT_EXAMPLE}"></img>
      <span style="text-align:center; width:${window.innerWidth/3}px; clear:both; float: left;">More ${specCONFIG.LEFT_SHAPE} = LEFT</span>
      <span style="text-align:center; width:${window.innerWidth/3}px; float: right;">More ${specCONFIG.RIGHT_SHAPE} = RIGHT</span>
      </p>
      <p>${CONT_TEXT}</p>`
    }
  },
  choices: [32]
}

var instructions_intro_2a = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<p style="font-size: 18px;">More ${specCONFIG.LEFT_SHAPE}</p>
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>The [${CONFIG.LEFT_KEY.toUpperCase()}] key will be used to identify pictures with <span style="text-decoration: underline;">more ${specCONFIG.LEFT_SHAPE}.</span></p>
      <img style="width:${CONFIG.IMAGE_SIZE / 2}px;" src="${specCONFIG.LEFT_EXAMPLE}"></img>
      <p>Press the [${CONFIG.LEFT_KEY.toUpperCase()}] key to continue.</p>`
    } else {
      return `<p style="font-size: 18px;">More ${specCONFIG.LEFT_SHAPE}</p>
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>The LEFT side of the screen will be used to identify pictures with <span style="text-decoration: underline;">more ${specCONFIG.LEFT_SHAPE}.</span></p>
      <img style="width:${CONFIG.IMAGE_SIZE / 2}px;" src="${specCONFIG.LEFT_EXAMPLE}"></img>
      <p>Tap the LEFT side of the screen to continue.</p>`
    }
  },
  choices: [CONFIG.LEFT_KEY]
}

var instructions_intro_2b = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<p style="font-size: 18px;">More ${specCONFIG.RIGHT_SHAPE}</p>
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>The [${CONFIG.RIGHT_KEY.toUpperCase()}] key will be used to identify pictures with <span style="text-decoration: underline;">more ${specCONFIG.RIGHT_SHAPE}.</span></p>
      <img style="width:${CONFIG.IMAGE_SIZE / 2}px;" src="${specCONFIG.RIGHT_EXAMPLE}"></img>
      <p>Press the [${CONFIG.RIGHT_KEY.toUpperCase()}] key to continue.</p>`
    } else {
      return `<p style="font-size: 18px;">More ${specCONFIG.RIGHT_SHAPE}</p>
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>The RIGHT side of the screen will be used to identify pictures with <span style="text-decoration: underline;">more ${specCONFIG.RIGHT_SHAPE}.</span></p>
      <img style="width:${CONFIG.IMAGE_SIZE / 2}px;" src="${specCONFIG.RIGHT_EXAMPLE}"></img>
      <p>Tap the RIGHT side of the screen to continue.</p>`
    }
  },
  choices: [CONFIG.RIGHT_KEY]
}

var instructions_intro_3 = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<p>Now, let's take a practice run. You will see a fixation cross, '+', on the screen. You should always focus your
      attention on the fixation cross as this will help you identify the image as quickly and accurately as possible. The fixation
      cross will be followed by an image with more ${specCONFIG.LEFT_SHAPE} or more ${specCONFIG.RIGHT_SHAPE}. Remember, if you think there are more ${specCONFIG.LEFT_SHAPE}
      press the "${CONFIG.LEFT_KEY.toUpperCase()}" key. If you think there are more ${specCONFIG.RIGHT_SHAPE} press the "${CONFIG.RIGHT_KEY.toUpperCase()}" key.</p>
      <p>If you understand these directions and are ready to proceed to the practice round, please press the spacebar.</p>`
    } else {
      return `<p>Now, let's take a practice run. You will see a fixation cross, '+', on the screen. You should always focus your
      attention on the fixation cross as this will help you identify the image as quickly and accurately as possible. The fixation
      cross will be followed by an image with more ${specCONFIG.LEFT_SHAPE} or more ${specCONFIG.RIGHT_SHAPE}. Remember, if you think there are more ${specCONFIG.LEFT_SHAPE}
      tap the LEFT side of the screen. If you think there are more ${specCONFIG.RIGHT_SHAPE} tap the right side of the screen.</p>
      <p>If you understand these directions and are ready to proceed to the practice round, please tap the screen.</p>`
    }
  },
  choices: [32]
}

if (isMobile == true) {
  instructions_intro_1.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_intro_1a.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_intro_2.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_intro_2a.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", click_left)
  }
  instructions_intro_2b.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", click_right)
  }
  instructions_intro_3.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_intro_1.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
  instructions_intro_1a.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
  instructions_intro_2.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
  instructions_intro_2a.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", click_left)
  }
  instructions_intro_2b.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", click_right)
  }
  instructions_intro_3.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
}

var instructions_intro = {
  timeline: [instructions_intro_1, instructions_intro_1a, instructions_intro_2, instructions_intro_2a, instructions_intro_2b, instructions_intro_3]
}

var instructions_practice_loop = {
  type: 'html-keyboard-response',
  stimulus: function () {
    if (isMobile == false) {
      return `<p>Would you like to practice more? y = yes, n = no</p>`
    } else {
      return `<p>Would you like to practice more? LEFT = yes, RIGHT = no</p>`
    }
  },
  choices: ['y', 'n'],
  on_finish: function(data) {
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('y')) {
      more_practice = true;
    } else if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('n')) {
      more_practice = false;
    }
  }
}

var instructions_feedback_1 = {
  type: 'html-keyboard-response',
  stimulus: function () {
    if (specCONFIG.REWARD_AMOUNT == 0 || specCONFIG.REWARD_AMOUNT == null) {
      if (isMobile == false) {
        return `<p>For some trials, a correct identification will be rewarded with positive feedback.</p>
          <p>Press the spacebar to see what this will look like.</p>`
      } else {
        return `<p>For some trials, a correct identification will be rewarded with positive feedback.</p>
          <p>Tap the screen to see what this will look like.</p>`
      }
    } else {
      if (isMobile == false) {
        return `<p>For some trials, a correct identification will result in a monetary reward of ${specCONFIG.REWARD_AMOUNT} cents.</p>
          <p>Press the spacebar to see what this will look like.</p>`
      } else {
        return `<p>For some trials, a correct identification will result in a monetary reward of ${specCONFIG.REWARD_AMOUNT} cents.</p>
          <p>Tap the screen to see what this will look like.</p>`
      }
    }
  },
  choices: [32]
}

if (CONFIG.PLAY_REWARD_AUDIO) {
  var reward = {
    type: 'audio-keyboard-response',
    stimulus: CONFIG.REWARD_SOUND,
    prompt: function () {
      var fb = ""
      if (specCONFIG.REWARD_AMOUNT == 0 || specCONFIG.REWARD_AMOUNT == null) {
        fb = `<img src="${specCONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct!</p>`
      } else {
        fb = `<img src="${specCONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct! You win ${specCONFIG.REWARD_AMOUNT} cents!</p>`
      }
      if (isMobile == false) {
        fb += `
            <div style="position: absolute; top: 2vh; left: 2vw;">
              <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
              <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
            </div>
            <div style="position: absolute; top: 2vh; right: 2vw;">
              <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
              <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
            </div>`
      } else {
        fb += `
            <div style="position: absolute; top: 2vh; left: 2vw;">
              <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
              <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
            </div>
            <div style="position: absolute; top: 2vh; right: 2vw;">
              <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
              <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
            </div>`
      }
      return fb;
    },
    trial_duration: CONFIG.FEEDBACK_DURATION,
    choices: jsPsych.NO_KEYS
  }
} else {
  var reward = {
    type: 'html-keyboard-response',
    stimulus: function () {
      if (specCONFIG.REWARD_AMOUNT == 0 || specCONFIG.REWARD_AMOUNT == null) {
        return `<img src="${specCONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct!</p>`
      } else {
        return `<img src="${specCONFIG.REWARD_IMAGE}"></img><p class="feedback">Correct! You win ${specCONFIG.REWARD_AMOUNT} cents!</p>`
      }
    },
    prompt: function () {
      var fb = "";
      if (isMobile == false) {
        fb += `<div style="position: absolute; top: 2vh; left: 2vw;">
          <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
        </div>
        <div style="position: absolute; top: 2vh; right: 2vw;">
          <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
        </div>`
      } else {
        `<div style="position: absolute; top: 2vh; left: 2vw;">
          <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
        </div>
        <div style="position: absolute; top: 2vh; right: 2vw;">
          <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
        </div>`
      }
      return fb;
    },
    trial_duration: CONFIG.FEEDBACK_DURATION,
    choices: jsPsych.NO_KEYS
  }
}


var instructions_feedback_2 = {
  type: 'html-keyboard-response',
  stimulus: function () {
    var html = `<p><span style="color:red; font-weight:bold;">Not all</span> correct responses will receive a reward.</p>`
    if (specCONFIG.REWARD_AMOUNT != 0 && specCONFIG.REWARD_AMOUNT != null) {
      html += `<p>At the end of the experiment you will be given the amount of money you have accumulated. The more correct identifications
          you make, the more money you will take home.</p>`
    }
    html += `<p>${CONT_TEXT}</p>`;
    return html;
  },
  choices: [32]
}

var instructions_feedback_3 = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<p>We are now ready to begin the experiment.</p>
      <p>Remember, focus your attention on the fixation cross before each trial. If you think there are more ${specCONFIG.LEFT_SHAPE}
      press the "${CONFIG.LEFT_KEY.toUpperCase()}" key. If you think there are more ${specCONFIG.RIGHT_SHAPE} press the "${CONFIG.RIGHT_KEY.toUpperCase()}" key.</p>
      <p>Good luck!</p>
      <p>Press the spacebar to begin.</p>`
    } else {
      return `<p>We are now ready to begin the experiment.</p>
      <p>Remember, focus your attention on the fixation cross before each trial. If you think there are more ${specCONFIG.LEFT_SHAPE}
      tap the LEFT side of the screen. If you think there are more ${specCONFIG.RIGHT_SHAPE} tap the RIGHT side of the screen.</p>
      <p>Good luck!</p>
      <p>Tap to begin.</p>`
    }
  },
  choices: [32]
}

if (isMobile == true) {
  instructions_practice_loop.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", tap_practice_loop)
  }
  instructions_practice_loop.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", tap_practice_loop)
  }
  instructions_feedback_1.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_feedback_2.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_feedback_3.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  instructions_feedback_1.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
  instructions_feedback_2.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
  instructions_feedback_3.on_finish = function() {
    trial_start_time = performance.now();
    window.removeEventListener("click", advance)
  }
}

var instructions_feedback = {
  timeline: [instructions_feedback_1, reward, instructions_feedback_2, instructions_feedback_3]
}


/* task */

var fixation = {
  type: 'html-keyboard-response',
  stimulus: `<p class="fixation">+</p>`,
  choices: jsPsych.NO_KEYS,
  trial_duration: CONFIG.FIXATION_DURATION,
  prompt: function() {
    if (isMobile == false) {
      return `<div style="position: absolute; top: 2vh; left: 2vw;">
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
    </div>
    <div style="position: absolute; top: 2vh; right: 2vw;">
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
    </div>`
    } else {
      return `<div style="position: absolute; top: 2vh; left: 2vw;">
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
    </div>
    <div style="position: absolute; top: 2vh; right: 2vw;">
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
    </div>`
    }
  }
}

var target_display = {
  type: 'html-keyboard-response',
  stimulus: function () {
    if (CONFIG.IMAGE_SIZE <= window.innerWidth) {
      return `<img src="${jsPsych.timelineVariable('stimulus', true)}" style="width:${CONFIG.IMAGE_SIZE}px;"></img>`
    } else {
      return `<img src="${jsPsych.timelineVariable('stimulus', true)}" style="width:${window.innerWidth*0.8}px;"></img>`
    }
  },
  prompt: function() {
    if (isMobile == false) {
      return `<div style="position: absolute; top: 2vh; left: 2vw;">
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
    </div>
    <div style="position: absolute; top: 2vh; right: 2vw;">
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
    </div>`
    } else {
      return `<div style="position: absolute; top: 2vh; left: 2vw;">
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
    </div>
    <div style="position: absolute; top: 2vh; right: 2vw;">
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
    </div>`
    }
  },
  stimulus_duration: CONFIG.STIMULUS_DURATION,
  trial_duration_min: CONFIG.STIMULUS_DURATION,
  trial_duration: CONFIG.TRIAL_DURATION,
  choices: [CONFIG.LEFT_KEY, CONFIG.RIGHT_KEY],
  data: {
    block: jsPsych.timelineVariable('block'),
    trial: jsPsych.timelineVariable('trial'),
    rewarded: jsPsych.timelineVariable('rewarded'),
    image: jsPsych.timelineVariable('stimulus'),
    unrewarded_left_trials: function () { return unrewarded_left_trials; },
    unrewarded_right_trials: function () { return unrewarded_right_trials; },
    task: 'respond'
  },
  on_finish: function (data) {
    click_X = null;
    if (data.image.includes(specCONFIG.LEFT_PREFIX)) {
      data.correct_shape = specCONFIG.LEFT_SHAPE
    }
    if (data.image.includes(specCONFIG.RIGHT_PREFIX)) {
      data.correct_shape = specCONFIG.RIGHT_SHAPE
    }
    if (data.key_press == null) {
      data.response = null;
      data.correct = false;
    }
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(CONFIG.LEFT_KEY)) {
      data.response = specCONFIG.LEFT_SHAPE;
      data.correct = data.correct_shape == specCONFIG.LEFT_SHAPE;
    }
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(CONFIG.RIGHT_KEY)) {
      data.response = specCONFIG.RIGHT_SHAPE;
      data.correct = data.correct_shape == specCONFIG.RIGHT_SHAPE;
    }
    // below is to calculate whether a reward should be displayed on this trial
    // if a reward is scheduled...
    if (jsPsych.timelineVariable('rewarded', true) == 1) {
      // ... and they got it right
      if (data.correct) {
        data.did_reward = true;
      } else {
        // otherwise, add unrewarded
        if (data.correct_shape == specCONFIG.LEFT_SHAPE) {
          unrewarded_left_trials++;
        }
        if (data.correct_shape == specCONFIG.RIGHT_SHAPE) {
          unrewarded_right_trials++;
        }
        data.did_reward = false;
      }
    // if a reward is not scheduled...
    } else {
      // ... and they got it right
      if (data.correct) {
        // assume no reward first ...
        data.did_reward = false
        // but if there is an unrewarded trial...
        if (data.correct_shape == specCONFIG.LEFT_SHAPE && unrewarded_left_trials > 0) {
          unrewarded_left_trials--;
          // do the reward...
          data.did_reward = true;
        }
        if (data.correct_shape == specCONFIG.RIGHT_SHAPE && unrewarded_right_trials > 0) {
          unrewarded_right_trials--;
          // do the reward...
          data.did_reward = true;
        }
      // ... and they got it wrong, no makeup reward
      } else {
        data.did_reward = false;
      }
    }
    console.log(data.did_reward);
  }
}

if (isMobile == true) {
  target_display.on_load = function() {
    click_X = null;
    trial_start_time = performance.now();
    window.addEventListener("click", advance)
  }
  target_display.on_finish = function (data) {
    window.removeEventListener("click", advance)
    if (data.image.includes(specCONFIG.LEFT_PREFIX)) {
      data.correct_shape = specCONFIG.LEFT_SHAPE
    }
    if (data.image.includes(specCONFIG.RIGHT_PREFIX)) {
      data.correct_shape = specCONFIG.RIGHT_SHAPE
    }
    if (click_X == null) {
      data.response = null;
      data.correct = false;
    } else {
      if (click_X < window.innerWidth / 2) {
        console.log(click_X);
        data.response = specCONFIG.LEFT_SHAPE;
        data.correct = data.correct_shape == specCONFIG.LEFT_SHAPE;
      }
      if (click_X > window.innerWidth / 2) {
        data.response = specCONFIG.RIGHT_SHAPE;
        data.correct = data.correct_shape == specCONFIG.RIGHT_SHAPE;
      }
    }
    // below is to calculate whether a reward should be displayed on this trial
    // if a reward is scheduled...
    if (jsPsych.timelineVariable('rewarded', true) == 1) {
      // ... and they got it right
      if (data.correct) {
        data.did_reward = true;
      } else {
        // otherwise, add unrewarded
        if (data.correct_shape == specCONFIG.LEFT_SHAPE) {
          unrewarded_left_trials++;
        }
        if (data.correct_shape == specCONFIG.RIGHT_SHAPE) {
          unrewarded_right_trials++;
        }
        data.did_reward = false;
      }
    // if a reward is not scheduled...
    } else {
      // ... and they got it right
      if (data.correct) {
        // assume no reward first ...
        data.did_reward = false
        // but if there is an unrewarded trial...
        if (data.correct_shape == specCONFIG.LEFT_SHAPE && unrewarded_left_trials > 0) {
          unrewarded_left_trials--;
          // do the reward...
          data.did_reward = true;
        }
        if (data.correct_shape == specCONFIG.RIGHT_SHAPE && unrewarded_right_trials > 0) {
          unrewarded_right_trials--;
          // do the reward...
          data.did_reward = true;
        }
      // ... and they got it wrong, no makeup reward
      } else {
        data.did_reward = false;
      }
    }
    console.log(data.response);
  }
  window.removeEventListener("click", advance)
}

var timeout_display = {
  timeline: [{
    type: 'html-keyboard-response',
    stimulus: function () {
      if (isMobile == false) {
        return `<p>Time out!</p>
          <p>Press the ${CONFIG.LEFT_KEY.toUpperCase()} or ${CONFIG.RIGHT_KEY.toUpperCase()} key to continue.</p>`
      } else {
        return `<p>Time out!</p>
          <p>Tap to continue.</p>`
      }
    },
    choices: [CONFIG.LEFT_KEY, CONFIG.RIGHT_KEY],
    prompt: function () {
      if (isMobile == false) {
        return `
        <div style="position: absolute; top: 2vh; left: 2vw;">
          <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
        </div>
        <div style="position: absolute; top: 2vh; right: 2vw;">
          <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
        </div>`
      } else {
        return `
        <div style="position: absolute; top: 2vh; left: 2vw;">
          <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
        </div>
        <div style="position: absolute; top: 2vh; right: 2vw;">
          <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
          <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
        </div>`
      }
    }
  }],
  conditional_function: function () {
    return jsPsych.data.get().filter({ task: 'respond' }).last(1).values()[0].response == null;
  }
}

if (isMobile == true) {
  timeout_display.on_load = function() {
    trial_start_time = performance.now();
    window.addEventListener("click", advance);
  }
  timeout_display.on_finish = function (data) {
    window.removeEventListener("click", advance);
  }
}

if (CONFIG.PLAY_REWARD_AUDIO) {
  var practice_feedback = {
    type: 'audio-keyboard-response',
    stimulus: function () {
      var last_trial = jsPsych.data.get().filter({ task: 'respond' }).last(1).values()[0]
      if (last_trial.key_press == null) {
        return null;
      }
      if (last_trial.correct) {
        return CONFIG.REWARD_SOUND;
      } else {
        return null;
      }
    },
    prompt: function () {
      var last_trial = jsPsych.data.get().filter({ task: 'respond' }).last(1).values()[0];
      var fb = "";
      if ((last_trial.key_press == null) && (click_X == null)) {
        fb = `<p class="feedback">Please respond faster.</p>`;
      } else {
        if (last_trial.correct) {
          fb = `<p class="feedback">Correct</p>`
        } else {
          fb = `<p class="feedback">Incorrect</p>`
        }
      }
      if (isMobile == false) {
        fb += `
          <div style="position: absolute; top: 2vh; left: 2vw;">
            <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
            <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
          </div>
          <div style="position: absolute; top: 2vh; right: 2vw;">
            <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
            <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
          </div>`
        return fb;
      } else {
        fb += `
          <div style="position: absolute; top: 2vh; left: 2vw;">
            <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
            <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
          </div>
          <div style="position: absolute; top: 2vh; right: 2vw;">
            <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
            <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
          </div>`
        return fb;
      }
    },
    trial_duration: CONFIG.FEEDBACK_DURATION,
    choices: jsPsych.NO_KEYS,
    data: {
      task: 'accuracy-feedback'
    }
  }
} else {
  var practice_feedback = {
    type: 'html-keyboard-response',
    stimulus: function () {
      var last_trial = jsPsych.data.get().filter({ task: 'respond' }).last(1).values()[0]
      if ((last_trial.key_press == null) && (click_X == null)) {
        return `<p class="feedback">Please respond faster.</p>`;
      }
      if (last_trial.correct) {
        return `<p class="feedback">Correct</p>`
      } else {
        return `<p class="feedback">Incorrect</p>`
      }
    },
    prompt: function() {
      if (isMobile == false) {
        return `<div style="position: absolute; top: 2vh; left: 2vw;">
        <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
        <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
      </div>
      <div style="position: absolute; top: 2vh; right: 2vw;">
        <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
        <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
      </div>`
      } else {
        return `<div style="position: absolute; top: 2vh; left: 2vw;">
        <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
        <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
      </div>
      <div style="position: absolute; top: 2vh; right: 2vw;">
        <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
        <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
      </div>`
      }
    },
    trial_duration: CONFIG.FEEDBACK_DURATION,
    choices: jsPsych.NO_KEYS,
    data: {
      task: 'accuracy-feedback'
    }
  }
}

var blank_screen = {
  type: 'html-keyboard-response',
  stimulus: function() {
    if (isMobile == false) {
      return `<div style="position: absolute; top: 2vh; left: 2vw;">
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>${CONFIG.LEFT_KEY.toUpperCase()} = ${specCONFIG.LEFT_SHAPE}</p>
    </div>
    <div style="position: absolute; top: 2vh; right: 2vw;">
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>${CONFIG.RIGHT_KEY.toUpperCase()} = ${specCONFIG.RIGHT_SHAPE}</p>
    </div>`
    } else {
      return `<div style="position: absolute; top: 2vh; left: 2vw;">
      <img src="${specCONFIG.LEFT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>LEFT = ${specCONFIG.LEFT_SHAPE}</p>
    </div>
    <div style="position: absolute; top: 2vh; right: 2vw;">
      <img src="${specCONFIG.RIGHT_SINGLE_EXAMPLE}" style="width:100px;"></img>
      <p>RIGHT = ${specCONFIG.RIGHT_SHAPE}</p>
    </div>`
    }
  },
  trial_duration: CONFIG.FEEDBACK_DURATION,
  choices: jsPsych.NO_KEYS
}

var feedback = {
  timeline: [reward],
  data: {
    task: 'reward-feedback'
  },
  conditional_function: function () {
    return jsPsych.data.get().filter({ task: 'respond' }).last(1).values()[0].did_reward;
  }
}

var blank_in_place_of_feedback = {
  timeline: [blank_screen],
  conditional_function: function () {
    // this checks if the last trial was a feedback trial, in which case
    // we don't need to show this blank screen
    return jsPsych.data.get().last(1).values()[0].task != 'reward-feedback';
  }
}

/* save data */

var save_data = {
  type: 'call-function',
  func: function () {
    if (CONFIG.SAVE_DATA_TYPE == 'tmb') {
      var results = jsPsych.data.get().ignore("internal_node_id").ignore("key_press").values();
      var score = 0;
      var outcomes = {};
      tmbSubmitToServer(results, score, outcomes);
    }
    if (CONFIG.SAVE_DATA_TYPE == 'local') {
      var randomID = jsPsych.randomization.randomID(6);
      jsPsych.data.get().ignore("internal_node_id").ignore("key_press").localSave('csv', `prt-data-${randomID}.csv`)
    }
    if (CONFIG.SAVE_DATA_TYPE == 'cognition') {
      return; // don't need to do anything because cognition.run automatically saves data.
    }
    if (CONFIG.SAVE_DATA_TYPE == 'redcap') {
      console.log("Sending responses to RedCap");
      const url = 'https://redcap.case.edu/api/';
      var filename = 'prt_data_json'.concat("_", jsPsych.data.get().values()[0]['subject_id'], "_", jsPsych.data.get().values()[0]['time'], ".json");
      const file = new File([JSON.stringify(jsPsych.data.get().ignore("internal_node_id").ignore("key_press").values())], filename);
      const formData = new FormData();
      formData.append('token', 'BBB56B8445954A08A65E9517DB426E2F');
      formData.append('content', 'file');
      formData.append('action', 'import');
      formData.append('field', 'prt_data_json'.concat("_", jsPsych.data.get().values()[0]['time']));
      formData.append('event', 'intake_arm_1');
      formData.append('record', jsPsych.data.get().values()[0]['subject_id']);
      formData.append('file', file);
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false, // Set contentType to false to let jQuery set the correct content type
        processData: false, // Set processData to false to prevent jQuery from processing the data
        success: function(response) {
            console.log('Data sent to REDCap. Response:', response);
        },
        error: function(error) {
            console.error('Failed to send data to REDCap:', error);
        }
      });

      const formData2 = new FormData();
      var total_earned = jsPsych.data.get().filter({task: 'reward-feedback'}).count() * specCONFIG.REWARD_AMOUNT / 100;
      if (total_earned.toFixed(2) > 7) {
        var earned_redcap = 7.00;
      } else {
        var earned_redcap = total_earned.toFixed(2);
      }
      formData2.append('token', 'BBB56B8445954A08A65E9517DB426E2F');
      formData2.append('content', 'record');
      formData2.append('action', 'import');
      formData2.append('field', 'prt_t'.concat(jsPsych.data.get().values()[0]['time'], '_earnings'));
      formData2.append('event', 'intake_arm_1');
      formData2.append('record', jsPsych.data.get().values()[0]['subject_id']);
      formData2.append('data', `$${earned_redcap}`);
      $.ajax({
        url: url,
        type: 'POST',
        data: formData2,
        contentType: false, // Set contentType to false to let jQuery set the correct content type
        processData: false, // Set processData to false to prevent jQuery from processing the data
        success: function(response) {
            console.log('Data sent to REDCap. Response:', response);
        },
        error: function(error) {
            console.error('Failed to send data to REDCap:', error);
        }
      });

    };
  }
}

/* end */

var final_screen = {
  type: 'html-keyboard-response',
  choices: jsPsych.NO_KEYS,
  stimulus: function () {
    var correct_trial_count = jsPsych.data.get().filter({ task: 'respond', phase: 'test', correct: true }).count();
    var total_trial_count = jsPsych.data.get().filter({ task: 'respond', phase: 'test' }).count();

    var total_earned = jsPsych.data.get().filter({task: 'reward-feedback'}).count() * specCONFIG.REWARD_AMOUNT / 100;

    var output_html = `<p>You have completed the task!</p>`

    if (CONFIG.SHOW_ACCURACY_AT_END) {

      output_html += `<p>You responded correctly on ${correct_trial_count} of ${total_trial_count} trials.</p>`
    }
    if (specCONFIG.REWARD_AMOUNT != null && specCONFIG.REWARD_AMOUNT != 0) {
      if (total_earned.toFixed(2) > 7) {
        output_html += `<p>You earned $7.00!</p>`
      } else {
        output_html += `<p>You earned $${total_earned.toFixed(2)}!</p>`
      }
    }
    output_html += `<p>Please let the study team know that you are finished with this task.</p>`
    return output_html;
  },
  on_load: function () {
    if (CONFIG.SAVE_DATA_TYPE == 'cognition') {
      // if running on cognition.run, this seems to help with saving final bit of data and marking the task as finalized.
      jsPsych.endExperiment();
    }
  }
}


/* initialization */
var timeline_entry = [];

timeline_entry.push(id_entry);
timeline_entry.push(version_select);

var audio = [];
if (CONFIG.PLAY_REWARD_AUDIO) {
  audio.push(CONFIG.REWARD_SOUND)
}

/* add TMB script if using TMB to save data */
if (CONFIG.SAVE_DATA_TYPE == 'tmb') {
  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src = "TestMyBrain.12.18.min.js";
  head.appendChild(js);
}

jsPsych.init({
  timeline: timeline_entry,
  preload_images: specCONFIG.IMAGE_LIST,
  preload_audio: audio,
  use_webaudio: releaseversion,
  experiment_width: 800
})