
// Дэлгэцтэй ажиллах контроллер

var uiController = (function(){

  var domStrings = {
    inputType : ".add__type",
    inputDescription : ".add__description",
    inputValue : ".add__value",
    addButton : ".add__btn",
    keyPress : "keypress",
    incomeList : ".income__list",
    expenseList : ".expenses__list",
    incField : ".budget__income--value",
    expField : ".budget__expenses--value",
    percentField : ".budget__expenses--percentage",
    budgetField : ".budget__value",
    containerDiv : ".container",
  }
 
  return {
    changeInfo : function(budget){
      document.querySelector(domStrings.budgetField).textContent = budget.budget;
      document.querySelector(domStrings.incField).textContent = budget.totalInc;
      document.querySelector(domStrings.expField).textContent = budget.totalExp;

      // console.log(isNaN(budget.percent));

      if (isNaN(budget.percent) && budget.percent !== 0){
        document.querySelector(domStrings.percentField).textContent = budget.percent + '%'
      } else {
        document.querySelector(domStrings.percentField).textContent = "0";
      } 

      // budget.percent !== 0 ? document.querySelector(domStrings.percentField).textContent = budget.percent + '%' : document.querySelector(domStrings.percentField).textContent = budget.percent;

      // console.log(budget.percent);
      
      // document.querySelector(domStrings.percentField).append = '%';
    },
    getInput : function(){
      return {
        type : document.querySelector(domStrings.inputType).value,
        description : document.querySelector(domStrings.inputDescription).value,
        // ДОМ-с элементээ шүүж олсны дараа тэмдэгт мөрөөс тоо руу хувиргаж байгаа.
        value : parseInt(document.querySelector(domStrings.inputValue).value),
      }
    },
  
    getDomStrings : function(){
      return domStrings;
    },
    addListItem : function(item, type){
      // Орлого болон зарлагын элементийг агуулсан "html"-ийг бэлтгэнэ.
      // var html = document.createElement("p");
      // html.append(item.value)
      // document.querySelector(".income__list").append(html);

      var html, list;

      if (type == "inc"){
        list = domStrings.incomeList;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }else{
        list = domStrings.expenseList;
        html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      
      // Мөн тэр "html" дотроо орлого зарлагын утгуудыг "REPLACE" ашиглан өөрчилнө.
      if (item.description && item.value){
        html = html.replace("%id%", item.id);
        html = html.replace("$$DESCRIPTION$$", item.description);
        html = html.replace("$$VALUE$$", item.value);

        document.querySelector(list).insertAdjacentHTML("beforeend", html);
      }
      // Бэлтгэсэн "html"-ээ DOM руу оруулна.
      
    },
    deleteItem : function(type, itemId){
      
      var list;

      var deleteItemId = document.getElementById(itemId);

      if (type == "inc"){
        list = domStrings.incomeList;
      }else{
        list = domStrings.expenseList;
      }
      document.querySelector(list).removeChild(deleteItemId);
    },
    clearFields : function(){
      // document.querySelector(".add__description").value = "";
      // document.querySelector(".add__value").value = "";

      var fields = document.querySelectorAll(domStrings.inputDescription + ", " + domStrings.inputValue);
      var fieldsArr = Array.prototype.slice.call(fields);

      // for(var i = 0; i < fieldsArr.length; i++){
      //   fieldsArr[i].value = "";
      // }

      // console.log(document);

      // var doc = document.querySelectorAll(domStrings.inputDescription + ", " + domStrings.inputValue);
      // console.log(doc);
      fieldsArr.forEach(function(element){
        element.value = "";        
      });

      fieldsArr[0].focus();
    }
  }
// 
})()

// Санхүүтэй ажиллах контроллер
var financeController = function(){

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var financeData = {
    allItems : {
      inc : [],
      exp : [],
    },
    totals : {
      inc : 0,
      exp : 0,
    },
    budget : 0,
    percent : 0
  }
  // Төсөв тооцоолох функц
  var calculateTotal = function(type){
        var sum = 0;
        financeData.allItems[type].forEach(function(item){
        sum += item.value;
      })
        financeData.totals[type] = sum;
      }

  return {
    addItem : function(type, description, value){

      var item, id;
      // ID = identification
      
      if(financeData.allItems[type].length === 0){
        id = 1;
      }else{
        id = financeData.allItems[type][financeData.allItems[type].length - 1].id + 1;
      }

      if (type == "inc"){
        item = new Income(id, description, value);
      }else{
        item = new Expense(id, description, value);
      }

      financeData.allItems[type].push(item);

      return item;
    },
    data : function(){
      return financeData;
    },
    calculateBudget : function(){
      calculateTotal('inc');
      calculateTotal('exp');

      // Төсвийг тооцоолох
      financeData.budget = financeData.totals.inc - financeData.totals.exp;
      // Төсвийн үлдэгдлийн хувиар үзүүлэх
      if (financeData.totals.exp > financeData.totals.inc){
        financeData.percent = 0;
      } else {
        financeData.percent = Math.round((financeData.totals.exp / financeData.totals.inc) * 100);
      }
      
    },
    getBudget : function(){
      return {
        budget : financeData.budget,
        percent : financeData.percent,
        totalInc : financeData.totals.inc,
        totalExp : financeData.totals.exp,
      }
    },
    deleteItem : function(type, id){
      var ids = financeData.allItems[type].map(function(item){
        return item.id;
      });
      var index = ids.indexOf(id);

      if(index !== -1){
        financeData.allItems[type].splice(index, 1);
      }
    }
  }  
}();

// Холбогч контроллер
var appController = (function(uiController, financeController){
  
  var ctrlAddItem = function(){

    // Товч дарснаар эсвэл өгөгдлөө оруулаад "Enter" дарснаар :
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var getInput = uiController.getInput();

    if (getInput.description !== "" && isNaN(getInput.value) === false){
      // console.log(financeController.data()); 
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэндээ хадгална.
      var item = financeController.addItem(getInput.type, getInput.description, getInput.value);
      console.log(item);
      
      // 3. Олж авсан өгөгдлүүдээ веб дээр тохирох хэсэгт нь гаргана.
      uiController.addListItem(item, getInput.type);
      uiController.clearFields();
      
      // Төсвийг шинэчлэх 
      updateBudget();
    } else {
      alert('Та орлого эсвэл зарлага оруулахдаа "Тайлбар" хэсгийг бөглөөд, "Дүн" хэсэгт зөвхөн тоо оруулна уу..');
      uiController.clearFields();
      }
    }

    var updateBudget = function(){
          // 4. Төсвийг тооцоолно.
      financeController.calculateBudget();

          // 5. Эцсийн үлдэгдэл, төсөвийг тооцоолно.
      var budget = financeController.getBudget();
          // 6. Төсвийг дэлгэцэнд гаргана.
      uiController.changeInfo(budget);
    }

    var setupEventListeners = function(){
    var domStr = uiController.getDomStrings();
    document.querySelector(domStr.containerDiv).addEventListener("click", function(event){
      
      // Устгах товчлуурыг холбож байна. ID-г нь олж байна. 
      var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
      
      if(id){
        var arrID = id.split('-');
        var type = arrID[0];
        var itemId = parseInt(arrID[1]);

            // Устгах элементийн төрөл болон ID-г массиваас хасах функцээр дамжуулан санхүүгийн контроллёрт дамжуулж байна.  
        financeController.deleteItem(type, itemId);

            // Элементийг дэлгэцээс устгана.
        uiController.deleteItem(type, id);

            // Төсвийн үлдэгдлийг тооцоолж, шинэчилнэ.
        updateBudget();
      }
    })
    document.querySelector(domStr.addButton).addEventListener("click", function(event){

      ctrlAddItem();
    })

    document.addEventListener(domStr.keyPress, function(event){
    
    if(event.keyCode === 13){
    ctrlAddItem();
      }
    })
  }
    return {
      init : function(){
        console.log("Application Started !!!");
        setupEventListeners();
        uiController.changeInfo({
          budget : 0,
          percent : 0,
          totalInc : 0,
          totalExp : 0,
      })
    }
  }

})(uiController, financeController)

appController.init();
ClockRunning();

  function ClockRunning(){
  
    let hr = document.getElementById('hour');
    let min = document.getElementById('min');
    let sec = document.getElementById('sec'); 

  function displayTime(){
    let date = new Date();

    // Getting hour, mins, secs from date
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30*hh + mm/2;
    let mRotation = 6*mm;
    let sRotation = 6*ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;
}
setInterval(displayTime, 1000);
}