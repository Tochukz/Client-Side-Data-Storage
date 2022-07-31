$(document).ready(function() {
  setVisited();
  setFormDefault();
  $('#personForm').on('submit', () => {
    storage.removeItem('personData');
  });
  $('input').on('input', (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setPersonData(key, value);
  });

  // listen for windows storage event
});

//Note: The onStorage event will only fire when changes are made to storage from a different browser window or tab.
window.onstorage = function (event) {
  const {key, oldValue, newValue} = event;
 // console.log('storage event', event);
  const store = JSON.parse(newValue) || {};
  if (store.hasOwnProperty('personData')) {
    const personData = store.personData;
    setFormDefault(personData);
  }
}

function setVisited() {
  let visited = storage.getItem('visited') || 0;
  $('#visited').text(`You visited this page ${++visited} times.`);
  storage.setItem('visited', visited);
}

function setFormDefault(data = null) {
  const personData = data || storage.getItem('personData');
  if (typeof personData  == 'object') {
    $('#name').val(personData.name || '');
    $('#age').val(personData.age || '');
    $('#email').val(personData.email || '');
  }  
}

function setPersonData(key, value) {
  const personData = storage.getItem('personData') || {};
  personData[key] = value;
  storage.setItem('personData', personData);
}

const  storage = {
  setItem(key, value) {
    const storeSerial = localStorage.getItem('store') || '{}';
    const store = JSON.parse(storeSerial);
    store[key] = value;
    localStorage.setItem('store', JSON.stringify(store));
  },
  getItem(key) {
    const storeSerial = localStorage.getItem('store') || '{}';
    const store = JSON.parse(storeSerial);
    return store[key];
  },
  removeItem(key) {
    const storeSerial = localStorage.getItem('store') || '{}';
    const store = JSON.parse(storeSerial);
    delete store[key];
    localStorage.setItem('store', JSON.stringify(store));
  },
  hasItem(key) {
    return this.getItem(key) != undefined;
  }
}