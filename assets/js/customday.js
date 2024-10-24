function checkTimes() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const arrivalTime = row.querySelector('.arrival-time').value;
        const leaveTime = row.querySelector('.leave-time').value;
        const statusSelect = row.querySelector('.status');

        // If both arrival and leave times are null
        if (!arrivalTime && !leaveTime) {
            statusSelect.innerHTML = `<option value="absent" selected>Gəlməyib</option>`;
            statusSelect.disabled = true; // Disable the select
            return; // Continue to the next row
        }

        const come = new Date(`1970-01-01T${arrivalTime || '00:00'}:00`);
        const leave = new Date(`1970-01-01T${leaveTime || '00:00'}:00`);

        // Employee's defined working times
        const employeeArrivalTime = new Date(`1970-01-01T${row.cells[1].textContent}:00`);
        const employeeLeaveTime = new Date(`1970-01-01T${row.cells[2].textContent}:00`);

   // Define valid arrival and leave time ranges
const validArrivalStart = new Date(employeeArrivalTime.getTime() - 10 * 60 * 1000); // 09:50
const validArrivalEnd = new Date(employeeArrivalTime.getTime() + 10 * 60 * 1000); // 10:10
const validLeaveStart = new Date(employeeLeaveTime.getTime() - 10 * 60 * 1000); // 17:50
const validLeaveEnd = new Date(employeeLeaveTime.getTime() + 10 * 60 * 1000); // 18:10

// Determine status based on arrival and leave times
if (come >= validArrivalStart && come <= validArrivalEnd && leave >= validLeaveStart && leave <= validLeaveEnd) {
    statusSelect.innerHTML = `<option value="ok" selected> - </option>`;
    statusSelect.disabled = true; // Disable if everything is okay
} else if (come >= validArrivalStart && leave < validLeaveStart) {
    statusSelect.innerHTML = `
        <option value="early" selected disabled>Tez çıxıb</option>
        <option value="earlyallow">İcazəli</option>
        <option value="earlynotallow">İcazəsiz</option>
    `;
    statusSelect.disabled = false; // Enable options
} else if (come < validArrivalStart && leave >= validLeaveStart) {
    statusSelect.innerHTML = `
        <option value="late" selected disabled>Gecikib</option>
        <option value="lateallow">İcazəli</option>
        <option value="latenotallow">İcazəsiz</option>
    `;
    statusSelect.disabled = true; // Disable if overwork
} else if (come < validArrivalStart && leave < validLeaveStart) {
    statusSelect.innerHTML = `
        <option value="early" selected disabled>Tez çıxıb</option>
        <option value="earlyallow">İcazəli</option>
        <option value="earlynotallow">İcazəsiz</option>
    `;
    statusSelect.disabled = false; // Enable options
} else if (come > validArrivalEnd && leave >= validLeaveStart) {
    statusSelect.innerHTML = `
        <option value="late" selected disabled>Gecikib</option>
        <option value="lateallow">İcazəli</option>
        <option value="latenotallow">İcazəsiz</option>
    `;
    statusSelect.disabled = false; // Enable options
} else if (come > validArrivalEnd && leave < validLeaveStart) {
    statusSelect.innerHTML = `
        <option value="late" selected disabled>Gecikib</option>
        <option value="lateallow">İcazəli</option>
        <option value="latenotallow">İcazəsiz</option>
    `;
    statusSelect.disabled = false; // Enable options
} else if (come < validArrivalStart || leave > validLeaveEnd) {
    // Only set to "Overwork" if no other conditions apply
    statusSelect.innerHTML = `<option value="overwork" selected>OverWork</option>`;
    statusSelect.disabled = true; // Disable if overwork
} else {
    // Default case if none of the above apply
    statusSelect.innerHTML = `<option value="" selected disabled>Unknown Status</option>`;
    statusSelect.disabled = false; // Allow to choose if needed
}})
document.querySelectorAll('.arrival-time, .leave-time').forEach(input => {
    input.addEventListener('input', checkTimes);
});

window.onload = () => {
    populateEmployees();
    checkTimes();
};
