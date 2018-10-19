// LICENCE -----------------------------------------------------------------------------
//
// Copyright 2018 - Cédric Batailler
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be included in all copies
// or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// OVERVIEW -----------------------------------------------------------------------------
//
// TODO:
// 
// dirty hack to lock scrolling ---------------------------------------------------------
// note that jquery needs to be loaded.
$('body').css({'overflow':'hidden'});
  $(document).bind('scroll',function () { 
       window.scrollTo(0,0); 
  });

// safari & ie exclusion ----------------------------------------------------------------
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var is_ie = /*@cc_on!@*/false || !!document.documentMode;

var is_compatible = !(is_safari || is_ie);


if(!is_compatible) {

    var safari_exclusion = {
        type: "html-keyboard-response",
        stimulus:
        "<p>Sorry, this study is not compatible with your browser.</p>" +
        "<p>Please try again with a compatible browser (e.g., Chrome or Firefox).</p>",
        choices: jsPsych.NO_KEYS
    };

    var timeline_safari = [];

    timeline_safari.push(safari_exclusion);
    jsPsych.init({timeline: timeline_safari});

}
// keen.io initialization ---------------------------------------------------------------
// This part will work only if stream_projectID & stream_writeKey have been defined.
// nb: the bang (!) is for self-invoking function.

!function(name,path,ctx){
  'use strict';
  var latest,prev=name!=='Keen'&&window.Keen?window.Keen:false;ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;latest=w.Keen;if(prev){w.Keen=prev}else{try{delete w.Keen}catch(e){w.Keen=void 0}}ctx[name]=latest;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}
}('KeenAsync','https://d26b395fwzu5fz.cloudfront.net/keen-tracking-1.1.3.min.js',this);

// Variable input -----------------------------------------------------------------------
// Variable used to define experimental condition.

var vaast_condition_approach_1 = jsPsych.randomization.sampleWithoutReplacement(["approach_black", "approach_white"], 1)[0];
var iat_self    = jsPsych.randomization.sampleWithoutReplacement(["left", "right"], 1)[0];; // either "left" or "right"
var iat_maths_1 = jsPsych.randomization.sampleWithoutReplacement(["left", "right"], 1)[0];; // either "left" or "right"

var jspsych_id  = jsPsych.randomization.randomID();

 // cursor helper functions
var hide_cursor = function() {
	document.querySelector('head').insertAdjacentHTML('beforeend', '<style id="cursor-toggle"> html { cursor: none; } </style>');
}
var show_cursor = function() {
	document.querySelector('#cursor-toggle').remove();
}

var hiding_cursor = {
    type: 'call-function',
    func: hide_cursor
}

var showing_cursor = {
    type: 'call-function',
    func: show_cursor
}

// VAAST --------------------------------------------------------------------------------
// VAAST variables ----------------------------------------------------------------------
// On duplique chacune des variable pour correspondre au bloc 1 et au bloc 2 !

var movement_black_1    = undefined;
var movement_white_1    = undefined;
var group_to_approach_1 = undefined;
var group_to_avoid_1    = undefined;
var movement_black_2    = undefined;
var movement_white_2    = undefined;
var group_to_approach_2 = undefined;
var group_to_avoid_2    = undefined;

switch(vaast_condition_approach_1) {
  case "approach_black":
    movement_black_1    = "approach";
    movement_white_1    = "avoidance";
    group_to_approach_1 = "black";
    group_to_avoid_1    = "white";
    movement_black_2    = "avoidance";
    movement_white_2    = "approach";
    group_to_approach_2 = "white";
    group_to_avoid_2    = "black";
    break;

  case "approach_white":
    movement_black_1    = "avoidance";
    movement_white_1    = "approach";
    group_to_approach_1 = "white";
    group_to_avoid_1    = "black";
    movement_black_2    = "approach";
    movement_white_2    = "avoidance";
    group_to_approach_2 = "black";
    group_to_avoid_2    = "white";
    break;
}

// VAAST stimuli ------------------------------------------------------------------------
// vaast image stimuli ------------------------------------------------------------------
// Ici, on ajoute un nouveau mouvement, en fonction du bloc de la vaast on appellera soit
// movement_1 ou movement_2.

var vaast_stim_training = [
  {movement_1: movement_black_1, movement_2: movement_black_2, group: "black", stimulus: "Jamel"},
  {movement_1: movement_black_1, movement_2: movement_black_2, group: "black", stimulus: "Alonzo"},
  {movement_1: movement_white_1, movement_2: movement_white_2,  group: "white",  stimulus: "Chip"},
  {movement_1: movement_white_1, movement_2: movement_white_2,  group: "white",  stimulus: "Adam"}
]

var vaast_stim = [
  {movement_1: movement_black_1, movement_2: movement_black_2, group: "black", stimulus: "Jamel"},
  {movement_1: movement_black_1, movement_2: movement_black_2, group: "black", stimulus: "Alonzo"},
  {movement_1: movement_white_1, movement_2: movement_white_2, group: "white",  stimulus: "Chip"},
  {movement_1: movement_white_1, movement_2: movement_white_2, group: "white",  stimulus: "Adam"}
];

// vaast background images --------------------------------------------------------------,

var background = [
  "background/2.jpg",
  "background/2.jpg",
  "background/4.jpg",
  "background/6.jpg",
  "background/6.jpg"
];


// vaast stimuli sizes -------------------------------------------------------------------

var stim_sizes = [
  40,
  42,
  46,
  52,
  54
];

// Helper functions ---------------------------------------------------------------------
// next_position():
// Compute next position as function of current position and correct movement. Because
// participant have to press the correct response key, it always shows the correct
// position.
var next_position_training = function(){
  var current_position = jsPsych.data.getLastTrialData().values()[0].position;
  var current_movement = jsPsych.data.getLastTrialData().values()[0].movement;
  var position = current_position;

  if(current_movement == "approach") {
    position = position + 1;
  }

  if(current_movement == "avoidance") {
    position = position -1;
  }

  return(position)
}

var next_position = function(){
  var current_position = jsPsych.data.getLastTrialData().values()[0].position;
  var last_keypress = jsPsych.data.getLastTrialData().values()[0].key_press;

  var approach_key = jsPsych.pluginAPI.convertKeyCharacterToKeyCode('y');
  var avoidance_key = jsPsych.pluginAPI.convertKeyCharacterToKeyCode('n');

  var position = current_position;

  if(last_keypress == approach_key) {
    position = position + 1;
  }

  if(last_keypress == avoidance_key) {
    position = position -1;
  }

  return(position)
}

