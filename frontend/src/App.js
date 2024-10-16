import React, {useState} from "react";
import Expenses from "./components/Expenses/Expenses";
import "./App.css";
import NewExpense from "./components/NewExpenses/NewExpense";

let DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: "School Fee",
    date: new Date(2023,5,12),
    amount: 250
  },

  {
    id: 'e2',
    title: "Books",
    date: new Date(2023,5,12),
    amount: 100
  },

  {
    id: 'e3',
    title: "House Rent",
    date: new Date(2023,5,12),
    amount: 300
  },

  {
    id: 'e4',
    title: "Car Insurance",
    date: new Date(2023,5,12),
    amount: 250
  }
];

const App = () => {

  const [expenses,setExpenses] = useState(DUMMY_EXPENSES);

  // fetch('http://localhost/sample-api/api/read.php').then(
  //   response => {
  //     return response.json();
  //   }
  // ).then(
  //   data =>{
  //     console.log(data);
  //     setExpenses(data);
  //   }
  // )
  const addExpenseHandler = (expense) =>{
    const updatedExpense = [expense, ...expenses];
    setExpenses(updatedExpense);

  }

  return (
    <div>
       <NewExpense onAddExpense = {addExpenseHandler}/>
       <Expenses item={expenses}/>
    </div>
  );
}

export default App;
