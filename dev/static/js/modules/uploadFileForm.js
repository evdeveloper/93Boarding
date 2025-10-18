export function initFileUploads() {
  const fileContainers = document.querySelectorAll('.modal-post__file');

  fileContainers.forEach(container => {
    const fileInput = container.querySelector('input[type="file"]');
    const checkboxContainer = container.querySelector('.modal-post__checkbox');
    const pictureContainer = container.querySelector('.modal-post__picture');
  
    fileInput.addEventListener('change', function(e) {
      const files = e.target.files;
      files.length ? checkboxContainer.classList.add('active') : checkboxContainer.classList.remove('active');
      updateImagePreviews(files, pictureContainer);
    });
  });
}

function updateImagePreviews(files, pictureContainer) {
  const existingPreviews = pictureContainer.querySelectorAll('.modal-post__img[data-dynamic]');
  existingPreviews.forEach(preview => preview.remove());
  
  if (files.length > 0) {
    for (let file of files) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'modal-post__img';
            imgDiv.setAttribute('data-dynamic', 'true');
            imgDiv.innerHTML = `<img src="${e.target.result}" alt="${file.name}">`;
            pictureContainer.appendChild(imgDiv);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}