// Saving blocks ------------------------------------------------------------------------
// Every function here send the data to keen.io. Because data sent is different according
// to trial type, there are differents function definition.

// init ---------------------------------------------------------------------------------
var saving_id = function(){

  KeenAsync.ready(function(){
    var client = new KeenAsync({
      projectId: stream_projectID,
      writeKey: stream_writeKey,
    });
    if(data_stream) {
      client.recordEvent('stream_browser_info', {
        session_id: jspsych_id,
        experimental_condition: vaast_condition_approach_1,
        "user_agent": "${keen.user_agent}",
        res_height: window.screen.availHeight,
        res_width: window.screen.availWidth,
      });
    }
  });
}

// vaast trial --------------------------------------------------------------------------
var saving_vaast_trial = function(){
  KeenAsync.ready(function(){
    var client = new KeenAsync({
      projectId: stream_projectID,
      writeKey: stream_writeKey
    });
    if(data_stream) {
      client.recordEvent('stream_vaast_trial', {
        session_id: jspsych_id,
        experimental_condition: vaast_condition_approach_1,
        vaast_trial_data: jsPsych.data.get().last(3).json()
      });
    }
  });
}

// demographic logging ------------------------------------------------------------------
var saving_demographics = function(){
  KeenAsync.ready(function(){
    var client = new KeenAsync({
      projectId: stream_projectID,
      writeKey: stream_writeKey
    });
    if(data_stream) {
      client.recordEvent('stream_demographics', {
        session_id: jspsych_id,
        experimental_condition: vaast_condition_approach_1,
        demographics_data: jsPsych.data.get().last(5).json()
      });
    }
  });
}

// iat trial ----------------------------------------------------------------------------
var saving_iat_trial = function(){
  KeenAsync.ready(function(){
    var client = new KeenAsync({
      projectId: stream_projectID,
      writeKey: stream_writeKey
    });
    if(data_stream) {
      client.recordEvent('stream_iat', {
        session_id: jspsych_id,
        experimental_condition: vaast_condition_approach_1,
        iat_self_side: iat_self,
        iat_maths_1_side: iat_maths_1,
        iat_trial_data: jsPsych.data.get().last().json()
      });
    }
  });
}


var saving_browser_events = function(completion) {
  KeenAsync.ready(function(){
    var client = new KeenAsync({
        projectId: stream_projectID,
        writeKey: stream_writeKey
      });
      if(data_stream) {
        client.recordEvent('stream_browser_event', {
          session_id: jspsych_id,
          event_data: jsPsych.data.getInteractionData().json(),
          completion: completion
        });
      }
  });
}
// saving blocks ------------------------------------------------------------------------
var save_id = {
    type: 'call-function',
    func: saving_id
}

var save_vaast_trial = {
    type: 'call-function',
    func: saving_vaast_trial
}

var save_iat_trial = {
    type: 'call-function',
    func: saving_iat_trial
}

var save_demographics = {
    type: 'call-function',
    func: saving_demographics
}

// iat sampling function ----------------------------------------------------------------
var sample_n_iat = function(list, n) {
  list = jsPsych.randomization.sampleWithReplacement(list, n);
  list = jsPsych.randomization.shuffleNoRepeats(list);

  return(list);
}

// EXPERIMENT ---------------------------------------------------------------------------
// initial instructions -----------------------------------------------------------------
var welcome = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Welcome </h1>" +
    "<p class='instructions'> First, thank you for taking part to this study.<p>" +
    "<p class='instructions'> During this study, you will have to complete two different tasks. We" +
    "will gather data related to how you complete them, but " + 
    "no personally identifying information will be collected. </p>" +
    "<p class='instructions'> Because we rely on third party services to gather data, ad-blocking" +
    "software might interfere with data collection. Therefore, please" +
    "disable your ad-blocking software during this study." +
    "<b>If we cannot collect your data, we will not be able to reward you for " +
    "your participation</b>. </p>" +
    "<p class='instructions'>If you have any question related to this research, please " +
    "e-mail marine.rougier@uclouvain.be</p>" +
    "<p class = 'continue-instructions'>Press <strong>espace</strong> to start the study.</p>",
  choices: [32]
};

var welcome_2 = {
  type: "html-button-response",
  stimulus:
    "<p class='instructions'>Before going further, please note that this study should take" +
    "XXX minutes to complete.</p>",
  choices: ['I have enough time', 'I do not have enough time'],
};

var not_enough_time_to_complete = {
    type: 'html-button-response',
    stimulus: '<p>Please come back later to take part in this experiment.</p>',
    choices: ['Go back to Prolific Academic'],
};

var redirect_to_prolific = {
    type: 'call-function',
    func: function() {
        window.location.href = "https://www.prolific.ac/";
        jsPsych.pauseExperiment();
    }
}

var if_not_enough_time = {
    timeline: [not_enough_time_to_complete, redirect_to_prolific],
    conditional_function: function(){
        // get the data from the previous trial,
        // and check which key was pressed
        var data = jsPsych.data.getLastTrialData().values()[0].button_pressed;
        if(data == 1){
            return true;
        } else {
            return false;
        }
    }
}

var welcome_3 = {
  type: "html-keyboard-response",
  stimulus:
    "<p class='instructions'>We will now proceed to a test of your connection to our server. " +
    "If this test fails, please check your Internet connection and make sure you have " +
    "actually disabled your ad-blocking software.</p>" +
    "<p class='instructions'>This test should last less than 5 seconds.</p>" +
    "<p class ='continue-instructions'>Press <strong>space</strong> to continue.</p>",
  choices: [32]
};

// ping keen.io -------------------------------------------------------------------------

var keen_ping = {
    type: 'keen-ping',
    loader_image: 'media/loading.gif',
    stream_name: 'stream_ping',
    write_key: stream_writeKey,
    project_id: stream_projectID,
    session_id: jspsych_id,
    choices: [32]
  }


// Switching to fullscreen --------------------------------------------------------------
var fullscreen_trial = {
  type: 'fullscreen',
  message:  '<p>To take part in this study, your browser needs to be set to fullscreen.</p>',
  button_label: 'Switch to fullscreen',
  fullscreen_mode: true
}


// Initial instructions -----------------------------------------------------------------
// First slide --------------------------------------------------------------------------
var instructions = {
  type: "html-keyboard-response",
  stimulus:
    "<p>You are now about to start the study. In this study, you will engage in different tasks.</p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to start Task 1.</p>",
  choices: [32]
};


