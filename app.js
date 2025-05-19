
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
    
  }
  
}();

// Холбогч контроллер
var appController = (function(uiController, financeController){
  
  var ctrlAddItem = function(){
  var test = uiController.getInput();
  console.log(test);

    // Товч дарснаар эсвэл өгөгдлөө оруулаад "Enter" дарснаар :
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэндээ хадгална.
    // 3. Олж авсан өгөгдлүүдээ веб дээр тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    }

var setupEventListeners = function(){
  var domStrings = uiController.getDomStrings();
  document.querySelector(domStrings.addButton).addEventListener("click", function(){
    ctrlAddItem();
  })

  document.addEventListener(domStrings.keyPress, function(event){
    
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