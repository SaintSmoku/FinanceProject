
// Дэлгэцтэй ажиллах контроллер

var uiController = (function(){
  console.log("Hello from User Interface");

  var x = 100;

  function add(y){
    return x + y;
  }

  return {
    publicAdd : function(el){
      var result = add(el);
      console.log("Bolovsruulsan utga : " + result);
    }
  }

})()


// Санхүүтэй ажиллах контроллер
var financeController = function(){
  console.log("Hello from Finance");
}();

// Холбогч контроллер
var appController = (function(uiController, financeController){

  var ctrlAddItem = function(){

    // Товч дарснаар эсвэл өгөгдлөө оруулаад "Enter" дарснаар :
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж, тэндээ хадгална.
    // 3. Олж авсан өгөгдлүүдээ веб дээр тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.

      if(event.keyCode === 13){
        console.log("Enter дарсан байна.");
      }else{
        console.log("Өөр товч дарсан байна. Код нь : " + event.keyCode);
      }
    }
  document.querySelector(".add__btn").addEventListener("click", function(){
    ctrlAddItem();
    console.log("Clicked");
  })

  document.addEventListener("keypress", function(event){
    ctrlAddItem();
        console.log("Pressed");
    })
  console.log("Hello from App");
})(uiController, financeController)
