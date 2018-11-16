# Build an Interactive Form

This is small project done while attending the Full Stack JavaScript
techdegree by [Treehouse](www.teamtreehouse.com).

All work here has been done by me, except the initial commit that was provided by Treehouse.

## Requirements
### Focus on the first field
- [X] On page load, the cursor appears in the "Name" field, ready for a user to type.

### Job Role Section
- [X] "Your job role" text field appears when user selects "Other" from the Job Role menu.

### T-Shirt Section
- [X] Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.

### Activity Registration
- [X] User cannot select two activities that are at the same time.

- [X] Total cost of selected activities is calculated and displayed below the list of activities.

### Displaying payment sections
- [X] The "Credit Card" payment option is selected by default.

- [X] Payment option in the select menu matches the payment option displayed on the page.

- [X] When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden.

### Form Validation
Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met: 

- [X] Name field isn’t blank.

- [X] Email field contains validly formatted e-mail address: (doesn’t have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com, for example).

- [X] At least one checkbox under "Register for Activities" section must be selected.

- [X] If "Credit Card" is the selected payment option, the three fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-number CVV value. 

### Form Works Without JavaScript
- [X] When JavaScript is disabled, all form fields and payment information is displayed, including the "Other" field under the "Job Role" section.

### Form Validation Messages
On submission, the form provides an error indication or message for each field that requires validation: 
- [X] Name field
- [X] Email field 
- [X] “Register for Activities” checkboxes
- [X] Credit Card number, Zip code, and CVV, only if the credit card payment method is selected.

## Extra Credit

### T-Shirt Section
- [X] “Color” drop down menu is hidden until a T-Shirt design is selected.

### Form Validation Messages
- [X] Form provides at least one error message in real time, before the form is submitted. For example, the error message appears near the email field when the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address.
- [X] Form provides at least one error message that changes depending on the error. For example, the email field displays a different error message when the email field is empty than it does when the email address is formatted incorrectly. *This is accomplished without the use of HTML5's built-in field validation.

## CSS Dependencies

[Normalize](github.com/necolas/normalize.css)

[Bootstrap 4](https://getbootstrap.com)
