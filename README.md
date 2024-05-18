## Scenarios:

### Admin creates new event

- Name event
- Create departments
- Invite users

### Cash settlement

1. Admin creates a new cash settlement and gives it a name
2. Tellers register money bags
3. Admin selects which department settlements and money bags that should be included
4. Admin confirms settlement
5. System shows total sum along with the discrepancy (if any) from department settlements
6. Admin downloads report as Excel

### Change dispense

1. Admin creates a new change dispense task
2. The system shows the current balance along and a table with all departments
3. Admin distributes the change between the departments (the system warns if negative)
4. Admin confirms
5. Teller lists change tasks
6. Teller counts change and confirms change task
7. Teller confirms cash dispense to department
8. Cash total is updated

### Register cash

1. Teller creates new cash settlement for department
2. Settlement is listed on department settlement report
3. Other teller/admin confirms cash settlement report
4. Admin downloads report as excel

## Required report

- Cash settlements
- Department settlement reports (includes change tasks)

## TODO

- [ ] Arithmetic operations in input fields (+, \*, -)
- [ ] Antall in NewChangeTasks
- [ ] Backend with Next
- [ ] Login with Vipps
- [ ] Create new event
