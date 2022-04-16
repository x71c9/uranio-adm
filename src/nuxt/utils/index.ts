/**
 * Utils module for Admin Panel
 *
 * @packageDocumentation
 */

import {urn_util} from 'urn-lib';

import uranio from 'uranio/client';

export function merge_atoms_of_molecule_property<A extends uranio.schema.AtomName>(
	molecule: uranio.schema.Molecule<A,1>,
	molecule_prop_name: keyof uranio.schema.Molecule<A,1>,
	atoms: uranio.schema.Atom<A>[],
):uranio.schema.Atom<A>[]{
	
	let current_atoms = (molecule)[molecule_prop_name] as unknown as uranio.schema.Atom<A>[];
	if(!Array.isArray(current_atoms)){
		current_atoms = [];
	}
	const current_atoms_ids:string[] = [];
	for(const curr_atom of current_atoms){
		current_atoms_ids.push(curr_atom._id);
	}
	const different_atoms:uranio.schema.Atom<A>[] = [];
	for(const atom of atoms){
		if(!current_atoms_ids.includes(atom._id)){
			different_atoms.push(atom);
		}
	}
	const final_atoms:uranio.schema.Atom<A>[] = [...current_atoms, ...different_atoms];
	return final_atoms;
}

export function empty_molecule<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(
	atom_name:A
):uranio.schema.Molecule<A,D>{
	
	let molecule = {} as uranio.schema.Molecule<A, D>;
	
	const atom_props = uranio.book.get_properties_definition(atom_name);
	
	for(const [prop_name, prop_def] of Object.entries(atom_props)){
		
		switch(prop_def.type){
			case uranio.types.PropertyType.ATOM:{
				molecule = {...molecule, ...{[prop_name] : null}};
				break;
			}
			case uranio.types.PropertyType.BINARY:{
				molecule = {...molecule, ...{[prop_name] : false}};
				break;
			}
			case uranio.types.PropertyType.FLOAT:{
				molecule = {...molecule, ...{[prop_name] : .0}};
				break;
			}
			case uranio.types.PropertyType.ENUM_NUMBER:
			case uranio.types.PropertyType.INTEGER:{
				molecule = {...molecule, ...{[prop_name] : 0}};
				break;
			}
			case uranio.types.PropertyType.SET_NUMBER:
			case uranio.types.PropertyType.SET_STRING:
			case uranio.types.PropertyType.ATOM_ARRAY:{
				molecule = {...molecule, ...{[prop_name] : []}};
				break;
			}
			default:{
				molecule = {...molecule, ...{[prop_name] : ''}};
				break;
			}
		}
	}
	
	return molecule;
	
}

export function clean_atom<A extends uranio.schema.AtomName>(
	atom_name:A,
	molecule:uranio.schema.Molecule<A,1>
):uranio.schema.Atom<A>{
	const cloned_atom = urn_util.object.deep_clone(molecule) as any;
	if(cloned_atom._date){
		delete cloned_atom._date;
	}
	const atom_prop_defs = uranio.book.get_custom_properties_definition(atom_name);
	for(const [prop_key, prop_def] of Object.entries(atom_prop_defs)){
		if(prop_def.optional && cloned_atom[prop_key] === ''){
			delete cloned_atom[prop_key];
		}
	}
	return cloned_atom;
}

export function clean_atmo_for_multiple_update<A extends uranio.schema.AtomName>(
	atom_name:A,
	molecule:uranio.schema.Molecule<A,1>
):uranio.schema.Atom<A>{
	const cloned_atom = urn_util.object.deep_clone(molecule) as any;
	if(typeof cloned_atom._date !== 'undefined'){
		delete cloned_atom._date;
	}
	if(typeof cloned_atom._id !== 'undefined'){
		delete cloned_atom._id;
	}
	if(typeof cloned_atom._r !== 'undefined'){
		delete cloned_atom._r;
	}
	if(typeof cloned_atom._w !== 'undefined'){
		delete cloned_atom._w;
	}
	if(typeof cloned_atom._from !== 'undefined'){
		delete cloned_atom._from;
	}
	const atom_prop_defs = uranio.book.get_custom_properties_definition(atom_name);
	for(const [prop_key, _prop_def] of Object.entries(atom_prop_defs)){
		if(cloned_atom[prop_key] === ''){
			delete cloned_atom[prop_key];
		}
		if(Array.isArray(cloned_atom[prop_key]) && cloned_atom[prop_key].length === 0){
			delete cloned_atom[prop_key];
		}
	}
	return cloned_atom;
}

