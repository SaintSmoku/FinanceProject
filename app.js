
// Дэлгэцтэй ажиллах контроллер

var uiController = (function(){

  var domStrings = {
    inputType : ".add__type",
    inputDescription : ".add__description",
    inputValue : ".add__value",
    addButton : ".add__btn",
    keyPress : "keypress",
  }
 
  return {
    getInput : function(){
      return {
        type : document.querySelector(domStrings.inputType).value,
        description : document.querySelector(domStrings.inputDescription).value,
        value : document.querySelector(domStrings.inputValue).value,
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

      var html;

      if (type == "inc"){
        list = ".income__list";
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }else{
        html = list = ".expenses__list";
        html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      
      // Мөн тэр "html" дотроо орлого зарлагын утгуудыг "REPLACE" ашиглан өөрчилнө.
      if (item.description && item.value){
        html = html.replace("%id%", item.id);
        html = html.replace("$$DESCRIPTION$$", item.description);
        html = html.replace("$$VALUE$$", item.value);

        document.querySelector(list).insertAdjacentHTML("beforeend", html);
      }
      // Бэлтгэсэн "html"-ээ DOM руу оруулна.
      
    }
  }

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
    }
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
    }

    }  
}();

// Холбогч контроллер
var appController = (function(uiController, financeController){
  
  var ctrlAddItem = function(){

    // Товч дарснаар эсвэл өгөгдлөө оруулаад "Enter" дарснаар :
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var getInput = uiController.getInput();
    console.log(getInput.type);
    
    console.log(financeController.data()); 
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэндээ хадгална.
    var item = financeController.addItem(getInput.type, getInput.description, getInput.value);
    
    // 3. Олж авсан өгөгдлүүдээ веб дээр тохирох хэсэгт нь гаргана.
    uiController.addListItem(item, getInput.type);
    
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    }

    var setupEventListeners = function(){
  var domStr = uiController.getDomStrings();
  document.querySelector(domStr.addButton).addEventListener("click", function(){
    ctrlAddItem();
    document.querySelector(".add__description").value = "";
    document.querySelector(".add__value").value = "";
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
    }
  }

})(uiController, financeController)

appController.init();