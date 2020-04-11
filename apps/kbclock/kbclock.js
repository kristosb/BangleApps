/* jshint esversion: 6 */
const timeFontSize = 5;
const dateFontSize = 3;
const gmtFontSize = 2;
const font = "6x8";

const xyCenter = g.getWidth() / 2;
const yposTime = 75;
const yposDate = 130;
const yposYear = 175;
const yposGMT = 220;

// Check settings for what type our clock should be
var is12Hour = (require("Storage").readJSON("setting.json",1)||{})["12hour"];

function drawSimpleClock() {
  // get date
  var d = new Date();
  var da = d.toString().split(" ");

  g.reset(); // default draw styles
  // drawSting centered
  g.setFontAlign(0, 0);

  // draw time
  var time = da[4].substr(0, 8).split(":");
  var hours = time[0],
    minutes = time[1],
    seconds = time[2];
  var meridian = "";
  if (is12Hour) {
    hours = parseInt(hours,10);
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
      meridian = "AM";
    } else if (hours >= 12) {
      meridian = "PM";
      if (hours>12) hours -= 12;
    }
    hours = (" "+hours).substr(-2);
  }

  g.setFont(font, timeFontSize);
  g.drawString(`${hours}:${minutes}`, xyCenter-30, yposTime, true);
  //g.setFont(font, timeFontSize-2);
  //g.drawString(`:${seconds}`, xyCenter+80, yposTime-4, true);
  g.setFont(font, gmtFontSize);
  g.drawString(meridian, xyCenter + 102, yposTime + 10, true);

  // draw Day, name of month, Date
  var date = [da[0], da[1], da[2]].join(" ");
  g.setFont(font, dateFontSize);

  g.drawString(date, xyCenter, yposDate, true);
  g.setFont(font, gmtFontSize);
  g.drawString('Quarantine day 14', xyCenter, yposYear, true);
  // draw year
  //g.setFont(font, dateFontSize);
  //g.drawString(d.getFullYear(), xyCenter, yposYear, true);
    // draw gmt
  var gmt = da[5];
  g.setFont(font, gmtFontSize);
  g.drawString('Maria & Wiktor :) ', xyCenter+4, yposGMT, true);

}
function drawSimpleClockSeconds() {
  // get date
  var d = new Date();
  var da = d.toString().split(" ");

  g.reset(); // default draw styles
  // drawSting centered
  g.setFontAlign(0, 0);

  // draw time
  var time = da[4].substr(0, 8).split(":");
  var hours = time[0],
    minutes = time[1],
    seconds = time[2];
  g.setFont(font, timeFontSize-2);
  g.drawString(`:${seconds}`, xyCenter+80, yposTime+5, true);
}
// handle switch display on by pressing BTN1
Bangle.on('lcdPower', function(on) {
  if (on) drawSimpleClock();
});

// clean app screen
g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();

// refesh every 15 sec
setInterval(drawSimpleClock, 15E3);
setInterval(drawSimpleClockSeconds, 1E3);

// draw now
drawSimpleClock();

// Show launcher when middle button pressed
setWatch(Bangle.showLauncher, BTN2, {repeat:false,edge:"falling"});