// VAAST --------------------------------------------------------------------------------
var vaast_instructions_1 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Video Game task</h1>" +
    "<p class='instructions'>In this task, just like in a videogame, you " +
    "will act within the environment presented below." +
   "<p class='instructions'> You will be able to move forward and backward" +
    " using the arrow keys on your keyboard.</p>" +
    "<p class='instructions'>First names will appear within the" +
    " environment and you will have to approach them or avoid them" +
    " according to the category they belong to.</p>" +
    "<br>" +
    "<img src = 'media/vaast-background.png'>" +
    "<br>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to" +
    " continue.</p>",
  choices: [32]
};

var vaast_instructions_2 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Video Game task </h1>" +
    "<p class='instructions'> A series of first names will be displayed in this environment. " +
    "As you will see, some of these first names are usually associated" +
    "with Black people (typical Black people first names) vs. with White people (typical White people first names)." +
    "<p class='instructions'>Your task is to move forward or backward as a function of these first names " +
    "(more specific instructions following) and this by using the following keys on your keyboard </p>" +
    "<p class='instructions'>Y = to MOVE FORWARD " +
    " H = START key" +
    " N = to MOVE BACKWARD </p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to" +
    " continue.</p>",
  choices: [32]
};

var vaast_instructions_3 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Video Game task </h1>" +
    "<p class='instructions'>At the beginning of each trial, you will see the “O” symbol." +
    "This symbol indicates that you have to press the START key (namely the H key) to start the trial. </p>" +
    "<p class='instructions'>Then, you will see a fixation cross (+) in the center of the screen followed by a first name.</p>" +
    "<p class='instructions'>Your task is to move forward or backward by pressing the MOVE FORWARD (the Y key)" +
    "or MOVE BACKWARD (the N key ) key as fast as possible." +
    "<p class='instructions'>Please use only the index of your dominant hand for all these actions.</p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to" +
    " continue.</p>",
  choices: [32]
};

var vaast_instructions_4 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Video Game task - Instructions for this section</h1>" +
    "<p class='instructions'>You have to : " +
    "<ul class='instructions'>" +
    "<li><strong>Approach (move forward) typical " + group_to_approach_1 + "first names by pressing the Y key </strong></li>" +
    "<li><strong>Avoid (move backward) typical " + group_to_avoid_1 + "first names by pressing the N key</strong></li>" +
    "</ul>" +
    "<p class='instructions'>It is very important to remember which action you will " +
    "have to perform for each category. You need this information to complete the " +
    "task successfully</p>" +
    "<strong> Also, it is EXTREMELY IMPORTANT that you try to respond as fast and as correctly as possible. </strong>." +
    "<p class ='instructions'>You will start with a training phase.</p>" +
    "<p class ='instructions'><u>WARNING</u>: we will report your errors ONLY in the training phase,  " +
    "so read and memorize the instructions above." + 
    "If your response is false, you will have to make the opposite and correct action" +
    "<p class = 'continue-instructions'>Press <strong>enter</strong> to " +
    "begin the training.</p>",
  choices: [13]
};


var vaast_instructions_5 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Tâche du Jeu Vidéo </h1>" +
    "<p class='instructions'>L'entraînement est maintenant terminé. </p>" +
    "<p class='instructions'><u>ATTENTION</u> : vous n'aurez plus de messages pour signaler vos erreurs.</p>" +
    "<p class='instructions'>Donc rappelez-vous bien, vous devez :</p>" +
    "<ul class='instructions'>" +
     "<li>" +
      "<strong>ALLER VERS les mots " + group_to_approach_1 + " (en appuyant sur Y)</strong>" +
     "</li>" +
     "<li>" +
      "<strong>VOUS ÉLOIGNER des mots " + group_to_avoid_1 + " (en appuyant sur N)</strong>" +
     "</li>" +
    "</ul>" +
    "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour commencer la tâche.</p>",
  choices: [32]
};

var vaast_instructions_6 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Tâche du Jeu Vidéo </h1>" +
    "<p class='instructions'>Vous devrez : " +
    "<ul class='instructions'>" +
    "<li><strong>ALLER VERS les mots " + group_to_approach_2 + " (en appuyant sur Y)</strong></li>" +
    "<li><strong> VOUS ÉLOIGNER des mots " + group_to_avoid_2 + " (en appuyant sur N)</strong></li>" +
    "</ul>" +
    "<p class='instructions'>Il est très important de vous souvenir de ces consignes pour pouvoir " +
    "réaliser la tâche correctement. Il est également EXTRÊMEMENT important d'essayer de répondre " +
    "<strong>LE PLUS RAPIDEMENT ET LE PLUS EXACTEMENT POSSIBLE</strong>." +
    "<p class ='instructions'>Vous allez commencer par une phase d'entraînement.</p>" +
    "<p class ='instructions'><u>ATTENTION</u> : nous vous signalerons vos erreurs uniquement " +
    "dans la phase d'entraînement, donc relisez et mémorisez bien les consignes ci-dessus. " + 
    "Si vous commettez une erreur, vous devrez vous corriger." +
    "<p class = 'continue-instructions'>Appuyez sur <strong>entrée</strong> pour " +
    "commencer l'entraînement.</p>",
  choices: [13]
};


var vaast_instructions_7 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Tâche du Jeu Vidéo </h1>" +
    "<p class='instructions'>L'entraînement est maintenant terminé. </p>" +
    "<p class='instructions'><u>ATTENTION</u> : vous n'aurez plus de messages pour signaler vos erreurs.</p>" +
    "<p class='instructions'>Donc rappelez-vous bien, vous devez :</p>" +
    "<ul class='instructions'>" +
     "<li>" +
      "<strong>ALLER VERS les mots " + group_to_approach_2 + " (en appuyant sur Y)</strong>" +
     "</li>" +
     "<li>" +
      "<strong>VOUS ÉLOIGNER des mots " + group_to_avoid_2 + " (en appuyant sur N)</strong>" +
     "</li>" +
    "</ul>" +
    "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour commencer la tâche.</p>",
  choices: [32]
};

// Creating a trial ---------------------------------------------------------------------
// Note: vaast_start trial is a dirty hack which uses a regular vaast trial. The correct
// movement is approach and the key corresponding to approach is "h", thus making the
// participant press "h" to start the trial. 

// Ici encore tout est dupliqué pour correspondre aux deux blocs de la vaast, les trials
// et les procédures, training compris.

