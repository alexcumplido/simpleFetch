var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_WEATHER = 'http://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&APPID=';
var API_WEATHER_KEY = '3a6de1bfb15f6d47dc749e2fc2555d25';
var API_DAD = 'https://icanhazdadjoke.com/';
var API_CHUCK = 'https://api.chucknorris.io/jokes/random';
var jokeFetched;
var reportJokes = [];
var btnJokes = document.querySelector('#jokes');
var btnScore = document.querySelectorAll('#score button');
var templateJoke = document.querySelector('p');
var weatherHtml = document.querySelector('span');
var weatherIcon = document.querySelector('img');
fetchWeather().
    then(function (res) {
    weatherIcon.setAttribute('src', "http://openweathermap.org/img/w/".concat(res.weather[0].icon, ".png"));
    weatherHtml.textContent = "".concat(res.name, " ").concat(res.main.temp, " \u00B0C");
});
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_WEATHER).concat(API_WEATHER_KEY))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
btnJokes.addEventListener('click', function () {
    if ((Math.floor(Math.random() * 2 + 1) > 1)) {
        fetchIcanhaz()
            .then(function (res) { return insertHTML(res.joke); })["catch"](function (error) { return insertHTML(error); });
    }
    else {
        fetchCuck()
            .then(function (res) { return insertHTML(res.value); })["catch"](function (error) { return insertHTML(error); });
    }
});
function fetchIcanhaz() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_DAD), { headers: { Accept: 'application/json' } })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, jokeFetched = _a.sent()];
            }
        });
    });
}
function fetchCuck() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_CHUCK))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, jokeFetched = _a.sent()];
            }
        });
    });
}
function insertHTML(content) {
    templateJoke.textContent = content;
}
// Prevent double score for same joke
btnScore.forEach(function (button) {
    button.addEventListener('click', function (event) {
        registerJoke(jokeFetched, event);
    });
});
function registerJoke(jokeFetched, event) {
    reportJokes.push({
        jokeText: jokeFetched.joke || jokeFetched.value,
        id: jokeFetched.id,
        score: Number(event.target.id),
        date: new Date().toISOString()
    });
}
