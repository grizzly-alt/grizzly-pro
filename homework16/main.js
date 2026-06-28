class Student {
  constructor(firstName, lastName, birthYear, grades = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = grades;
    this.attendance = new Array(25).fill(undefined);
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  getAverageGrade() {
    if (this.grades.length === 0) return 0;
    return this.grades.reduce((sum, g) => sum + g, 0) / this.grades.length;
  }

  _addAttendance(status) {
    const emptyIndex = this.attendance.findIndex(item => item === undefined);
    if (emptyIndex !== -1) {
      this.attendance[emptyIndex] = status;
    } else {
      alert(`Увага: Масив відвідуваності для ${this.firstName} вже повністю заповнений (25 занять)!`);
    }
  }

  present() { this._addAttendance(true); }
  absent() { this._addAttendance(false); }

  summary() {
    const avgGrade = this.getAverageGrade();
    const totalClasses = this.attendance.filter(item => item !== undefined).length;
    
    if (totalClasses === 0) return { text: "Занять ще не було", className: "" };

    const presents = this.attendance.filter(item => item === true).length;
    const avgAttendance = presents / totalClasses;

    if (avgGrade > 90 && avgAttendance > 0.9) {
      return { text: "Молодець!", className: "verdict-good" };
    } else if (avgGrade > 90 || avgAttendance > 0.9) {
      return { text: "Добре, але можна краще", className: "verdict-so-so" };
    } else {
      return { text: "Редиска!", className: "verdict-bad" };
    }
  }
}


const students = [
  new Student("Іван", "Петренко", 2004, [95, 98, 92, 100]),
  new Student("Марія", "Коваленко", 2005, [88, 85, 90, 92]),
  new Student("Олег", "Сидоренко", 2003, [60, 65, 58, 70])
];

for(let i=0; i<9; i++) students[0].present();
students[0].absent();

for(let i=0; i<12; i++) students[1].present();

students[2].present();
for(let i=0; i<4; i++) students[2].absent();

function renderStudents() {
  const container = document.getElementById('studentsContainer');
  container.innerHTML = ''; 

  students.forEach((student, index) => {
    const card = document.createElement('div');
    card.className = 'student-card';
    
    const cellsHTML = student.attendance.map((status, i) => {
      let statusClass = 'empty';
      let text = i + 1;
      if (status === true) { statusClass = 'present'; text = '✓'; }
      if (status === false) { statusClass = 'absent'; text = '✗'; }
      return `<div class="cell ${statusClass}">${text}</div>`;
    }).join('');

    const verdict = student.summary();

    card.innerHTML = `
      <h2>${student.firstName} ${student.lastName}</h2>
      <div class="info-group"><strong>Вік:</strong> ${student.getAge()} років</div>
      <div class="info-group"><strong>Сер. бал:</strong> ${student.getAverageGrade().toFixed(1)}</div>
      
      <div class="attendance-tracker">
        <p>Відвідуваність (Макс. 25 занять):</p>
        <div class="grid-25">${cellsHTML}</div>
      </div>

      <div class="actions">
        <button class="btn-present" onclick="markPresent(${index})">+ Присутній</button>
        <button class="btn-absent" onclick="markAbsent(${index})">- Відсутній</button>
      </div>

      <div class="summary-box ${verdict.className}">
        Вердикт: ${verdict.text}
      </div>
    `;

    container.appendChild(card);
  });
}

window.markPresent = function(index) {
  students[index].present();
  renderStudents(); 
}

window.markAbsent = function(index) {
  students[index].absent();
  renderStudents(); 
}

renderStudents();