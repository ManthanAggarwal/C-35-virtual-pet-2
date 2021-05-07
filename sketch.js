//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg1;
var dogImg2;
var foodObj;
var fedTime, lastFed;
var feed;
var addFood;


function preload()
{
	dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg1);
  dog.scale= 0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("feed dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime = database.ref('feedTime')
fedTime.on("value", function(data){
  lastFed = data.val()
})

fill("black")
textSize(20)

if(lastFed >= 12){
text("last feed: " + lastFed%12+"PM",250,30);
}
else if(lastFed == 0){

  text ("lastFed:12AM",250,30);
}
else{
  text("lastFed:" +lastFed+"AM",250,30);
}





  drawSprites();
  fill("blue" )
  textSize(20)
text("food remaining : " + foodS,170,200);

}

function readStock(data){
foodS = data.val()
foodObj.updateFoodStock(foodS);
};
 
// function writeStock(x){
//   if(x <= 0){
//     x= 0 
//   }
//   else{
//     x= x-1
//   }
//   database.ref('/').update({
//     Food:x
//   })
// }

function addFoods(){

  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}

function feedDog(){
  dog.addImage(dogImg2);
  if(foodObj.getFoodStock()<= 0 ){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)  
  }
  database.ref('/').update({
Food:foodObj.getFoodStock(),
feedTime:hour()

  })

}