var vaast_start = {
  type: 'vaast-text',
  stimulus: "o",
  position: 2,
  background_images: background,
  font_sizes:  stim_sizes,
  approach_key: "h",
  stim_movement: "approach",
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: true,
  display_feedback: true,
  response_ends_trial: true
}

var vaast_fixation = {
  type: 'vaast-fixation',
  fixation: "+",
  font_size:  46,
  position: 2,
  background_images: background
}

var vaast_first_step_training_1 = {
  type: 'vaast-text',
  stimulus: jsPsych.timelineVariable('stimulus'),
  position: 2,
  background_images: background,
  font_sizes:  stim_sizes,
  approach_key: "y",
  avoidance_key: "n",
  stim_movement: jsPsych.timelineVariable('movement_1'),
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: true,
  display_feedback: true,
  response_ends_trial: true
}

var vaast_second_step_training_1 = {
  type: 'vaast-text',
  position: next_position_training,
  stimulus: jsPsych.timelineVariable('stimulus'),
  background_images: background,
  font_sizes:  stim_sizes,
  stim_movement: jsPsych.timelineVariable('movement_1'),
  response_ends_trial: false,
  trial_duration: 650
}

var vaast_first_step_1 = {
  type: 'vaast-text',
  stimulus: jsPsych.timelineVariable('stimulus'),
  position: 2,
  background_images: background,
  font_sizes:  stim_sizes,
  approach_key: "y",
  avoidance_key: "n",
  stim_movement: jsPsych.timelineVariable('movement_1'),
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: false,
  display_feedback: false,
  response_ends_trial: true
}

var vaast_second_step_1 = {
  type: 'vaast-text',
  position: next_position,
  stimulus: jsPsych.timelineVariable('stimulus'),
  background_images: background,
  font_sizes:  stim_sizes,
  stim_movement: jsPsych.timelineVariable('movement_1'),
  response_ends_trial: false,
  trial_duration: 650
}

var vaast_first_step_training_2 = {
  type: 'vaast-text',
  stimulus: jsPsych.timelineVariable('stimulus'),
  position: 2,
  background_images: background,
  font_sizes:  stim_sizes,
  approach_key: "y",
  avoidance_key: "n",
  stim_movement: jsPsych.timelineVariable('movement_2'),
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: true,
  display_feedback: true,
  response_ends_trial: true
}

var vaast_second_step_training_2 = {
  type: 'vaast-text',
  position: next_position_training,
  stimulus: jsPsych.timelineVariable('stimulus'),
  background_images: background,
  font_sizes:  stim_sizes,
  stim_movement: jsPsych.timelineVariable('movement_2'),
  response_ends_trial: false,
  trial_duration: 650
}

var vaast_first_step_2 = {
  type: 'vaast-text',
  stimulus: jsPsych.timelineVariable('stimulus'),
  position: 2,
  background_images: background,
  font_sizes:  stim_sizes,
  approach_key: "y",
  avoidance_key: "n",
  stim_movement: jsPsych.timelineVariable('movement_2'),
  html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
  force_correct_key_press: false,
  display_feedback: false,
  response_ends_trial: true
}

var vaast_second_step_2 = {
  type: 'vaast-text',
  position: next_position,
  stimulus: jsPsych.timelineVariable('stimulus'),
  background_images: background,
  font_sizes:  stim_sizes,
  stim_movement: jsPsych.timelineVariable('movement_2'),
  response_ends_trial: false,
  trial_duration: 650
}
// VAAST training block -----------------------------------------------------------------

var vaast_training_block_1 = {
  timeline: [
    vaast_start,
    vaast_fixation,
    vaast_first_step_training_1,
    vaast_second_step_training_1,
    save_vaast_trial
  ],
  timeline_variables: vaast_stim_training,
  repetitions: 1,
  randomize_order: true,
  data: {
    phase:    "training",
    stimulus: jsPsych.timelineVariable('stimulus'),
    movement: jsPsych.timelineVariable('movement_1'),
    group:   jsPsych.timelineVariable('group'),
  }
};

var vaast_test_block_1 = {
  timeline: [
    vaast_start,
    vaast_fixation,
    vaast_first_step_1,
    vaast_second_step_1,
    save_vaast_trial
  ],
  timeline_variables: vaast_stim,
  repetitions: 1,
  randomize_order: true,
  data: {
    phase:    "test",
    stimulus: jsPsych.timelineVariable('stimulus'),
    movement: jsPsych.timelineVariable('movement_1'),
    group:   jsPsych.timelineVariable('group'),
  }
};

var vaast_training_block_2 = {
  timeline: [
    vaast_start,
    vaast_fixation,
    vaast_first_step_training_2,
    vaast_second_step_training_2,
    save_vaast_trial
  ],
  timeline_variables: vaast_stim_training,
  repetitions: 1,
  randomize_order: true,
  data: {
    phase:    "training",
    stimulus: jsPsych.timelineVariable('stimulus'),
    movement: jsPsych.timelineVariable('movement_2'),
    group:    jsPsych.timelineVariable('group'),
  }
};

var vaast_test_block_2 = {
  timeline: [
    vaast_start,
    vaast_fixation,
    vaast_first_step_2,
    vaast_second_step_2,
    save_vaast_trial
  ],
  timeline_variables: vaast_stim,
  repetitions: 1,
  randomize_order: true,
  data: {
    phase:    "test",
    stimulus: jsPsych.timelineVariable('stimulus'),
    movement: jsPsych.timelineVariable('movement_2'),
    group:    jsPsych.timelineVariable('group'),
  }
};

var vaast_instructions_8 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Tâche du Jeu Vidéo</h1>" +
    "<p><center>Cette partie de l'étude est maintenant terminée.</center></p>" +
    "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
  choices: [32]
};

// IAT -----------------------------------------------------------------------------------
// IAT variable initialization ----------------------------------------------------------
// Correct responses -----------------------
var self_side      = undefined;
var other_side     = undefined;
var maths_side_1st = undefined;
var arts_side_1st  = undefined;
var maths_side_2nd = undefined;
var arts_side_2nd  = undefined;

// Label -----------------------------------
var block_1_left_label          = undefined;
var block_1_right_label         = undefined;
var block_2_left_label          = undefined;
var block_2_right_label         = undefined;
var block_3_left_label_top      = undefined;
var block_3_right_label_top     = undefined;
var block_3_left_label_bottom   = undefined;
var block_3_right_label_bottom  = undefined;
var block_4_left_label          = undefined;
var block_4_right_label         = undefined;
var block_5_left_label_top      = undefined;
var block_5_right_label_top     = undefined;
var block_5_left_label_bottom   = undefined;
var block_5_right_label_bottom  = undefined;

