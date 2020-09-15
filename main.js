const game = new Vue({
    el: "#container",
    data:{
        complexity: 0,
        turn:[],
        score: 0,
        tDelay:[1500,1000,400],
        nowTurnId:0,
        isShow:false,
        opacityBlue:false,
        opacityRed:false,
        opacityYellow:false,
        opacityGreen:false,
        lose:false
    },
    methods:{
        start_game:function(){
            this.turn = [];
            this.lose=false;
            this.score = 1;
            this.go_round();
        },
        go_round:function(){
            this.isShow = true;
            this.turn.push(this.getNewNum());
            this.nowTurnId=0;
            this.show(0);
        },
        show:function(i){
            console.log(this.turn[i]);
            this.animation(this.turn[i], 0);
            if(i==this.turn.length-1 || !this.isShow){
                this.isShow = false;
            }
            else{
                const show_must_go_on = setTimeout(()=>this.show(i+1), this.tDelay[this.complexity]);
            }
        },
        animation:function(num, where){
            console.log(num);
            let speed = 0;
            if(where ==1){
                speed = 200;
            }
            else{
                speed = this.tDelay[this.complexity]-100;
            }
            if(num==0){
                this.opacityBlue = true;
                setTimeout(()=>{this.opacityBlue = false}, speed);
            }
            else if(num==1){
                this.opacityRed = true;
                setTimeout(()=>{this.opacityRed = false}, speed);
            }
            else if(num==2){
                this.opacityYellow = true;
                setTimeout(()=>{this.opacityYellow = false}, speed);
            }
            else if(num==3){
                this.opacityGreen = true;
                setTimeout(()=>{this.opacityGreen = false}, speed);
            }

            let au = new Audio('./sound/'+num+'.mp3');
            au.play();
        },
        btnclick:function(num){
            if(this.isShow || this.score==0){
                return;
            }
            this.animation(num, 1);
            if(num == this.turn[this.nowTurnId]){
                this.nowTurnId++;
                if(this.nowTurnId == this.turn.length){
                    console.log("____");
                    this.score+=1;
                    setTimeout(() => this.go_round(), 2000);
                }
            }
            else{
                this.score =0;
                this.lose = true;
                console.log("lose");
            }
        },
        getNewNum:function(){
            return Number(Math.floor((Math.random()*4)));
        }
    }
})

function sleep(ms){
    const dt = Date.now();
    let currdt = null;
    do{
        currdt=Date.now();
    }while(currdt - dt <ms);
}