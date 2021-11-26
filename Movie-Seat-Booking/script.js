const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
const clearBtn = document.querySelector('.clear');


let ticketPrice = +movieSelect.value;

// Get data from localStorage and populate UI
const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, idx) => {
            if(selectedSeats.indexOf(idx) > -1) {
                seat.classList.add('selected');
            }
        })
    } else {
        seats.forEach(seat => {
            seat.classList.remove('selected');
        })
    }

    const selectedMovieIdx = localStorage.getItem('selectedMovieIdx');

    if (selectedMovieIdx != null) {
        movieSelect.selctedIdx = selectedMovieIdx;
    }
}

populateUI();

// Save selected movie idx and price
const setMovieData = (movieIdx, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIdx);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and cnt
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    });
    const selectedSeatsCnt = selectedSeats.length;

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    count.innerText = selectedSeatsCnt;
    total.innerText = selectedSeatsCnt * ticketPrice;
}



// Movie select Event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
})

// Seat Click Event
container.addEventListener('click' ,(e) => {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// clear btn click event
clearBtn.addEventListener('click',() => {
    localStorage.clear();
    console.log('clear btn clicked');
    populateUI()
    updateSelectedCount();
})

// Initial ctn and total set
updateSelectedCount();