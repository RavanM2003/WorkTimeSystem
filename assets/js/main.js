const startDateInput = document.getElementById('startdate');
const endDateInput = document.getElementById('enddate');
const startDateInputdayoff = document.getElementById('startdatedayoff');
const endDateInputdayoff = document.getElementById('enddatedayoff');
const oneDayHolidayCheckbox = document.getElementById('onedayholiday');
endDateInput.disabled = true;
startDateInput.addEventListener('change', function() {
    let startDate = new Date(this.value);

    if (!isNaN(startDate)) {
        endDateInput.disabled = false;

        let nextDay = new Date(startDate);
        nextDay.setDate(startDate.getDate() + 1);
        let nextDayISO = nextDay.toISOString().split('T')[0];
        endDateInput.min = nextDayISO;

        if (oneDayHolidayCheckbox.checked) {
            endDateInput.disabled = true;
            endDateInput.value = nextDayISO;
        } else {
            endDateInput.value = ''; 
        }
    } else {
        endDateInput.disabled = true;
    }
});

endDateInputdayoff.disabled = true;
startDateInputdayoff.addEventListener('change', function() {
    let startDatedayoff = new Date(this.value);

    if (!isNaN(startDatedayoff)) {
        endDateInputdayoff.disabled = false;

        let nextDaydayoff = new Date(startDatedayoff);
        nextDaydayoff.setDate(startDatedayoff.getDate() + 1);
        let nextDayISOdayoff = nextDaydayoff.toISOString().split('T')[0];
        endDateInputdayoff.min = nextDayISOdayoff;

    } else {
        endDateInputdayoff.disabled = true;
        endDateInputdayoff.min = nextDayISOdayoff;
    }
});

oneDayHolidayCheckbox.addEventListener('change', function() {
    if (oneDayHolidayCheckbox.checked) {
        let startDate = new Date(startDateInput.value);

        if (!isNaN(startDate)) {
            let nextDay = new Date(startDate);
            nextDay.setDate(startDate.getDate() + 1);
            endDateInput.value = startDate.toISOString().split('T')[0];
            endDateInput.disabled = true;
        }
    } else {
        endDateInput.disabled = false;
        endDateInput.value = '';
    }
});