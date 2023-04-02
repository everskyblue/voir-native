"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsKeyPreference = exports.getValuePreference = exports.setPreference = exports.$preference = exports.name_key_pref = void 0;
exports.name_key_pref = "voir-native-preference";
if (!localStorage.getItem(exports.name_key_pref)) {
    localStorage.setItem(exports.name_key_pref, "{}");
}
exports.$preference = JSON.parse(localStorage.getItem(exports.name_key_pref));
const setPreference = (key, value) => {
    exports.$preference[key] = value;
    localStorage.setItem(exports.name_key_pref, JSON.stringify(exports.$preference));
};
exports.setPreference = setPreference;
const getValuePreference = (key) => exports.$preference[key];
exports.getValuePreference = getValuePreference;
const existsKeyPreference = (key) => key in exports.$preference;
exports.existsKeyPreference = existsKeyPreference;
