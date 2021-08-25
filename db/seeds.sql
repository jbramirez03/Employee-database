DELETE FROM departments;
INSERT INTO departments (id, name)
VALUES
    ( 1, "Information Technology"),
    ( 2, "Accounting"),
    ( 3, "Marketing"),
    ( 4, "Research and Development"),
    ( 5, "Operations / Delivery"),
    ( 6, "Human Resources"),
    ( 7, "Leadership");

DELETE FROM roles;
INSERT INTO roles (title, salary, department_id)
VALUES
    ("CEO", 1000000.01, 7),
    ("Software Developer", 200000.02, 1),
    ("Scrum Master", 150000.03, 1),
    ("Software Tester", 100000.04, 1),
    ("Accountant", 80000.05, 2),
    ("Marketer", 80000.06, 3),
    ("Scientist", 200000.07, 4),
    ("Consultant", 100000.08, 5),
    ("Onboarder", 80000.09, 6);

DELETE FROM employees;
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Jason", "Barrera", 1, NULL),
	("Axel", "Johson", 3, 1),
    ("Rob", "Stuart", 2, 3),
    ("Tracey", "Jones", 2, 3),
    ("Tom", "Fort", 4, 3),
    ("Alex", "Gonzolez", 5, 1),
    ("Janice", "McName", 6, 1),
    ("Billiam", "Gregston", 7, 1),
    ("Dan", "Algur", 8, 1),
    ("Blanch", "Bluma", 9, 1);
