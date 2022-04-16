/**
 * Utils module for Admin Panel
 *
 * @packageDocumentation
 */
import uranio from 'uranio/client';
export declare function merge_atoms_of_molecule_property<A extends uranio.schema.AtomName>(molecule: uranio.schema.Molecule<A, 1>, molecule_prop_name: keyof uranio.schema.Molecule<A, 1>, atoms: uranio.schema.Atom<A>[]): uranio.schema.Atom<A>[];
export declare function empty_molecule<A extends uranio.schema.AtomName, D extends uranio.schema.Depth>(atom_name: A): uranio.schema.Molecule<A, D>;
export declare function clean_atom<A extends uranio.schema.AtomName>(atom_name: A, molecule: uranio.schema.Molecule<A, 1>): uranio.schema.Atom<A>;
export declare function clean_atmo_for_multiple_update<A extends uranio.schema.AtomName>(atom_name: A, molecule: uranio.schema.Molecule<A, 1>): uranio.schema.Atom<A>;
