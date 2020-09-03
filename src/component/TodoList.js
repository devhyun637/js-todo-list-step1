const getItemClass = (completed, isEditing) =>
  isEditing ? ' class="editing"' :
  completed ? ' class="completed"' :
  '';

export const TodoList = class {

  target; props;

  constructor(target, props = {}) {
    this.target = target;
    this.props = props;

    this.setEvent();
  }

  render (items, editingIndex, filterType) {
    this.target.innerHTML = items.map(({ contents, completed }, index) =>
        (filterType === 'all') ||
        (filterType === 'active' && !completed) ||
        (filterType === 'completed' && completed) ? `
        <li ${ getItemClass(completed, editingIndex === index) }>
          <div class="view" data-index="${index}">
            <input class="toggle" type="checkbox" ${ completed ? ' checked' : '' }/>
            <label class="label">${contents}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" data-index="${index}"/>
        </li>` : '').join('');
  }

  setEvent () {

    this.target.addEventListener('change', ({ target }) => {
      if (target.classList.contains('toggle')) {
        const index = Number(target.parentNode.dataset.index);
        this.props.toggle(index);
      }
    });

    this.target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('destroy')) {
        const index = Number(target.parentNode.dataset.index);
        this.props.remove(index);
      }
    });

    this.target.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains('label')) {
        const index = Number(target.parentNode.dataset.index);
        this.props.editing(index);
      }
    });

    this.target.addEventListener('keydown', ({ key, target }) => {
      if (target.classList.contains('edit') && key === 'Escape') {
        this.props.cancel();
      }
      if (target.classList.contains('edit') && key === 'Enter') {
        const index = Number(target.dataset.index);
        this.props.edited(index, target.value);
      }

    });
  }
}