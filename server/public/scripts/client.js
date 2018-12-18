$(document).ready(function () {
    $('#submit').on('click', addEmployee)
    $('#employeeList').on('click', '.delete', removeRow)
});

let employeeArray = [];

class Employee {
    constructor(firstName, lastName, employeeID, jobTitle, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeID = employeeID;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    } //end constructor
}
// sends input info to newEmployee function. Validates that fields are filled.
//empties input fields once click happens.
function addEmployee() {
    let firstInput = $('#firstInput').val();
    let lastInput = $('#lastInput').val();
    let idInput = $('#idInput').val();
    let titleInput = $('#titleInput').val();
    let salaryInput = $('#salaryInput').val();
    let validationStatus = $('#validationDiv');
    validationStatus.empty();
    if ($('#firstInput').val() != '' && $('#lastInput').val() != '' &&
        $('#idInput').val() != '' && $('#titleInput').val() != '' &&
        $('#salaryInput').val() != '') {
        newEmployee(firstInput, lastInput, idInput, titleInput, salaryInput)
    }
    else {
        validationStatus.append('*All fields must be filled.*');
    }
    $('#firstInput').val('');
    $('#lastInput').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#salaryInput').val('');
}
// creates new employee objects and pushes to array.
// calls addToList function.
function newEmployee(firstName, lastName, employeeID, jobTitle, annualSalary) {
    employeeArray.push(new Employee(firstName, lastName, employeeID,
        jobTitle, annualSalary));
    addToList();
}
//appends indexes of the array to an unordered list with a delete button.
//calls monthlyCost function.
function addToList() {
    let employeeInfo = $('#employeeList');
    employeeInfo.empty();
    for (employee of employeeArray) {
        employeeInfo.append('<li>' + employee.firstName +
            ' ' + employee.lastName + ' ' + employee.employeeID +
            ' ' + employee.jobTitle + ' $' + (employee.annualSalary + ' ')
            + '<button class="delete">X</li>')
        monthlyCosts();
    }
}
//calculates monthly total of all indexes in the array.
function monthlyCosts() {
    let monthlyTotal = 0;
    for (employee of employeeArray) {
        monthlyTotal += (employee.annualSalary / 12)
        $('#viewCosts').empty();
        $('#viewCosts').append('Monthly Total: $' + (monthlyTotal.toFixed()));
        if (monthlyTotal > 20000) {
            $('#viewCosts').css('background-color', 'red');
        }
    }
}
//removes a line item from the DOM.
function removeRow() {
    $(this).parent().remove();
}