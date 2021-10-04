
import uranio from 'uranio';

import { urn_util, urn_response } from "urn-lib";

import { atom_book } from "uranio-books/atom";

type ErrorParams = {
	statusCode: number;
	message: string;
};
type Context = {
	params: {
		slug: string;
	};
	error: (p: ErrorParams) => void;
};
type ReturnData<N extends uranio.types.AtomName> = {
	atom_name: N;
	plural: string;
	atoms: uranio.types.Atom<N>[];
	message: string;
	success: boolean;
};

export default {
	layout(): string {
		return "urn-admin";
	},
	async asyncData<A extends uranio.types.AtomName>(context:Context)
			:Promise<ReturnData<A>> {
		
		console.log('AsyncData.context.params', context.params);
		
		const atom_name = context.params.slug as A;
		
		let plural = atom_name + "s";
		let message = "";
		let success = false;
		let atoms: uranio.types.Molecule<A>[] = [];
		
		if(urn_util.object.has_key(atom_book, atom_name)){
			const atom_def = atom_book[atom_name];
			if(urn_util.object.has_key(atom_def, "plural")){
				plural = (atom_def as any).plural;
			}
			const trx_base = uranio.trx.base.create<A>(atom_name);
			const trx_hook = trx_base.hook('find');
			const trx_response = await trx_hook({
				query:{
					options: {
						limit: 3,
						sort: {
							_date: -1
						}
					}
				} as any
			});
			
			success = trx_response.success;
			
			if(trx_response.status == 200){
				atoms = trx_response.payload;
			}else{
				message = (trx_response as urn_response.Fail<any>).err_msg || "ERROR";
			}
			
			console.log('TRX Response: ', trx_response);
			
		}else{
			
			context.error({ statusCode: 404, message: "Page not found" });
			
		}
		return {
			atom_name,
			plural,
			atoms,
			message,
			success,
		};
	},
};
