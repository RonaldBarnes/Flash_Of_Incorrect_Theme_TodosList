
// https://www.greatfrontend.com/questions/user-interface/todo-list/v/dad82303-c9dc-416a-90ae-352d501d4451

import TodosList from './TodosList';
import './styles.css';

import { useState, useRef, useEffect } from "react";

document.title = "YATL - Yet Another Todo List - version Eleventeen";

export default function App()
  {
  // Create todos state and pre-seed with a sample todo item to pass to list:
  const [todos,setTodos] = useState([
    {
      name: "Tasks defined in App.js & passed as props to TodoList",
      id: 123,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "useEffect to set focus on input field at load",
      id: 234,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Zebra stripe task list",
      id: 345,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Set focus on input field after each action",
      id: 456,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Flex layout on list items to space out delete button, etc.",
      id: 111,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Accept task list in props, create default one if not",
      id: 1191,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Sort on completed + name (or date)",
      done: true,
      id: 1111,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Sort on none",
      done: false,
      id: 2222,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
      name: "Sortation field selector",
      done: true,
      id: 444,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
    },
    {
    	name: "Disable submit button when input field is empty",
    	id: 8877,
    	done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
  	},
  	{
  		name: "Hover effect on items",
  		id: 912,
  		done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
		{
			name: "Title set to app name",
			id: 7349,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
		{
			name: "Hover effect Random Scramble on version number",
			id: 1551,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
		{
			name: "Store task list in local storage, session storage, or cookie",
			id: 1329,
			done: false,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
		{
			name: "On mobile, prevent auto-focus as it pops up keyboard, obscuring list",
			id: 8679,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
		{
			name: "Themes: light & dark, with auto-detect",
			id: 6619,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
		{
			name: "Event listener - rethink: invoke via useEffect with return callback",
			id: 6468,
			done: false,
      date: Date.now() - Math.floor(Math.random() * 10_000_000),
		},
    ]);

  return (
    <TodosList todos={todos} setTodos={setTodos} />
   );
  }







// How long between the effect updating with new random chars (ms):
const INTERVAL_TIME = 50;
// How many cycles of random chars before unscrambled chars display:
const MIN_CYCLES = 3;


// An array of interval IDs allows each element to have its own,
// and therefore run asyncronously:
// Declared globally so mouse-out listener can cancel
const INTERVAL_ID = [];



// Ignore all the characters like éèú:
const ALPHABET_upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHABET_lower="abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789"
const PUNCTUATION = "`~!@#$%^&*()-_=+[]{};:'\",.<>/?"

/**
 * Return a random character of the same case / class as input char.
 * Upper returns upper, lower returns lower, digit returns digit.
 *
 * @param: current: character
 * @returns: char
 */
function getRandomLetter(current)
	{
	// Since uppercase " " === " " AND lowercase " " === " ",
	// spaces pass all tests below; just return a space:
	if (current === " ")
		return current;

	// Assign a selection of characters to randomize based upon input
	// character's case / class:
	let chars;

	if ( DIGITS.indexOf(current) >= 0)
		chars = DIGITS
	else if ( PUNCTUATION.indexOf(current) >= 0 )
		chars = PUNCTUATION
	else if ( current === current.toLocaleUpperCase() )
		chars = ALPHABET_upper
	else if ( current === current.toLocaleLowerCase() )
		chars = ALPHABET_lower
	else
		// Should punctuation, etc. be randomized? Not at the moment.
		return current;

	return chars[Math.floor(Math.random() * chars.length)]
	}




/**
 * Upon document load, add mouse event listeners and scramble each
 * element ONCE:
 */
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".random_scramble").forEach( (item,idx) => {
		/**
		 * If not data-orig specified for .random_scramble, then nothing
		 * to restore unscrambled text to: this is an error:
		 */
		if (! item.dataset["orig"])
			{
			item.setAttribute("style", "color: red");
			setTimeout( () => alert(
				"ERROR: item with '.random_scramble' CSS but no data-orig='...'\n\n"
				+ "Element content:\n\n"
				+ item.innerText
				), 50)
			}

		console.log(`Adding listener to "${item.innerText}"`);

		item.addEventListener("mouseover", (e) => {
			// Pass array index so each element with this style can have
			// its own INTERVAL_ID:
			random_scramble(item, idx);
			console.log(item.innerText);
			});	// end addEventListener


		item.addEventListener("mouseout", (e) => {
			clearInterval(INTERVAL_ID[idx]);
			item.innerText = item.dataset["orig"];
			});	// end addEventListener


		// Upon initial page load, give each element a one-off scramble:
		random_scramble(item, idx);
		})	// end forEach()
	})	// end document load







/**
 * Scramble the content of the item's innerText for MIN_CYCLES times,
 * restoring to original content (taken from data-orig="...")
 * one character at a time.
 *
 * @param: item: HTML element with class="random_scramble"
 * @param: index: integer index to INTERVAL_ID array
 */
function random_scramble(item, index)
	{
	// Clean up any left-over intervals (shouldn't happen):
	clearInterval(INTERVAL_ID[index]);
	// Increment until MIN_CYCLES reached:
	let loopCount = 0;
	// Once MIN_CYCLES reached, increment so characters restore left to right:
	let normalCharPos = 0;


	INTERVAL_ID[index] = setInterval( () => {
		const retVal = item.dataset["orig"].split("").map( (val,idx) => {
			if (loopCount < MIN_CYCLES)
				{
				// Not enough cycles yet, return random character:
				return getRandomLetter(val);
				}

			return idx < normalCharPos
				? val
				: getRandomLetter(val)
			});	// end map()

		// Build a new string from our randomized characters:
		item.innerText = retVal.join("")

		loopCount++;

		// If finished, clear INTERVAL_ID:
		if (loopCount >= MIN_CYCLES
			&& normalCharPos >= item.innerText.length
			)
			{
			// Finished our cycle, stop now:
			clearInterval(INTERVAL_ID[index])
			item.innerText = item.dataset["orig"]
			}
		else if (loopCount >= MIN_CYCLES)
			// Finished MIN_CYCLES, start restoring characters one at a time:
			{
			normalCharPos++;
			}
		}, INTERVAL_TIME);	// end setInterval
	}	// end function

