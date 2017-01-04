'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['{c}[(.+?)]{/c}'], ['\\{c\\}\\[(.+?)\\]\\{\\/c\\}']),
    _templateObject2 = _taggedTemplateLiteral(['[(.+?)]'], ['\\[(.+?)\\]']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var verseIsNull = function verseIsNull(verse) {
  return verse.name === '' && verse.lines.length === 0;
};

module.exports = function () {
  function ChordsFormat(options) {
    _classCallCheck(this, ChordsFormat);

    var defaultOptions = {
      chordTag: true
    };
    this.options = Object.assign({}, defaultOptions, options);
  }

  _createClass(ChordsFormat, [{
    key: 'stringifyChord',
    value: function stringifyChord(chord) {
      if (this.options.chordTag) {
        return '{c}[' + chord + ']{/c}';
      } else {
        return '[' + chord + ']';
      }
    }
  }, {
    key: 'stringify',
    value: function stringify(lyrics) {
      var _this = this;

      return lyrics.verses.map(function (verse) {
        return '---[' + verse.name + ']---\n' + verse.lines.map(function (line) {
          var innerText = line.map(function (bit) {
            var s = '';
            if (bit.chord) {
              s += _this.stringifyChord(bit.chord);
            }
            s += bit.text;
            return s;
          }).join('');
          return innerText;
        }).join('\n');
      }).join('\n');
    }
  }, {
    key: 'parseLine',
    value: function parseLine(lineOfText) {
      var line = [];
      var chordRegex = new RegExp(this.chordRegex, 'g');
      var result = chordRegex.exec(lineOfText);
      if (result === null) {
        // No chords in this line. Just one large bit.
        line.push({
          chord: null,
          text: lineOfText
        });
      } else if (result !== null && result.index !== 0) {
        // It doesn't start with a chord, but with text
        // So let first insert that first text
        line.push({
          chord: null,
          text: lineOfText.slice(0, result.index)
        });
      }
      while (result !== null) {
        var lastResult = result;
        result = chordRegex.exec(lineOfText);
        var sliceEnd = result ? result.index : undefined;
        line.push({
          chord: lastResult[1],
          text: lineOfText.slice(lastResult.index + lastResult[0].length, sliceEnd)
        });
      }
      return line;
    }
  }, {
    key: 'parse',
    value: function parse(text) {
      var _this2 = this;

      var verseNameRegex = /---\[(.*?)\]---/;
      var linesOfText = text.split('\n');
      var lyrics = {
        verses: []
      };
      var verse = {
        name: '',
        lines: []
      };
      linesOfText.forEach(function (lineOfText, textLineNumber) {
        if (verseNameRegex.test(lineOfText)) {
          // Close last verse and add to lyrics
          if (!verseIsNull(verse)) {
            lyrics.verses.push(verse);
          }

          // Start creating the new verse
          verse = {
            name: verseNameRegex.exec(lineOfText)[1],
            lines: []
          };
        } else {
          // It's a line. Parse it
          verse.lines.push(_this2.parseLine(lineOfText));
        }
      });
      lyrics.verses.push(verse);
      return lyrics;
    }
  }, {
    key: 'chordRegex',
    get: function get() {
      if (this.options.chordTag) {
        return String.raw(_templateObject);
      } else {
        return String.raw(_templateObject2);
      }
    }
  }]);

  return ChordsFormat;
}();