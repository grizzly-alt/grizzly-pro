class Coach {
    constructor(name, specialization, rating) {
        this.name = name;
        this.specialization = specialization;
        this.rating = rating;
    }

    displayInfo() {
        console.log(`Coach: ${this.name}, Specialization: ${this.specialization}, Rating: ${this.rating}`);
    }

    createCardHTML() {
        return `
            <div class="coach-card">
                <h3 class="coach-name">${this.name}</h3>
                <span class="coach-spec">${this.specialization}</span>
                <div class="coach-rating">${this.rating.toFixed(1)}</div>
            </div>
        `;
    }
}
const coaches = [
    new Coach('John Doe', 'Fitness', 4.7),
    new Coach('Alice Smith', 'Yoga', 4.9),
    new Coach('Robert Downey', 'CrossFit', 4.8),
    new Coach('Emma Watson', 'Pilates', 4.6)
];
coaches.forEach(coach => coach.displayInfo());
const grid = document.getElementById('coaches-grid');
coaches.forEach(coach => {
    grid.innerHTML += coach.createCardHTML();
});