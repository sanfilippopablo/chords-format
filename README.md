chords-format
=============

Utility for parsing and serializing lyrics with chords.

## What does it do

This library converts this:
```
---[Verse 1]---
[A]Twinkle twinkle [D]little [A]star,
[D]How i [A]wonder [E]what you [A]are,
```

into this:
```json
{
  "verses": [
    {
      "name": "Verse 1",
      "lines": [
        [
          {"chord": "A", "text": "Twinkle twinkle "},
          {"chord": "D", "text": "little "},
          {"chord": "A", "text": "star,"}
        ],
        [
          {"chord": "D", "text": "How i "},
          {"chord": "A", "text": "wonder "},
          {"chord": "E", "text": "what you "},
          {"chord": "A", "text": "are"}
        ]
      ]
    }
  ]
}
```
and viceversa.

## How to use it

You can use it like this:
```js
var ChordsFormat = require('chords-format');
var cf = new ChordsFormat({chordTag: false});
var lyrics = cf.parse(text);
```
