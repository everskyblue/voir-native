export const name_key_pref = "voir-native-preference";

if (!localStorage.getItem(name_key_pref)) {
    localStorage.setItem(name_key_pref, "{}");
}

export const $preference = JSON.parse(localStorage.getItem(name_key_pref));

export const setPreference = (key, value) => {
    $preference[key] = value;
    localStorage.setItem(name_key_pref, JSON.stringify($preference));
};

export const getValuePreference = (key) => $preference[key];

export const existsKeyPreference = (key) => key in $preference;
