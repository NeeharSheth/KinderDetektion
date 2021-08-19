status = false;
objects = [];
r = 0;
b = 0;
g = 0;
alarm = "";

function preload() {
  alarm = loadSound("alarm.m4a");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetect = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Detecting Image";
}

function modelLoaded() {
  console.log("Model loaded :D");
  status = true;
  console.log(status);
}

function draw() {
  image(video, 0, 0, 380, 380);

  if (status == "true") {
    objectDetect.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
      r = random(255);
      g = random(255);
      b = random(255);
      fill(r, g, b);
      if (objects[i].label == "person") {
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
        noFill();
        stroke(r, g, b);
        strokeWeight(5);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        document.getElementById("no_objects").innerHTML = "Number of objects detected:" + objects.length;
        alarm.stop();
        document.getElementById("status").innerHTML = "Detected Bebe";
      } else {
        alarm.play();
        alarm.setVolume(2);
        document.getElementById("status").innerHTML = "Not Detected Bebe";
      }
    }
  }
}



function gotResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
    console.log(objects);
  }
}

function next() {
  img_count += 1;
  if (i == 4)
    i = 0;

  canvas.clear();
  objectDetect.detect(img[img_count], gotResults);
}