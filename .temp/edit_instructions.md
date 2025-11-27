Will remove stray 'µ' character and insert a missing closing </div> for the opencti column, and remove the .col-lg-4 override in CSS.

Edits to apply:
1) Replace "incident management</li>µ" with "incident management</li>"
2) Insert "        </div>
" between the modal closing and the next column's opening for the opencti card.
3) Remove ".col-lg-4 {\n  width: 50% !important;\n}" from `css/styke.css`.