function preload(){

}

function setup() {
  canvas = createCanvas(500, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  mobile=ml5.imageClassifier("MobileNet", modelLoaded);
}

previous_result="";


function modelLoaded(){
  console.log("model loaded");
}

function draw(){
  image(video, 0, 0, 500, 300);
  mobile.classify(video, gotResult);
  }

function gotResult(error, result){
  if(error){
    console.error(error);
  }
  else{
    if(result[0].confidence>0.5 && previous_result!=result[0].label){
      console.log(result);
      previous_result=result[0].label;
      document.getElementById("object").innerHTML=result[0].label;
      document.getElementById("confidence").innerHTML=Math.floor(result[0].confidence*100)+"%";

      var synth=window.speechSynthesis;
      speak_data="Object detected is "+result[0].label;
      utterThis=new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
    }

  }
}




