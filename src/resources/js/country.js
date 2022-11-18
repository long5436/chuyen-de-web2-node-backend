const btnEdites = $('.text-end .edit-btn');

const edit = (id, value) => {};

const html = ` <div class="d-flex py-2">
<input type="text" class="form-control me-2" />
<button class="btn btn-primary me-2">Save</button>
<button class="btn btn-primary">Cancel</button>
</div>`;

btnEdites.get().forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    // const div = document.createElement('div');
    // div.innerHTML = html;
    // console.log(element.parentElement.parentElement.append(div));
  });
});
