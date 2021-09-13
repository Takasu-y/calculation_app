console.log();
var vm = new Vue({
    el: '#calc-app',
    data: {
        preResult:　0, //計算結果
        proccessArr: [], //途中式
        input: "", //現在入力
        isPercent: false,
        hasOperator: false, //inputの値が数字か演算子か判定
        operators: ["+", "-", "×", "÷"],

    },
    computed: {
        proccess: function(){
            return this.proccessArr.join(" ");
        },
        isDisableOperator: function(){
            if(this.proccessArr.length <= 0){
                return true;
            }else{
                return false;
            }
        },
        result: function(){
            return this.preResult.toLocaleString();
        }
    },
    methods: {
        inputAny: function(x){
            // 数字or四則演算子が入る
            //最初に演算子を入力出来ないようにする

            if(this.hasOperator){
                //inputの値がoperatorの場合
                if(this.operators.includes(x)){
                    //入力値もoperator
                    this.input = x;
                }else{
                    //数字
                    this.proccessArr.push(this.input);
                    this.input = x;
                    this.hasOperator = false;
                }
            }else{
                //inputの値が数字または空白
                if(this.operators.includes(x)){
                    //入力値がoperator
                    if(this.input === ""){
                        console.log("演算子から数式は始められません")
                    }else{
                        this.proccessArr.push(this.input);
                        this.input = x;
                        this.hasOperator = true;
                    }
                }else{
                    //入力値が数字
                    this.input += x.toString();
                }
            }

        },
        calculate: function(){
            //=が押された時
            if(!this.hasOperator){
                this.proccessArr.push(this.input);
                this.input = "";
            };
            //左から順に計算する
            //インデックスの偶数：数字, 奇数:演算子
            this.preResult = parseInt(this.proccessArr[0]);

            for(let i=1; i < this.proccessArr.length; i+=2){
                this.calculateHelper(this.proccessArr[i], this.proccessArr[i+1]);
            }

        },
        calculateHelper: function(operator, num){
            if(operator === "+"){ this.preResult += num;}
            if(operator === "-"){ this.preResult -= num;}
            if(operator === "×"){ this.preResult *= num;}
            if(operator === "÷"){ this.preResult /= num;}
        },
        allClear: function(){
            //計算式と結果をクリアする(AC押した時に発火)
            this.proccessArr = [];
            this.preResult = 0;
            this.input = "";
            this.isPercent = false;
        },
        negate: function(){
            //正負符号反転する (+/-を押した時に発火)
            this.preResult *= -1;
        },
        convertToPercent: function(){
            // %を押した時に発火
            if(!this.isPercent){
                this.preResult *= 100;
                this.isPercent = true;
            }
        },
    },
})