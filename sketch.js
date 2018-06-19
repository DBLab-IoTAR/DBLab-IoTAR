var canvas;
var textos;
var data;
var gotas;
var logo;
var info_umidade;
var info_distancia;
var info_temperatura;

var girar = 0.0;

// Create a client instance
//client = new Paho.MQTT.Client("177.99.211.82", 30076, "clientId");
client = new Paho.MQTT.Client("iot.eclipse.org", 443, "clientId");

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
  console.log("ugikgkigk")
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  message = message.payloadString.toString();
  console.log(message)
  if(message[0] == "H"){    
    message = message.split('H: ').join('');
    message = message.split('%').join('');
    console.log(message);        
    info_umidade.setAttribute('value', "" + message + "%");
    console.log("umidade");
  }else if(message[0] == "T"){
    message = message.split('T: ').join('');
    message = message.split('C').join('');
    info_temperatura.setAttribute('value', "" + message +"C");
    console.log(message);    
    console.log("temperatura");
  }else if((message[0] + message[1] + message[2] + message[3]) == "Dist"){
    message = message.split('Dist: ').join('');
    message = message.split('mm').join('');    
    info_distancia.setAttribute('value', "" + message +"mm");
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

  info_umidade= document.getElementById('umidade');

  info_distancia= document.getElementById('distancia');

  gotas = document.getElementById('#drops');

  girar = girar + 0.1;
}

function draw() {
  canvas.resize(windowWidth,windowHeight);
}

