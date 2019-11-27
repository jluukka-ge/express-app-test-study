const data = [
  { id: 1, __type: 'USER', username: 'pentti', password: 'test' },
  { id: 2, __type: 'USER', username: 'milla', password: 'test' },
  { id: 3, __type: 'USER', username: 'kaija', password: 'test' },

  { id: 1, userId: 1, __type: 'TODO', title: 'pentti', description: 'bread' },
  { id: 2, userId: 1, __type: 'TODO', title: 'milla', description: 'rent' },
  { id: 3, userId: 1, __type: 'TODO', title: 'pentti', description: 'walk' },

  { id: 4, userId: 2, __type: 'TODO', title: 'pentti', description: 'bread' },
  { id: 5, userId: 2, __type: 'TODO', title: 'milla', description: 'rent' },
  { id: 6, userId: 2, __type: 'TODO', title: 'pentti', description: 'walk' },

  { id: 7, userId: 3, __type: 'TODO', title: 'pentti', description: 'bread' },
  { id: 8, userId: 3, __type: 'TODO', title: 'milla', description: 'rent' },
  { id: 9, userId: 3, __type: 'TODO', title: 'pentti', description: 'walk' },
];

module.exports = { data };
