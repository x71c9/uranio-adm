/**
 * Server book type module
 *
 * This module defines the type of the `atom_book` for the Server.
 * It extends the defintion of the Client Book type.
 *
 * In order to copy and reexport namespaces and types we use the syntax
 * `export import`.
 *
 * `type Book` must be re-defined.
 *
 * @packageDocumentation
 */

import urn_trx from 'uranio-trx';

import * as book_cln from './book_cln';

export type Book = {
	[k in urn_trx.types.AtomName]?: Book.Definition<k>;
}

export namespace Book {
	
	export type BasicDefinition =
		book_cln.Book.BasicDefinition;
	
	export type Definition<A extends urn_trx.types.AtomName> =
		Omit<urn_trx.types.Book.Definition<A>, keyof Book.BasicDefinition> &
		Book.BasicDefinition;
	
	export namespace Definition {
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Security = urn_trx.types.Book.Definition.Security;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Dock = urn_trx.types.Book.Definition.Dock;
		
		
		// Exporting the types that has been overwritten in Book client.
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Properties = book_cln.Book.Definition.Properties;
		
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		export import Property = book_cln.Book.Definition.Property;
		
	}
	
}
