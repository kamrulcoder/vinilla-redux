// import { createStore } from "redux"

// html element 
const resetButton = document.querySelector(".lws-reset")
const addtButton = document.querySelector(".lws-addMatch")

// create all constants 
const INCREMENT_VALUE = "INCREMENT_VALUE"
const DECREMENT_VALUE = "DECREMENT_VALUE"
const DELETE_COUNTER = "DELETE_COUNTER"
const ADD_COUNTER = "ADD_COUNTER"
const RESET_VALUE = "RESET_VALUE"

// create initial state 
const initialState = {
    counters: [
        { id: 1, title: "MATCH 1", value: 1 },
        { id: 2, title: "MATCH 2", value: 1 }
    ]
}

// create action 

const addCounter = () => {
    return {
        type: ADD_COUNTER,

    }
}

const deleteCounter = (id) => {
    return {
        type: DELETE_COUNTER,
        payload: { id }
    }
}

const incrementCounterValue = (id, value) => {
    return {
        type: INCREMENT_VALUE,
        payload: {
            id,
            value
        }
    }
}

const decrementCounterValue = (id, value) => {
    return {
        type: DECREMENT_VALUE,
        payload: {
            id,
            value
        }
    }
}


const resetValue = () => {
    return {
        type: RESET_VALUE,
    }
}

// create reducers 
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COUNTER:
            return {
                ...state,

                counters: [...state.counters, {
                    id: state.counters.length + 1,
                    title: `MATCH ${state.counters.length + 1}`,
                    value: 0
                }]
            }
        case DELETE_COUNTER:
            return {
                ...state,
                counters: state.counters.filter(counter => counter.id !== action.payload.id)
            }
        case INCREMENT_VALUE:
            return {
                ...state,
                counters: state.counters.map(counter => counter.id === action.payload.id ? { ...counter, value: counter.value + action.payload.value } : counter)
            }
        case DECREMENT_VALUE:
            return {
                ...state,
                counters: state.counters.map(counter => counter.id === action.payload.id ? { ...counter, value: counter.value - action.payload.value } : counter)
            }
            c
        case RESET_VALUE:
            // the new value to set
            const updatedCounters = state.counters.map(counter => {
                return { ...counter, value: 0 };
            });
            return { ...state, counters: updatedCounters };

        default:
            state;
    }
}


// create store 

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    const counterList = document.getElementById('all-matches');
    console.log(counterList)

    console.log(state)



    state?.counters.forEach(counter => {
        const outerElement = document.createElement('div');
        const outer = `
        <div class="match">
        <div class="wrapper">
            <button class="lws-delete">
                <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="lws-matchName">${counter.title}</h3>
        </div>
        <div class="inc-dec">
            <form class="incrementForm">
                <h4>Increment</h4>
                <input
                    type="number"
                    name="increment"
                    class="lws-increment"
                />
            </form>
            <form class="decrementForm">
                <h4>Decrement</h4>
                <input
                    type="number"
                    name="decrement"
                    class="lws-decrement"
                    
                />
            </form>
        </div>
        <div class="numbers">
            <h2 class="lws-singleResult">${counter.value}</h2>
        </div>
    </div>
        `
        outerElement.innerHTML = outer;
        counterList.appendChild(outerElement);
    })
};

// update UI initially
render();

store.subscribe(render);




// store.dispatch(incrementCounterValue(1, 20)) // perfectly work
// store.dispatch(decrementCounterValue(1, 20)) // perfect work
// store.dispatch(deleteCounter(2))   // perfect work
// store.dispatch(addCounter())
// store.dispatch(addCounter())
// store.dispatch(addCounter())
// store.dispatch(addCounter())
store.dispatch(addCounter())

// store.dispatch(resetValue())

resetButton.addEventListener("click", () => {
    store.dispatch(resetValue())
})
addtButton.addEventListener("click", () => {
    store.dispatch(addCounter())
})