function clearContainer(containerEl: HTMLElement) {
  let oChild = containerEl.lastElementChild;
  while(oChild) {
    containerEl.removeChild(oChild);
    oChild = containerEl.lastElementChild
  }
}

export default clearContainer;