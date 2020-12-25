/* https://www.sitepoint.com/simple-javascript-quiz/ */

// TODO

const quizContainer = document.querySelector('#quiz');
const resultsContainer = document.querySelector('#results');
const submitButton = document.querySelector('#submit');
const finaleButton = document.querySelector('#finale');
const finaleContainer = document.querySelector('#grandFinale');

function buildQuiz() {
  // The question progress
  const currentQuestion = document.createElement('span');
  currentQuestion.classList.add('quiz__question-progress__current');
  currentQuestion.id = 'current-question';
  currentQuestion.innerHTML = 'Question 1';
  const questionProgress = document.createElement('p');
  questionProgress.classList.add('quiz__question-progress');
  questionProgress.appendChild(currentQuestion);
  questionProgress.innerHTML += ` / ${questions.length}`;
  
  // Progress bar
  const progressBar = document.createElement('div');
  progressBar.classList.add('quiz__progress-bar');
  progressBar.id = 'progress-bar';
  
  const output = document.createElement('div');
  output.className = 'quiz__slides';
  
  // Each question
  questions.forEach((currentQuestion, questionNumber) => {
    // variable to store the HTML output
    let slide = document.createElement('div');
    slide.classList.add('slide');
    // Variable to store the list of possible answers
    const answers = document.createElement('div');
    answers.classList.add('quiz__answers');
    // Count the number of answers
    let answerNumber = 0;
    // And for each available answer
    for(letter in currentQuestion.answers) {
      // Add the HTML radio button
      answers.appendChild(createAnswerHTML(questionNumber, letter, currentQuestion.answers[letter], answerNumber));
      answerNumber++;
    }
    
    // Add this question and its answers to the output
    slide.appendChild(createQuestionHTML(currentQuestion.question, answers));
    slide.appendChild(answers);
    
    output.appendChild(slide);
  });
  
  // Append everything on the quiz container
  quizContainer.appendChild(questionProgress);
  quizContainer.appendChild(progressBar);
  quizContainer.appendChild(output);
}

function showResults() {
    // Only if the button is not hidden
    if(!submitButton.classList.contains('hidden')) {
        const heartCount = document.querySelectorAll('input.heart:checked').length;
        const starCount = document.querySelectorAll('input.star:checked').length;
        const circleCount = document.querySelectorAll('input.circle:checked').length;

        let biggestSymbol;
        let explanation;
        if(heartCount > starCount && heartCount >= circleCount) {
            biggestSymbol = 'heart';
            explanation = "Les palaces, les gros comptes en banque et les robes qui brillent ne vous impressionnent pas. L'univers artificiel du jet-set se trouve à des an-nées-lumière de votre style de vie! D'ailleurs, la consommation à outrance vous exaspère. Pour vous, le snobisme n'est rien d'autre qu'une manière de se donner de l'importance quand on n'en a pas. Vous avez davantage l'âme d'une militante écolo visant le mieux-être de tous. Votre devise: la simplicité a bien meilleur goût! Ce n'est pas tant l'ambition des uns ou le «bien paraître» des autres qui vous dérangent que la quête de richesses et le mépris des parvenus pour le peuple. De telles convictions vous honorent!";
        }
        else if(starCount >= heartCount && starCount > circleCount) {
            biggestSymbol = 'star';
            explanation = "Vous aimez assurément les objets de luxe, les défilés de mode et les soirées mondaines. Souvent, on vous a qualifiée de superficielle ou d'excentrique sans que cela vous choque le moins du monde. Votre rêve? Un style de vie hors du commun. Selon vous, le snobisme est un comportement enviable, digne des plus grands de ce monde. Et pour appartenir à cette élite, une telle attitude est de mise. Retenez tout de même qu'être snob, c'est se condamner à «avoir l'air de» au lieu d'être soi-même. Vous êtes tellement occupée à copier vos idoles que vous perdez en quelque sorte tout contact avec votre propre réalité. Ne laissez pas le jugement d'autrui vous dicter votre conduite.";
        }
        else {
            biggestSymbol = 'circle';
            explanation = "Vous êtes attirée par les gens qui se distinguent, tout en cultivant votre naturel. Vous êtes habile à alterner entre un certain snobisme utile en société (l'étiquette, quoi!) et une touche d'authenticité. En général, vous obtenez ce que vous désirez dans vos relations en jouant sur ces deux tableaux. Soit vous êtes une femme très bien adaptée à la vie en société, capable d'une grande créativité, soit vous vivez un conflit permanent entre le besoin d'être vous-même et celui de bien paraître pour vous taire accepter par les autres. En fin de compte, le décorum vous importe peu, mais vous craignez peut-être de montrer votre vrai visage en public.";
        }


        resultsContainer.classList.remove('hidden');
        resultsContainer.querySelector('#resultsCount').innerHTML = `<strong>Une majorite de ${biggestSymbol} :</strong>`;
        resultsContainer.querySelector('#resultsExplanation').innerHTML = explanation;
    }
}

