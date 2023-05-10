import React from 'react'

class Instructor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount=async ()=>{
        console.log("component did mount");
    }
    componentDidUpdate(){
        console.log("component did update");
         }
    componentWillUnmount(){
        console.log("component will unmount");
    }

    render(){
        console.log("Render Instructor")
        return(
            <div>
                      
                        <br/>
                        Name: {this.props.instructor.name}
                        <br/>
                        Email:{this.props.instructor.email}
                        <br/>
                        Phone: {this.props.instructor.phone}
                    </div>
        )
    }
}


export default Instructor