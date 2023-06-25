let question=document.querySelector(".question")
let bullets=document.querySelector(".bullets");
let nbq=document.querySelector(".nbQuestions");
let a=document.querySelector(".answers");
let answers=document.querySelectorAll(".child .ans");
let child=document.querySelectorAll(".child");
let btn=document.querySelector(".submit")
let res=document.querySelector(".result")
let time=document.querySelector(".timer")

let count=0;
let result=0

function get(){
    let x=new XMLHttpRequest();
    x.onload=function(){
        if(this.readyState==4 && this.status==200){
            let z=JSON.parse(this.responseText);
            let qcount=z.length
            countdown(0,6,qcount)
            getQuestions(z[count],qcount)
            getbullets(qcount)
            getAnswers(z[count],qcount)
            btn.addEventListener("click",function(){
                for(i=0;i<4;i++){
                    if(child[i].classList.contains("selected")){
                        let ans=document.querySelectorAll(".ans")
                            if(ans[i].textContent==z[count].answer){
                                result++;
                                break;
                            }
                    }
                }
                count++;
                question.innerHTML=""
                bullets.innerHTML=""
                answers.innerHTML=""
                getQuestions(z[count],qcount)
                getAnswers(z[count],qcount)
                getbullets(qcount)
                clearInterval(countinterval)
                countdown(1,0,qcount);
            });
        }
    }
    x.open("GET","questions.json");
    x.send();
}
get();

function getQuestions(z,nb){
    if(count<nb){
        question.textContent=z.question_text;
    }
    else{
        btn.remove();
        a.remove();
        question.remove();
        bullets.remove();
        nbq.remove();
        time.remove();
        res.textContent="You Answered "+result+"/"+nb;
    }
}
function getbullets(nb){
    if(count<nb){
        for(i=0;i<nb;i++){
            let span=document.createElement("span");
            if(i<=count)
            span.className="on";
            nbq.textContent="Question: "+(count+1)+"/"+nb;
            bullets.appendChild(span);
        }
    }
}

function getAnswers(z,nb){
    if(count<nb){
        for(i=0;i<4;i++){
            child.forEach(ele=>{
                ele.classList.remove("selected");
            })
                child[0].classList.add("selected")
            answers[i].textContent=z.options[i]
        }
    }
}
child.forEach(el => {
    el.onclick=function(){
        child.forEach(ele=>{
            ele.classList.remove("selected");
        })
        el.classList.add("selected");
    }
});
function countdown(min,sec,nb){
    countinterval=setInterval(function(){
        if(count<nb){
            sec=sec<10 ? `0${sec}` : `${sec}`
            time.innerHTML=`${min}:${sec}`
            if(min!=0){
                if(sec<=0){
                    min--;
                    sec=60
                }
            }  
            if(--sec<0 && --min<0){
                clearInterval(countinterval);
                btn.click();
            }
        }
    },1000)
}
