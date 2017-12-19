import React,{Component} from 'react';
import {Form,FormControl,Button} from 'react-bootstrap';
import Note from './Note';

import {bake_cookie,read_cookie,delete_cookie} from 'sfcookies';
const cookie_key='Notes';
class App extends Component{

constructor(){
	super();
	
	this.state={
		text:'',
		notes:[]
	}
}

componentDidMount(){

	this.setState({notes:read_cookie(cookie_key)})
}

	submit(){
		//const notes=[...this.state.notes,{text:this.state.text}]
		//this.setState({notes:notes});
		
		const {notes,text}=this.state;
		notes.push({text});
		this.setState({notes})
		bake_cookie(cookie_key,this.state.notes);
		
	}
	clear(){
		
		delete_cookie(cookie_key)
		this.setState({notes:[]})
	}

	render(){

		return(
			<div>
			<h3>Notes</h3>
			<Form inline={true}>
			
			<FormControl onChange={e =>this.setState({text:e.target.value})} />
				{' '}
			<Button onClick={()=>this.submit()}>Submit</Button>
			</Form>
			{
				this.state.notes.map((note,key)=>{
				return <Note  key={key} note={note} />	
			})
			}
			<hr/>
				<Button onClick={()=>this.clear()}>Clear</Button>
			</div>
			);

	}
}

export default App;
