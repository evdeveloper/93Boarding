import { BODY } from "./../helpers/constants.js";

export function openModal(id) {
  document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
  document.querySelector(`[data-modal-target="${id}"]`).classList.add('show');
  BODY.classList.add('hidden');
}
export function closeModal(id) {
  document.querySelector(`[data-modal-target="${id}"]`).classList.remove('show');
  BODY.classList.remove('hidden');
}