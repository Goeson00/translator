(function () {
  'use strict';

  describe('Translation module', function () {

      describe('getTranslation', function () {
          it('should return translationKey when value is not present in translationBase', function () {
              expect(translator.getTranslation("xxx", "xx")).to.equal("xxx");
          });
      });
  });
})();