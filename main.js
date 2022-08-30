//Budget Controller
var BudgetController = (function() {
    //some code

    let Expenses = function(id, description, val) {
        this.id = id;
        this.description = description;
        this.value = val;
    }

    let Income = function(id, description, val) {
        this.id = id;
        this.description = description
        this.value = val

    }

let CalculateTotal=((type)=>{
let sum=0;
data.allitems[type].forEach((x)=>{
    console.log(sum,x);
    sum=sum+ parseInt(x.value);
  Number.parseInt(sum)
})
data.total[type]=sum
})

    let data = {
        allitems: {
            inc: [],
            exp: []
        },
        total: {
            inc: 0,
            exp: 0
        },Budget:0,
        Percentage:-1,
    }

    return {
        addItem: function(type, desc, valu) {
            //create new ID
            let Id,
                newValue;
            if (data.allitems[type].length > 0) {
                Id = data.allitems[type][data.allitems[type].length - 1].id + 1
            } else
                Id = 0;
            //create a new item based on type==inc||exp
            if (type === 'exp')
                newValue = new Expenses(Id, desc, valu)

            else
                newValue = new Income(Id, desc, valu)
            console.log(newValue)
             
//push it into our datastructure
            data.allitems[type].push(newValue)

            //return the new element
            return newValue;
        },
        CalculateBudget:(()=>{
            //calculate total incolme and expenses
            CalculateTotal('inc')
            CalculateTotal('exp')
            //calculate budget
            data.Budget=data.total.inc-data.total.exp
            //calculate percentage
            data.Percentage=Math.floor((data.total.exp/data.total.inc)*100)
           
        }),
        getBudget:(()=>{
            return{
                budget:data.Budget,
                TotalInc:data.total.inc,
                TotalExp:data.total.exp,
                Perc:data.Percentage
            }
        }),
        deletBudget:((type,id)=>{
            let ids,index;
ids=data.allitems[type]

.map((current)=>{
return  current.id
})

index=ids.indexOf(id);
console.log(index)
if(index !==-1)
data.allitems[type].splice(index,1)
        })
    }
    
})();

//UI Controller


