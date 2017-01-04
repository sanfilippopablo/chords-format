const ChordsFormat = require('../src/index')

const pairsWithoutChordTag = [
  {
    string: '---[Verse:1]---\nasd [B]qwe',
    object: {
      verses: [
        {
          name: 'Verse:1',
          lines: [
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ]
          ]
        }
      ]
    }
  },
  {
    string: '---[Verse:1]---\nasd [B]qwe\nasd [B]qwe',
    object: {
      verses: [
        {
          name: 'Verse:1',
          lines: [
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ],
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ]
          ]
        }
      ]
    }
  }
]

const pairsWithChordTag = [
  {
    string: '---[Verse:1]---\nasd {c}[B]{/c}qwe',
    object: {
      verses: [
        {
          name: 'Verse:1',
          lines: [
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ]
          ]
        }
      ]
    }
  },
  {
    string: '---[Verse:1]---\nasd {c}[B]{/c}qwe\nasd {c}[B]{/c}qwe',
    object: {
      verses: [
        {
          name: 'Verse:1',
          lines: [
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ],
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ]
          ]
        }
      ]
    }
  }
]

it('should parse a line without chord tags correctly', () => {
  const chordsFormat = new ChordsFormat({chordTag: false})
  const string = 'asd [C]qwe r[D#]wer'
  const parsed = [
    {text: 'asd ', chord: null},
    {text: 'qwe r', chord: 'C'},
    {text: 'wer', chord: 'D#'}
  ]
  expect(chordsFormat.parseLine(string)).toEqual(parsed)
})

it('should stringify without chord tags correctly', () => {
  const chordsFormat = new ChordsFormat({chordTag: false})
  pairsWithoutChordTag.forEach((p) => {
    expect(chordsFormat.stringify(p.object)).toEqual(p.string)
  })
})

it('should parse without chord tags correctly', () => {
  const chordsFormat = new ChordsFormat({chordTag: false})
  pairsWithoutChordTag.forEach((p) => {
    expect(chordsFormat.parse(p.string)).toEqual(p.object)
  })
})

it('should stringify with chord tags correctly', () => {
  const chordsFormat = new ChordsFormat({chordTag: true})
  pairsWithChordTag.forEach((p) => {
    expect(chordsFormat.stringify(p.object)).toEqual(p.string)
  })
})

it('should parse with chord tags correctly', () => {
  const chordsFormat = new ChordsFormat({chordTag: true})
  pairsWithChordTag.forEach((p) => {
    expect(chordsFormat.parse(p.string)).toEqual(p.object)
  })
})