switch(iat_self) {
  case "left":
        self_side               = "left";
        other_side              = "right";

        block_1_left_label      = "SELF";
        block_1_right_label     = "OTHER";
        block_3_left_label_top  = "SELF";
        block_3_right_label_top = "OTHER";
        block_5_left_label_top  = "SELF";
        block_5_right_label_top = "OTHER";

    break;

  case "right":
        self_side               = "right";
        other_side              = "left";

        block_1_left_label      = "OTHER";
        block_1_right_label     = "SELF";
        block_3_left_label_top  = "OTHER";
        block_3_right_label_top = "SELF";
        block_5_left_label_top  = "OTHER";
        block_5_right_label_top = "SELF";

    break;
}

switch(iat_maths_1) {
  case "left":
      maths_side_1st = "left";
      arts_side_1st  = "right";
      maths_side_2nd = "right";
      arts_side_2nd  = "left";

    block_2_left_label          = "MATH";
    block_2_right_label         = "ART";
    block_3_left_label_bottom   = "MATH";
    block_3_right_label_bottom  = "ART";
    block_4_left_label          = "ART";
    block_4_right_label         = "MATH";
    block_5_left_label_bottom   = "ART";
    block_5_right_label_bottom  = "MATH";

    break;

  case "right":
        maths_side_1st = "right";
        arts_side_1st  = "left";
        maths_side_2nd = "left";
        arts_side_2nd  = "right";

    block_2_left_label          = "ART";
    block_2_right_label         = "MATH";
    block_3_left_label_bottom   = "ART";
    block_3_right_label_bottom  = "MATH";
    block_4_left_label          = "MATH";
    block_4_right_label         = "ART";
    block_5_left_label_bottom   = "MATH";
    block_5_right_label_bottom  = "ART";

    break;
}

// iat instructions ---------------------------------------------------------------------

var iat_instructions_1 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Task 2 </h1>" +
    "<p class='instructions'>In this task, you will be asked to sort words" +
    " into groups as fast as you can using the keyboard. The following is a" +
    " list of category labels and the items that belong to each of these categories." +
    "</p>" +
    "<table>" +
      "<tr>" +
        "<th width='200px'>Category</th>" +
        "<th align='left'>Item</th>" +
      "</tr>" +
      "<tr>" +
        "<td>SELF</td>" +
        "<td align='left'>I, me, my, mine</td>" +
      "</tr>" +
      "<tr>" +
        "<td>OTHER</td>" +
        "<td align='left'>they, theirs, them, themselves</td>" +
      "</tr>" +
      "<tr>" +
        "<td>ART</td>" +
        "<td align='left'>poetry, literature, theater, symphony</td>" +
      "</tr>" +
      "<tr>" +
        "<td>MATH</td>" +
        "<td align='left'>calculus, equation, geometry, statistics</td>" +
      "</tr>" +
    "</table>" +
    "<h3 class='instructions'>Instructions</h3>" +
    "<ul class='instructions'>" +
      "<li>Keep fingers on the <span class='key'>E</span> and <span class='key'>I</span> keys to enable rapid response.</li>" +
      "<li>Labels at the top will tell you which items go with each key.</li>" +
      "<li>Go as fast as you can.</li>" +
    "</ul>" +
    "<p>&nbsp;</p>" +
    "<p class = 'continue-instructions'>Press <span class='key'>space</span>" +
    " to continue.</p>",
  choices: [32]
};

// iat block instructions ---------------------------------------------------------------

var iat_instructions_block_1 = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'> <p>Press " +
    "<span class='key'>E</span> for:<br><span class='iat-category self-other'>" +
    block_1_left_label  +
    "</span></p>" +
    "</div>" +
    "<div style='position: absolute; top: 18%; right: 20%'><p>Press " +
    "<span class='key'>I</span> for:<br><span class='iat-category self-other'>" +
    block_1_right_label +
    "</span></p>" +
  "</div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%, width:80%;'> " +
    "<p class='instructions'>" +
      "In the next task, you will have to put your middle or index fingers on the <span class='key'>E</span> " +
      "and <span class='key'>I</span> keys of your keyboard. Words representing the categories at the top " +
      "will appear one-by-one in the middle of the screen. " +
      "When the item belongs to a category on the left, press the <span class='key'>E</span> key; when the item " +
      "belongs to a category on the right, press the <span class='key'>I</span> key. Items belong to only one category. " +
      "If you make an error, an X will appear – fix the error by hitting the other key." +
    "</p>" +
    "<p class='instructions'>" +
      "This is a timed sorting task. GO AS FAST AS YOU CAN while making as few mistakes as possible. " +
    "</p>" +
  "</div> " +
  "<br>" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

var iat_instructions_block_2 = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'> <p>Press " +
    "<span class='key'>E</span> for:<br><span class='iat-category maths-arts'>" +
    block_2_left_label  +
    "</span></p>" +
    "</div>" +
    "<div style='position: absolute; top: 18%; right: 20%'><p>Press " +
    "<span class='key'>I</span> for:<br><span class='iat-category maths-arts'>" +
    block_2_right_label +
    "</span></p>" +
  "</div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%, width:80%;'> " +
    "<p class='instructions'>" +
      "See above, the categories have changed. The items for sorting have changed as well. " +
      "The rules, however, are the same." +
    "</p>" +
    "<p class='instructions'>" +
      "When the items belong to a category to the left, press the <span class='key'>E</span> key; " +
      "when the item belongs to a category on the right, press the <span class='key'>I</span> key. " +
      "Items belong to only one category. " +
      "An X will appear after an error – fix the error by hitting the other key. " +
      "GO AS FAST AS YOU CAN. " +
    "</p>" +
  "</div> " +
  "<br>" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

var iat_instructions_block_3 = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'><p>" +
    "Press <span class='key'>E</span> for:<br> " +
    "<span class='iat-category self-other'>" + block_3_left_label_top  + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_3_left_label_bottom + "</span>" +
  "</p></div>" +
  "<div style='position: absolute; top: 18%; right: 20%'><p>" +
    "Press <span class='key'>I</span>  for:<br>" +
    "<span class='iat-category self-other'>" + block_3_right_label_top + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_3_right_label_bottom  + "</span>" +
  "</p></div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%'> "+
    "<p class='instructions'>" +
    "See above, the four categories you saw separately now appear together. " +
    "Remember, each item belongs to only one group." +
    "</p>" +
    "<p class='instructions'>" +
    "The <span class='maths-arts'>green</span> and <span class='self-other'>black</span> labels " +
    "and items may help to identify the appropriate category. " +
    "Use the <span class='key'>E</span> and <span class='key'>I</span> keys to categorize " +
    "items into the four groups left and right, and correct errors by hitting the other key." +
    "</p>" +
  "</div> " +
  "<br />" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

