var Clock = function(){
	"use strict";

	var self = this;

	self.theTime = function(){
		var date = new Date(),
			hrs = date.getHours(),
			hrsAMPM = (hrs>12)?(hrs-12):hrs,
			hrsZero = addZero(hrsAMPM),
			min = date.getMinutes(),
			minZero = addZero(min),
			sec = date.getSeconds(),
			secZero = addZero(sec),
			ampm = (hrs < 12)?"am":"pm",
			msg = hrsZero+":"+minZero+":"+secZero+ampm;

			function addZero(num)
			{
				return (num<10)?"0"+num:num;
			}

		return msg;
	}
};

module.exports = Clock;