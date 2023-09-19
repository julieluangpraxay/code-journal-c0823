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
});

// const $noEntries = document.querySelector('.no-entries-text');
const $entryForm = document.querySelector('.entry-form');

function toggleNoEntries() {
  // $noEntries.classList.toggle('hidden');
  $entryForm.classList.toggle('hidden');
}

const $entriesPage = document.querySelector('.hidden');

function viewSwap(entries) {
  data.view = 'entries';

  toggleNoEntries();
}

const $aElement = document.querySelector('a');

$aElement.addEventListener('click', function (event) {
  data.view = 'entries';
  viewSwap();
  $entriesPage.classList.remove('hidden');
});
