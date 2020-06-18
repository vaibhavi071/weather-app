var button=document.querySelector('.button')
var inputval=document.querySelector('.input')
var name=document.querySelector('.name')
var temp_val=document.querySelector('.temp ')
var wind_speed=document.querySelector('.wind_speed .text ');
var description=document.querySelector('.desc ');
var city=document.querySelector('.city ')
var humidity=document.querySelector('.humidity .text')
var date_today=document.querySelector('.date_today .text')
var bgimage=document.querySelector('.bgimage')
var input = document.querySelector('#myInput')
var icon_element=document.querySelector('.icon')
var d = new Date();
var res = d.toString();
today = res.slice(0, 15);




const KELVIN = 273;

const weather_obj = {};


button.addEventListener('click',function(){
    let api='https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid=e6e67aec01b83d47172a3553d15fe1ca';
    fetch(api)
    .then(function(response){
        let data = response.json();
        console.log(data);
        return data;
    })
    .then(function(data){
        weather_obj.temp = Math.floor(data.main.temp - KELVIN);
        weather_obj.description = data.weather[0].description;
        weather_obj.wind = data.wind.speed;
        weather_obj.cityname=data.name;
        weather_obj.humid=(data.main.humidity);
        weather_obj.country=data.sys.country;
        weather_obj.iconId = data.weather[0].icon;
        weather_obj.id=data.weather[0].id;

        

    })
    .then(function(){
        displayWeather();
        changeBackground();
    
    });
    // Error baad m krte hy
})



function displayWeather()
{
    temp_val.innerHTML = `<h2>${weather_obj.temp}</h2> <span>°C</span>`;
    description.innerHTML = `${weather_obj.description}`;
    wind_speed.innerHTML = `${weather_obj.wind}<span>Km/h</span>`;
    city.innerHTML = `<h2>${weather_obj.cityname}, ${weather_obj.country}</h2><hr color="white" >`;
    humidity.innerHTML=`${weather_obj.humid}`;
    date_today.innerHTML = `${today}`;
    icon_element.innerHTML = `<img style="width: 150px;" src="icons/${weather_obj.iconId}.svg"/>`;


}

function changeBackground()
{
    if (weather_obj.id>=200 && weather_obj.id<300 ){
        document.body.style.backgroundImage = "url('images/Thunderstorm.gif')";
    }
    else if (weather_obj.id>=300 && weather_obj.id<400){
        console.log("Drizzle")
        document.body.style.backgroundImage = "url('images/Rain.gif')";
    }
    else if (weather_obj.id>=500 && weather_obj.id<600){
        console.log("Rain")
        document.body.style.backgroundImage = "url('images/Rain.gif')";
    }
    else if (weather_obj.id>=600 && weather_obj.id<700){
        console.log("Snow")
        document.body.style.backgroundImage = "url('images/Snow.gif')";
    }
    else if (weather_obj.id==800 ){
        console.log("Clear")
        if (weather_obj.iconId=="01n"){
            document.body.style.backgroundImage = "url('images/ClearNight.jpg')";
        }
        else{
            document.body.style.backgroundImage = "url('images/Clear.jpg')";
        }

    }
    else if (weather_obj.id>=801 && weather_obj.id<805){
        console.log("Clouds")
        document.body.style.backgroundImage = "url('images/Clouds.jpg')";
    }
    else if (weather_obj.id>=700 && weather_obj.id<800 ){
        console.log("Haze")
        document.body.style.backgroundImage = "url('images/Haze.jpg')";
    }
}

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      button.click();
    }
  });