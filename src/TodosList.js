import { useState, useEffect, useRef } from "react";


// Normally, this'd go into its own file, but... this is what I was
// given to work with (wasn't even a discrete function component!)
// ... aka ... Not My Fault™
export default function TodosList({todos, setTodos})
  {
  // If either is undefined via props, set to state:
  if (todos === undefined || setTodos === undefined)
    {
    let [todos,setTodos] = useState([{
      name:"no props passed in",
      id:1,
      done: false,
      date: Date.now()
      }]);
    }
  // console.log(`todos:\n`,todos)
  // console.log(setTodos);

  // Name of task:
  const [name,setName] = useState("");

  // Handy ref for taks name input field for setting focus (or getting value):
  const nameRef = useRef();

	const [sortField,setSortField] = useState("nameAsc");

	// Whether done (finished) items go to end of sorted list:
	const [sortDoneLast,setSortDoneLast] = useState(true);

  // Theme
  const [darkTheme,setDarkTheme] = useState(true);



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
		// Preserve sort order of list:
		const tempTodos = todos.map( v => {
			if (v.id === id)
				{
				v.done = !v.done;
				}
			return v;
			})	// end .map()

		setTodos( () => [...tempTodos]);

    // Focus back on input field, just in case:
    focU()
    }



  function sortTodos()
    {
    // If checkbox is selected to sort first by Done (completed), then
    // return that status, else return zero indicating no sort:
    let done = (a,b) => {
    	return sortDoneLast
    		? a.done - b.done
    		: 0
    	};

		return todos    /* .filter( v => v.done === false) */
			.toSorted( (a,b) => {
				if (sortField === "nameAsc")
//					return a.done - b.done ||
					return done(a,b) ||
						a.name.localeCompare(b.name)
				else if (sortField === "nameDesc")
					return done(a,b) ||
						b.name.localeCompare(a.name)
				else if (sortField === "dateAsc")
					{
					return done(a,b) ||
						a["date"] - b["date"]
					}
				else if (sortField === "dateDesc")
					{
					return done(a,b) ||
						b["date"] - a["date"]
					}
				else	// Sortation == "none"
					{
					return 0
					}
				})	// end .toSorted()
    }	// end sortTodos()



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



  // Initial render requires some setup:
  useEffect( () => {
    nameRef.current.focus();

    // Set state to match browser's preference via CSS setting:
    if ( window.matchMedia("(prefers-color-scheme: light)").matches)
      {
      // console.log(`STARTUP IS LIGHT THEME`);
      toggleTheme(false);
      }
    else
      {
      // console.log(`STARTUP IS DARK THEME`);
      toggleTheme(true);
      }
    }, []);





  function toggleTheme(wantsDarkTheme)
    {
    // Instead of toggle, explicitely add / remove
    // Trying to avoid FOIT (Flash Of Incorrect Theme):
    // (See CSS file for explanation)
    if (wantsDarkTheme === false)
      {
      document.querySelectorAll("body, li").forEach( v => {
        v.classList.add("themeLight")
        v.classList.remove("themeDark")
        });
      }
    else
      {
      document.querySelectorAll("body, li").forEach( v => {
        v.classList.add("themeDark")
        v.classList.remove("themeLight")
        });
      }
    setDarkTheme( () => wantsDarkTheme);
    }


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

							<label>Completed Last {" "}
		            <input
		              type="checkbox"
		              name="sortDoneLast"
		              id="sortDoneLast"
		              value="sortDoneLast"
		              checked={sortDoneLast && "checked"}
		              onChange={() => {
		              	setSortDoneLast( curr => !curr );
		              	focU();
		              	}}
		              />
              </label>
							<label>Name (asc) {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortNameAsc"
		              value="nameAsc"
		              checked={sortField === "nameAsc" && "checked"}
		              onChange={() => {
		              	setSortField( () => "nameAsc");
		              	focU();
		              	}}
		              />
              </label>

							<label>Name (desc) {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortNameDesc"
		              value="nameDesc"
		              checked={sortField === "nameDesc" && "checked"}
		              onChange={() => {
		              	setSortField( () => "nameDesc");
		              	focU();
		              	}}
		              />
              </label>

							<label>Date (asc) {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortDateAsc"
		              value="date"
		              checked={sortField === "dateAsc" && "checked"}
		              onChange={() => {
		              	setSortField( () => "dateAsc");
		              	focU();
		              	}}
		              />
              </label>

							<label>Date (desc) {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortDateDesc"
		              value="date"
		              checked={sortField === "dateDesc" && "checked"}
		              onChange={() => {
		              	setSortField( () => "dateDesc");
		              	focU();
		              	}}
		              />
              </label>

							<label>None {" "}
		            <input
		              type="radio"
		              name="sortField"
		              id="sortNone"
		              value="none"
		              checked={sortField === "none" && "checked"}
		              onChange={() => {
		              	setSortField( () => "none");
		              	focU();
		              	}}
		              />
              </label>
          	</fieldset>

            <fieldset style={{display: "inline"}}>
              <legend>
                Theme
              </legend>

              <label>Light {" "}
                <input
                  type="radio"
                  name="theme"
                  value="lighttheme"
                  checked={!darkTheme && "checked"}
                  onChange={() => toggleTheme(false)}
                  />
                </label>

              <label>Dark {" "}
                <input
                  type="radio"
                  name="theme"
                  value="darktheme"
                  checked={darkTheme && "checked"}
                  onChange={() => toggleTheme(true)}
                  />
                </label>
            </fieldset>

          </div>
        </form>
      </div>
      <ul>
        {sortTodos()
          .map( (val,idx) => {
	          return <OneTodo
	          	key={idx}
	          	props={val}
	          	delFunc={deleteTodo}
	          	changeFunc={completeTodo}
	          	/>
  	      })
	      }
      </ul>
    </div>
    );	// end return()
  }	// end function TodosList()



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
      <div>
      	{new Intl.DateTimeFormat({},
      		{dateStyle:"medium",timeStyle:"short"})
      		.format(date)}
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
  }	// end function OneTodo
