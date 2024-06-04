document.addEventListener('DOMContentLoaded', () => {
    const dogList = document.getElementById('dogs');
    const modal = document.getElementById('dog-modal');
    const closeModal = document.getElementById('close');
    const modalDogImage = document.getElementById('image');
    const modalDogInfo = document.getElementById('info');
    const adoptButton = document.getElementById('adopt');

    fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
        .then(response => response.json())
        .then(dogs => {
            dogs.forEach(dog => {
                const dogItem = document.createElement('div');
                dogItem.className = 'dog-item';
                dogItem.innerHTML = `
                    <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                    <div>
                        <h3>${dog.title}</h3>
                        <p>${dog.sex.charAt(0).toUpperCase() + dog.sex.slice(1).toLowerCase()}</p>
                    </div>
                `;
                dogItem.addEventListener('click', () => {
                    showModal(dog);
                });
                dogList.appendChild(dogItem);
            });
        });

    const showModal = (dog) => {
        modalDogImage.innerHTML = `<img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">`;
        modalDogInfo.innerHTML = `
            <h2>${dog.title}</h2>
            <hr>
            <p><b>Sex:</b> ${dog.sex.charAt(0).toUpperCase() + dog.sex.slice(1).toLowerCase()}</p>
            <hr>
            <p><b>Age:</b> ${dog.age}</p>
            <hr>
            <p><b>Personality:</b> ${dog.description}</p>
        `;
        adoptButton.dataset.dogId = dog.id;
        modal.style.display = 'flex';
    };

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