var iat_instructions_block_3_test = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'><p>" +
    "Press <span class='key'>E</span> for:<br> " +
    "<span class='iat-category self-other'>" + block_3_left_label_top  + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_3_left_label_bottom + "</span>" +
  "</p></div>" +
  "<div style='position: absolute; top: 18%; right: 20%'><p>" +
    "Press <span class='key'>I</span>  for:<br>" +
    "<span class='iat-category self-other'>" + block_3_right_label_top + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_3_right_label_bottom  + "</span>" +
  "</p></div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%'> "+
    "<p class='instructions'>" +
    "Sort the same four categories again. Remember to go as fast as you can while " +
    "making as few mistakes as possible." +
    "</p>" +
    "<p class='instructions'>" +
    "The <span class='maths-arts'>green</span> and <span class='self-other'>black</span> labels " +
    "and items may help to identify the appropriate category. " +
    "Use the <span class='key'>E</span> and <span class='key'>I</span> keys to categorize " +
    "items into the four groups left and right, and correct errors by hitting the other key." +
    "</p>" +
  "</div> " +
  "<br />" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

var iat_instructions_block_4 = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'> <p>Press " +
    "<span class='key'>E</span> for:<br><span class='iat-category maths-arts'>" +
    block_4_left_label  +
    "</span></p>" +
    "</div>" +
    "<div style='position: absolute; top: 18%; right: 20%'><p>Press " +
    "<span class='key'>I</span> for:<br><span class='iat-category maths-arts'>" +
    block_4_right_label +
    "</span></p>" +
  "</div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%, width:80%;'> " +
    "<p class='instructions'>" +
      "Notice above, there are only two categories and they have switched positions. " +
      "The concept that was previously on the left is now on the right, and the concept " +
      "that was on the right is now on the left. Practice this new configuration."  +
    "</p>" +
    "<p class='instructions'>" +
      "Use the <span class='key'>E</span> and <span class='key'>I</span> keys " +
      "to categorize items left and right, and correct error " +
      "by hitting the other key." +
    "</p>" +
  "</div> " +
  "<br>" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

var iat_instructions_block_5 = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'><p>" +
    "Press <span class='key'>E</span> for:<br> " +
    "<span class='iat-category self-other'>" + block_5_left_label_top  + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_5_left_label_bottom + "</span>" +
  "</p></div>" +
  "<div style='position: absolute; top: 18%; right: 20%'><p>" +
    "Press <span class='key'>I</span>  for:<br>" +
    "<span class='iat-category self-other'>" + block_5_right_label_top + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_5_right_label_bottom  + "</span>" +
  "</p></div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%'> "+
    "<p class='instructions'>" +
    "See above, the four categories now appear together in a new configuration. " +
    "Remember, each item belongs to only one group." +
    "</p>" +
    "<p class='instructions'>" +
      "Use the <span class='key'>E</span> and <span class='key'>I</span> keys " +
      "to categorize items into the four groups left and right, and correct error " +
      "by hitting the other key." +
    "</p>" +
  "</div> " +
  "<br />" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

var iat_instructions_block_5_test = {
  type: 'html-keyboard-response',
  stimulus:
  "<div style='position: absolute; top: 18%; left: 20%'><p>" +
    "Press <span class='key'>E</span> for:<br> " +
    "<span class='iat-category self-other'>" + block_5_left_label_top  + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_5_left_label_bottom + "</span>" +
  "</p></div>" +
  "<div style='position: absolute; top: 18%; right: 20%'><p>" +
    "Press <span class='key'>I</span>  for:<br>" +
    "<span class='iat-category self-other'>" + block_5_right_label_top + "</span>" +
    "<br>or<br>" +
    "<span class='iat-category maths-arts'>" + block_5_right_label_bottom  + "</span>" +
  "</p></div>" +
  "<div class='iat-instructions' style='position: relative; top: 42%'> "+
    "<p class='instructions'>" +
    "Sort the same four categories again. Remember to go as fast as you can while " +
    "making as few mistakes as possible." +
    "</p>" +
    "<p class='instructions'>" +
    "The <span class='maths-arts'>green</span> and <span class='self-other'>black</span> labels " +
    "and items may help to identify the appropriate category. " +
    "Use the <span class='key'>E</span> and <span class='key'>I</span> keys to categorize " +
    "items into the four groups left and right, and correct errors by hitting the other key." +
    "</p>" +
  "</div> " +
  "<br />" +
  "<p class = 'continue-instructions'>Press <span class='key'>space bar</span> when you are ready to start.</p>",
  choices: [32]
};

// iat - stimuli ------------------------------------------------------------------------

var iat_block_1_stim = [
  {category: "self-other", stimulus: "I",          stim_key_association: self_side},
  {category: "self-other", stimulus: "me",         stim_key_association: self_side},
  {category: "self-other", stimulus: "my",         stim_key_association: self_side},
  {category: "self-other", stimulus: "mine",       stim_key_association: self_side},
  {category: "self-other", stimulus: "they",       stim_key_association: other_side},
  {category: "self-other", stimulus: "theirs",     stim_key_association: other_side},
  {category: "self-other", stimulus: "them",       stim_key_association: other_side},
  {category: "self-other", stimulus: "themselves", stim_key_association: other_side}
]

var iat_block_2_stim = [
  {category: "maths-arts", stimulus: "calculus",   stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "equation",   stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "geometry",   stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "statistics", stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "poetry",     stim_key_association: arts_side_1st},
  {category: "maths-arts", stimulus: "literature", stim_key_association: arts_side_1st},
  {category: "maths-arts", stimulus: "theater",    stim_key_association: arts_side_1st},
  {category: "maths-arts", stimulus: "symphony",   stim_key_association: arts_side_1st}
]