function showKdo() {
    finaleContainer.classList.remove('hidden');
    addSparkles();
}

function showSlide(n) {
  // Change the active class
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].classList.add('hidden');
  slides[n].classList.add('active');
  // Update de current slide
  currentSlide = n;
  
  // Update current question progress
  document.querySelector('#current-question').innerHTML = `Question ${n+1}`;
  // Update progress bar
  document.documentElement.style.setProperty('--progressBarWidth', (((n+1) / slides.length) * 100) + '%');
  
  setPreviousButton();
  setNextButton();
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}
function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

// Create and return an HTML element for the
// answer radio
function createAnswerHTML(questionNumber, letter, answer, answerNumber) {
  const field = document.createElement('div');
  
  const radio = document.createElement('input');
  radio.setAttribute('type', 'radio');
  radio.id = (answer + '-' + letter).replace(/\s+/g, '');
  radio.setAttribute('name', 'question-' + questionNumber);
  radio.setAttribute('value', letter);
  radio.classList.add(letter);
  if(answerNumber === 0) radio.checked = true;
  
  const label = document.createElement('label');
  label.setAttribute('for', (answer + '-' + letter).replace(/\s+/g, ''));
  label.innerHTML = answer;
  
  field.appendChild(radio);
  field.appendChild(label);
  
  return field;
}

// Create the HTML for the question
// and contains the answers
function createQuestionHTML(question, answers) {
  const questionContainer = document.createElement('h2');
  questionContainer.classList.add('quiz__question');
  questionContainer.innerHTML = question;
  
  return questionContainer;
}

function setPreviousButton() {
  if(currentSlide === 0) {
    previousButton.style.display = 'none';
  }
  else {
    previousButton.style.display = 'inline-block';
  }
}
function setNextButton() {
  if(currentSlide >= slides.length-1) {
    nextButton.style.display = 'none';
    submitButton.classList.remove('hidden');
  }
  else {
    nextButton.style.display = 'inline-block';
    submitButton.classList.add('hidden');
  }
}

/* GLITTERS */
const addSparkles = function() {
    let maxCount = (Math.random() * 99) + 10;

    for (let i = 0; i < maxCount; i++) {
        let sparkle = document.createElement("div");
        sparkle.classList.add("particle");

        let main = document.querySelector('main');
        document.body.appendChild(sparkle);

        randomProperties(sparkle);
    }
};

