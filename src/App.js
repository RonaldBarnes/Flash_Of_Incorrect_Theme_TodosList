
// https://www.greatfrontend.com/questions/user-interface/todo-list/v/dad82303-c9dc-416a-90ae-352d501d4451

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
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
      name: "useEffect to set focus on input field at load",
      id: 234,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
      name: "Zebra stripe task list",
      id: 345,
      done: true,
      date: Date.now()
    },
    {
      name: "Set focus on input field after each action",
      id: 456,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
      name: "Flex layout on list items to space out delete button, etc.",
      id: 111,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
      name: "Accept task list in props, create default one if not",
      id: 111,
      done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
      name: "Sort on completed + name (or date)",
      done: true,
      id: 1111,
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
      name: "Sortation field selector",
      done: true,
      id: 444,
      date: Date.now() - Math.floor(Math.random() * 10000),
    },
    {
    	name: "Disable submit button when input field is empty",
    	id: 8877,
    	done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
  	},
  	{
  		name: "Hover effect on items",
  		id: 912,
  		done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
		},
		{
			name: "Title set to app name",
			id: 7349,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
		},
		{
			name: "Hover effect Random Scramble on version number",
			id: 1551,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
		},
		{
			name: "Store task list in local storage, session storage, or cookie",
			id: 1329,
			done: false,
      date: Date.now() - Math.floor(Math.random() * 10000),
		},
		{
			name: "On mobile, prevent auto-focus as it pops up keyboard, obscuring list",
			id: 8679,
			done: true,
      date: Date.now() - Math.floor(Math.random() * 10000),
		},
		{
			name: "Themes: light & dark, with auto-detect",
			id: 6619,
			done: false,
      date: Date.now() - Math.floor(Math.random() * 10000),
		},
    ]);

  return (
    <TodosList todos={todos} setTodos={setTodos} />
   );
  }



