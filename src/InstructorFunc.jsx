import React, {useEffect} from 'react'

const InstructorFunc =(props)=>{
    useEffect(()=>{
        console.log("Instructor UNMOUNTED");
    }, []);
        return(
            <div>
                      
                        <br/>
                        Name: {props.instructor.name}
                        <br/>
                        Email:{props.instructor.email}
                        <br/>
                        Phone: {props.instructor.phone}
                    </div>
        )
}


export default InstructorFunc