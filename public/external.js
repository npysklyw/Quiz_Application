
    document.getElementById("header").onload = getQue();

    function getQue() {
        let xRequest = new XMLHttpRequest();
        xRequest.onreadystatechange = displayQuestions;

        xRequest.open('GET','/questions',true);
        xRequest.send();
    }

    function displayQuestions() {
        
        let data = JSON.parse(this.responseText)
        console.log(data)
        if (this.readyState == 4 && this.status == 200) {
            data.forEach(element => {
                
                document.getElementById("dsad").insertAdjacentHTML('beforeend',questions(element));
                
            });
            
        }
    }

   function checkAnswer(object) {
        //Check asnwer of question
        let xRequest = new XMLHttpRequest();
        xRequest.onreadystatechange = answer;
        xRequest.open('GET','/answer?q=' + object.name + "&a=" + object.id,true);
        xRequest.send();

    }

    function answer() {

        let data = JSON.parse(this.responseText)
        //Render text with answer
        let value = document.getElementById(data.question);
        value.textContent = data.answer;


    }

    function questions(current) {


        question = (`
                <label>${current.stem}</label><br> 
        `);

        answers  = ``

        p = current.options;
        console.log($("input").val());
        p.forEach(((value,index) => {question = question + `<input type="radio" id="${index}" name="${current.stem}" value="${value}" onclick="checkAnswer(this)">
            <label for="${value}">${value}</label><br>  `}))
   
        question = `<div >` + question + `<label id="${current.stem}"></label><br> </div>`; 
        return question;
    }

    function showScore(data, textStatus, xhr) {
        document.getElementById("dsad").insertAdjacentHTML('beforeend',`<label id="${data}">"${this.responseText}"</label>`);
                
    }

    function answers() {
        let xRequest = new XMLHttpRequest();
        
        xRequest.onreadystatechange = showScore;

        //Loop through data

        //Append questions with answers 
    
        xRequest.open('GET','/answers',true);
        xRequest.send();
    }

  
    