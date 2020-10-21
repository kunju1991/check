sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.check.check.controller.App", {
		onInit: function () {
			window.SpeechRecognition = window.SpeechRecognition ||
				window.webkitSpeechRecognition ||
				window.mozSpeechRecognition ||
				window.msSpeechRecognition ||
				null;
			this.recognition = new window.webkitSpeechRecognition();
		},
		onButtonPress: function (evt) {
			var transcription = this.getView().byId("idInput");
			var log = this.getView().byId("idLog");
			this.recognition.lang = 'en-US';
			// recognition.interimResults = false;
			this.recognition.maxAlternatives = 5;
			this.recognition.continuous = true;

			// Start recognising
			this.recognition.onresult = function (event) {
				alert("onResult");
				transcription.setValue('');

				for (var i = event.resultIndex; i < event.results.length; i++) {
					if (event.results[i].isFinal) {
						transcription.setValue(event.results[i][0].transcript + ' (Confidence: ' + event.results[i][0].confidence + ')');
					} else {
						transcription.setValue(event.results[i][0].transcript);
					}
				}
			};
			this.recognition.onstart = function () {
				console.log('Speech recognition service has started');
			};
			var that = this;
			that.recognition.onend = function (event) {
				console.log('Speech recognition service has ended');
				that.recognition.onresult(event);
			}
			this.recognition.start();
			var that = this;
			// setTimeout(function (event) {
			// 		that.recognition.stop();
			// 		// if (event.error) {
			// 		// 	that.recognition.onresult(event);
			// 		// }
			// 	}, 2000)
			// Listen for errors
			this.recognition.onerror = function (event) {
				alert("onError");
				log.setValue(event.error);
				transcription.setValue('');
			};
		},
		onButtonStop: function () {
			this.recognition.stop();
			if (event.error) {
				this.recognition.onresult(event);
			}
		}
	});
});