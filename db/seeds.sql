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
    ("Lead Software Engineer", 200000.02, 7),
    ("Software Developer", 150000.03, 1),
    ("Software Tester", 100000.04, 1),
    ("Lead Accountant", 80000.05, 7),
    ("Accountant", 60000.00, 2),
    ("Lead Marketer", 100000.00, 7),
    ("Marketer", 80000.06, 3),
    ("Data Analyst", 200000.07, 4),
    ("Consultant", 100000.08, 5),
    ("Onboarder", 80000.09, 6);

DELETE FROM employees;
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Jason", "Barrera", 1, NULL),
	("Axel", "Johson", 2, 1),
    ("Rob", "Stuart", 3, 2),
    ("Tracey", "Jones", 4, 2),
    ("Tom", "Fort", 5, 1),
    ("Alicia", "Ramirez", 6, 5),
    ("Janice", "McName", 7, 1),
    ("Rich", "Donald", 8, 7),
    ("Dan", "Algur", 9, 1),
    ("Blanca", "Denise", 11, 1);
