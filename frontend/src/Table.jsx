import React from 'react';
// function  Table(props) {
//     return (
//         {props.data.map((val, key) => {
//             return (
//               <div className="employee">
//                 <div>
//                   <h3>Name: {val.name}</h3>
//                   <h3>voting_choice: {val.voting_choice}</h3>
//                   <h3>casted_at: {val.casted_at}</h3>
//                 </div>
//               </div>
//             );
//           })}
//     )
// }

class Table extends React.Component{
    render(){
        const { data } = this.props;
        return(
          <ol>
            {data.map((val , index) => {
              return(
                <li key={index}>
                  <h3>Name: {val.name}</h3>
                  <h3>voting_choice: {val.voting_choice}</h3>
                  <h3>casted_at: {val.casted_at}</h3>
                </li>
              );
            })}
          </ol>
        )
}
}

export default Table;