const randomProperties = function (particle) {
    const left = Math.floor(Math.random() * (99 - 1)) + 1;
    particle.style.setProperty('--left', left + '%');

    const top = Math.floor(Math.random() * (99 - 1)) + 1;
    particle.style.setProperty('--top', top + '%');

    const size = Math.floor(Math.random() * (6 - 2)) + 2;
    particle.style.setProperty('--size', size + 'px');
    particle.style.setProperty('--blur', (size * 4) + 'px');
    particle.style.setProperty('--spread', (size) + 'px');

    const opacity = Math.random() + 0.1;
    particle.style.setProperty('--opacity', opacity);

    const duration = Math.floor(Math.random() * (800 - 300)) + 300;
    particle.style.setProperty('--duration', duration + 'ms');

    const delay = Math.floor(Math.random() * (1000 - 200)) + 200;
    particle.style.setProperty('--delay', delay + 'ms');

    const iteration = Math.floor(Math.random() * (10 - 4)) + 4;
    particle.style.setProperty('--iteration', iteration);
};

/* QUESTIONS DATA */
const questions = [
    {
      question: "Que penseriez-vous d'un séjour à Dubaï ?",
      answers: {
        heart: 'Vous détestez cette ville de mégalomanes!',
        star: 'Vous en revez et ferez en sorte d\'y aller un jour',
        circle: 'Pourquoi pas ? Mais ce n\'est pas un must.'
      }
    },
    {
      question: "Lors d'une soirée mondaine, vous vous préoccupez surtout de...",
      answers: {
        star: '... rencontrer des gens qui ont de la classe.',
        circle: '... passer un bon moment',
        heart: '... ne pas trop vous ennuyer.'
      }
    },
    {
      question: "Si vous aviez le choix, vous iriez voir...",
      answers: {
        circle: '... l\'exposition De Van Gogh à Kandinsky au Musée des beaux-arts.',
        star: '... le prochain récital de Marc-André Hamelin, à Paris.',
        heart: '... un documentaire de la série Les Grands Explorateurs, au cégep.'
      }
    },
    {
      question: "Votre meilleure amie vous propose un séjour au parc de Forillon, en Gaspésie.",
      answers: {
        heart: 'Impossible de refuser!',
        star: 'Dormir sous une tente? Non merci!',
        circle: 'Pourquoi pas? Vivre en plein air vous changerait de la ville.'
      }
    },
    {
      question: "Vous achetez un nouveau téléviseur...",
      answers: {
        star: '... dès qu\'une nouvelle technologie apparaît sur le marché.',
        heart: '... lorsque le vôtre tombe en pan..',
        circle: '.. tous les trois ans.'
      }
    },
    {
      question: "Votre amoureux vous a offert un superbe vélo haut de gamme. Depuis, vous vous sentez...",
      answers: {
        heart: '... un peu mal à l\'aise de l\'utiliser. Vous continuez donc de rouler en Bixi.',
        circle: '... plus sportive qu\'avant.',
        star: '... comme une médaillée olympique!'
      }
    },
    {
      question: "Quel sens attribuez-vous à l'expression « être snob » ?",
      answers: {
        circle: 'C\'est le fait d\'évoluer dans la haute société. ',
        heart: 'C\'est nourrir un certain mépris pour tout ce qui est commun.',
        star: 'C\'est le désir de vivre dans le luxe et le raffinement.'
      }
    },
    {
      question: "Vous êtes particulièrement sensible ...",
      answers: {
        circle: '... au monde des arts.',
        star: '... à la distinction.',
        heart: '... à la beauté.'
      }
    },
    {
      question: "Les personnes que vous admirez et que vous tentez de suivre sont",
      answers: {
        heart: '... des gens qui ont à cœur le bien commun.',
        star: '... des personnalités des ;ilieux politique et financier.',
        circle: '... des artistes de tous genres..'
      }
    },
    {
      question: "Côté intérieur, vous êtes plutôt...",
      answers: {
        circle: '... attiré par le style scandinave: simple, épuré, pratique.',
        heart: '... éclectique: tout dépend de vos coups de cœur.',
        star: '... du genre à engager un designer professionnel.'
      }
    }
  ];



  /* EXCUTION OF THE QUIZZ */

// Display quiz right away
buildQuiz();

// Pagination
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Buttons event listener
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
// on submit, show results
submitButton.addEventListener('click', showResults);
// For the Grand Finale
finaleButton.addEventListener('click', showKdo);