function clearContainer(containerEl) {
    var oChild = containerEl.lastElementChild;
    while (oChild) {
        containerEl.removeChild(oChild);
        oChild = containerEl.lastElementChild;
    }
}
export default clearContainer;
