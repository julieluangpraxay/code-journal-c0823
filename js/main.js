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
  const $ul = document.createElement('ul');
  const $li = document.createElement('li');
  $ul.appendChild($li);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $columnHalf.appendChild($image);

  const $title = document.createElement('h2');
  $title.textContent = entry.title;
  $columnHalf.appendChild($title);

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $title.appendChild($notes);
}

renderEntry();
