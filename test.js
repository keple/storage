//초안
var util = require('util');
var testArr = {
        spanning:{
            row:3,
            col:4
        },
        columnDefs:[
            {
            name:'root',
            
            index:0
        },
        {
            name:'topA',
            
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

var genData = (function(){
    function genData(){
        
    }
    function gen(source,board){
        var result = [];
    
        for(var i = 0; i < board[0].length ; i++){
            var item = mergeItem(board,board.length,i,source);
            var merged = new Container();
            
            item.reduce(function(accu,current){
                console.log(current);
                accu +=current.name+"-";
                var headLabel = {}
                headLabel.label = current.name;
          
                propertyAdd('colSpan',current,headLabel);
                propertyAdd('rowSpan',current,headLabel);
                
                merged.headers.push(headLabel);
                
            },'');
            result.push(merged);
        }
        return result;
    }
    function mergeItem(board,rowCount,colIndex,source){
        var tempArr = [];
        for(var j = 0; j < rowCount ; j++){
            
            var temp = board[j][colIndex];
            var addTarget = source.data[temp];
            if(typeof temp !=='number'){
                if (temp.includes('cd')){
                    var index = parseInt(temp.replace('cd'));
                    var colDummy = {...source.data[index]};
                    colDummy.columnDummy = true;
                    addTarget = colDummy;
                }
                if (temp.includes('rd')){
                    source.data[index].rowDummy = true;
                }
            }    
            tempArr.push(addTarget);
        }
        return tempArr;
    }
    function propertyAdd(direction,current,headLabel){
        if(current.columnDummy || current.rowDummy){
            headLabel[direction] = '#'+ direction;
        }else{
            if(current[direction]!==undefined)headLabel[direction] = current[direction];
        }
    };

    genData.prototype.reforge = function(source,board){
        return gen(source,board);
    }
    return genData;
})();

var Scanner = (function(){

    function Scanner(){

    }
    Scanner.prototype.detect = function(source,dispositionMap){
        var indexes = [];
        for( var i = 0 ; i < dispositionMap[0].length; i++){
            for( var j = 0 ; j < dispositionMap.length ; j++){
                var elm = dispositionMap[j][i]
                if(typeof elm ==='number'){
                    
                    indexes.push(elm);
                }else if(elm.includes('cd')){
                    var index= parseInt(elm.replace('cd'));
                    if(source.data[index].colSpan===undefined){
                        source.data[index].colSpan = 2;
                    }else{
                        source.data[index].colSpan++;
                    }
                }else if(elm.includes('rd')){
                    var index= parseInt(elm.replace('rd'));
                    if(source.data[index].rowSpan===undefined){
                        source.data[index].rowSpan = 2;
                    }else{
                        source.data[index].rowSpan++;
                    }
                }
            }
        }
        for(var i = 0 ;  i < source.data.length ; i ++ ){
            console.log(source.data[i]);
        }
        
    }
    return Scanner;
})();


//when append
var map = [
        [0,'0cd','0cd','0cd'],
        [1,'1cd', 4, '4cd'],
        [2, 3, 5, 6]
    ];




var gnr = new genData();
var scan  = new Scanner();
scan.detect(testArr,map);
var result = gnr.reforge(testArr,map);

for(var i = 0 ; i < result.length; i++ ){
    for(var j = 0 ; j < result[i].headers.length ; j++){
        console.log(result[i].headers[j]);
    }
}




