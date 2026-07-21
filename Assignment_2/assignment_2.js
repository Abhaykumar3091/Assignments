// ============================================
// Student Management System - Assignment 2


const students = [
  { id: 101, name: "Aman", marks: 82, course: "Java" },
  { id: 102, name: "Priya", marks: 95, course: "Python" },
  { id: 103, name: "Rahul", marks: 67, course: "Java" },
  { id: 104, name: "Neha", marks: 76, course: "Web" },
  { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

const getFreshStudents = () => structuredClone(students);

// ---------- Task 1: Add a Student (push) ----------
console.log("\n--- Task 1: push() ---");
{
  const list = getFreshStudents();
  list.push({ id: 106, name: "Simran", marks: 91, course: "Java" });
  console.log(list);
}

// ---------- Task 2: Remove Last Student (pop) ----------
console.log("\n--- Task 2: pop() ---");
{
  const list = getFreshStudents();
  const removed = list.pop();
  console.log("Removed student:", removed);
  console.log(list);
}

// ---------- Task 3: Add Student at Beginning (unshift) ----------
console.log("\n--- Task 3: unshift() ---");
{
  const list = getFreshStudents();
  list.unshift({ id: 100, name: "Ankit", marks: 80, course: "Web" });
  console.log(list);
}

// ---------- Task 4: Remove First Student (shift) ----------
console.log("\n--- Task 4: shift() ---");
{
  const list = getFreshStudents();
  const removed = list.shift();
  console.log("Removed student:", removed);
  console.log(list);
}

// ---------- Task 5: Update Array Using splice() ----------
console.log("\n--- Task 5: splice() ---");
{
  const list = getFreshStudents();
  const index = list.findIndex(s => s.id === 103);
  if (index !== -1) {
    list.splice(index, 1, { id: 107, name: "Karan", marks: 78, course: "Java" });
  }
  console.log(list);
}

// ---------- Task 6: Create a New Array Using slice() ----------
console.log("\n--- Task 6: slice() ---");
{
  const list = getFreshStudents();
  const firstThree = list.slice(0, 3);
  console.log(firstThree);
}

// ---------- Task 7: Array Iteration (for...of) ----------
console.log("\n--- Task 7: for...of ---");
for (const s of students) {
  console.log(`${s.name} - ${s.course} - ${s.marks}`);
}

// ---------- Task 8: forEach() ----------
console.log("\n--- Task 8: forEach() ---");
students.forEach(s => console.log(s.name));

// ---------- Task 9: map() ----------
console.log("\n--- Task 9: map() ---");
const names = students.map(s => s.name);
console.log(names);

// ---------- Task 10: filter() ----------
console.log("\n--- Task 10: filter() ---");
const highScorers = students.filter(s => s.marks >= 80);
console.log(highScorers);

// ---------- Task 11: reduce() ----------
console.log("\n--- Task 11: reduce() ---");
const totalMarks = students.reduce((sum, s) => sum + s.marks, 0);
const averageMarks = totalMarks / students.length;
console.log(`Total Marks = ${totalMarks}`);
console.log(`Average = ${averageMarks}`);

// ---------- Task 12: sort() ----------
console.log("\n--- Task 12: sort() ---");

// sort() mutates in place, so sort copies of the array to avoid
// disturbing the original order used above.
const ascending = [...students].sort((a, b) => a.marks - b.marks);
console.log("Ascending:");
ascending.forEach(s => console.log(s.marks));

const descending = [...students].sort((a, b) => b.marks - a.marks);
console.log("Descending:");
descending.forEach(s => console.log(s.marks));
