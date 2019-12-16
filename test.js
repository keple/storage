//초안
var util = require('util');
var testArr = {
        spanning:{
            row:3,
            col:4
        },
        data:[
            {
            name:'root',
            colspan:4,
            index:0
        },
        {
            name:'topA',
            colspan:2,
            index:1
        },
        {
            name:'bottomA',
            data:1,
            index:2
        },
        {
            name:'bottomB',
            data:2,
            index:3,
        },
        {
            name:'topB',
            colspan:2,
            index:4
        },
        {
            name:'bottomC',
            data:3,
            index:5            
        },
        {
            name:'bottomD',
            data:4,
            index:6
        }]
    }

var Container = (function(){
    function Container(){
        this.name=''
        this.headerCellTemplate='headerCell.html';
        this.headers=[];
    }
    return Container;
})();
var Blacksmith = (function(){
    function Blacksmith(){
        
    }
    function gen(source,board){
        var result = [];
        var mergeBase = [];
        var opened = {};
        for(var i = 0; i < source.spanning.col ; i++){
            for(var j = 0; j < source.spanning.row ; j++){
                var temp = board[j][i];
                mergeBase.push(source.data[temp]);
            }
            var merged = new Container();
            mergeBase.reduce(function(accu,current){
                accu +=current.name+"-";
                var headLabel = {}
                headLabel.label = current.name;
                if(opened[current.index]){                    
                    headLabel.colSpan = '#colspan'
                }else{
                    if(current.colspan!==undefined)headLabel.colSpan = current.colspan;
                }
                if(typeof current.rowspan === 'number'){
                    headLabel.rowSpan =current.rowspan;
                }
                merged.headers.push(headLabel);
                opened[current.index] = true;
            },'');
            mergeBase = [];
            result.push(merged);
        }
        return result;
    }
    Blacksmith.prototype.reforge = function(source,board){
        var point = 0;
        return gen(source,board);
    }
    return Blacksmith;
})();

//when append
var mat = [
        [0,0,0,0],
        [1,1,4,4],
        [2,3,5,6]
    ];

var maker = new Blacksmith();
var d = maker.reforge(testArr,mat)

for(var i = 0 ; i < d.length ; i++){
    console.log(d[i]);
    for(var j = 0 ; j < d[i].headers.length ; j++){
        console.log(d[i].headers[j]);
    }
}






