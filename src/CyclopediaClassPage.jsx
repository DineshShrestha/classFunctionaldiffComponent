import React from "react";
import { getRandomUser } from "./Utility/api";
import Instructor from "./Instructor";
class CyclopediaClassPage extends React.Component{
    constructor(props){
        super(props);
        this.state=JSON.parse(localStorage.getItem("cyclopediaState"))||{
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
            inputName:"",
            inputFeedback:"",
        };
    }
    componentDidMount=async ()=>{
        console.log("component did mount");
        if(JSON.parse(localStorage.getItem("cyclopediaState"))){
            //this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
        }
        else{
        const response = await getRandomUser();
        console.log(response);
        this.setState((prevState)=> {
            return {
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number
                    }
                }
            })
        }
    }
    componentDidUpdate=async(previousProps, previousState)=>{
        console.log("component did update");
        localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
        console.log("Old state- " + previousState.studentCount);
        console.log("New state- " + this.state.studentCount);

        if(previousState.studentCount < this.state.studentCount){
            const response = await getRandomUser();
            this.setState((prevState)=>{
                return {
                    studentList: [
                        ...prevState.studentList,{ 
                        name:response.data.first_name + " "+ response.data.last_name
                    }
                    ]
                }
            })
        }
        else if(previousState.studentCount > this.state.studentCount){
            this.setState((prevState)=>{
                return {
                    studentList: [],
                }
            });
        }
    }
    componentWillUnmount(){
        console.log("component will unmount");
    }
    handleAddStudent=()=>{
        this.setState((prevState)=>{
            return{
                studentCount: prevState.studentCount + 1 
            }
        })
    }
    handleRemoveAllStudent=()=>{
        this.setState((prevState)=>{
            return{
                studentCount: 0 
            }
        })
    }
    handleToggleInstructor=()=>{
        this.setState((prevState)=>{
            return{
                hideInstructor: !prevState.hideInstructor, 
            }
        })
    }
    render(){
        console.log("render component");
        return(
            <div>
                <div className="p-3">
                <span className="h4 text-success">Instructor &nbsp;</span>
                <i className={`bi ${this.state.hideInstructor ? "bi-toggle-off":"bi-toggle-on" } btn btn-success btn-sm`} onClick={this.handleToggleInstructor}></i>
                {!this.state.hideInstructor && this.state.instructor  ? (
                    <Instructor instructor={this.state.instructor}/>
                ):null}
                </div>
              
                <div className="p-3">
                    <span className="h4 text-success">Feedback</span><br/>
                    <input type="text" placeholder="Name..." value={this.state.inputName} onChange={(e)=>{this.setState({inputName: e.target.value})}}></input>value:{this.state.inputName}<br/>
                    <textarea placeholder="Feedback...." value={this.state.inputFeedback} onChange={e=>{this.setState({inputFeedback: e.target.value})}}></textarea>value:{this.state.inputFeedback}
                </div>
                <div className="p-3">
                    <span className="h4 text-success">Students</span><br/>
                    <div>Student Count: {this.state.studentCount}</div>
                    <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudent}>Remove All Students</button>

                    {this.state.studentList.map((student, index)=>{
                        return (
                            <div className="text-white" key={index}> - {student.name}</div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default CyclopediaClassPage