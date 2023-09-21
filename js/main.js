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

  const entry = {
    entryId: data.nextEntryId,
    title,
    photoUrl,
    notes,
  };

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    $ul.prepend(renderEntry(entry));
    $image.setAttribute('src', './images/placeholder-image-square.jpg');
  } else {
    entry.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        const $li = document.querySelectorAll('li');
        $li[i].replaceWith(renderEntry(entry));
        data.entries[i] = entry;
        $newH1.textContent = 'New Entry';
        data.editing = null;
      }
    }
  }
  viewSwap('entries');
  toggleNoEntries();
  $form.reset();
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);
  const $row = document.createElement('div');

  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $image.setAttribute('alt', 'entry photo');

  $columnHalf.appendChild($image);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf2);

  const $title = document.createElement('h2');
  $title.textContent = entry.title;

  const $titleWrapper = document.createElement('div');
  $titleWrapper.setAttribute('class', 'title-wrapper');
  $columnHalf2.appendChild($titleWrapper);
  $titleWrapper.appendChild($title);

  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pen fa-lg');
  $titleWrapper.appendChild($pencilIcon);

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

const $entriesButton = document.querySelector('a');

$entriesButton.addEventListener('click', function (event) {
  viewSwap('entries');
});

const $newButton = document.querySelector('.new-button');

$newButton.addEventListener('click', function (event) {
  $newH1.textContent = 'New Entry';
  viewSwap('entry-form');
  $image.src = './images/placeholder-image-square.jpg';
  $delete.classList.add('visibility-hidden');
});

const $inputTitle = document.querySelector('#title');
const $textArea = document.querySelector('#notes');
const $newH1 = document.querySelector('.new-h1');
const $delete = document.querySelector('.delete');

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    const closestLi = event.target.closest('li').getAttribute('data-entry-id');
    viewSwap('entry-form');
    $newH1.textContent = 'Edit Entry';

    $delete.classList.remove('visibility-hidden');

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(closestLi)) {
        data.editing = data.entries[i];

        $inputTitle.value = data.entries[i].title;
        $textArea.value = data.entries[i].notes;
        $imageInput.value = data.entries[i].photoUrl;

        $image.setAttribute('src', data.entries[i].photoUrl);
        $image.setAttribute('alt', 'entry photo');
      }
    }
  }
});

const $popup = document.querySelector('.popup-container');
const $grayBackground = document.querySelector('.gray-background');

$delete.addEventListener('click', function (event) {
  event.preventDefault();
  $popup.classList.remove('hidden');
  $grayBackground.classList.remove('hidden');
});

const $cancelButton = document.querySelector('.cancel-button');

$cancelButton.addEventListener('click', function () {
  $popup.classList.add('hidden');
  $grayBackground.classList.add('hidden');
});

const $confirmButton = document.querySelector('.confirm-button');

$confirmButton.addEventListener('click', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i] === data.editing) {
      data.entries.splice(data.entries[i], 1);
      const $li = document.querySelectorAll('li');
      $li[i].remove(data.entries[i]);
      $popup.classList.add('hidden');
      $grayBackground.classList.add('hidden');
    }
  }
  viewSwap('entries');
  data.editing = null;
  $form.reset();
});
