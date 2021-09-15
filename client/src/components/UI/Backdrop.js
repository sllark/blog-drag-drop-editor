import React from 'react';


const Backdrop=(props)=>
    props.show ? <div className="backdrop" onClick={props.backdropClicked} /> : null;


export default Backdrop;



// import React, {useState} from "react";
//
//
// export default function Backdrop(props) {
//
//     const {hideModal, setHideModal} = useState(false);
//
//     return hideModal ? null : (
//         <div className="backdrop" onClick={() => setHideModal(true)}>
//             {props.children}
//         </div>
//     )
// }