var UiController = (function() {
    //some code

    var DOMString = {
        inputConatiner: '.income-list',
        expenseConatiner: '.expense-list',
        mainBgt:'.total',
        incvalue:'.inc-value',
        expvalu:'.exp-value',
        percentId:'.per',
        Container:'.row',
        type:'#type',
        discription:'#dis',
        value:'#valu',
        button:'.btn'
    }



    var counter=0;
    return {
        getInput() {
           

            let x=document.querySelector('#valu').value;
            
            
                return {
                type: document.querySelector("#type").value,
                discription: document.querySelector('#dis').value,
                val:x == ''?alert('Empty'):x,
                
            }
            
        },
        addlistItem: function(obj, type) {
            //Create a HTML String with placeholder
            var html, newHtml, element;

            if (type == 'inc') {
                element = DOMString.inputConatiner;
                if(counter==0){
                html = ' <a href = "#" class = "a list-group-item list-group-item-action list-group-item-light"id = "inc-%id%" > %description%   <span class="float-right">%v%</span> <button class="i btn"><i class="far fa-trash-alt"></i ></button></a> '
            counter=1;
                }
                else{

                    html = ' <a href = "#" class = "a list-group-item list-group-item-action list-group-item-dark"id = "inc-%id%" > %description%   <span class="float-right">%v%</span> <button class="i btn"><i class="far fa-trash-alt"></i ></button></a> '
            counter=0
                }
            } else {        
                element = DOMString.expenseConatiner;
                if(counter ==0){
                    html = ' <a href = "#" class = "a list-group-item list-group-item-action list-group-item-light"id = "exp-%id%" > %description%   <span class="float-right">%v%</span> <button class="i btn"><i class="far fa-trash-alt"></i ></button></a> '
                counter=1;
                    }
                    else{
                        html = ' <a href = "#" class = "a list-group-item list-group-item-action list-group-item-dark"id = "exp-%id%" > %description%   <span class="float-right">%v%</span> <button class="i btn"><i class="far fa-trash-alt"></i ></button></a> '
                counter=0
                    }
            }
            //replacing placeholder with some actual data

            newHtml = html.replace('%id%', obj.id)
            newHtml=newHtml.replace('%v%',obj.value)
            newHtml = newHtml.replace(' %description%', obj.description)
  
            //inserting new item into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml)
        },
//deleting From UI
deleteListItem:((selectorID)=>{
let el=document.getElementById(selectorID);
el.remove();

}),

//clearing the Input Field
        clear:function(){
            let fields=document.querySelectorAll('.description'+','+'.value')
           
        let FieldArray= Array.prototype.slice.call(fields)
       
        FieldArray.forEach(element => {
element.value=''            
        });  
    },


    UiUpdate:function(obj){
        document.querySelector(DOMString.mainBgt).innerHTML=( obj.budget);
        document.querySelector(DOMString.incvalue).innerHTML=obj.TotalInc;
        document.querySelector(DOMString.expvalu).innerHTML=obj.TotalExp;
        if(obj.Perc>0)
        document.querySelector(DOMString.percentId).innerHTML=obj.Perc + '%';
    else
    document.querySelector(DOMString.percentId).innerHTML='- -';    
}
,UpdatingDate:function(){
    var date=new Date();
    document.querySelector(".time").innerHTML=date.toLocaleDateString();
console.log("time")
},
FinalUI:((type,va)=>{
if(type==="inc")
{
document.querySelector(DOMString.discription).style.border="1px solid green"
va.toString()
// va.style.color="cornflowerblue"
}
else{
    document.querySelector(DOMString.button).style.backgroundColor="red";
    document.querySelector(DOMString.discription).style.border="1px solid red"
    // value.style.color="crimson"
}

}),

GetDOMString:function(){
    return DOMString;
}
    }


})();


//AppController
var AppController = (function(BgtCtrl, UiCtrl) {
    //some code
        let inputData, newItem,DOM;
        DOM=UiCtrl.GetDOMString();
        var UpdateBudget=function(){
            BgtCtrl.CalculateBudget()
            var UI= BgtCtrl.getBudget()
            UiCtrl.UiUpdate(UI)
        };
  
     let UpdatePercent=function(){

     }

    var AddItem = function() {
        //1.Get Input field data
        inputData = UiCtrl.getInput()
        //UiMaking better
       UiCtrl.FinalUI(inputData.type,inputData.val)
        //2. add new item to the budget controller
        newItem = BgtCtrl.addItem(inputData.type, inputData.discription, inputData.val)
        // 3. Add the item to the UI
        UiCtrl.addlistItem(newItem, inputData.type)
        //4. Clear the input field
        UiCtrl.clear()
        //5. Updating a Budget
        UpdateBudget()
       
    }
     
        let deletItem=function(event){
        let ItemId,splitID,type,ID
        ItemId=event.target.parentNode.parentNode.id
        if(ItemId)
        {
            splitID=ItemId.split('-');
            type=splitID[0];
            ID=Number.parseInt(splitID[1]) 
            //console.log(typeof ID)
            //1. deleting item from the datastructure
            BgtCtrl.deletBudget(type,ID)
            //2. deleting form the UI
            UiCtrl.deleteListItem(ItemId)
            //3.update budget
            UpdateBudget();
            //4.update percent

        }
        }

   
        let EventController = function() {

            document.querySelector('.btn').addEventListener('click', AddItem)
            document.querySelector(DOM.Container).addEventListener('click',deletItem)
            document.addEventListener('keypress', function(e) {
                if (e.keyCode === 13 || e.which == 13) {
                    AddItem();  
                }
            })
        }

        return {
        init: function() {
            console.log("Application Started")
       //6.Update date
       UiCtrl.UpdatingDate()
            EventController();
        }
        }

})(BudgetController, UiController);
AppController.init();