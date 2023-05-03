function closeOverley(evt, onClose) {
  if (evt.target === evt.currentTarget) onClose();
}

export { closeOverley };
