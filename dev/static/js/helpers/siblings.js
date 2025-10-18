export const siblings = (element) => {
  return Array.from(element.parentNode.children).filter(sibling => sibling !== element);
}