document.addEventListener('DOMContentLoaded', function() {
    const adminCheckbox = document.getElementById('cbox');
    const companyNameInput = document.getElementById('companyName');

    // Toggle requirement based on checkbox
    if (adminCheckbox) {
        adminCheckbox.addEventListener('change', function() {
            companyNameInput.required = this.checked;
        });
    }
});