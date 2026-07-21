// ============================================
// Student Management System - Assignment 1
// ========================================

const students = [
  { id: 101, name: "Aman", marks: 82, course: "Java" },
  { id: 102, name: "Priya", marks: 95, course: "Python" },
  { id: 103, name: "Rahul", marks: 67, course: "Java" },
  { id: 104, name: "Neha", marks: 76, course: "Web" },
  { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

// ---------- Task 1: Add a Student (push) ----------
console.log("\n--- Task 1: push() ---");
students.push({ id: 106, name: "Simran", marks: 91, course: "Java" });
console.log(students);

// ---------- Task 2: Remove Last Student (pop) ----------
console.log("\n--- Task 2: pop() ---");
const removedLast = students.pop();
console.log("Removed student:", removedLast);
console.log(students);

// ---------- Task 3: Add Student at Beginning (unshift) ----------
console.log("\n--- Task 3: unshift() ---");
students.unshift({ id: 100, name: "Ankit", marks: 80, course: "Web" });
console.log(students);

// ---------- Task 4: Remove First Student (shift) ----------
console.log("\n--- Task 4: shift() ---");
const removedFirst = students.shift();
console.log("Removed student:", removedFirst);
console.log(students);

// At this point "students" is back to its original 5 members
// (Simran added+removed, Ankit added+removed).

// ---------- Task 5: Update Array Using splice() ----------
console.log("\n--- Task 5: splice() ---");
const index = students.findIndex(s => s.id === 103);
if (index !== -1) {
  students.splice(index, 1, { id: 107, name: "Karan", marks: 78, course: "Java" });
}
console.log(students);

// splice() permanently replaces Rahul with Karan in "students".
// Tasks 6-12 use a fresh copy of the ORIGINAL data so their outputs
// match the expected results (Rahul, total=408, lowest mark=67).
const original = [
  { id: 101, name: "Aman", marks: 82, course: "Java" },
  { id: 102, name: "Priya", marks: 95, course: "Python" },
  { id: 103, name: "Rahul", marks: 67, course: "Java" },
  { id: 104, name: "Neha", marks: 76, course: "Web" },
  { id: 105, name: "Rohan", marks: 88, course: "Python" }
];

// ---------- Task 6: Create a New Array Using slice() ----------
console.log("\n--- Task 6: slice() ---");
const firstThree = original.slice(0, 3);
console.log(firstThree);

// ---------- Task 7: Array Iteration (for...of) ----------
console.log("\n--- Task 7: for...of ---");
for (const s of original) {
  console.log(`${s.name} - ${s.course} - ${s.marks}`);
}

// ---------- Task 8: forEach() ----------
console.log("\n--- Task 8: forEach() ---");
original.forEach(s => console.log(s.name));

// ---------- Task 9: map() ----------
console.log("\n--- Task 9: map() ---");
const names = original.map(s => s.name);
console.log(names);

// ---------- Task 10: filter() ----------
console.log("\n--- Task 10: filter() ---");
const highScorers = original.filter(s => s.marks >= 80);
console.log(highScorers);

// ---------- Task 11: reduce() ----------
console.log("\n--- Task 11: reduce() ---");
const totalMarks = original.reduce((sum, s) => sum + s.marks, 0);
const averageMarks = totalMarks / original.length;
console.log(`Total Marks = ${totalMarks}`);
console.log(`Average = ${averageMarks}`);

// ---------- Task 12: sort() ----------
console.log("\n--- Task 12: sort() ---");
// sort() mutates in place, so sort copies to avoid disturbing "original".
const ascending = [...original].sort((a, b) => a.marks - b.marks);
console.log("Ascending:");
ascending.forEach(s => console.log(s.marks));

const descending = [...original].sort((a, b) => b.marks - a.marks);
console.log("Descending:");
descending.forEach(s => console.log(s.marks));