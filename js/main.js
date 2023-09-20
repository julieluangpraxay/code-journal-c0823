const $imageInput = document.querySelector('#photoUrl');
const $image = document.querySelector('img');
const $form = document.querySelector('form');

$imageInput.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = $form.elements.title.value;
  const photoUrl = $form.elements.photoUrl.value;
  const notes = $form.elements.notes.value;

  const inputValues = {
    entryId: data.nextEntryId,
    title,
    photoUrl,
    notes,
  };

  data.nextEntryId++;
  data.entries.unshift(inputValues);

  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();

  $ul.prepend(renderEntry(inputValues));

  renderEntry(data.nextEntryId);
  viewSwap('entries');
});

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $columnHalf.appendChild($image);

  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half2');
  $row.appendChild($columnHalf2);

  const $title = document.createElement('h2');
  $title.textContent = entry.title;
  $columnHalf2.appendChild($title);

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $columnHalf2.appendChild($notes);

  return $li;
}

const $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
});

const $entryForm = document.querySelector('.entry-form');
const $noEntriesText = document.querySelector('.no-entries-text');

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntriesText.classList.add('hidden');
  } else {
    $noEntriesText.classList.remove('hidden');
  }
}

const $entriesPage = document.querySelector('.entries');

function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    data.view = 'entry-form';
    $entriesPage.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  } else {
    data.view = 'entries';
    $entriesPage.classList.remove('hidden');
    $entryForm.classList.add('hidden');
  }
  toggleNoEntries();
}

const $aElement = document.querySelector('a');

$aElement.addEventListener('click', function (event) {
  viewSwap('entries');
});

const $newButton = document.querySelector('.new-button');

$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
