import React from 'react';
import {mount} from 'enzyme';
import App from './App';


describe('App',()=>{
	/*******Test Rendering********/
	
	let app=mount(<App />);
	it('should renders title',()=>{
		//console.log(app.debug())
		expect(app.find('h3').text()).toEqual('Notes');
		
	});
	
	it('should renders the clear button',()=>{
		//expect(app.find('.btn').text()) //Method "text" is only meant to be run on a single node. 2 found instead.
		expect(app.find('.btn').at(1).text()).toEqual('Clear');
	});
	
	//Testing Form (exists && proper child components && and submit )
	
	describe('when render the form',()=>{
		
		it('should create Form component',()=>{
			
			expect(app.find('Form').exists()).toBe(true);
			
		});
		it('should create FormControl component',()=>{
			
			expect(app.find('FormControl').exists()).toBe(true);
			
		});
		it('should render Submit button',()=>{
			
			expect(app.find('.btn').at(0).text()).toEqual('Submit');
			
		});
		
		
		
		
		
	});
	
	/*******End Test Rendering*******/
	
	/******************BDD********************/
	describe('when creating a note',()=>{
		
		let testNote='this is test note';
		
		//simulate the click using
		
		beforeEach(()=>{ //Jest function triggired before each following "it" block
			
			app.find('FormControl').simulate('change',{
				target:{value:testNote}
			})
		});
		
		it('should updates the text in state',()=>{
			
			//console.log(app.state()); // state() function from mount.
			expect(app.state().text).toEqual(testNote);
		});
		
		
		describe('and submitting the new note',()=>{
			beforeEach(()=>{ 
			
			app.find('.btn').at(0).simulate('click');
		});
		
		afterEach(()=>{
			
			app.find('.btn').at(1).simulate('click');
		});
			
			it('should adds the new note to state',()=>{
				
				expect(app.state().notes[0].text).toEqual(testNote);
				
			});
			
			describe('remounting the component',()=>{
				
				let app2;
				beforeEach(()=>{
					
					app2=mount(<App />);
				});
				
				it('should reads the stored notes in cookies',()=>{
					
				//	console.log(app2.state()); // Without afterEach()   notes: [ { text: 'this is test note' }, { text: 'this is test note' } ]
				
				expect(app2.state().notes).toEqual([{text:testNote}]);
				
				})
				
				
			});
			
		});
		
		describe('clicking the clear button',()=>{
			
			beforeEach(()=>{
				
				app.find('.btn').at(1).simulate('click');
			})
			
			it('should be empty notes array',()=>{
				
				expect(app.state().notes).toEqual([]);
			})
			
			
		})
		
	});
	/******************END BDD********************/ /*************** npm test -- --coverage ************/
	
});











