"use strict";

(function(root, name, definition) {
    if (typeof define === "function" && define.amd) {
        define(definition);
    } else if (typeof module === "object" && module.exports) {
        module.exports = definition();
    } else {
        root[name] = definition();
    }
})(this, "translator", function() {

    const lang = ["en", "pl", "de"];
    const translationBase = {};
    const publicAPI = {
        getTranslation
    };

    lang.forEach(lang => populateTranslationBase(`../json/${lang}.json`, lang));

    return publicAPI;

    /**************************************************************************/

/**
 * Returns a translation text based on the specified translation key and chosen language.
 * 
 * @param {string} translationKey String representing text content of HTML element like: <li>header.home</li>.
 * @param {string} lang String representing language based on Locale Codes: https://www.science.co.il/language/Locale-codes.php.
 * @returns {string} Translation text for the specified key and language. If original translation text doesn't exist 
 *                   english fallback is returned. If there is no source with a given translation key it returns input translation key.
 */

    function getTranslation(translationKey, lang) {
        if (translationBase[lang]) {
            for (const translation of translationBase[lang]) {
                if (translation.source === translationKey) return translation.target;
            }
        }

        if(translationBase.en) {
            for (const translation of translationBase.en) {
                if (translation.source === translationKey) return translation.target;
            }
        }

        return translationKey;
    }
    
    function populateTranslationBase(JSONfilepath, lang) {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", JSONfilepath);

        xhr.addEventListener("readystatechange", function addTranslation() {
            if (this.readyState === 4) {
                if (this.status === 200) translationBase[lang] = JSON.parse(this.responseText);
            }
        });

        xhr.send();
    }
    
});