var iat_block_3_stim = [
  {category: "self-other", stimulus: "I",          stim_key_association: self_side},
  {category: "self-other", stimulus: "me",         stim_key_association: self_side},
  {category: "self-other", stimulus: "my",         stim_key_association: self_side},
  {category: "self-other", stimulus: "mine",       stim_key_association: self_side},
  {category: "self-other", stimulus: "they",       stim_key_association: other_side},
  {category: "self-other", stimulus: "theirs",     stim_key_association: other_side},
  {category: "self-other", stimulus: "them",       stim_key_association: other_side},
  {category: "self-other", stimulus: "themselves", stim_key_association: other_side},
  {category: "maths-arts", stimulus: "calculus",   stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "equation",   stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "geometry",   stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "statistics", stim_key_association: maths_side_1st},
  {category: "maths-arts", stimulus: "poetry",     stim_key_association: arts_side_1st},
  {category: "maths-arts", stimulus: "literature", stim_key_association: arts_side_1st},
  {category: "maths-arts", stimulus: "theater",    stim_key_association: arts_side_1st},
  {category: "maths-arts", stimulus: "symphony",   stim_key_association: arts_side_1st}
]

var iat_block_4_stim = [
  {category: "maths-arts", stimulus: "calculus",   stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "equation",   stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "geometry",   stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "statistics", stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "poetry",     stim_key_association: arts_side_2nd},
  {category: "maths-arts", stimulus: "literature", stim_key_association: arts_side_2nd},
  {category: "maths-arts", stimulus: "theater",    stim_key_association: arts_side_2nd},
  {category: "maths-arts", stimulus: "symphony",   stim_key_association: arts_side_2nd}
]

var iat_block_5_stim = [
  {category: "self-other", stimulus: "I",          stim_key_association: self_side},
  {category: "self-other", stimulus: "me",         stim_key_association: self_side},
  {category: "self-other", stimulus: "my",         stim_key_association: self_side},
  {category: "self-other", stimulus: "mine",       stim_key_association: self_side},
  {category: "self-other", stimulus: "they",       stim_key_association: other_side},
  {category: "self-other", stimulus: "theirs",     stim_key_association: other_side},
  {category: "self-other", stimulus: "them",       stim_key_association: other_side},
  {category: "self-other", stimulus: "themselves", stim_key_association: other_side},
  {category: "maths-arts", stimulus: "calculus",   stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "equation",   stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "geometry",   stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "statistics", stim_key_association: maths_side_2nd},
  {category: "maths-arts", stimulus: "poetry",     stim_key_association: arts_side_2nd},
  {category: "maths-arts", stimulus: "literature", stim_key_association: arts_side_2nd},
  {category: "maths-arts", stimulus: "theater",    stim_key_association: arts_side_2nd},
  {category: "maths-arts", stimulus: "symphony",   stim_key_association: arts_side_2nd}
]


// iat - block 1 ------------------------------------------------------------------------
var iat_block_1 = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      label_category: ['self-other'],
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_label:  [block_1_left_label],
      right_category_label: [block_1_right_label],
      response_ends_trial: true,
      data: {
        iat_block: 1,
        iat_type: 'practice',
        iat_label_left:  block_1_left_label,
        iat_label_right: block_1_right_label
      }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_1_stim,20)
}

// iat - block 2 ------------------------------------------------------------------------
var iat_block_2 = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      label_category: ['maths-arts'],
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_label:  [block_2_left_label],
      right_category_label: [block_2_right_label],
      response_ends_trial: true,
      data: {
        iat_block: 2,
        iat_type: 'practice',
        iat_label_left:  block_2_left_label,
        iat_label_right: block_2_right_label
         }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_2_stim, 20)
}

// iat - block 3 (training) -------------------------------------------------------------
var iat_block_3_training = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      label_category: ['self-other', 'maths-arts'],
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_key:  'E',
      left_category_label:  [block_3_left_label_top, block_3_left_label_bottom],
      right_category_label: [block_3_right_label_top, block_3_right_label_bottom],
      response_ends_trial: true,
      data: {
        iat_block: 3,
        iat_type: 'practice',
        iat_label_left:  block_3_left_label_top  + "-" + block_3_left_label_bottom,
        iat_label_right: block_3_right_label_top + "-" + block_3_right_label_bottom
         }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_3_stim, 20)
}

// iat - block 3 (test) -----------------------------------------------------------------
var iat_block_3_test = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      label_category: ['self-other', 'maths-arts'],
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_label:  [block_3_left_label_top, block_3_left_label_bottom],
      right_category_label: [block_3_right_label_top, block_3_right_label_bottom],
      response_ends_trial: true,
      data: {
        iat_type: 'test',
        iat_block: 3,
        iat_label_left:  block_3_left_label_top  + "-" + block_3_left_label_bottom,
        iat_label_right: block_3_right_label_top + "-" + block_3_right_label_bottom
         }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_3_stim, 74)
}

// iat - block 4 ------------------------------------------------------------------------
var iat_block_4 = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      label_category: ['maths-arts'],
      html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_label:  [block_4_left_label],
      right_category_label: [block_4_right_label],
      response_ends_trial: true,
      data: {
        iat_block: 4,
        iat_type: 'practice',
        iat_label_left:  block_4_left_label,
        iat_label_right: block_4_right_label
         }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_4_stim, 20)
}

// iat - block 5 (training) -------------------------------------------------------------
var iat_block_5_training = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      label_category: ['self-other', 'maths-arts'],
      html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_label:  [block_5_left_label_top, block_5_left_label_bottom],
      right_category_label: [block_5_right_label_top, block_5_right_label_bottom],
      response_ends_trial: true,
      data: {
        iat_block: 5,
        iat_type: 'practice',
        iat_label_left:  block_5_left_label_top  + "-" + block_5_left_label_bottom,
        iat_label_right: block_5_right_label_top + "-" + block_5_right_label_bottom
         }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_5_stim, 20)
}

// iat - block 5 (test) -----------------------------------------------------------------
var iat_block_5_test = {
  timeline: [
    {
      type: 'iat-html',
      stimulus: jsPsych.timelineVariable('stimulus'),
      category: jsPsych.timelineVariable('category'),
      label_category: ['self-other', 'maths-arts'],
      stim_key_association: jsPsych.timelineVariable('stim_key_association'),
      html_when_wrong: '<span style="color: red; font-size: 80px">X</span>',
      bottom_instructions: '<p>If you press the wrong key, a red X will appear. Press the other key to continue</p>',
      force_correct_key_press: true,
      display_feedback: true,
      left_category_label:  [block_5_left_label_top, block_5_left_label_bottom],
      right_category_label: [block_5_right_label_top, block_5_right_label_bottom],
      response_ends_trial: true,
      data: {
        iat_block: 5,
        iat_type: 'test',
        iat_label_left:  block_5_left_label_top  + "-" + block_5_left_label_bottom,
        iat_label_right: block_5_right_label_top + "-" + block_5_right_label_bottom
         }
    },
    save_iat_trial
  ],
  timeline_variables: sample_n_iat(iat_block_5_stim, 74)
}

