const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // Toggle mobile menu visibility
});

const toggles = document.querySelectorAll('.dropdown-toggle');
const dropdowns = document.querySelectorAll('.dropdown-content');

toggles.forEach(toggle => {
    toggle.addEventListener('click', function (event) {
        dropdowns.forEach(dropdown => {
            if (dropdown !== this.nextElementSibling) {
                dropdown.classList.add('hidden'); 
            }
        });

        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle('hidden'); 
    });
});

document.addEventListener('click', function (event) {
    const isDropdownClick = event.target.closest('.dropdown-toggle');
    if (!isDropdownClick) {
        dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
    }
});