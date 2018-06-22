var canvas;
var textos;
var data;
var gotas;
var logo;
var info_umidade;
var info_umidade2;
var info_distancia;
var info_distancia2;
var info_temperatura;
var info_temperatura2;

var girar = 0.0;

// Create a client instance
//client = new Paho.MQTT.Client("177.99.211.82", 30076, "clientId");
client = new Paho.MQTT.Client("iot.eclipse.org", 443, new Date().toString());



// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
  useSSL: true,
  timeout: 3,
  onSuccess: onConnect
}

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  client.subscribe("dblab/hands-on/mqtt/display");
  console.log("data   ", new Date());
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});

// called when a message arrives
function onMessageArrived(message) {
  message = message.payloadString.toString();
  console.log(message)
  if(message[0] == "H"){    
    message = message.split('H: ').join('');
    message = message.split('%').join('');
    console.log(message);        
    info_umidade.setAttribute('value', "" + message + "%");
    info_umidade2.setAttribute('value', "" + message + "%");
    console.log("umidade");
  }else if(message[0] == "T"){
    message = message.split('T: ').join('');
    message = message.split('C').join('');
    info_temperatura.setAttribute('value', "" + message +"C");
    info_temperatura2.setAttribute('value', "" + message +"C");
    console.log(message);    
    console.log("temperatura");
  }else if((message[0] + message[1] + message[2] + message[3]) == "Dist"){
    message = message.split('Dist: ').join('');
    message = message.split('mm').join('');    
    info_distancia.setAttribute('value', "" + message + "mm");
    info_distancia2.setAttribute('value', "" + message + "mm");
    console.log(message);    
    console.log("distancia");
  }else{
  }
}


function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0, 0);

  canvas.parent("#p5js");

  logo = loadImage("../addons/LOGO_DBLAB.png");

  info_temperatura = document.getElementById('temperatura');
  info_temperatura2 = document.getElementById('temperatura2');

  info_umidade= document.getElementById('umidade');
  info_umidade2= document.getElementById('umidade2');

  info_distancia= document.getElementById('distancia');
  info_distancia2= document.getElementById('distancia2');

  gotas = document.getElementById('#drops');

  girar = girar + 0.1;
}

function draw() {
  canvas.resize(windowWidth,windowHeight);
}