//
var iat_instructions_2 = {
  type: "html-keyboard-response",
  stimulus:
    "<h1 class ='custom-title'> Task 2 </h1>" +
    "<p class='instructions'>This part of the experiment is now over. " +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
  choices: [32]
};
// Demographic block ---------------------------------------------------------------------
// Demographic variables
var mcq_sexe_options = ["Homme", "Femme"];
var mcq_handedness_options = ["Droitier·e", "Gaucher·e"];
var mcq_frenchLvl_options = ["Langue maternelle", "Plutôt très bon", "Plutôt bon", "Moyen", "Plutôt mauvais", "Plutôt très mauvais"];
var mcq_vaast = ["Oui", "Non"];

// ---------------------------------------------------------------------------------------
var demographic_data_0 = {
  type: 'html-keyboard-response',
  stimulus:
    "<p class='instructions'>Cette étude est presque terminée, nous allons maintenant vous demander de répondre à quelques questions " +
    "concernant : votre âge, votre sexe, votre latéralité et votre niveau de maîtrise de la " +
    "langue française. </p>" +
    "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
  choices: [32]
};

var demographic_data_1 = {
  type: 'survey-text',
  questions: [{prompt: "Quel âge avez-vous ?"}],
  button_label: "Passer à la question suivante"
};

var demographic_data_2 = {
  type: 'survey-multi-choice',
  questions: [{prompt : "Quel est votre sexe ?", options: mcq_sexe_options}],
  button_label: "Passer à la question suivante"
};

var demographic_data_3 = {
  type: 'survey-multi-choice',
  questions: [{prompt : "Quel est votre latéralité ?", options: mcq_handedness_options}],
  button_label: "Passer à la question suivante"
};

var demographic_data_4 = {
  type: 'survey-multi-choice',
  questions: [{prompt : "Quel est votre niveau de français ?", options: mcq_frenchLvl_options}],
  button_label: "Passer à la suite"
};

var demographic_data_5 = {
  type: 'survey-multi-choice',
  questions: [{prompt : "Aviez vous déjà passé la Tâche du Jeu Vidéo", options: mcq_vaast}],
  button_label: "Passer à la suite"
};

// end fullscreen -----------------------------------------------------------------------

var fullscreen_trial_exit = {
  type: 'fullscreen',
  fullscreen_mode: false
}

// end insctruction ---------------------------------------------------------------------

var ending = {
  type: "html-keyboard-response",
  stimulus:
    "<p class='instructions'>Cette étude est maintenant terminée. Merci pour votre participation.<p>" +
    "<p class='instructions'>Cette étude nous permettait d’étudier les tendances à l’approche et à " +
    "l’évitement. La littérature en psychologie sociale a pu mettre en évidence le fait que la simple " +
    "présentation de certains concepts entraînait de manière spontanée des tendances à s’approcher ou " +
    "s'éloigner de ces concepts. Par exemple, la vision d’une glace facilitera l’exécution de mouvement d’approche." +
    "</p>" +
    "<p class='instructions'>Dans cette expérience, nous nous intéressons à délimiter certaines " +
    "conditions nécessaires à l’apparition de ces tendances spontanées. </p>" +
    "<p class = 'continue-instructions'>Appuyez sur <strong>espace</strong> pour continuer.</p>",
  choices: [32]
};

// procedure ----------------------------------------------------------------------------
// Initialize timeline ------------------------------------------------------------------
var timeline = [];

// welcome
timeline.push(welcome,
              welcome_2,
              if_not_enough_time,
              welcome_3);

// keen.io connexion test
timeline.push(keen_ping);

// fullscreen
timeline.push(fullscreen_trial,
			  hiding_cursor);

// prolific verification
timeline.push(save_id);

// initial instructions
timeline.push(instructions);

// vaast - instructions
timeline.push(vaast_instructions_1,
              vaast_instructions_2,
              vaast_instructions_3);

// vaast - block 1
timeline.push(vaast_instructions_4,
	      vaast_training_block_1,
              vaast_instructions_5,
              vaast_test_block_1);

// vaast - block 2
timeline.push(vaast_instructions_6,
	      vaast_training_block_2,
              vaast_instructions_7,
              vaast_test_block_2);

// vaast - end
timeline.push(vaast_instructions_8);

// iat - initial instructions
timeline.push(iat_instructions_1)

timeline.push(iat_instructions_block_1, iat_block_1,
              iat_instructions_block_2, iat_block_2,
              iat_instructions_block_3, iat_block_3_training,
              iat_instructions_block_3_test, iat_block_3_test,
              iat_instructions_block_4, iat_block_4,
              iat_instructions_block_5, iat_block_5_training,
              iat_instructions_block_5_test, iat_block_5_test);

// iat - ending
timeline.push(iat_instructions_2);

timeline.push(fullscreen_trial_exit,
	          showing_cursor);

// demographic info
timeline.push(demographic_data_0,
              demographic_data_1,
              demographic_data_2,
              demographic_data_3,
              demographic_data_4,
              demographic_data_5,
              save_demographics);

// ending
timeline.push(ending);
// Launch experiment --------------------------------------------------------------------
// preloading ---------------------------------------------------------------------------
// Preloading. For some reason, it appears auto-preloading fails, so using it manually.
// In principle, it should have ended when participants starts VAAST procedure (which)
// contains most of the image that have to be pre-loaded.
var loading_gif               = ["media/loading.gif"]
var vaast_instructions_images = ["media/vaast-background.png", "media/keyboard-vaastt.png"];
var vaast_bg_filename         = background;

jsPsych.pluginAPI.preloadImages(loading_gif);
jsPsych.pluginAPI.preloadImages(vaast_instructions_images);
jsPsych.pluginAPI.preloadImages(vaast_bg_filename);

// timeline initiaization ---------------------------------------------------------------

if(is_compatible) {
  jsPsych.init({
      timeline: timeline,
      on_interaction_data_update: function() {
        saving_browser_events(completion = false);
      },
    on_finish: function() {
        saving_browser_events(completion = true);
        window.location.href = "16ff0d6a46e619cf8deefd84e3cda0137733cca215f955fc73923a1241d908fa.html";
    }
  });
}
