export * from '../../client/register';
import uranio from 'uranio/client';
declare module 'vue/types/vue' {
    interface Vue {
        $uranio: typeof uranio;
    }
}
