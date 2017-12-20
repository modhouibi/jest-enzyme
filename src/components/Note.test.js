import React from 'react';
import {mount} from 'enzyme';
import Note from './Note';


const props={note:{text:'note for testing'}}
describe('Note',()=>{
		/*******Test Rendering********/
	let note=mount(<Note note={props.note} />);
	
	it('should renders the note text',()=>{
		
		//console.log(note.debug()); //enzyme debug function convert the mounted component to string		
		//expect(note.find('p').text()).toEqual('abc');
		expect(note.find('p').text()).toEqual(props.note.text);
		
	});
	/*******End Test Rendering*******/
});