// Normally, this'd go into its own file, but... this is what I was
// given to work with (wasn't even a discrete function component!)
// ... aka ... Not My Fault™
function TodosList(props)
  {
  // console.log(`props:\n`, props)
  // Get todos getter & setter from props:
  let {todos, setTodos} = props;
  // If either is undefined via props, set to state:
  if (todos === undefined || setTodos === undefined)
    {
    [todos,setTodos] = useState([{name:"no props passed in", id:1, done: false, date: Date.now()}]);
    }
  // console.log(`todos:\n`,todos)
  // console.log(setTodos);

  // Name of task:
  const [name,setName] = useState("");

  // Handy ref for taks name input field for setting focus (or getting value):
  const nameRef = useRef();

	const [sortField,setSortField] = useState("nameAsc");

  function deleteTodo(id)
    {
    setTodos( curr => ( curr.filter(val => (val.id !== id)) ))
    focU();
    }



  function addTodo(e)
    {
    // console.log(e)
    e.preventDefault();
    console.log(`name: ${name} nameRef.current.value: "${nameRef.current.value}"`);

    // No nameless tasks:
    if (name.length === 0)
      {
      focU();
      return ;
      }


    setTodos( curr => ([
      ...curr,
      {
      name: name,
      id: Math.floor(Math.random() * 100000),
      done: false,
      date: Date.now(),
      }
      ]))
    // Ensure input field gets blanked:
    setName( () => "")
    // Put focus on input field (especially when button used to submit):
    focU();
    }


  function completeTodo(id)
    {
    console.log(`completeTodo(${id})`);

    // Get TODO list item that matches by ID:
    const updatedTodo = todos.find( v => v.id === id);
    // Toggle completion status:
    updatedTodo.done = !updatedTodo.done;
    console.log(updatedTodo)
    // Set todo list items to current, filtering current ID, then append updated TODO item:
    setTodos( curr => [...curr.filter(v => v.id !== id), updatedTodo])
    // Focus back on input field, just in case:
    focU()
    }


/*
  function sortTodos()
    {
    setTodos( curr => {
      const srt = curr.toSorted( (a,b) => (
        a.done - b.done || a.name.localeCompare(b.name)
        ))
      console.log(srt);
      return srt;
      })
    focU();
    }
*/


	const regex = new RegExp(/Android|iOS/);
  function focU()
    {
    // Every render puts focus on input field for new task name:
    // setName("wtf?")
    // document.querySelector("#derp")?.focus();
    // document.getElementById("derp")?.focus();
    // console.log("FOCUS")
    //
    // NOT if on mobile: keyboard pops up, covering task list:
    if (! regex.test(navigator.userAgent) )
	    nameRef.current.focus();
    }
// nameRef.current.focus();

	useEffect( () => (
		nameRef.current.focus()
		), []);


  return (
    <div>
      <h1>
      	Yet Another Todo List {" "}
      	<span
      		style={{fontSize:"0.5rem"}}
      		className="random_scramble"
      		data-orig="v.Eleventeen Gazillion"
      		>
      		v.Eleventeen Gazillion
    		</span>
  		</h1>

      <div>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add your task"
            name="todo_name"
            ref={nameRef}
            id="derp"
            value={name}
            onChange={(e) => {console.log(e.target.value); setName(curr => e.target.value)} }
            />

          <div>
            <button
              type="submit"
              onClick={(e) => addTodo(e)}
              disabled={name.length === 0}
              >
              Add Item
            </button>
            { " "}

						<fieldset style={{display: "inline", minWidth: "50vw"}}>
							<legend>
								Sortation field(s)
							</legend>

							<label>Name (asc) {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortName"
		              value="nameAsc"
		              checked={sortField === "nameAsc" && "checked"}
		              onChange={() => {
		              	setSortField( curr => "nameAsc");
		              	focU();
		              	}}
		              />
              </label>

							<label>Name (desc) {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortName"
		              value="nameDesc"
		              checked={sortField === "nameDesc" && "checked"}
		              onChange={() => {
		              	setSortField( curr => "nameDesc");
		              	focU();
		              	}}
		              />
              </label>

							<label>Date (asc)
		            <input
		              type="radio"
		              name="sortField"
		              id="sortDate"
		              value="date"
		              checked={sortField === "dateAsc" && "checked"}
		              onChange={() => {
		              	setSortField( curr => "dateAsc");
		              	focU();
		              	}}
		              />
              </label>

							<label>Date (desc)
		            <input
		              type="radio"
		              name="sortField"
		              id="sortDate"
		              value="date"
		              checked={sortField === "dateDesc" && "checked"}
		              onChange={() => {
		              	setSortField( curr => "dateDesc");
		              	focU();
		              	}}
		              />
              </label>
          	</fieldset>

          </div>
        </form>
      </div>
      <ul>
        {todos    /* .filter( v => v.done === false) */
          .toSorted( (a,b) => {
          	if (sortField === "nameAsc")
	          	return a.done - b.done ||
	          		a.name.localeCompare(b.name)
        		else if (sortField === "nameDesc")
	          	return a.done - b.done ||
	          		b.name.localeCompare(a.name)
        		else if (sortField === "dateAsc")
	          	return a.done - b.done ||
	          		a[sortField] - b[sortField]
        		else
	          	return a.done - b.done ||
	          		b.date - a.date
          	})
          .map( (val,idx) => {
          return <OneTodo key={idx} props={val} delFunc={deleteTodo} changeFunc={completeTodo} />
        })}
      </ul>
    </div>
    );
  }



function OneTodo({props, delFunc, changeFunc})
  {
  // console.log(props);
  const {name, id, date, done} = props;
  // console.log(`OneTodo name:${name} id:${id} done:${done}`)

  return (
    <>
    <li>
      <div>
        {name} {" "}
      </div>
      <div style={{textAlign:"center"}}>
        <label>Done <br />
          <input
            type="checkbox"
            name="done"
            checked={props.done}
            onChange={(e) => changeFunc(id)}
            />
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => delFunc(id)}
          >
          Delete
        </button>
      </div>
    </li>
    </>
    );	// end return
  }	// end function App





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

