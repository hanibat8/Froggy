let startBtn=document.querySelector('.btn');
let currentIndex=59;
let width=8;
let squares=document.querySelectorAll('.grid div');

let roads=document.querySelectorAll('.road');
let roadArr=Array.prototype.slice.call(roads);
let newIndexC1=[];
let newIndexC2=[];
let newIndexC3=[];

let river=document.querySelectorAll('.river');
let rivArr=Array.prototype.slice.call(river);
let newIndexL1=[];
let newIndexL2=[];
let newIndexL3=[];

let currentTime;
let won;
let lost;
let gamePlaying=false;
let timeLeft=document.querySelector('.time-left');

startBtn.addEventListener('click',function(){
    let id,id1;
    gamePlaying=true;
    currentIndex=59;
    currentTime=20;
    won=false;
    lost=false;
    squares[currentIndex].classList.add('frog');
    if(gamePlaying===true){
        id=setInterval(autoMoveLeft,1000);
        id1=setInterval(autoMoveRight,1000);
        window.addEventListener('keyup',moveFrog);
    }
    else{
        clearInterval(id);
        clearInterval(id1);
    }
});


//Adding c1/c2/l1 etc classes 
function addC_L(arr,arr1,str){

    arr.forEach(function(ind){
        arr1[ind].classList.add(str);
    });

   arr.length=0;
}

function removeClass(item,class1,class2=''){
    item.classList.remove(class1);
    if(class2!==''){
        item.classList.remove(class2);
    }   
}

function checkIndexLog(index){

    if(index===0 ){
        index=width;
    }
    else if(index===width){
        index=width*2;
    }
    return index;
}

function checkIndexCar(index){

    if(index===width-2 || index===width-1){
        index=-1;
    }
    else if(index===(width*2)-2 || index===(width*2)-1){
        index=7;
    }
    else if(index===(width*3)-2 || index===(width*3)-1){
        index=15;
    }

    return index;
}

function autoMoveLeft(){
    if(gamePlaying===true){
        currentTime--;
        timeLeft.textContent=currentTime;
        roadArr.forEach(
            function(road,index,array){
                if(road.classList.contains('c1')){   
                    removeClass(road,'c1','car');
                    
                    index=checkIndexCar(index);
                    newIndexC1.push(index+1);
                    array[index+1].classList.add('car');
                }
    
                else if(road.classList.contains('c2')){         
                    removeClass(road,'c2','car');
    
                    index=checkIndexCar(index);
                    newIndexC2.push(index+1);
                    array[index+1].classList.add('car');
                
                }
    
                else if(road.classList.contains('c3')){         
                    removeClass(road,'c3','car');
                    
                    if(index===array.length-1){
                        index=index-1;
                    }
    
                    index=checkIndexCar(index);
                    newIndexC3.push(index+1);
                    array[index+1].classList.add('car');
                    
                }
        });
    
        addC_L(newIndexC1,roadArr,'c1');
        addC_L(newIndexC2,roadArr,'c2');
        addC_L(newIndexC3,roadArr,'c3');
        win(currentIndex);
        lose(currentIndex);
    }
}

function autoMoveRight(){
    if(gamePlaying===true){
        rivArr.forEach(
            function(riv,index,array){
    
                if(riv.classList.contains('l1')){   
                    removeClass(riv,'l1','log');
                    
                    index=checkIndexLog(index);
                    newIndexL1.push(index-1);
                    array[index-1].classList.add('log');
                }
    
                else if(riv.classList.contains('l2')){         
                    removeClass(riv,'l2','log');
                    
                    index=checkIndexLog(index);
                    newIndexL2.push(index-1);
                    array[index-1].classList.add('log');           
                }
    
                else if(riv.classList.contains('l3')){         
                    removeClass(riv,'l3','log');
    
                    index=checkIndexLog(index);
                    newIndexL3.push(index+1);
                    array[index+1].classList.add('log');
                    
                }
        });
    
        addC_L(newIndexL1,rivArr,'l1');
        addC_L(newIndexL2,rivArr,'l2');
        addC_L(newIndexL3,rivArr,'l3');
        win(currentIndex);
        lose(currentIndex);
    }
}
    
function moveFrog(e){
       
    if(gamePlaying===true){
        switch(e.keyCode){
            case(38):
             if(currentIndex-width>=0){
                removeClass(squares[currentIndex],'frog');
                currentIndex=currentIndex-width;
                squares[currentIndex].classList.add('frog');
            }
            break;       
            case(40):
                if(currentIndex+width<=squares.length-1){
                    removeClass(squares[currentIndex],'frog');
                    currentIndex=currentIndex+width;
                    squares[currentIndex].classList.add('frog');
                }
            break;
            case(37):
            if(currentIndex%width!==0){
                removeClass(squares[currentIndex],'frog');
                currentIndex=currentIndex-1;
                squares[currentIndex].classList.add('frog');
            }
            break;
            case(39):
            if(currentIndex%width!==7){
                //console.log(currentIndex+1);
                squares[currentIndex].classList.remove('frog');
                currentIndex=currentIndex+1;
                squares[currentIndex].classList.add('frog');
            }
        }  
        win(currentIndex);
        lose(currentIndex);
    }
}

function win(item){
    if(item<width-1){
        won=true;
        gamePlaying=false;
        alert('YOU WON!!!!!!')
    }
}

function lose(){
    if(currentTime===0 || squares[currentIndex].classList.contains('car') ||(squares[currentIndex].classList.contains('river') && !squares[currentIndex].classList.contains('log'))){
        lost=true;
        gamePlaying=false;
        alert('YOU LOST!!!!!!')
    }
}